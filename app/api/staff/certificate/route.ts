import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { requireRole } from "@/lib/server-auth";
import { adminFirestore } from "@/lib/firebase-admin";
import { certificateRecord } from "@/lib/certificate";

export const dynamic = "force-dynamic";
const headers = {"Cache-Control": "private, no-store, max-age=0", Vary: "Cookie"};
export async function GET(request: NextRequest) {
  const user = await requireRole(["staff", "super_admin"]);
  if (!user || user.mustChangePassword) return NextResponse.json({message:"Please sign in and complete your password change first."}, {status:403, headers});
  const requested = request.nextUrl.searchParams.get("staffId");
  if (user.role === "staff" && requested !== null) return NextResponse.json({message:"You can only view your own certificate."}, {status:403, headers});
  const uid = user.role === "super_admin" ? requested : user.uid;
  if (!uid || uid.includes("/") || uid.length > 128) return NextResponse.json({message:"Select a staff member."}, {status:400, headers});
  try {
    const [profile, account] = await Promise.all([
      adminFirestore.collection("staffProfiles").doc(uid).get(),
      adminFirestore.collection("users").doc(uid).get(),
    ]);
    if (!profile.exists) return NextResponse.json({message:"Staff record not found."}, {status:404, headers});
    const data = certificateRecord({...profile.data(), accountStatus:account.data()?.accountStatus}, createHash("sha256").update(uid).digest("hex").slice(0,16).toUpperCase());
    if (!data.active) return NextResponse.json({message:"This equity record is no longer active or is unavailable."}, {status:409, headers});
    return NextResponse.json({certificate:data}, {headers});
  } catch {
    return NextResponse.json({message:"The latest equity record could not be loaded. Please try again."}, {status:503, headers});
  }
}
