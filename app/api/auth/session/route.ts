import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebase-admin";
import { SESSION_COOKIE, SUPER_ADMIN_EMAIL } from "@/lib/server-auth";

export async function POST(req: NextRequest) {
  let decoded;
  try {
    const { token } = await req.json();
    if (typeof token !== "string" || !token) {
      return NextResponse.json({ message: "No sign-in token was received. Refresh the page and try again." }, { status: 400 });
    }
    try {
      decoded = await adminAuth.verifyIdToken(token);
    } catch (error) {
      console.error("Firebase ID token verification failed:", error instanceof Error ? error.message : "Unknown verification error");
      return NextResponse.json({ message: "Your sign-in token could not be verified. Refresh the page and sign in again." }, { status: 401 });
    }
    const email = (decoded.email || "").toLowerCase();
    const ref = adminFirestore.collection("users").doc(decoded.uid);
    const snap = await ref.get();
    if (email === SUPER_ADMIN_EMAIL) {
      await ref.set({
        email,
        role: "super_admin",
        isAdmin: true,
        accountStatus: "active",
        ...(snap.exists ? {} : { createdAt: new Date() }),
        updatedAt: new Date(),
      }, { merge: true });
    }
    const profile = (await ref.get()).data();
    if (!profile || profile.accountStatus === "disabled") return NextResponse.json({ message: "This account is not authorized." }, { status: 403 });
    const session = await adminAuth.createSessionCookie(token, { expiresIn: 1000 * 60 * 60 * 24 * 5 });
    const response = NextResponse.json({ role: email === SUPER_ADMIN_EMAIL || profile.role === "super_admin" || profile.isAdmin ? "super_admin" : "staff", mustChangePassword: Boolean(profile.mustChangePassword) });
    response.cookies.set(SESSION_COOKIE, session, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24 * 5, path: "/" });
    return response;
  } catch (error) {
    console.error("Admin session creation failed:", error instanceof Error ? error.message : "Unknown session error");
    return NextResponse.json({ message: "Firebase accepted your login, but the local server could not start your admin session. Please restart the development server and try again." }, { status: 503 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, maxAge: 0, path: "/" });
  return response;
}
