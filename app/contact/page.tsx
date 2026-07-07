"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import whatsappIcon from "@/public/images/whatsapp.svg";
import instagramIcon from "@/public/images/instagram.svg";
import linkedinIcon from "@/public/images/linkedin.svg";
import facebookIcon from "@/public/images/facebook.svg";

const fieldInput =
  "w-full bg-white/[.07] border border-white/[0.16] rounded-xl py-[.85rem] px-4 text-white font-[inherit] text-[.98rem] transition-all duration-[180ms] placeholder:text-on-blue/40 focus:outline-none focus:border-accent focus:bg-white/[.12]";

export default function Contact() {
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
    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
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
      <section
        className="hero-aura relative overflow-hidden text-white"
        style={{ background: "var(--field)" }}
        id="top"
      >
        <div className="relative z-[2] max-w-[1200px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1.02fr_.98fr] gap-12 items-center pt-20 pb-[84px]">
          <div className="reveal">
            <p className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">
              Get In Touch
            </p>
            <h1 className="text-[clamp(2.3rem,4.4vw,3.7rem)] my-[18px] mb-[22px] max-w-[14ch]">
              Ready to take the leap?
            </h1>
            <p className="text-[1.15rem] text-on-blue max-w-[32rem] mb-[30px] leading-[1.6]">
              Reach out by phone, WhatsApp, or email — or send us a message and
              we&apos;ll get back to you. We&apos;re your strategic partner for
              business growth.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <a
                href="#message"
                className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap"
              >
                Send a Message
              </a>
              <a
                href="https://wa.me/18687104296"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-transparent text-white border-[1.5px] border-white/45 cursor-pointer transition-[transform,box-shadow,background] duration-[180ms] hover:bg-white hover:text-brand-700 hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="relative flex justify-end reveal lg:order-none order-[-1] max-lg:max-w-[440px] max-lg:mx-auto">
            <div className="bg-white/[.07] border border-white/[0.16] rounded-card py-3.5 px-[26px] backdrop-blur-[4px] max-w-[420px] w-full">
              <a
                className="flex gap-[15px] items-center py-[18px] border-b border-white/[0.12] no-underline"
                href="tel:+18687104296"
              >
                <span className="shrink-0 w-[46px] h-[46px] rounded-[13px] bg-white/[0.12] grid place-items-center text-[1.25rem]">
                  &#x1F4DE;
                </span>
                <span>
                  <span className="block text-[.74rem] font-bold tracking-[.08em] uppercase text-on-blue opacity-80 mb-0.5">
                    Call Us
                  </span>
                  <span className="block font-extrabold text-[1.02rem]">
                    1-868-710-4296
                  </span>
                </span>
              </a>
              <a
                className="flex gap-[15px] items-center py-[18px] border-b border-white/[0.12] no-underline"
                href="https://wa.me/18687104296"
                target="_blank"
                rel="noopener"
              >
                <span className="shrink-0 w-[46px] h-[46px] rounded-[13px] bg-white/[0.12] grid place-items-center text-[1.25rem]">
                  <Image
                    src={whatsappIcon}
                    alt=""
                    width={22}
                    height={22}
                    style={{ width: "auto", height: "auto" }}
                  />
                </span>
                <span>
                  <span className="block text-[.74rem] font-bold tracking-[.08em] uppercase text-on-blue opacity-80 mb-0.5">
                    WhatsApp
                  </span>
                  <span className="block font-extrabold text-[1.02rem]">
                    Message us anytime
                  </span>
                </span>
              </a>
              <a
                className="flex gap-[15px] items-center py-[18px] no-underline"
                href="mailto:uptechincorp@gmail.com"
              >
                <span className="shrink-0 w-[46px] h-[46px] rounded-[13px] bg-white/[0.12] grid place-items-center text-[1.25rem]">
                  &#x2709;&#xFE0F;
                </span>
                <span>
                  <span className="block text-[.74rem] font-bold tracking-[.08em] uppercase text-on-blue opacity-80 mb-0.5">
                    Email
                  </span>
                  <span className="block font-extrabold text-[1.02rem]">
                    uptechincorp@gmail.com
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <svg
          className="block w-full h-auto -mt-px"
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z"
            fill="#F1F6FF"
          />
        </svg>
      </section>

      {/* CONTACT */}
      <section className="py-[88px] max-sm:py-[60px] bg-mist" id="message">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand inline-block mb-3.5">
              Contact Us
            </span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">
              Let&apos;s start a conversation
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[.92fr_1.08fr] rounded-card overflow-hidden shadow-card-lg bg-white border border-line reveal">
            <div className="p-[46px_44px] max-sm:p-[30px_24px]">
              <h2 className="text-[1.9rem] mb-2">Contact Details</h2>
              <p className="text-ink-soft mb-[30px]">
                Your strategic partner for business growth.
              </p>
              <div className="mb-[22px]">
                <div className="text-[.76rem] font-extrabold tracking-[.1em] uppercase text-brand mb-[5px]">
                  Email
                </div>
                <div className="font-semibold text-[1.02rem]">
                  <a href="mailto:uptechincorp@gmail.com">
                    uptechincorp@gmail.com
                  </a>
                </div>
              </div>
              <div className="mb-[22px]">
                <div className="text-[.76rem] font-extrabold tracking-[.1em] uppercase text-brand mb-[5px]">
                  Call or WhatsApp
                </div>
                <div className="font-semibold text-[1.02rem]">
                  1-868-710-4296
                </div>
              </div>
              <div className="mb-[22px]">
                <div className="text-[.76rem] font-extrabold tracking-[.1em] uppercase text-brand mb-[5px]">
                  Cyber Center
                </div>
                <div className="font-semibold text-[1.02rem]">
                  Ramsingh&apos;s Plaza #2, opposite Mid-Center Mall, Chaguanas
                </div>
              </div>
              <div className="flex gap-3 mt-[30px]">
                {[
                  {
                    href: "https://wa.me/18687104296",
                    label: "WhatsApp",
                    img: whatsappIcon,
                  },
                  {
                    href: "https://www.instagram.com/uptechincorp/",
                    label: "Instagram",
                    img: instagramIcon,
                  },
                  {
                    href: "https://www.linkedin.com/in/uptechincorp/",
                    label: "LinkedIn",
                    img: linkedinIcon,
                  },
                  {
                    href: "https://www.facebook.com/uptech.trendz",
                    label: "Facebook",
                    img: facebookIcon,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-xl bg-mist grid place-items-center transition-all duration-[180ms] border border-line hover:bg-brand hover:-translate-y-[3px] group"
                  >
                    <Image
                      src={s.img}
                      alt={s.label}
                      width={20}
                      height={20}
                      className="w-5 h-5 group-hover:brightness-0 group-hover:invert"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </a>
                ))}
              </div>
            </div>
            <form
              className="bg-navy p-[46px_44px] max-sm:p-[30px_24px] text-white"
              ref={form}
              onSubmit={sendEmail}
            >
              <h3 className="text-[1.3rem] mb-6">
                Leave us a message and we&apos;ll get back to you.
              </h3>
              <div className="grid grid-cols-2 gap-3.5 mb-[18px]">
                <div>
                  <label className="block text-[.82rem] font-semibold text-on-blue mb-[7px]">
                    First name
                  </label>
                  <input
                    type="text"
                    name="user_firstname"
                    placeholder="Jane"
                    className={fieldInput}
                  />
                </div>
                <div>
                  <label className="block text-[.82rem] font-semibold text-on-blue mb-[7px]">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="user_lastname"
                    placeholder="Doe"
                    className={fieldInput}
                  />
                </div>
              </div>
              <div className="mb-[18px]">
                <label className="block text-[.82rem] font-semibold text-on-blue mb-[7px]">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="jane@email.com"
                  className={fieldInput}
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[.82rem] font-semibold text-on-blue mb-[7px]">
                  Comment
                </label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="How can we help?"
                  className={fieldInput}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full justify-center inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap"
              >
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[88px] max-sm:py-[60px] bg-navy text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[760px] mx-auto text-center reveal">
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">
              Prefer to drop by?
            </h2>
            <p className="text-on-blue text-[1.1rem] mt-4 mb-[30px]">
              Visit the UpTech Cyber Center in Chaguanas — fifth store on the
              right, downstairs at Ramsingh&apos;s Plaza #2.
            </p>
            <a
              href="https://maps.google.com/?q=Ramsingh's+Plaza+Chaguanas"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </>
  );
}
