import { NextRequest,NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { sendSmtpEmail } from "@/lib/smtp";

const success=()=>NextResponse.json({message:"If this email is registered, a secure reset link has been sent."});
const escape=(value:string)=>value.replace(/[&<>'"]/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character]||character);

export async function POST(request:NextRequest){
  try{
    const body=await request.json(),email=String(body.email||"").trim().toLowerCase();
    if(!email||email.length>254)return success();
    await adminAuth.getUserByEmail(email);
    const baseUrl=String(process.env.NEXT_PUBLIC_BASE_URL||request.nextUrl.origin).replace(/\/$/,"");
    const resetUrl=await adminAuth.generatePasswordResetLink(email,{url:`${baseUrl}/login`,handleCodeInApp:false});
    const safeEmail=escape(email),safeUrl=escape(resetUrl),from=process.env.EMAIL_FROM?.trim()||process.env.EMAIL_USER?.trim()||"uptechincorp@gmail.com";
    const html=`<!doctype html><html><body style="margin:0;background:#eef4ff;font-family:Arial,sans-serif;color:#10254c"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef4ff;padding:28px 12px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden"><tr><td style="background:#10254c;padding:28px;color:#ffffff"><div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#b9d1ff">UpTech Incorporated Ltd.</div><h1 style="margin:8px 0 0;font-size:26px;color:#ffffff">Reset your password</h1></td></tr><tr><td style="padding:30px"><p style="font-size:17px;margin-top:0">Hello,</p><p>We received a request to reset the password for the UpTech portal account associated with <strong>${safeEmail}</strong>.</p><table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px auto"><tr><td bgcolor="#2563eb" style="border-radius:999px;text-align:center"><a href="${safeUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff!important;text-decoration:none;font-size:16px;font-weight:bold"><span style="color:#ffffff!important">Reset your password</span></a></td></tr></table><p style="font-size:13px;color:#51617e">This secure link expires automatically. If you did not request this reset, you can ignore this email and your password will remain unchanged.</p><p style="margin:28px 0 0">Thank you,<br><strong>UpTech Incorporated Ltd.</strong></p></td></tr></table></td></tr></table></body></html>`;
    const result=await sendSmtpEmail({to:email,from,subject:"Reset your UpTech portal password",html});
    if(!result.configured)console.error("Password reset email is not configured.");
  }catch(error){
    const code=typeof error==="object"&&error&&"code" in error?String(error.code):"";
    if(code!=="auth/user-not-found")console.error("Password reset request failed",error);
  }
  return success();
}
