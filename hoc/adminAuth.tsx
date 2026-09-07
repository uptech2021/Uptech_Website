"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AdminSession = { role?: string };

export default function adminAuth(WrappedComponent: React.ComponentType) {
  function AdminProtectedRoute(props: Record<string, unknown>) {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      let active = true;
      fetch("/api/auth/me", { cache: "no-store" })
        .then(async (response) => {
          if (!response.ok) throw new Error("Unauthorized");
          return response.json() as Promise<AdminSession>;
        })
        .then((session) => {
          if (!active) return;
          if (session.role === "super_admin") setAuthorized(true);
          else router.replace("/admin/login");
        })
        .catch(() => {
          if (active) router.replace("/admin/login");
        });

      return () => { active = false; };
    }, [router]);

    if (!authorized) {
      return <div className="min-h-screen grid place-items-center bg-mist text-ink-soft">Checking administrator access…</div>;
    }

    return <WrappedComponent {...props} />;
  }

  AdminProtectedRoute.displayName = `AdminAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return AdminProtectedRoute;
}
