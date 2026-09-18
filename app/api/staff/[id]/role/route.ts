import { NextRequest, NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";
import { audit, requireRole } from "@/lib/server-auth";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const administrator = await requireRole(["super_admin"]);
    if (!administrator) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const { id } = await params;
    const body = await request.json();
    const role = body.role;
    if (!["staff", "hr"].includes(role)) {
      return NextResponse.json({ message: "Role must be staff or HR." }, { status: 400 });
    }

    const reference = adminFirestore.collection("users").doc(id);
    const snapshot = await reference.get();
    if (!snapshot.exists) return NextResponse.json({ message: "Account not found." }, { status: 404 });

    const account = snapshot.data() || {};
    if (account.role === "super_admin" || account.isAdmin === true) {
      return NextResponse.json({ message: "The super administrator role cannot be changed here." }, { status: 400 });
    }

    await reference.update({ role, updatedAt: new Date(), roleUpdatedBy: administrator.uid });
    // The permission change should still succeed if audit logging is temporarily unavailable.
    await audit(administrator.uid, "staff.role_updated", "staff", id, { role }).catch(console.error);
    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error("Unable to update HR access", error);
    return NextResponse.json({ message: "HR access could not be updated. Please try again." }, { status: 500 });
  }
}
