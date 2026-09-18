"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { flushSync } from "react-dom";
import type { CertificateRecord } from "@/lib/certificate";
import "./certificate.css";

export default function CertificateButtons({staffId}: {staffId?:string}) {
  const [mode,setMode] = useState<"view"|"print"|null>(null);
  return <><div className="flex flex-wrap gap-2 mt-4"><button type="button" className="rounded-full bg-white text-navy border border-line px-4 py-3 text-sm font-bold" onClick={()=>setMode("view")}>{staffId?"Preview Unofficial Certificate":"View Certificate"}</button>{!staffId&&<button type="button" className="rounded-full bg-white text-navy border border-line px-4 py-3 text-sm font-bold" onClick={()=>setMode("print")}>Print Certificate</button>}</div>{mode&&<Viewer staffId={staffId} autoPrint={mode==="print"} close={()=>setMode(null)}/>}</>;
}

function date(value:string|null) {return value?new Date(value).toLocaleDateString("en-US",{dateStyle:"long",timeZone:"UTC"}):"Not recorded"}

function CertificateDate({value,label}:{value:string|null;label:string}) {
  if(!value)return <span aria-label={label}>{label}: Not recorded</span>;
  const day=new Date(value);
  return <span className="certificate-date-parts" aria-label={`${label}: ${date(value)}`}>
    <span>Day <span className="certificate-date-value">{day.getUTCDate()}</span></span>
    <span>Month <span className="certificate-date-value">{day.toLocaleDateString("en-US",{month:"long",timeZone:"UTC"})}</span></span>
    <span>Year <span className="certificate-date-value">{day.getUTCFullYear()}</span></span>
  </span>;
}

function Viewer({staffId,autoPrint,close}:{staffId?:string;autoPrint:boolean;close:()=>void}) {
  const [record,setRecord] = useState<CertificateRecord>();
  const [error,setError] = useState("");
  const [downloading,setDownloading] = useState(false);
  const [downloadError,setDownloadError] = useState("");
  const [scale,setScale] = useState(1);
  const [zoom,setZoom] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  async function downloadPdf() {
    if(downloading)return;
    setDownloading(true);setDownloadError("");
    try {
      // Recheck authorization and current allocation at download time.
      const response=await fetch(`/api/staff/certificate${staffId?`?staffId=${encodeURIComponent(staffId)}`:""}`,{cache:"no-store"});
      const data=await response.json();
      if(!response.ok){setRecord(undefined);setError(data.message||"Certificate unavailable.");return}
      flushSync(()=>setRecord(data.certificate));
      const certificate=dialog.current?.querySelector<HTMLElement>(".certificate-document");
      if(!certificate)throw new Error("Please reopen the certificate and try again.");
      await document.fonts.ready;
      await Promise.all(Array.from(certificate.querySelectorAll("img")).map(img=>img.decode()));
      const [{toPng},{jsPDF}]=await Promise.all([import("html-to-image"),import("jspdf")]);
      const png=await toPng(certificate,{width:816,height:1056,pixelRatio:2,backgroundColor:"#ffffff",style:{transform:"none",zoom:"1",boxShadow:"none",margin:"0"}});
      const pdf=new jsPDF({orientation:"portrait",unit:"pt",format:"letter",compress:true});
      pdf.setProperties({title:"UpTech Unofficial Shareholder Certificate",subject:"FOR INFORMATIONAL PURPOSES ONLY"});
      pdf.addImage(png,"PNG",0,0,612,792,undefined,"FAST");
      pdf.save(`UpTech-${data.certificate.reference}.pdf`);
    } catch {
      setDownloadError("The PDF could not be downloaded. Please try again, or use Print and select Save as PDF.");
    } finally {setDownloading(false)}
  }
  useEffect(()=>{
    const controller=new AbortController();
    fetch(`/api/staff/certificate${staffId?`?staffId=${encodeURIComponent(staffId)}`:""}`,{cache:"no-store",signal:controller.signal}).then(async response=>{const data=await response.json();if(!response.ok)throw new Error(data.message||"Certificate unavailable.");setRecord(data.certificate)}).catch(e=>{if(e.name!=="AbortError")setError(e.message)});
    return ()=>controller.abort();
  },[staffId]);
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement|null;
    const overflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    document.body.classList.add("certificate-open");
    closeButton.current?.focus();
    return ()=>{document.body.style.overflow=overflow;document.body.classList.remove("certificate-open");previous?.focus()};
  },[]);
  useEffect(()=>{
    if(!viewport.current)return;
    const observer=new ResizeObserver(entries=>setScale(Math.min(1,(entries[0].contentRect.width-24)/816)));
    observer.observe(viewport.current);
    return ()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!record||!autoPrint)return;
    let cancelled=false;
    Promise.all([document.fonts.ready,...Array.from(dialog.current?.querySelectorAll("img")||[]).map(img=>img.decode().catch(()=>{}))]).then(()=>{if(!cancelled)window.print()});
    return ()=>{cancelled=true};
  },[record,autoPrint]);
  return createPortal(<div ref={dialog} className="certificate-overlay" role="dialog" aria-modal="true" aria-labelledby="certificate-title" onKeyDown={event=>{
    if(event.key==="Escape")close();
    if(event.key==="Tab") {const buttons=Array.from(dialog.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")||[]);const first=buttons[0],last=buttons.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}}
  }}>
    <div className="certificate-toolbar"><h2 id="certificate-title">Unofficial certificate</h2><div><button disabled={!record||downloading} onClick={downloadPdf}>{downloading?"Downloading…":"Download PDF"}</button><button disabled={!record||downloading} onClick={()=>window.print()}>Print</button><button aria-label="Zoom out" disabled={zoom===1} onClick={()=>setZoom(Math.max(1,zoom-.25))}>−</button><button aria-label="Zoom in" disabled={zoom===2} onClick={()=>setZoom(Math.min(2,zoom+.25))}>+</button><button ref={closeButton} onClick={close}>Close</button></div>{downloadError&&<p role="alert">{downloadError}</p>}</div>
    <div ref={viewport} className="certificate-viewport">
      {error?<p role="alert" className="certificate-message">{error}</p>:!record?<p role="status" className="certificate-message">Loading your latest equity record…</p>:<div className="certificate-size" style={{width:816*scale*zoom,height:1056*scale*zoom}}><article className="certificate-document" style={{transform:`scale(${scale*zoom})`}}>
        <div className="certificate-watermarks" aria-hidden="true">{[0,1,2].map(i=><div key={i}><strong>UNOFFICIAL</strong><span>FOR INFORMATIONAL PURPOSES ONLY</span></div>)}</div>
        <header><img src="/certificate-letterhead.jpg" alt="UpTech Incorporated Ltd., USDC, and Ourlime letterhead from the Office of the Director of Administration"/><p>Registered in Trinidad and Tobago, Company No. C2014103003079</p></header>
        <div className="certificate-reference">Unofficial Reference: <span>{record.reference}</span>{record.holdingValue.endsWith("Ordinary Shares")&&<> &nbsp; Class: ORDINARY</>}</div>
        <div className={`certificate-body${record.name.length>80||(record.address?.length||0)>120?" certificate-body-compact":""}`}>
          <p className="certificate-intro">This document reflects that, according to the current records<br/>available in the UpTech Member Portal:</p>
          <div className="certificate-line">Name <strong className="certificate-name">{record.name}</strong></div>
          <div className="certificate-line">Of Address <span className="certificate-address">{record.address||"Address on Company Record"}</span></div>
          <div className="certificate-line certificate-holdings">{record.holdingLabel}: <strong>{record.holdingValue}</strong></div>
          <p>in Uptech Incorporated Ltd LLC, according to the company’s portal records,</p>
          <p>for the period</p>
          <div className="certificate-date-range"><CertificateDate value={record.startDate} label="Start date"/><span>to</span><CertificateDate value={record.updatedAt} label="Last date updated"/></div>
        </div>
        <footer><div className="certificate-disclaimer"><strong>UNOFFICIAL COPY - FOR INFORMATIONAL PURPOSES ONLY</strong><p>This document reflects the equity information currently recorded in the UpTech member portal and is not an officially issued share certificate.</p><p>No official certificate or signature is issued by this portal view.</p></div><small>Registered office: #6 Kowlessar Street, Dalloo Road, Gasparillo, Trinidad &amp; Tobago, W.I.</small></footer>
      </article></div>}
    </div>
  </div>,document.body);
}
