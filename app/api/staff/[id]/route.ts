import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebase-admin";
import { audit, requireRole } from "@/lib/server-auth";

export async function DELETE(_:NextRequest,{params}:{params:Promise<{id:string}>}){
  const admin=await requireRole(["super_admin"]);
  if(!admin)return NextResponse.json({message:"Forbidden"},{status:403});
  const {id}=await params;
  if(id===admin.uid)return NextResponse.json({message:"You cannot delete your own administrator account."},{status:400});
  const ref=adminFirestore.collection("staffProfiles").doc(id);
  const profile=await ref.get();
  if(!profile.exists)return NextResponse.json({message:"Staff member not found."},{status:404});
  const employeeId=profile.data()?.employeeId||id;
  try{
    await adminAuth.deleteUser(id);
    await adminFirestore.recursiveDelete(ref);
    await adminFirestore.collection("users").doc(id).delete();
    const remaining=await adminFirestore.collection("staffProfiles").limit(1).get();
    if(remaining.empty) await adminFirestore.collection("counters").doc("staff").set({value:0},{merge:true});
    await audit(admin.uid,"staff.deleted","staff",id,{employeeId});
    return NextResponse.json({success:true});
  }catch(error){
    console.error("Staff deletion failed:",error instanceof Error?error.message:"Unknown error");
    return NextResponse.json({message:"Staff member could not be deleted."},{status:500});
  }
}
