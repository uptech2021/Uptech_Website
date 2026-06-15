"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

const services = [
  { t: "Graphic Design", d: "We create visually stunning designs that capture attention and communicate your brand message clearly.", img: "/images/graphicservices.svg" },
  { t: "Marketing & Sales", d: "We create marketing content designed to increase reach, attract leads, and support business growth.", img: "/images/marketing.svg" },
  { t: "Web / App Development", d: "We help businesses build modern websites and apps that create smooth digital experiences.", img: "/images/webapp.svg" },
  { t: "Administrative Services", d: "We provide reliable business support including data entry, customer support, and virtual assistance.", img: "/images/admin.svg" },
];

const steps = [
  { t: "Consult", d: "Tell us what you need and we'll point you the right way.", img: "/images/consult.svg" },
  { t: "Choose", d: "Pick the service or package that fits your goals.", img: "/images/choose.svg" },
  { t: "Connect", d: "We get to work and keep you in the loop throughout.", img: "/images/connect.svg" },
  { t: "Receive", d: "Get your finished result, ready to put to use.", img: "/images/receive.svg" },
];

export default function Services() {
  useReveal();

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-copy reveal">
            <p className="eyebrow">Our Services</p>
            <h1>More than a digital agency — your partner in growth.</h1>
            <p className="sub">From branding and marketing to websites, apps, and reliable administrative support, UpTech gives individuals and businesses the practical digital help they need to move forward.</p>
            <div className="hero-cta">
              <Link href="/contact" className="btn btn-accent">Start a Project</Link>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-ghost">WhatsApp Us</a>
            </div>
          </div>
          <div className="hero-art reveal">
            <Image src="/images/webapp.svg" alt="UpTech services" width={480} height={480} className="floaty" />
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF"></path>
        </svg>
      </section>

      <div className="strip"><p>We&apos;re your <span className="hl">strategic partner in growth</span> — here&apos;s how we help.</p></div>

      {/* SERVICES */}
      <section className="band band-paper">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">What We Do</span>
            <h2 className="sec-h">Here&apos;s how we help businesses like yours</h2>
            <p className="lead" style={{ marginTop: 14 }}>Four core services, built around one goal: freeing up your time so you can focus on what matters most.</p>
          </div>
          <div className="svc-grid">
            {services.map((s, i) => (
              <div key={s.t} className="svc-card reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="svc-num">0{i + 1}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="svc-art">
                  <Image src={s.img} alt={s.t} width={200} height={118} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="band band-navy">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">How It Works</span>
            <h2 className="sec-h">Four easy steps to your solution</h2>
            <p className="lead" style={{ marginTop: 14 }}>A simple, transparent process from first conversation to finished result.</p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={s.t} className="step reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="step-n">{i + 1}</span>
                <div className="step-art">
                  <Image src={s.img} alt={s.t} width={60} height={60} />
                </div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band band-blue">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }} className="reveal">
            <h2 className="sec-h">Ready to take the leap?</h2>
            <p style={{ color: "var(--on-blue)", fontSize: "1.1rem", margin: "16px 0 30px" }}>Tell us what you&apos;re working on and we&apos;ll help you find the right solution.</p>
            <div className="hero-cta" style={{ justifyContent: "center" }}>
              <Link href="/contact" className="btn btn-accent">Contact Us</Link>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-ghost">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
