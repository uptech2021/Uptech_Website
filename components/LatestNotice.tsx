"use client";
import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { PublicResource } from "@/types/portal";

export default function LatestNotice(){
  const [notice,setNotice]=useState<PublicResource|null>(null);
  useEffect(()=>{fetch("/api/resources").then(r=>r.ok?r.json():null).then(d=>{const n=(d?.resources||[]).filter((x:PublicResource)=>x.kind==="notice");setNotice(n[0]||null)}).catch(()=>{});},[]);
  if(!notice)return null;
  return <section className="bg-mist py-8" aria-label="Latest notice"><div className="max-w-[1200px] mx-auto px-7"><div className="rounded-card border border-line bg-white shadow-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5"><div className="w-12 h-12 rounded-2xl bg-accent/30 text-brand grid place-items-center shrink-0"><Bell className="w-6 h-6"/></div><div className="min-w-0 flex-1"><p className="text-xs uppercase tracking-[.14em] font-extrabold text-brand-700">Latest notice</p><h2 className="text-xl mt-1 break-words">{notice.title}</h2><p className="text-ink-soft mt-1 line-clamp-2">{notice.description}</p>{(notice.date||notice.publishDate)&&<p className="text-xs text-ink-soft mt-2">{notice.date||notice.publishDate}</p>}</div><Link href="/resources#notices" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-5 py-3 font-bold shrink-0">View older notices <ArrowRight className="w-4 h-4"/></Link></div></div></section>;
}
