"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

const audience = ["Secondary schools", "Universities", "Trade unions", "Religious organizations", "Political organizations", "Corporations", "Social groups", "News agencies"];

const objectives = [
  { title: "User Safety", img: "/images/userSafetyImage.svg", text: "Algorithms that detect sensitive phrases, words, and duplicate accounts — combined with robust user verification — significantly enhance user safety. These efforts protect users and communities from online criminal activity such as cyberbullying, harassment, and cyberstalking." },
  { title: "Privacy", img: "/images/privacyImage.svg", text: "The Ourlime user profile includes advanced features designed to prioritize privacy: customizable privacy settings that let users control their level of visibility and exactly who can access their data." },
  { title: "Data Security", img: "/images/dataSecurityPicture.svg", text: "Personal data — names, addresses, email addresses, contact information, and dates of birth — will never be used for marketing purposes or sold to any third party for profit. Your data stays yours." },
];

export default function Objectives() {
  useReveal();

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-copy reveal">
            <p className="eyebrow">Objectives</p>
            <h1>Building safer, smarter, and more productive communities.</h1>
            <p className="sub">Ourlime Communities Network is designed to create a safer, more meaningful, and more productive digital space for communities and their members.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 11 }}>
              {["Safety", "Privacy", "Productivity", "Community"].map((v) => (
                <span key={v} className="htag"><b>&#x25C6;</b> {v}</span>
              ))}
            </div>
          </div>
          <div className="hero-art reveal">
            <Image src="/images/objectivesPc.svg" alt="Ourlime objectives" width={480} height={480} />
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#0C1F46"></path>
        </svg>
      </section>

      <div className="strip"><p>Building a <span className="hl">secure, productive, and community-focused</span> digital future.</p></div>

      {/* MISSION */}
      <section className="band band-paper">
        <div className="wrap">
          <div className="mission reveal">
            <span className="eyebrow" style={{ color: "var(--blue)" }}>Our Mission</span>
            <h2 className="sec-h" style={{ marginTop: 14 }}>Welcome to UpTech Incorporated LLC</h2>
            <p className="body">At UpTech Incorporated LLC, our primary mission is the development and launch of the Ourlime Communities Network — a groundbreaking platform designed to revolutionize social networking. Ourlime is built with tools and resources that promote meaningful social and professional interactions while fostering productivity within a safe, secure, and user-controlled virtual environment.</p>
            <p className="body">Our vision is to transform social networking into a space that combines productivity with enjoyment, empowering communities and their members — the first social network purpose-built to inspire youth productivity in the modern digital age, featuring project management, e-learning, and shopping tools integrated with advanced AI, AR, and 3D technologies.</p>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="band band-mist">
        <div className="wrap">
          <div className="aud-grid">
            <div className="reveal">
              <span className="eyebrow" style={{ color: "var(--blue)" }}>Who It Serves</span>
              <h2 className="sec-h" style={{ margin: "14px 0 16px" }}>Built for communities of every size.</h2>
              <p className="lead">Ourlime supports organizations ranging from small local groups to large global communities. Since everyone belongs to different social, professional, private, or public communities, the platform empowers connection, collaboration, and productivity across every sphere.</p>
            </div>
            <div className="aud-chips reveal">
              {audience.map((a) => (
                <div key={a} className="aud-chip"><span className="aud-dot">&#x2713;</span>{a}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE OBJECTIVES */}
      <section className="band band-blue">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Core Objectives</span>
            <h2 className="sec-h">A platform designed around trust and protection</h2>
            <p className="lead" style={{ marginTop: 14 }}>Ourlime focuses on improving user safety, protecting privacy, and strengthening data security so communities can interact with confidence.</p>
          </div>
          <div className="obj-list">
            {objectives.map((o, i) => (
              <div key={o.title} className={`obj-row reveal${i % 2 === 1 ? " flip" : ""}`} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="obj-copy">
                  <div className="obj-num"><span>{i + 1}</span> Objective {i + 1}</div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </div>
                <div className="obj-art">
                  <Image src={o.img} alt={o.title} width={330} height={240} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL DIRECTION */}
      <section className="band band-paper">
        <div className="wrap">
          <div className="final reveal">
            <span className="eyebrow" style={{ color: "var(--blue)" }}>The Bigger Goal</span>
            <h2 className="sec-h" style={{ marginTop: 14 }}>Redefining what a social network can be.</h2>
            <p className="body">Ourlime is dedicated to creating an environment that enriches users&apos; virtual lives. By combining productivity, community management, digital safety, privacy, and innovation, Ourlime offers a comprehensive and immersive experience for modern communities.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band band-navy">
        <div className="wrap">
          <div className="cta-box reveal">
            <h2 className="sec-h">Want to learn more about Ourlime?</h2>
            <p>Connect with UpTech to learn more about the platform, our objectives, and our future direction.</p>
            <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-accent">Contact Us on WhatsApp</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
