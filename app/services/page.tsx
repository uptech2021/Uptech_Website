"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

import graphicServicesImg from "@/public/images/graphicservices.svg";
import marketingImg from "@/public/images/marketing.svg";
import webAppImg from "@/public/images/webapp.svg";
import adminImg from "@/public/images/admin.svg";
import consultImg from "@/public/images/consult.svg";
import chooseImg from "@/public/images/choose.svg";
import connectImg from "@/public/images/connect.svg";
import receiveImg from "@/public/images/receive.svg";

const services = [
  { t: "Graphic Design", d: "We create visually stunning designs that capture attention and communicate your brand message clearly.", img: graphicServicesImg },
  { t: "Marketing & Sales", d: "We create marketing content designed to increase reach, attract leads, and support business growth.", img: marketingImg },
  { t: "Web / App Development", d: "We help businesses build modern websites and apps that create smooth digital experiences.", img: webAppImg },
  { t: "Administrative Services", d: "We provide reliable business support including data entry, customer support, and virtual assistance.", img: adminImg },
];

const steps = [
  { t: "Consult", d: "Tell us what you need and we'll point you the right way.", img: consultImg },
  { t: "Choose", d: "Pick the service or package that fits your goals.", img: chooseImg },
  { t: "Connect", d: "We get to work and keep you in the loop throughout.", img: connectImg },
  { t: "Receive", d: "Get your finished result, ready to put to use.", img: receiveImg },
];

export default function Services() {
  useReveal();

  return (
    <>
      <Header />

      <section className="hero-aura relative overflow-hidden text-white" style={{ background: "var(--field)" }} id="top">
        <div className="relative z-[2] max-w-[1200px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1.02fr_.98fr] gap-12 items-center pt-20 pb-[84px]">
          <div className="reveal">
            <p className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">Our Services</p>
            <h1 className="text-[clamp(2.3rem,4.4vw,3.7rem)] my-[18px] mb-[22px]">More than a digital agency — your partner in growth.</h1>
            <p className="text-[1.15rem] text-on-blue max-w-[32rem] mb-[30px] leading-[1.6]">From branding and marketing to websites, apps, and reliable administrative support, UpTech gives individuals and businesses the practical digital help they need to move forward.</p>
            <div className="flex gap-3.5 flex-wrap">
              <Link href="/contact" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Start a Project</Link>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-transparent text-white border-[1.5px] border-white/45 cursor-pointer transition-[transform,box-shadow,background] duration-[180ms] hover:bg-white hover:text-brand-700 hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">WhatsApp Us</a>
            </div>
          </div>
          <div className="relative flex justify-center reveal lg:order-none order-[-1] max-lg:max-w-[440px] max-lg:mx-auto">
            <Image src={webAppImg} alt="UpTech services" width={480} height={480} className="w-full max-w-[480px] animate-float" style={{ height: "auto" }} />
          </div>
        </div>
        <svg className="block w-full h-auto -mt-px" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF"></path>
        </svg>
      </section>

      <div className="bg-navy-deep text-white text-center py-5 px-7">
        <p className="text-[1.05rem] font-semibold">We&apos;re your <span className="text-accent">strategic partner in growth</span> — here&apos;s how we help.</p>
      </div>

      <section className="py-[88px] max-sm:py-[60px] bg-paper">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">What We Do</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Here&apos;s how we help businesses like yours</h2>
            <p className="text-[1.075rem] text-ink-soft mt-3.5">Four core services, built around one goal: freeing up your time so you can focus on what matters most.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {services.map((s, i) => (
              <div key={s.t} className="bg-paper border border-line rounded-card pt-[26px] px-6 pb-0 flex flex-col transition-[transform,box-shadow,border-color] duration-[220ms] overflow-hidden hover:-translate-y-1.5 hover:shadow-card hover:border-transparent reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="text-[.78rem] font-extrabold text-brand tracking-[.1em] mb-3">0{i + 1}</div>
                <h3 className="text-[1.18rem] mb-2.5">{s.t}</h3>
                <p className="text-ink-soft text-[.95rem] flex-1 mb-[18px]">{s.d}</p>
                <div className="mx-[-24px] bg-mist border-t border-line p-[18px]">
                  <Image src={s.img} alt={s.t} width={200} height={118} className="w-full h-[118px] object-contain" style={{ width: "auto", height: "auto" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[88px] max-sm:py-[60px] bg-navy text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">How It Works</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Four easy steps to your solution</h2>
            <p className="text-[1.075rem] text-on-blue mt-3.5">A simple, transparent process from first conversation to finished result.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {steps.map((s, i) => (
              <div key={s.t} className="bg-white/[.08] border border-white/[0.16] rounded-card p-[26px] relative transition-[transform,background] duration-[220ms] hover:-translate-y-1.5 hover:bg-white/[.14] reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="absolute top-[22px] right-6 text-[2.4rem] font-black text-white/[0.16] leading-none">{i + 1}</span>
                <div className="w-[88px] h-[88px] rounded-[18px] bg-white grid place-items-center mb-5 p-3.5">
                  <Image src={s.img} alt={s.t} width={60} height={60} className="w-full h-full object-contain" style={{ width: "auto", height: "auto" }} />
                </div>
                <h3 className="text-[1.2rem] mb-2">{s.t}</h3>
                <p className="text-on-blue text-[.92rem]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[88px] max-sm:py-[60px] bg-brand text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[760px] mx-auto text-center reveal">
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Ready to take the leap?</h2>
            <p className="text-on-blue text-[1.1rem] mt-4 mb-[30px]">Tell us what you&apos;re working on and we&apos;ll help you find the right solution.</p>
            <div className="flex gap-3.5 flex-wrap justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Contact Us</Link>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-transparent text-white border-[1.5px] border-white/45 cursor-pointer transition-[transform,box-shadow,background] duration-[180ms] hover:bg-white hover:text-brand-700 hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
