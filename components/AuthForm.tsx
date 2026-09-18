"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye,EyeOff } from "lucide-react";
import { readApiJson } from "@/lib/api-response";

export default function AuthForm({staff=false}:{staff?:boolean}){
  const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[message,setMessage]=useState(""),[busy,setBusy]=useState(false),[reset,setReset]=useState(false),[showPassword,setShowPassword]=useState(false);
  const router=useRouter();
  async function submit(event:React.FormEvent){
    event.preventDefault();setBusy(true);setMessage("");
    try{
      if(reset){
        await fetch("/api/auth/password-reset",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email})}).catch(()=>undefined);
        setMessage("If this email is registered, a secure reset link has been sent.");
        return;
      }
      await fetch("/api/auth/session",{method:"DELETE"});
      const credential=await signInWithEmailAndPassword(auth,email,password),token=await credential.user.getIdToken(true);
      const response=await fetch("/api/auth/session",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({token})});
      const data=await readApiJson<{message?:string;role?:string;mustChangePassword?:boolean}>(response);
      if(!response.ok)throw new Error(data.message||"Your server session could not be started.");
      if(staff&&!['staff','hr'].includes(data.role)){await fetch("/api/auth/session",{method:"DELETE"});throw new Error("This login is for member accounts. Use the shared portal login instead.")}
      router.push(['staff','hr'].includes(data.role)?(data.mustChangePassword?"/staff/change-password":"/staff/dashboard"):"/admin/dashboard");
    }catch(error:unknown){setMessage(error instanceof Error?error.message:"We could not complete that request. Check your details and try again.")}
    finally{setBusy(false)}
  }
  return <div className="w-full max-w-md bg-white rounded-card shadow-card border border-line p-7 sm:p-10"><h1 className="text-3xl">{reset?"Reset password":staff?"Member Portal":"UpTech Portal Login"}</h1><p className="text-ink-soft mt-2">{reset?"Enter your registered email address.":staff?"Sign in to your member portal securely.":"Sign in securely to continue. Your account access is detected automatically."}</p><form onSubmit={submit} className="space-y-5 mt-7"><label className="block text-sm font-bold">Email address<input type="email" required value={email} onChange={event=>setEmail(event.target.value)} className="mt-2 w-full rounded-card-sm border border-line bg-mist px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30"/></label>{!reset&&<label className="block text-sm font-bold">Password<span className="relative block mt-2"><input type={showPassword?"text":"password"} required value={password} onChange={event=>setPassword(event.target.value)} className="w-full rounded-card-sm border border-line bg-mist px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-brand/30"/><button type="button" onClick={()=>setShowPassword(value=>!value)} aria-label={showPassword?"Hide password":"Show password"} aria-pressed={showPassword} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-ink-soft hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand/40">{showPassword?<EyeOff className="w-5 h-5"/>:<Eye className="w-5 h-5"/>}</button></span></label>}<button disabled={busy} className="w-full min-h-12 rounded-full bg-brand text-white font-extrabold disabled:opacity-50">{busy?"Please wait…":reset?"Send reset link":"Sign in"}</button></form>{message&&<p role="alert" className="mt-5 text-sm rounded-card-sm bg-mist p-3">{message}</p>}<button onClick={()=>{setReset(!reset);setMessage("");setShowPassword(false)}} className="mt-5 text-brand-700 font-bold text-sm">{reset?"Back to sign in":"Forgot Password?"}</button>{staff&&<p className="mt-6 text-sm text-ink-soft"><Link href="/" className="font-bold text-brand-700">Return to website</Link></p>}</div>;
}
