"use client";

import PortalGuard from "@/components/PortalGuard";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function AdminShell({children}:{children:React.ReactNode}){
  const path=usePathname(),router=useRouter();
  async function logout(){await fetch("/api/auth/session",{method:"DELETE"});await signOut(auth);router.push("/admin/login")}
  const item=(href:string,label:string,active:boolean)=><Link href={href} className={`px-3 py-2 rounded-full font-bold text-sm ${active?"bg-white text-navy":"text-on-blue"}`}>{label}</Link>;
  return <PortalGuard role="super_admin"><div className="min-h-screen bg-mist"><header className="bg-navy-deep text-white sticky top-0 z-40"><div className="max-w-[1200px] mx-auto min-h-20 px-4 sm:px-7 flex flex-wrap items-center justify-between gap-3 py-3"><Link href="/admin/dashboard"><span className="text-xs text-on-blue uppercase tracking-widest font-bold">UpTech</span><strong className="block text-lg">Administration</strong></Link><nav className="flex items-center gap-1 overflow-x-auto max-w-full">{item("/admin/dashboard","Overview",path==="/admin/dashboard")}{item("/admin/resources","Resources",path.includes("resources"))}{item("/admin/staff","Equity",path.includes("staff"))}{item("/admin/meetings","Meetings",path.includes("meetings"))}{item("/admin/hr","HR",path.includes("/admin/hr"))}{item("/admin/access","Access",path.includes("access"))}<button onClick={logout} className="px-3 py-2 text-sm font-bold text-on-blue">Sign out</button></nav></div></header>{children}</div></PortalGuard>;
}
