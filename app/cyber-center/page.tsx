"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

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

      {/* HERO */}
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-copy reveal">
            <p className="eyebrow">Now Open &middot; Chaguanas</p>
            <h1>UpTech Business &amp; Cyber Center</h1>
            <p className="sub">Your local walk-in hub for online shopping assistance, printing, PC support, resume creation, study space, computer classes, and everyday digital help — with real people who guide you through every step.</p>
            <div className="hero-cta">
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-accent">Send Links via WhatsApp</a>
              <a href="tel:+18687104296" className="btn btn-ghost">Call 1 (868) 710-4296</a>
            </div>
          </div>
          <div className="hero-art reveal">
            <div className="cc-flyer">
              <span className="cc-flyer-tag">&#x25CF; Open Now</span>
              <Image src="/images/cyber_center.png" alt="UpTech Business & Cyber Center" width={400} height={400} />
            </div>
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF"></path>
        </svg>
      </section>

      <div className="strip"><p>One walk-in stop for <span className="hl">printing, ordering, repairs, study &amp; digital help</span>.</p></div>

      {/* SERVICES */}
      <section className="band band-paper">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Cyber Center Services</span>
            <h2 className="sec-h">Everything you need in one convenient place</h2>
            <p className="lead" style={{ marginTop: 14 }}>Whether you need help ordering online, printing documents, fixing your PC, creating a resume, or using online services — we&apos;re ready to assist.</p>
          </div>
          <div className="cc-svc-grid">
            {cyberServices.map((s, i) => (
              <div key={s[0]} className="cc-svc-card reveal" style={{ transitionDelay: `${i * 30}ms` }}>
                <div className="n">{i + 1}</div>
                <div>
                  <h3>{s[0]}</h3>
                  <p>{s[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE SHOPPING */}
      <section className="band band-mist">
        <div className="wrap">
          <div className="shop reveal">
            <div className="shop-copy">
              <span className="eyebrow">Personal Online Orders</span>
              <h2>Send us your links. We help you shop easily.</h2>
              <p>Send product links from your favourite online stores via WhatsApp. We assist with the whole process so shopping online feels simple and stress-free.</p>
              <div className="shop-stores"><span>Amazon</span><span>SHEIN</span><span>Temu</span><span>&amp; more</span></div>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-blue">Start an Online Order</a>
            </div>
            <div className="shop-art">
              <Image src="/images/shopping_ad_desktop.png" alt="Online shopping assistance" width={600} height={400} />
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="band band-navy">
        <div className="wrap">
          <div className="loc-grid">
            <div className="reveal">
              <span className="eyebrow" style={{ color: "var(--accent)", display: "inline-block", marginBottom: 14 }}>Find Us</span>
              <h2 className="sec-h">Stop by — no appointment needed</h2>
              <p className="lead" style={{ marginTop: 14 }}>We&apos;re easy to reach in the heart of Chaguanas. Walk in, send a message ahead on WhatsApp, or give us a call and we&apos;ll have you sorted.</p>
              <div className="hero-cta" style={{ marginTop: 26 }}>
                <a href="https://maps.google.com/?q=Ramsingh's+Plaza+Chaguanas" target="_blank" rel="noopener" className="btn btn-accent">Get Directions</a>
                <a href="tel:+18687104296" className="btn btn-ghost">Call Us</a>
              </div>
            </div>
            <div className="loc-card reveal">
              <div className="loc-mono">U</div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: 6 }}>UpTech Business &amp; Cyber Center</h3>
              <p style={{ color: "var(--on-blue)", lineHeight: 1.5 }}>Ramsingh&apos;s Plaza #2, opposite Mid-Center Mall, Chaguanas. Fifth store on the right, downstairs.</p>
              <div className="loc-rows">
                <div className="loc-row"><span>Phone / WhatsApp</span><span>1 (868) 710-4296</span></div>
                <div className="loc-row"><span>Languages</span><span>English / Spanish</span></div>
                <div className="loc-row"><span>Best for</span><span>Walk-in digital help</span></div>
              </div>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-blue">Message on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band band-blue">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }} className="reveal">
            <h2 className="sec-h">Need a hand with something digital?</h2>
            <p style={{ color: "var(--on-blue)", fontSize: "1.1rem", margin: "16px 0 30px" }}>From a single print to a full website, the UpTech Cyber Center team is ready to help.</p>
            <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-accent">Chat With Us on WhatsApp</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
