import { cookies } from "next/headers";
import { adminAuth, adminFirestore } from "@/lib/firebase-admin";

export const SESSION_COOKIE = "uptech_session";
export const SUPER_ADMIN_EMAIL = "uptechincorp@gmail.com";

export type AppRole = "super_admin" | "staff" | "hr";
export type SessionUser = { uid: string; email: string; role: AppRole; mustChangePassword: boolean };

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const value = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!value) return null;
    const decoded = await adminAuth.verifySessionCookie(value, true);
    const snap = await adminFirestore.collection("users").doc(decoded.uid).get();
    const data = snap.data() || {};
    const email = (decoded.email || "").toLowerCase();
    const role: AppRole | null = email === SUPER_ADMIN_EMAIL || data.role === "super_admin" || data.isAdmin
      ? "super_admin" : data.role === "hr" ? "hr" : data.role === "staff" ? "staff" : null;
    if (!role || data.accountStatus === "disabled") return null;
    return { uid: decoded.uid, email, role, mustChangePassword: Boolean(data.mustChangePassword) };
  } catch { return null; }
}

export function isHR(user: SessionUser | null): user is SessionUser {
  return Boolean(user && user.role === "hr");
}

export async function requireRole(allowed: AppRole[]) {
  const user = await getSessionUser();
  if (!user) return null;
  // The super administrator retains its own role while inheriting HR capabilities.
  return allowed.includes(user.role) || (user.role === "super_admin" && allowed.includes("hr")) ? user : null;
}

export async function audit(adminUid: string, action: string, targetType: string, targetId: string, details?: object) {
  await adminFirestore.collection("auditLogs").add({ adminUid, action, targetType, targetId, details: details || null, createdAt: new Date() });
}
