"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalGuard({role,children}:{role:"super_admin"|"staff";children:React.ReactNode}){
  const router=useRouter();
  const [ok,setOk]=useState(false);
  useEffect(()=>{
    fetch("/api/auth/me").then(async response=>{
      if(!response.ok)throw new Error("No session");
      const user=await response.json();
      const accepted=role==="staff"?["staff","hr","super_admin"].includes(user.role):user.role===role;
      if(!accepted)throw new Error("Wrong portal");
      if(role==="staff"&&user.mustChangePassword&&location.pathname!=="/staff/change-password")return router.replace("/staff/change-password");
      setOk(true);
    }).catch(()=>router.replace(role==="staff"?"/staff/login":"/admin/login"));
  },[role,router]);
  return ok?<>{children}</>:<div className="min-h-screen grid place-items-center bg-mist text-ink-soft">Checking your account…</div>;
}
