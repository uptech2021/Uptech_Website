import { NextRequest, NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";
import { requireRole, audit } from "@/lib/server-auth";

export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 const admin=await requireRole(["super_admin"]);if(!admin)return NextResponse.json({message:"Forbidden"},{status:403});
 const {id}=await params;const body=await req.json();const value=Number(body.value);const period=String(body.period||"").trim();const updateId=String(body.updateId||"");
 if(!Number.isFinite(value)||value<0)return NextResponse.json({message:"Equity allocation must be zero or greater."},{status:400});
 if(!period)return NextResponse.json({message:"Equity period is required."},{status:400});
 if(body.equityUnit&&!['allocation','ordinary_shares','percentage'].includes(body.equityUnit))return NextResponse.json({message:"Invalid equity unit."},{status:400});
 if(body.equityUnit==='percentage'&&value>100)return NextResponse.json({message:"Percentage cannot exceed 100."},{status:400});
 if(body.equityUnit==='ordinary_shares'&&!Number.isSafeInteger(value))return NextResponse.json({message:"Ordinary shares must be a safe whole number."},{status:400});
 if(body.employmentStatus&&!['active','leave','inactive','terminated'].includes(body.employmentStatus))return NextResponse.json({message:"Invalid employment status."},{status:400});
 if(body.equityStatus&&!['active','inactive','revoked'].includes(body.equityStatus))return NextResponse.json({message:"Invalid equity status."},{status:400});
 if(!/^[a-zA-Z0-9-]{20,50}$/.test(updateId))return NextResponse.json({message:"Invalid equity update request."},{status:400});
 const ref=adminFirestore.collection("staffProfiles").doc(id);const historyRef=ref.collection("equityHistory").doc(updateId);const now=new Date();let equityAdded=0;let duplicate=false;
 await adminFirestore.runTransaction(async tx=>{const existing=await tx.get(historyRef);if(existing.exists){duplicate=true;return}const profile=await tx.get(ref);if(!profile.exists)throw new Error("STAFF_NOT_FOUND");const previous=Number(profile.data()?.currentEquity||0);equityAdded=value-previous;tx.update(ref,{...(body.equityUnit?{equityUnit:body.equityUnit}:{}),...(body.employmentStatus?{employmentStatus:body.employmentStatus}:{}),...(body.equityStatus?{equityStatus:body.equityStatus}:{}),currentEquity:value,equityAdded,equityPeriod:period,equityUpdatedAt:now,equityEffectiveDate:body.effectiveDate||now.toISOString().slice(0,10),updatedAt:now});tx.set(historyRef,{value,equityAdded,period,effectiveDate:body.effectiveDate||now.toISOString().slice(0,10),note:String(body.note||""),updatedBy:admin.uid,createdAt:now})});
 if(!duplicate)await audit(admin.uid,"equity.changed","staff",id,{value,equityAdded,period});
 return NextResponse.json({success:true,duplicate});
}
