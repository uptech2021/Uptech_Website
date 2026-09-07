import { NextRequest, NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";
import { requireRole, audit } from "@/lib/server-auth";
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(["super_admin"]); if (!user) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const { id } = await params; const body = await req.json(); delete body.id; delete body.createdAt; delete body.createdBy;
  await adminFirestore.collection("publicResources").doc(id).update({ ...body, updatedAt: new Date(), updatedBy: user.uid });
  await audit(user.uid, body.published === true ? "resource.published" : "resource.edited", "publicResource", id);
  return NextResponse.json({ success: true });
}
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(["super_admin"]); if (!user) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const { id } = await params; await adminFirestore.collection("publicResources").doc(id).delete(); await audit(user.uid, "resource.deleted", "publicResource", id);
  return NextResponse.json({ success: true });
}
