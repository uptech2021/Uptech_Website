import { NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";
import { requireRole } from "@/lib/server-auth";
export async function GET() {
  const user=await requireRole(["staff","hr"]); if(!user)return NextResponse.json({message:"Forbidden"},{status:403});
  const ref=adminFirestore.collection("staffProfiles").doc(user.uid); const [profile,history]=await Promise.all([ref.get(),ref.collection("equityHistory").orderBy("effectiveDate","desc").limit(50).get()]);
  if(!profile.exists)return NextResponse.json({message:"Profile not found"},{status:404}); const p=profile.data()!;
  const records=history.docs.map(d=>({id:d.id,...d.data(),createdAt:d.data().createdAt?.toDate?.()?.toISOString()}));
  const seen=new Set<string>();
  const uniqueHistory=records.filter((record:any)=>{const key=`${record.period||""}|${record.value}|${record.equityAdded}|${record.effectiveDate||""}`;if(seen.has(key))return false;seen.add(key);return true});
  return NextResponse.json({profile:{...p,equityUpdatedAt:p.equityUpdatedAt?.toDate?.()?.toISOString()},history:uniqueHistory});
}
