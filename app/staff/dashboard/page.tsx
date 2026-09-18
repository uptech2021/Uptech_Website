"use client";
import StaffShell from "@/components/StaffShell";
import CertificateButtons from "@/components/CertificateViewer";
import { useEffect,useState } from "react";
import { UserRound,ChartNoAxesColumnIncreasing,History } from "lucide-react";

export default function Page(){
 const [data,setData]=useState<any>();
 useEffect(()=>{fetch("/api/staff/me").then(r=>r.json()).then(setData)},[]);
 const p=data?.profile;
 return <StaffShell>
  <main className="max-w-[1100px] mx-auto px-4 sm:px-7 py-8 sm:py-12">{!p?<p>Loading your dashboard…</p>:<>
   <section className="bg-white rounded-card border border-line shadow-card p-6 sm:p-8"><div className="flex gap-4 items-center"><div className="w-14 h-14 rounded-card-sm bg-brand/10 text-brand grid place-items-center"><UserRound/></div><div><p className="text-ink-soft">Welcome back</p><h2 className="text-2xl">{p.firstName} {p.lastName}</h2></div></div><dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8"><Info k="Member ID" v={p.employeeId}/><Info k="Position" v={p.jobTitle}/><Info k="Department" v={p.department||"—"}/><Info k="Start date" v={p.startDate||"—"}/></dl></section>
   <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-6 mt-6">
    <section className="rounded-card bg-gradient-to-br from-brand to-brand-deep text-white p-7 shadow-card min-w-0"><ChartNoAxesColumnIncreasing/><div className="mt-8 min-w-0"><p className="text-on-blue font-bold">Total Equity</p><p className="text-[clamp(2rem,8vw,3rem)] font-black mt-2 break-all">{Number(p.currentEquity||0).toLocaleString()}</p></div><p className="text-on-blue mt-7 text-sm">Last updated<br/><strong className="text-white">{p.equityUpdatedAt?new Date(p.equityUpdatedAt).toLocaleDateString(undefined,{dateStyle:"long"}):"No updates yet"}</strong></p><CertificateButtons/></section>
    <section className="bg-white rounded-card border border-line shadow-card p-6"><h2 className="text-xl flex items-center gap-2"><History className="text-brand"/>Equity history</h2>{data.history?.length?<div className="mt-5 divide-y divide-line">{data.history.map((h:any)=><div key={h.id} className="py-4"><p className="font-bold text-brand-700 mb-3">{h.period||"Previous allocation"}</p><div className="grid grid-cols-2 gap-4"><div><span className="block text-xs uppercase font-bold text-ink-soft">Total equity</span><strong>{Number(h.value).toLocaleString()}</strong></div><div><span className="block text-xs uppercase font-bold text-ink-soft">Equity added</span><strong>{Number(h.equityAdded??h.value)>0?"+":""}{Number(h.equityAdded??h.value).toLocaleString()}</strong></div></div></div>)}</div>:<p className="text-ink-soft mt-5">No equity history is available yet.</p>}</section>
   </div>
  </>}</main>
 </StaffShell>
}
function Info({k,v}:{k:string;v:string}){return <div><dt className="text-xs text-ink-soft uppercase tracking-wider font-bold">{k}</dt><dd className="font-extrabold mt-1 break-words">{v}</dd></div>}
