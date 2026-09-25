import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebase-admin";
import { requireRole, audit } from "@/lib/server-auth";
import crypto from "crypto";
function tempPassword() { return `${crypto.randomBytes(9).toString("base64url")}aA7!`; }
export async function GET() {
  const user = await requireRole(["super_admin"]); if (!user) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const snap = await adminFirestore.collection("staffProfiles").orderBy("createdAt", "desc").limit(200).get();
  const staff=await Promise.all(snap.docs.map(async d => {
    const [accountSnap,historySnap]=await Promise.all([
      adminFirestore.collection("users").doc(d.id).get(),
      d.ref.collection("equityHistory").orderBy("createdAt","desc").limit(50).get(),
    ]);
    const x=d.data(),account=accountSnap.data()||{},history=historySnap.docs.map(item=>{
      const value=item.data();
      return {id:item.id,...value,createdAt:value.createdAt?.toDate?.()?.toISOString()||null};
    });
    return {id:d.id,...x,role:account.role||"staff",createdAt:x.createdAt?.toDate?.()?.toISOString(),updatedAt:x.updatedAt?.toDate?.()?.toISOString(),equityHistory:history};
  }));return NextResponse.json({staff});
}
export async function POST(req: NextRequest) {
  const admin = await requireRole(["super_admin"]); if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const body = await req.json(); if (!body.firstName || !body.lastName || !body.email || !body.jobTitle) return NextResponse.json({ message: "Name, email and job title are required." }, { status: 400 });
  const initialEquity = Number(body.currentEquity || 0);
  if (!Number.isFinite(initialEquity) || initialEquity < 0) return NextResponse.json({ message: "Equity allocation must be zero or greater." }, { status: 400 });
  const email = String(body.email).trim().toLowerCase(); const password = tempPassword(); let createdUid = "";
  try {
    const employeeId = await adminFirestore.runTransaction(async tx => { const ref=adminFirestore.collection("counters").doc("staff"); const snap=await tx.get(ref); const next=(snap.data()?.value || 0)+1; tx.set(ref,{value:next},{merge:true}); return `UPT-${String(next).padStart(4,"0")}`; });
    const authUser = await adminAuth.createUser({ email, password, displayName: `${body.firstName} ${body.lastName}` }); createdUid = authUser.uid;
    const now = new Date(); const profile = { firstName:body.firstName,lastName:body.lastName,email,jobTitle:body.jobTitle,department:body.department||"",phone:body.phone||"",employmentStatus:body.employmentStatus||"active",startDate:body.startDate||"",employeeId,currentEquity:initialEquity,equityAdded:initialEquity,equityUpdatedAt: initialEquity ? now : null,createdAt:now,updatedAt:now };
    await Promise.all([adminFirestore.collection("users").doc(createdUid).set({ email,role:"staff",mustChangePassword:true,accountStatus:"active",createdAt:now }),adminFirestore.collection("staffProfiles").doc(createdUid).set(profile)]);
    if (initialEquity>0) await adminFirestore.collection("staffProfiles").doc(createdUid).collection("equityHistory").add({ value:initialEquity,equityAdded:initialEquity,effectiveDate:body.startDate||now.toISOString().slice(0,10),note:"Initial allocation",updatedBy:admin.uid,createdAt:now });
    await audit(admin.uid,"staff.created","staff",createdUid,{employeeId});
    return NextResponse.json({ name:`${body.firstName} ${body.lastName}`,employeeId,email,temporaryPassword:password },{status:201});
  } catch (e: any) { if(createdUid) await adminAuth.deleteUser(createdUid).catch(()=>{}); return NextResponse.json({ message:e?.code === "auth/email-already-exists" ? "A user with this email already exists." : "Staff account could not be created." },{status:400}); }
}
