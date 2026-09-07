import { NextRequest, NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";
import { requireRole, audit } from "@/lib/server-auth";

function clean(doc: FirebaseFirestore.QueryDocumentSnapshot) {
  const d = doc.data();
  return { id: doc.id, ...d, createdAt: d.createdAt?.toDate?.()?.toISOString(), updatedAt: d.updatedAt?.toDate?.()?.toISOString() };
}
export async function GET(req: NextRequest) {
  const admin = req.nextUrl.searchParams.get("admin") === "1";
  if (admin && !await requireRole(["super_admin"])) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  let query: FirebaseFirestore.Query = adminFirestore.collection("publicResources");
  if (!admin) query = query.where("published", "==", true);
  const snap = await query.limit(200).get();
  const now = new Date().toISOString().slice(0, 10);
  const resources = snap.docs.map(clean).filter((r: any) => admin || r.kind !== "notice" || ((!r.startDate || r.startDate <= now) && (!r.expiryDate || r.expiryDate >= now)));
  resources.sort((a: any, b: any) => String(b.publishDate || b.date || b.createdAt).localeCompare(String(a.publishDate || a.date || a.createdAt)));
  return NextResponse.json({ resources });
}
export async function POST(req: NextRequest) {
  const user = await requireRole(["super_admin"]); if (!user) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const body = await req.json();
  if (!body.title || !["speech","document","video","gallery","notice"].includes(body.kind)) return NextResponse.json({ message: "Title and valid resource type are required." }, { status: 400 });
  const now = new Date(); const ref = await adminFirestore.collection("publicResources").add({ ...body, title: String(body.title).trim(), description: String(body.description || "").trim(), createdAt: now, updatedAt: now, createdBy: user.uid });
  await audit(user.uid, "resource.created", "publicResource", ref.id, { kind: body.kind });
  return NextResponse.json({ id: ref.id }, { status: 201 });
}
