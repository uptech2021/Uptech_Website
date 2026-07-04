"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import cyberCenterPhoto from "@/public/images/cyber_center.png";
import shoppingAdDesktop from "@/public/images/shopping_ad_desktop_new.png";
import shoppingAdMobile from "@/public/images/shopping_ad_desktop_new_mobile.png";

const cyberServices = [
  ["Online Shopping Assistance", "Send product links from Amazon, SHEIN, Temu and more — we handle the order."],
  ["Printing, Photocopying & Laminating", "Documents printed, copied, laminated and bound on the spot."],
  ["Resume / CV Creation", "Cleanly formatted resumes and CVs that help you stand out."],
  ["Website Development", "Modern websites built for your business or personal brand."],
  ["Graphic Design Services", "Flyers, logos and branded visuals designed to grab attention."],
  ["PC Repairs", "Diagnostics and fixes to get your computer running smoothly again."],
  ["Cyber Cafe & Study Zone", "A quiet, connected space to work, browse and study."],
  ["Computer Classes", "Hands-on lessons for beginners through advanced learners."],
  ["Email Setup & Account Assistance", "Get set up and supported on the online accounts you need."],
  ["Virtual Court Support", "Assistance attending and presenting in virtual court sessions."],
];

export default function CyberCenter() {
  useReveal();

  return (
    <>
      <Header />

      <section className="hero-aura relative overflow-hidden text-white" style={{ background: "var(--field)" }} id="top">
        <div className="relative z-[2] max-w-[1200px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1.02fr_.98fr] gap-12 items-center pt-20 pb-[84px]">
          <div className="reveal">
            <p className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">Now Open · Chaguanas</p>
            <h1 className="text-[clamp(2.3rem,4.4vw,3.7rem)] my-[18px] mb-[22px]">UpTech Business & Cyber Center</h1>
            <p className="text-[1.15rem] text-on-blue max-w-[32rem] mb-[30px] leading-[1.6]">Your local walk-in hub for online shopping assistance, printing, PC support, resume creation, study space, computer classes, and everyday digital help — with real people who guide you through every step.</p>
            <div className="flex gap-3.5 flex-wrap">
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Send Links via WhatsApp</a>
              <a href="tel:+18687104296" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-transparent text-white border-[1.5px] border-white/45 cursor-pointer transition-[transform,box-shadow,background] duration-[180ms] hover:bg-white hover:text-brand-700 hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Call 1 (868) 710-4296</a>
            </div>
          </div>
          <div className="relative flex justify-center reveal lg:order-none order-[-1] max-lg:max-w-[440px] max-lg:mx-auto">
            <div className="relative bg-white border border-line rounded-card p-3.5 shadow-card-lg max-w-[430px] mx-auto w-full">
              <span className="absolute top-[26px] right-[26px] z-[3] text-[.74rem] font-extrabold tracking-[.1em] uppercase text-accent-ink bg-accent py-[.42rem] px-[.8rem] rounded-full shadow-sm">&#x25CF; Open Now</span>
              <Image src={cyberCenterPhoto} alt="UpTech Business & Cyber Center" className="w-full rounded-[calc(22px-10px)] block" />
            </div>
          </div>
        </div>
        <svg className="block w-full h-auto -mt-px" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF"></path>
        </svg>
      </section>

      <div className="bg-navy-deep text-white text-center py-5 px-7">
        <p className="text-[1.05rem] font-semibold">One walk-in stop for <span className="text-accent">printing, ordering, repairs, study & digital help</span>.</p>
      </div>

      <section className="py-[88px] max-sm:py-[60px] bg-paper">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">Cyber Center Services</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Everything you need in one convenient place</h2>
            <p className="text-[1.075rem] text-ink-soft mt-3.5">Whether you need help ordering online, printing documents, fixing your PC, creating a resume, or using online services — we&apos;re ready to assist.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cyberServices.map((s, i) => (
              <div key={s[0]} className="flex items-start gap-4 bg-mist border border-line rounded-card-sm p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-card reveal" style={{ transitionDelay: `${i * 30}ms` }}>
                <div className="shrink-0 w-[38px] h-[38px] rounded-[11px] bg-brand text-white grid place-items-center font-black text-[.92rem]">{i + 1}</div>
                <div>
                  <h3 className="font-bold text-[1.05rem] mb-1">{s[0]}</h3>
                  <p className="text-ink-soft text-[.9rem]">{s[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[88px] max-sm:py-[60px] bg-mist">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
            <div>
              <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand block mb-3.5">Personal Online Orders</span>
              <h2 className="text-[clamp(1.7rem,2.6vw,2.3rem)] mb-4">Send us your links. We help you shop easily.</h2>
              <p className="text-ink-soft mb-[26px] text-[1.04rem]">Send product links from your favourite online stores via WhatsApp. We assist with the whole process so shopping online feels simple and stress-free.</p>
              <div className="flex gap-2.5 flex-wrap mb-[26px]">
                <span className="bg-white border border-line rounded-full py-[.4rem] px-[.9rem] font-bold text-[.85rem] text-ink-soft">Amazon</span>
                <span className="bg-white border border-line rounded-full py-[.4rem] px-[.9rem] font-bold text-[.85rem] text-ink-soft">SHEIN</span>
                <span className="bg-white border border-line rounded-full py-[.4rem] px-[.9rem] font-bold text-[.85rem] text-ink-soft">Temu</span>
                <span className="bg-white border border-line rounded-full py-[.4rem] px-[.9rem] font-bold text-[.85rem] text-ink-soft">&amp; more</span>
              </div>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-brand text-white shadow-glow-blue cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-brand-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Start an Online Order</a>
            </div>
            <div className="hidden lg:flex rounded-[18px] overflow-hidden shadow-card-lg">
              <Image src={shoppingAdDesktop} alt="Online shopping assistance" className="w-full h-auto object-cover" />
            </div>
            <div className="flex lg:hidden rounded-[18px] overflow-hidden shadow-card-lg">
              <Image src={shoppingAdMobile} alt="Online shopping assistance" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-[88px] max-sm:py-[60px] bg-navy text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="reveal">
              <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent inline-block mb-3.5">Find Us</span>
              <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Stop by — no appointment needed</h2>
              <p className="text-[1.075rem] text-on-blue mt-3.5">We&apos;re easy to reach in the heart of Chaguanas. Walk in, send a message ahead on WhatsApp, or give us a call and we&apos;ll have you sorted.</p>
              <div className="flex gap-3.5 flex-wrap mt-[26px]">
                <a href="https://maps.google.com/?q=Ramsingh's+Plaza+Chaguanas" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Get Directions</a>
                <a href="tel:+18687104296" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-transparent text-white border-[1.5px] border-white/45 cursor-pointer transition-[transform,box-shadow,background] duration-[180ms] hover:bg-white hover:text-brand-700 hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Call Us</a>
              </div>
            </div>
            <div className="bg-white/[.08] border border-white/[0.16] rounded-card p-8 backdrop-blur-sm reveal">
              <div className="w-[56px] h-[56px] rounded-2xl bg-brand text-white grid place-items-center font-black text-[1.5rem] mb-4">U</div>
              <h3 className="text-[1.4rem] mb-1.5">UpTech Business & Cyber Center</h3>
              <p className="text-on-blue leading-normal">Ramsingh&apos;s Plaza #2, opposite Mid-Center Mall, Chaguanas. Fifth store on the right, downstairs.</p>
              <div className="mt-5 mb-5">
                <div className="flex justify-between py-3 border-t border-white/[0.16] text-[.92rem]"><span className="text-on-blue">Phone / WhatsApp</span><span className="font-semibold text-white">1 (868) 710-4296</span></div>
                <div className="flex justify-between py-3 border-t border-white/[0.16] text-[.92rem]"><span className="text-on-blue">Languages</span><span className="font-semibold text-white">English / Spanish</span></div>
                <div className="flex justify-between py-3 border-t border-white/[0.16] text-[.92rem]"><span className="text-on-blue">Best for</span><span className="font-semibold text-white">Walk-in digital help</span></div>
              </div>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-brand text-white shadow-glow-blue cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-brand-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Message on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[88px] max-sm:py-[60px] bg-brand text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[760px] mx-auto text-center reveal">
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Need a hand with something digital?</h2>
            <p className="text-on-blue text-[1.1rem] mt-4 mb-[30px]">From a single print to a full website, the UpTech Cyber Center team is ready to help.</p>
            <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Chat With Us on WhatsApp</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
