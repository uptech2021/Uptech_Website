import { NextRequest, NextResponse } from "next/server";
import { audit, requireRole } from "@/lib/server-auth";
import { staffWelcomeEmail } from "@/lib/staff-welcome-email";
import { sendSmtpEmail } from "@/lib/smtp";

export async function POST(req: NextRequest) {
  const admin = await requireRole(["super_admin","hr"]);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const { name, email, employeeId, temporaryPassword, loginUrl } = await req.json();
    if (![name,email,employeeId,temporaryPassword,loginUrl].every(v=>typeof v==="string"&&v.trim())) {
      return NextResponse.json({ message: "Complete login details are required." }, { status: 400 });
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!/^https?:\/\//.test(loginUrl))return NextResponse.json({message:"The recipient email or login link is invalid."},{status:400});

    const content=staffWelcomeEmail({name,email,employeeId,temporaryPassword,loginUrl});
    const from=process.env.EMAIL_FROM?.trim()||process.env.EMAIL_USER?.trim();
    if(!from||!process.env.EMAIL_SERVICE||!process.env.EMAIL_USER||!process.env.EMAIL_PASS)
      return NextResponse.json({message:"Email is not configured. Add EMAIL_SERVICE=gmail, EMAIL_USER, EMAIL_PASS, and EMAIL_FROM to .env.local."},{status:503});
    const result=await sendSmtpEmail({to:email,from,subject:"Your UpTech member portal account is ready",html:content.html});
    if(!result.configured) return NextResponse.json({message:"Email is not configured. Add EMAIL_SERVICE=gmail, EMAIL_USER, EMAIL_PASS, and EMAIL_FROM to .env.local."},{status:503});

    await audit(admin.uid,"staff.welcome_email_sent","staff",employeeId,{email,provider:"gmail-smtp"});
    return NextResponse.json({success:true,message:`Welcome email sent to ${email}.`});
  } catch(error){
    console.error("Staff welcome email failed:",error instanceof Error?error.message:"Unknown error");
    return NextResponse.json({message:"The welcome email could not be sent. Check the Gmail app password and SMTP settings."},{status:500});
  }
}
