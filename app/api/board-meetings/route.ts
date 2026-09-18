import { NextRequest,NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";
import { audit,requireRole } from "@/lib/server-auth";

type Attendance={employeeId:string;name:string;email:string;status:""|"Present"|"Absent";reason:string};
const clean=(value:unknown,max=500)=>String(value||"").trim().slice(0,max);
const datePattern=/^\d{4}-\d{2}-\d{2}$/;
const serialize=(doc:FirebaseFirestore.QueryDocumentSnapshot)=>{const data=doc.data();return {id:doc.id,...data,createdAt:data.createdAt?.toDate?.()?.toISOString(),updatedAt:data.updatedAt?.toDate?.()?.toISOString()}};

export async function GET(){
  const admin=await requireRole(["super_admin"]);if(!admin)return NextResponse.json({message:"Forbidden"},{status:403});
  const [meetingSnap,staffSnap]=await Promise.all([
    adminFirestore.collection("boardMeetings").orderBy("meetingDate","desc").limit(100).get(),
    adminFirestore.collection("staffProfiles").orderBy("firstName").limit(250).get()
  ]);
  const staff=staffSnap.docs.map(doc=>{const value=doc.data();return {id:doc.id,name:`${value.firstName||""} ${value.lastName||""}`.trim()||value.email,email:value.email||"",employmentStatus:value.employmentStatus||""}}).filter(item=>String(item.employmentStatus).toLowerCase()!=="terminated");
  return NextResponse.json({meetings:meetingSnap.docs.map(serialize),staff},{headers:{"Cache-Control":"private, no-store, max-age=0"}});
}

export async function POST(request:NextRequest){
  const admin=await requireRole(["super_admin"]);if(!admin)return NextResponse.json({message:"Forbidden"},{status:403});
  const body=await request.json(),meetingDate=clean(body.meetingDate,10),title=clean(body.title,120)||"Board meeting";
  if(!datePattern.test(meetingDate))return NextResponse.json({message:"Choose a valid meeting date."},{status:400});
  const existing=await adminFirestore.collection("boardMeetings").where("meetingDate","==",meetingDate).where("title","==",title).limit(1).get();
  if(!existing.empty)return NextResponse.json({message:"A meeting with this title and date already exists."},{status:409});
  const staffSnap=await adminFirestore.collection("staffProfiles").limit(250).get();
  const attendance:Attendance[]=staffSnap.docs.map(doc=>{const value=doc.data();return {employeeId:doc.id,name:`${value.firstName||""} ${value.lastName||""}`.trim()||value.email,email:value.email||"",status:"",reason:""}});
  const now=new Date(),reference=await adminFirestore.collection("boardMeetings").add({title,meetingDate,attendance,createdAt:now,updatedAt:now,createdBy:admin.uid});
  await audit(admin.uid,"board_meeting.created","boardMeeting",reference.id,{title,meetingDate});
  return NextResponse.json({id:reference.id},{status:201});
}

export async function PATCH(request:NextRequest){
  const admin=await requireRole(["super_admin"]);if(!admin)return NextResponse.json({message:"Forbidden"},{status:403});
  const body=await request.json(),id=clean(body.id,100),rows=Array.isArray(body.attendance)?body.attendance:[];
  if(!id||!rows.length)return NextResponse.json({message:"Meeting attendance is required."},{status:400});
  const attendance:Attendance[]=rows.map((row:Record<string,unknown>)=>({employeeId:clean(row.employeeId,100),name:clean(row.name,150),email:clean(row.email,200),status:row.status==="Present"||row.status==="Absent"?row.status:"",reason:clean(row.reason,500)}));
  const invalid=attendance.find(row=>!row.employeeId||!row.status||(row.status==="Absent"&&!row.reason));
  if(invalid)return NextResponse.json({message:invalid.status==="Absent"?`Enter an absence reason for ${invalid.name}.`:`Select Present or Absent for ${invalid.name}.`},{status:400});
  const reference=adminFirestore.collection("boardMeetings").doc(id);if(!(await reference.get()).exists)return NextResponse.json({message:"Meeting not found."},{status:404});
  await reference.update({attendance,updatedAt:new Date(),updatedBy:admin.uid});
  await audit(admin.uid,"board_meeting.attendance_updated","boardMeeting",id,{attendeeCount:attendance.length});
  return NextResponse.json({success:true});
}
