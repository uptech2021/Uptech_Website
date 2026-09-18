import { NextRequest,NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";
import { requireRole } from "@/lib/server-auth";
import { daysInclusive,serializeDoc,text } from "@/lib/hr";
import { HR_REQUEST_TYPES,LEAVE_TYPES } from "@/types/hr";

export async function GET(){
  const user=await requireRole(["staff","hr","super_admin"]); if(!user)return NextResponse.json({message:"Forbidden"},{status:403});
  if(user.role==="super_admin")user.role="hr";
  const [profile,requests,leave,policies,announcements,documents,notifications,announcementReads]=await Promise.all([
    adminFirestore.collection("staffProfiles").doc(user.uid).get(),
    adminFirestore.collection("hrRequests").where("employeeId","==",user.uid).limit(100).get(),
    adminFirestore.collection("leaveRequests").where("employeeId","==",user.uid).limit(100).get(),
    adminFirestore.collection("hrPolicies").where("active","==",true).limit(100).get(),
    adminFirestore.collection("staffAnnouncements").where("published","==",true).limit(100).get(),
    adminFirestore.collection("hrDocuments").where("active","==",true).limit(100).get(),
    adminFirestore.collection("staffNotifications").where("employeeId","==",user.uid).limit(30).get(),
    adminFirestore.collection("users").doc(user.uid).collection("announcementReads").limit(250).get()
  ]);
  const byRecent=(a:any,b:any)=>String(b.updatedAt||b.createdAt||b.publishDate||"").localeCompare(String(a.updatedAt||a.createdAt||a.publishDate||""));
  const readIds=new Set(announcementReads.docs.map(x=>x.id));
  const hasCurrentAcknowledgement=(acknowledgement:FirebaseFirestore.DocumentSnapshot,revision:unknown)=>{
    if(!acknowledgement.exists)return false;
    const acknowledgedRevision=acknowledgement.data()?.revision;
    // Acknowledgements created before revision tracking are still valid. Once a
    // record has a revision, it must match so materially updated items reappear.
    return !revision||!acknowledgedRevision||acknowledgedRevision===revision;
  };
  const policyItems=await Promise.all(policies.docs.map(async doc=>{const acknowledgement=await doc.ref.collection("acknowledgements").doc(user.uid).get(),revision=doc.data().requiredRevision;return {...serializeDoc(doc),acknowledged:hasCurrentAcknowledgement(acknowledgement,revision)}})),documentItems=await Promise.all(documents.docs.map(async doc=>{const acknowledgement=await doc.ref.collection("acknowledgements").doc(user.uid).get(),revision=doc.data().requiredRevision;return {...serializeDoc(doc),acknowledged:hasCurrentAcknowledgement(acknowledgement,revision)}}));
  return NextResponse.json({isHR:user.role==="hr",profile:profile.exists?serializeDoc(profile):null,requests:requests.docs.map(serializeDoc).sort(byRecent),leaveRequests:leave.docs.map(serializeDoc).sort(byRecent),policies:policyItems.sort(byRecent),announcements:announcements.docs.map(serializeDoc).map((x:any)=>({...x,read:readIds.has(x.id)})).sort((a:any,b:any)=>Number(b.pinned)-Number(a.pinned)||byRecent(a,b)),documents:documentItems.filter((x:any)=>x.audience==="all_staff").sort(byRecent),notifications:notifications.docs.map(serializeDoc).sort(byRecent)},{headers:{"Cache-Control":"private, no-store, max-age=0"}});
}

export async function POST(req:NextRequest){
  const user=await requireRole(["staff","hr","super_admin"]); if(!user)return NextResponse.json({message:"Forbidden"},{status:403});
  const body=await req.json(),action=body.action,now=new Date();
  const profile=(await adminFirestore.collection("staffProfiles").doc(user.uid).get()).data()||{};
  const employeeName=`${profile.firstName||""} ${profile.lastName||""}`.trim()||user.email;
  if(action==="request"){
    if(!HR_REQUEST_TYPES.includes(body.requestType)||!text(body.subject,150)||!text(body.description))return NextResponse.json({message:"Complete all required request fields."},{status:400});
    const ref=await adminFirestore.collection("hrRequests").add({employeeId:user.uid,employeeName,employeeEmail:user.email,requestType:body.requestType,subject:text(body.subject,150),description:text(body.description),attachment:body.attachment||null,status:"Pending",employeeResponse:"",internalNotes:"",createdAt:now,updatedAt:now});
    return NextResponse.json({id:ref.id},{status:201});
  }
  if(action==="leave"){
    const duration=daysInclusive(body.startDate,body.endDate);
    if(!LEAVE_TYPES.includes(body.leaveType)||!duration||!text(body.reason))return NextResponse.json({message:"Enter a valid leave type, date range, and reason."},{status:400});
    const ref=await adminFirestore.collection("leaveRequests").add({employeeId:user.uid,employeeName,employeeEmail:user.email,leaveType:body.leaveType,startDate:body.startDate,endDate:body.endDate,duration,reason:text(body.reason),attachment:body.attachment||null,status:"Pending",hrNotes:"",createdAt:now,updatedAt:now});
    return NextResponse.json({id:ref.id},{status:201});
  }
  if(action==="acknowledge"){
    const policyId=text(body.policyId,100); if(!policyId)return NextResponse.json({message:"Policy is required."},{status:400});
    const policy=await adminFirestore.collection("hrPolicies").doc(policyId).get();if(!policy.exists||policy.data()?.active!==true)return NextResponse.json({message:"Policy not found."},{status:404});
    await policy.ref.collection("acknowledgements").doc(user.uid).set({employeeId:user.uid,employeeName,revision:policy.data()?.requiredRevision||null,acknowledgedAt:now});
    return NextResponse.json({success:true});
  }
  if(action==="acknowledgeDocument"){
    const documentId=text(body.documentId,100);if(!documentId)return NextResponse.json({message:"Document is required."},{status:400});
    const document=await adminFirestore.collection("hrDocuments").doc(documentId).get();if(!document.exists||document.data()?.active!==true)return NextResponse.json({message:"Document not found."},{status:404});
    await document.ref.collection("acknowledgements").doc(user.uid).set({employeeId:user.uid,employeeName,revision:document.data()?.requiredRevision||null,acknowledgedAt:now});return NextResponse.json({success:true});
  }
  if(action==="readAnnouncement"){
    const announcementId=text(body.announcementId,100);if(!announcementId)return NextResponse.json({message:"Announcement is required."},{status:400});
    const announcement=await adminFirestore.collection("staffAnnouncements").doc(announcementId).get();if(!announcement.exists||announcement.data()?.published!==true)return NextResponse.json({message:"Announcement not found."},{status:404});
    await adminFirestore.collection("users").doc(user.uid).collection("announcementReads").doc(announcementId).set({readAt:now});
    return NextResponse.json({success:true});
  }
  if(action==="readNotification"){
    const notificationId=text(body.notificationId,100),ref=adminFirestore.collection("staffNotifications").doc(notificationId),snap=await ref.get();
    if(!snap.exists||snap.data()?.employeeId!==user.uid)return NextResponse.json({message:"Notification not found."},{status:404});
    await ref.update({read:true,readAt:now});return NextResponse.json({success:true});
  }
  return NextResponse.json({message:"Unsupported action."},{status:400});
}
