"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import objectivesPcImage from "@/public/images/objectivesPc.svg";
import userSafetyImage from "@/public/images/userSafetyImage.svg";
import privacyImage from "@/public/images/privacyImage.svg";
import dataSecurityImage from "@/public/images/dataSecurityPicture.svg";

const audience = ["Secondary schools", "Universities", "Trade unions", "Religious organizations", "Political organizations", "Corporations", "Social groups", "News agencies"];

const objectives = [
  { title: "User Safety", img: userSafetyImage, text: "Algorithms that detect sensitive phrases, words, and duplicate accounts — combined with robust user verification — significantly enhance user safety. These efforts protect users and communities from online criminal activity such as cyberbullying, harassment, and cyberstalking." },
  { title: "Privacy", img: privacyImage, text: "The Ourlime user profile includes advanced features designed to prioritize privacy: customizable privacy settings that let users control their level of visibility and exactly who can access their data." },
  { title: "Data Security", img: dataSecurityImage, text: "Personal data — names, addresses, email addresses, contact information, and dates of birth — will never be used for marketing purposes or sold to any third party for profit. Your data stays yours." },
];

export default function Objectives() {
  useReveal();

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero-aura relative overflow-hidden text-white" style={{ background: "var(--field)" }} id="top">
        <div className="relative z-[2] max-w-[1200px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1.02fr_.98fr] gap-12 items-center pt-20 pb-[84px]">
          <div className="reveal">
            <p className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">Objectives</p>
            <h1 className="text-[clamp(2.3rem,4.4vw,3.7rem)] my-[18px] mb-[22px]">Building safer, smarter, and more productive communities.</h1>
            <p className="text-[1.15rem] text-on-blue max-w-[32rem] mb-[30px] leading-[1.6]">Ourlime Communities Network is designed to create a safer, more meaningful, and more productive digital space for communities and their members.</p>
            <div className="flex flex-wrap gap-[11px]">
              {["Safety", "Privacy", "Productivity", "Community"].map((v) => (
                <span key={v} className="inline-flex items-center gap-1.5 bg-white/[.13] border border-white/[.22] backdrop-blur-[4px] py-[.55rem] px-[1.1rem] rounded-full font-bold text-[.92rem]">
                  <b className="text-accent">&#x25C6;</b> {v}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center reveal lg:order-none order-[-1] max-lg:max-w-[440px] max-lg:mx-auto">
            <Image src={objectivesPcImage} alt="Ourlime objectives" width={480} height={480} style={{ width: "auto", height: "auto" }} />
          </div>
        </div>
        <svg className="block w-full h-auto -mt-px" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#0C1F46"></path>
        </svg>
      </section>

      {/* STRIP */}
      <div className="bg-navy text-white text-center py-5 px-6">
        <p className="font-extrabold text-[1.05rem]">Building a <span className="text-accent">secure, productive, and community-focused</span> digital future.</p>
      </div>

      {/* MISSION */}
      <section className="py-[88px] max-sm:py-[60px] bg-paper">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[760px] mx-auto text-center reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">Our Mission</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em] mt-3.5">Welcome to UpTech Incorporated LLC</h2>
            <p className="text-[1.075rem] text-ink-soft leading-[1.65] mt-4">At UpTech Incorporated LLC, our primary mission is the development and launch of the Ourlime Communities Network — a groundbreaking platform designed to revolutionize social networking. Ourlime is built with tools and resources that promote meaningful social and professional interactions while fostering productivity within a safe, secure, and user-controlled virtual environment.</p>
            <p className="text-[1.075rem] text-ink-soft leading-[1.65] mt-4">Our vision is to transform social networking into a space that combines productivity with enjoyment, empowering communities and their members — the first social network purpose-built to inspire youth productivity in the modern digital age, featuring project management, e-learning, and shopping tools integrated with advanced AI, AR, and 3D technologies.</p>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="py-[88px] max-sm:py-[60px] bg-mist">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="reveal">
              <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">Who It Serves</span>
              <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em] mt-3.5 mb-4">Built for communities of every size.</h2>
              <p className="text-[1.075rem] text-ink-soft">Ourlime supports organizations ranging from small local groups to large global communities. Since everyone belongs to different social, professional, private, or public communities, the platform empowers connection, collaboration, and productivity across every sphere.</p>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 reveal">
              {audience.map((a) => (
                <div key={a} className="flex items-center gap-3 bg-white border border-line rounded-card-sm py-[14px] px-5 font-bold text-[.96rem]">
                  <span className="w-[26px] h-[26px] rounded-lg bg-mist-2 text-brand grid place-items-center font-black text-[.85rem] shrink-0">&#x2713;</span>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE OBJECTIVES */}
      <section className="py-[88px] max-sm:py-[60px] bg-brand text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">Core Objectives</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">A platform designed around trust and protection</h2>
            <p className="text-[1.075rem] text-on-blue mt-3.5">Ourlime focuses on improving user safety, protecting privacy, and strengthening data security so communities can interact with confidence.</p>
          </div>
          <div className="flex flex-col gap-16 mt-12">
            {objectives.map((o, i) => (
              <div key={o.title} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-2.5 font-extrabold text-[.85rem] tracking-[.08em] uppercase text-on-blue mb-3">
                    <span className="w-[32px] h-[32px] rounded-[10px] bg-white/[.15] grid place-items-center text-accent text-[1rem]">{i + 1}</span>
                    Objective {i + 1}
                  </div>
                  <h3 className="text-[1.5rem] mb-3">{o.title}</h3>
                  <p className="text-on-blue text-[1.02rem] leading-[1.65]">{o.text}</p>
                </div>
                <div className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image src={o.img} alt={o.title} width={330} height={240} style={{ width: "auto", height: "auto" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL DIRECTION */}
      <section className="py-[88px] max-sm:py-[60px] bg-paper">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[760px] mx-auto text-center reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">The Bigger Goal</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em] mt-3.5">Redefining what a social network can be.</h2>
            <p className="text-[1.075rem] text-ink-soft leading-[1.65] mt-4">Ourlime is dedicated to creating an environment that enriches users&apos; virtual lives. By combining productivity, community management, digital safety, privacy, and innovation, Ourlime offers a comprehensive and immersive experience for modern communities.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[88px] max-sm:py-[60px] bg-navy text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="text-center max-w-[640px] mx-auto reveal">
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Want to learn more about Ourlime?</h2>
            <p className="text-on-blue mt-4 mb-8">Connect with UpTech to learn more about the platform, our objectives, and our future direction.</p>
            <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Contact Us on WhatsApp</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
