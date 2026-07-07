"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import newBgImg from "@/public/images/newbg.svg";
import cyberCenterImg from "@/public/images/cyber_center.png";
import shoppingAdDesktopImg from "@/public/images/shopping_ad_desktop_new.png";
import shoppingAdMobileImg from "@/public/images/shopping_ad_desktop_new_mobile.png";
import graphicServicesImg from "@/public/images/graphicservices.svg";
import marketingImg from "@/public/images/marketing.svg";
import webAppImg from "@/public/images/webapp.svg";
import adminImg from "@/public/images/admin.svg";
import consultImg from "@/public/images/consult.svg";
import chooseImg from "@/public/images/choose.svg";
import connectImg from "@/public/images/connect.svg";
import receiveImg from "@/public/images/receive.svg";
import whatsappImg from "@/public/images/whatsapp.svg";
import instagramImg from "@/public/images/instagram.svg";
import linkedinImg from "@/public/images/linkedin.svg";
import facebookImg from "@/public/images/facebook.svg";

const cyberServices = [
  "Online Shopping Assistance",
  "Printing, Photocopying & Laminating",
  "Resume / CV Creation",
  "Website Development",
  "Graphic Design Services",
  "PC Repairs",
  "Cyber Cafe & Study Zone",
  "Computer Classes",
  "Email Setup & Account Help",
  "Virtual Court Support",
];

const agencyServices = [
  { title: "Graphic Design", desc: "Visually stunning designs that capture attention and communicate your brand message clearly.", img: graphicServicesImg },
  { title: "Marketing & Sales", desc: "Marketing content designed to increase reach, attract leads, and support business growth.", img: marketingImg },
  { title: "Web / App Development", desc: "Modern websites and apps that create smooth, reliable digital experiences.", img: webAppImg },
  { title: "Administrative Services", desc: "Reliable business support including data entry, customer support, and virtual assistance.", img: adminImg },
];

const steps = [
  { title: "Consult", desc: "Tell us what you need and we'll point you the right way.", img: consultImg },
  { title: "Choose", desc: "Pick the service or package that fits your goals.", img: chooseImg },
  { title: "Connect", desc: "We get to work and keep you in the loop throughout.", img: connectImg },
  { title: "Receive", desc: "Get your finished result, ready to put to use.", img: receiveImg },
];

export default function Home() {
  useReveal();
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email setup is missing. Please contact UpTech directly.");
      return;
    }

    setIsLoading(true);
    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        toast.success("Thanks for reaching out — we'll get back to you soon!");
        form.current?.reset();
      })
      .catch(() => toast.error("Error sending email. Please try again."))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero-aura relative overflow-hidden text-white" style={{ background: "var(--field)" }} id="home">
        <div className="relative z-[2] max-w-[1200px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1.02fr_.98fr] gap-12 items-center pt-20 pb-[84px]">
          <div className="reveal">
            <p className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">UpTech Incorporated</p>
            <h1 className="text-[clamp(2.3rem,4.4vw,3.7rem)] my-[18px] mb-[22px] max-w-[14ch]">Digital services built to help your business grow.</h1>
            <p className="text-[1.15rem] text-on-blue max-w-[32rem] mb-[30px] leading-[1.6]">From branding and websites to online shopping support and cyber services, UpTech helps individuals and businesses access practical digital solutions.</p>
            <div className="flex gap-3.5 flex-wrap">
              <a href="#contact" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Connect With Us</a>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-transparent text-white border-[1.5px] border-white/45 cursor-pointer transition-[transform,box-shadow,background] duration-[180ms] hover:bg-white hover:text-brand-700 hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">WhatsApp Us</a>
            </div>
            <div className="flex flex-wrap gap-[34px] mt-10 pt-7 border-t border-white/20 max-sm:gap-[22px] max-sm:flex-col max-sm:items-start">
              <div><div className="text-[1.7rem] font-black text-white tracking-tight">10+</div><div className="text-[.82rem] text-on-blue font-semibold tracking-[.02em]">Digital Services</div></div>
              <div><div className="text-[1.7rem] font-black text-white tracking-tight">1-on-1</div><div className="text-[.82rem] text-on-blue font-semibold tracking-[.02em]">Personal Support</div></div>
              <div><div className="text-[1.7rem] font-black text-white tracking-tight">Chaguanas</div><div className="text-[.82rem] text-on-blue font-semibold tracking-[.02em]">Walk-in Cyber Center</div></div>
            </div>
          </div>
          <div className="relative flex justify-center reveal lg:order-none order-[-1] max-lg:max-w-[440px] max-lg:mx-auto">
            <Image src={newBgImg} alt="UpTech digital services" width={440} height={440} priority className="w-full max-w-[480px] drop-shadow-[0_40px_60px_rgba(8,18,46,.4)]" style={{ height: "auto" }} />
            <div className="absolute left-[-6px] top-[24%] max-lg:left-[-28px] max-lg:top-[8%] bg-white text-ink rounded-2xl py-[.7rem] px-[.95rem] shadow-card flex items-center gap-[.6rem] font-bold text-[.88rem] animate-float">
              <span className="w-[34px] h-[34px] rounded-[10px] bg-mist grid place-items-center text-[1.1rem]">&#x1F4AC;</span> WhatsApp friendly
            </div>
            <div className="absolute right-[-4px] bottom-[16%] max-lg:right-[-20px] max-lg:bottom-[4%] bg-white text-ink rounded-2xl py-[.7rem] px-[.95rem] shadow-card flex items-center gap-[.6rem] font-bold text-[.88rem] animate-float-delay">
              <span className="w-[34px] h-[34px] rounded-[10px] bg-mist grid place-items-center text-[1.1rem]">&#x26A1;</span> Same-day help
            </div>
          </div>
        </div>
        <svg className="block w-full h-auto -mt-px" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF" />
        </svg>
      </section>

      {/* CYBER CENTER */}
      <section className="py-[88px] max-sm:py-[60px] bg-paper" id="cyber">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <p className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">Now Open</p>
              <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em] my-3">Visit the UpTech Cyber Center</h2>
              <p className="text-[1.075rem] text-ink-soft">Your local walk-in hub for online shopping assistance, printing, PC support, resume creation, study space, computer classes, and everyday digital help.</p>
              <div className="flex flex-col gap-3.5 my-[26px] mb-[30px]">
                <div className="flex gap-[13px] items-start">
                  <span className="shrink-0 w-[26px] h-[26px] rounded-lg bg-mist-2 text-brand grid place-items-center font-black mt-0.5">&#x2713;</span>
                  <div><b className="font-bold">Walk-in friendly</b> — no appointment needed, just stop by.</div>
                </div>
                <div className="flex gap-[13px] items-start">
                  <span className="shrink-0 w-[26px] h-[26px] rounded-lg bg-mist-2 text-brand grid place-items-center font-black mt-0.5">&#x2713;</span>
                  <div><b className="font-bold">Real people</b> who help you through every step.</div>
                </div>
                <div className="flex gap-[13px] items-start">
                  <span className="shrink-0 w-[26px] h-[26px] rounded-lg bg-mist-2 text-brand grid place-items-center font-black mt-0.5">&#x2713;</span>
                  <div><b className="font-bold">Everyday tasks made simple</b> — print, order, repair, learn.</div>
                </div>
              </div>
              <div className="flex gap-[11px] items-start my-6 mb-[26px] p-3.5 px-4 bg-mist border border-line rounded-card-sm text-[.95rem] text-ink-soft leading-[1.45]">
                <span className="shrink-0 text-[1.05rem] leading-[1.3]">&#x1F4CD;</span>
                <span>Ramsingh&apos;s Plaza #2, opposite Mid-Center Mall, Chaguanas — fifth store on the right, downstairs.</span>
              </div>
              <div className="flex gap-3.5 flex-wrap">
                <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-brand text-white shadow-glow-blue cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-brand-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Send Links via WhatsApp</a>
                <a href="tel:+18687104296" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-white text-brand-700 border-[1.5px] border-line cursor-pointer transition-[transform,box-shadow,background] duration-[180ms] hover:border-brand hover:-translate-y-0.5 hover:shadow-sm active:translate-y-[1px] whitespace-nowrap">Call 1 (868) 710-4296</a>
              </div>
            </div>
            <div className="relative bg-white border border-line rounded-card p-3.5 shadow-card-lg max-w-[430px] mx-auto w-full reveal">
              <span className="absolute top-[26px] right-[26px] z-[3] text-[.74rem] font-extrabold tracking-[.1em] uppercase text-accent-ink bg-accent py-[.42rem] px-[.8rem] rounded-full shadow-sm">&#x25CF; Open Now</span>
              <Image src={cyberCenterImg} alt="UpTech Business & Cyber Center" className="w-full rounded-[calc(22px-10px)] block" style={{ height: "auto" }} />
            </div>
          </div>
        </div>
      </section>

      {/* CYBER SERVICES */}
      <section className="py-[88px] max-sm:py-[60px] bg-brand text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent inline-block mb-3.5">Cyber Center Services</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Everything you need in one convenient place</h2>
            <p className="text-[1.075rem] text-on-blue mt-3.5">Whether you need help ordering online, printing documents, fixing your PC, creating a resume, or using online services — we&apos;re ready to assist.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {cyberServices.map((s, i) => (
              <div key={s} className="bg-white/10 border border-white/[0.16] rounded-card-sm py-[22px] px-[18px] transition-[transform,background] duration-200 backdrop-blur-[4px] hover:-translate-y-[5px] hover:bg-white hover:text-navy group reveal" style={{ transitionDelay: `${i * 35}ms` }}>
                <div className="w-[38px] h-[38px] rounded-[11px] bg-white/[0.16] text-white grid place-items-center font-black mb-3.5 transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-ink">{i + 1}</div>
                <p className="font-bold text-[.96rem] leading-[1.3]">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENCY SERVICES */}
      <section className="py-[88px] max-sm:py-[60px] bg-mist" id="services">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand inline-block mb-3.5">What We Do</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">More than a digital agency — your partner in growth</h2>
            <p className="text-[1.075rem] text-ink-soft mt-3.5">Here&apos;s how we help businesses like yours move forward.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {agencyServices.map((s, i) => (
              <div key={s.title} className="bg-paper border border-line rounded-card pt-[26px] px-6 pb-0 flex flex-col transition-[transform,box-shadow,border-color] duration-[220ms] overflow-hidden hover:-translate-y-1.5 hover:shadow-card hover:border-transparent reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="text-[.78rem] font-extrabold text-brand tracking-[.1em] mb-3">0{i + 1}</div>
                <h3 className="text-[1.18rem] mb-2.5">{s.title}</h3>
                <p className="text-ink-soft text-[.95rem] flex-1 mb-[18px]">{s.desc}</p>
                <div className="mx-[-24px] bg-mist border-t border-line p-[18px]">
                  <Image src={s.img} alt={s.title} width={200} height={118} className="w-full h-[118px] object-contain" style={{ width: "auto", height: "auto" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE SHOPPING AD */}
      <section className="py-[88px] max-sm:py-[60px] bg-paper">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="bg-mist rounded-card p-2 border border-line overflow-visible grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] items-center relative reveal">
            <div className="py-[42px] px-[44px] max-sm:py-[30px] max-sm:px-6">
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
            <div className="hidden lg:flex bg-brand rounded-[18px] overflow-hidden items-center justify-center min-h-[330px] relative right-[-48px] shadow-card-lg">
              <Image src={shoppingAdDesktopImg} alt="Online shopping assistance" className="w-full h-full object-cover" style={{ width: "auto", height: "auto" }} />
            </div>
            <div className="flex lg:hidden bg-brand rounded-[18px] overflow-hidden items-center justify-center min-h-[260px]">
              <Image src={shoppingAdMobileImg} alt="Online shopping assistance" className="w-full h-full object-cover" style={{ width: "auto", height: "auto" }} />
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-[88px] max-sm:py-[60px] bg-navy text-white" id="how">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent inline-block mb-3.5">How It Works</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Four easy steps to your solution</h2>
            <p className="text-[1.075rem] text-on-blue mt-3.5">Freeing up your time, so you can focus on what matters most.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {steps.map((s, i) => (
              <div key={s.title} className="bg-white/[.08] border border-white/[0.16] rounded-card p-[26px] relative transition-[transform,background] duration-[220ms] hover:-translate-y-1.5 hover:bg-white/[.14] reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="absolute top-[22px] right-6 text-[2.4rem] font-black text-white/[0.16] leading-none">{i + 1}</span>
                <div className="w-[100px] h-[100px] max-sm:w-[80px] max-sm:h-[80px] rounded-[18px] bg-white grid place-items-center mb-5 p-2">
                  <Image src={s.img} alt={s.title} width={64} height={64} className="object-contain" style={{ width: "auto", height: "auto" }} />
                </div>
                <h3 className="text-[1.2rem] mb-2">{s.title}</h3>
                <p className="text-on-blue text-[.92rem]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-[88px] max-sm:py-[60px] bg-mist" id="contact">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand inline-block mb-3.5">Get In Touch</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Ready to take the leap?</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[.92fr_1.08fr] rounded-card overflow-hidden shadow-card-lg bg-white border border-line reveal">
            <div className="p-[46px_44px] max-sm:p-[30px_24px]">
              <h2 className="text-[1.9rem] mb-2">Contact Us</h2>
              <p className="text-ink-soft mb-[30px]">Your strategic partner for business growth.</p>
              <div className="mb-[22px]">
                <div className="text-[.76rem] font-extrabold tracking-[.1em] uppercase text-brand mb-[5px]">Email</div>
                <div className="font-semibold text-[1.02rem]"><a href="mailto:uptechincorp@gmail.com">uptechincorp@gmail.com</a></div>
              </div>
              <div className="mb-[22px]">
                <div className="text-[.76rem] font-extrabold tracking-[.1em] uppercase text-brand mb-[5px]">Call or WhatsApp</div>
                <div className="font-semibold text-[1.02rem]">1-868-710-4296</div>
              </div>
              <div className="mb-[22px]">
                <div className="text-[.76rem] font-extrabold tracking-[.1em] uppercase text-brand mb-[5px]">Cyber Center</div>
                <div className="font-semibold text-[1.02rem]">Ramsingh&apos;s Plaza #2, opposite Mid-Center Mall, Chaguanas</div>
              </div>
              <div className="flex gap-3 mt-[30px]">
                {[
                  { href: "https://wa.me/18687104296", label: "WhatsApp", img: whatsappImg },
                  { href: "https://www.instagram.com/uptechincorp/", label: "Instagram", img: instagramImg },
                  { href: "https://www.linkedin.com/in/uptechincorp/", label: "LinkedIn", img: linkedinImg },
                  { href: "https://www.facebook.com/uptech.trendz", label: "Facebook", img: facebookImg },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="w-11 h-11 rounded-xl bg-mist grid place-items-center transition-all duration-[180ms] border border-line hover:bg-brand hover:-translate-y-[3px] group">
                    <Image src={s.img} alt={s.label} width={20} height={20} className="w-5 h-5 group-hover:brightness-0 group-hover:invert" style={{ width: "auto", height: "auto" }} />
                  </a>
                ))}
              </div>
            </div>
            <form className="bg-navy p-[46px_44px] max-sm:p-[30px_24px] text-white" ref={form} onSubmit={sendEmail}>
              <h3 className="text-[1.3rem] mb-6">Leave us a message and we&apos;ll get back to you.</h3>
              <div className="grid grid-cols-2 gap-3.5 mb-[18px]">
                <div>
                  <label className="block text-[.82rem] font-semibold text-on-blue mb-[7px]">First name</label>
                  <input type="text" name="user_firstname" placeholder="Jane" className="field-input" />
                </div>
                <div>
                  <label className="block text-[.82rem] font-semibold text-on-blue mb-[7px]">Last name</label>
                  <input type="text" name="user_lastname" placeholder="Doe" className="field-input" />
                </div>
              </div>
              <div className="mb-[18px]">
                <label className="block text-[.82rem] font-semibold text-on-blue mb-[7px]">Email</label>
                <input type="email" name="user_email" placeholder="jane@email.com" className="field-input" />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[.82rem] font-semibold text-on-blue mb-[7px]">Comment</label>
                <textarea rows={4} name="message" placeholder="How can we help?" className="field-input" />
              </div>
              <button type="submit" disabled={isLoading} className="w-full justify-center inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </>
  );
}
