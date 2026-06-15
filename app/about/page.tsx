"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

const teamSections = [
  {
    title: "Leadership Team",
    members: [
      { name: "Rishi Kowlessar", pos: "Chairman / CEO", tag: "Director" },
      { name: "Kyle Nagee", pos: "Vice Chairman / Senior Software Engineer / Head of Development", tag: "Director" },
      { name: "Ethan Ramsahai", pos: "Head of Graphics & Multimedia", tag: "Director" },
      { name: "Jasmine Lightfoot", pos: "Head of Human Resources / Software Developers Club", tag: "Director" },
    ],
  },
  {
    title: "Development & Design Team",
    members: [
      { name: "Raushawn Mitchell", pos: "Senior Software Engineer / Web Lead", tag: "Engineering" },
      { name: "Amanda Roopnarinesingh", pos: "Graphic / Web / App Designer", tag: "Design" },
      { name: "Amanda Ramjitsingh", pos: "Assistant Head of Development", tag: "Engineering" },
      { name: "Zaria Ramsaroop", pos: "Graphic Designer", tag: "Design" },
    ],
  },
  {
    title: "Operations & Cyber Center",
    members: [
      { name: "Mikelle Kerena Kowlessar", pos: "Social Media Manager / Cyber Center Manager", tag: "Operations" },
    ],
  },
];

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase();
}

export default function About() {
  useReveal();

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-copy reveal">
            <p className="eyebrow">About UpTech</p>
            <h1>Building digital solutions with purpose, creativity, and community.</h1>
            <p className="sub">UpTech Incorporated brings together developers, designers, and digital thinkers to create useful technology, support local businesses, and provide practical digital services through both our online brand and Cyber Center.</p>
            <div className="htags">
              <span className="htag"><b>&#x25C6;</b> Innovation</span>
              <span className="htag"><b>&#x25C6;</b> Community</span>
              <span className="htag"><b>&#x25C6;</b> Creativity</span>
              <span className="htag"><b>&#x25C6;</b> Digital Growth</span>
            </div>
          </div>
          <div className="hero-art reveal">
            <Image src="/images/abgPc.svg" alt="About UpTech" width={480} height={480} className="floaty" />
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF"></path>
        </svg>
      </section>

      <div className="strip"><p>Your strategic partner for <span className="hl">digital growth, innovation, and real-world support</span>.</p></div>

      {/* WHO WE ARE */}
      <section className="band band-paper">
        <div className="wrap">
          <div className="split">
            <div className="reveal">
              <span className="eyebrow" style={{ color: "var(--blue)", display: "inline-block", marginBottom: 14 }}>Who We Are</span>
              <h2 className="sec-h" style={{ marginBottom: 18 }}>A modern tech company focused on practical impact.</h2>
              <p className="lead" style={{ marginBottom: 16 }}>UpTech Incorporated was created to help individuals, businesses, and communities access digital services in a simpler and more meaningful way. Our work includes software development, web and app design, graphic design, marketing support, and technology assistance.</p>
              <p className="lead">Through UpTech Cyber Center, we also provide walk-in support for online shopping, printing, computer assistance, resume creation, study space, virtual court access, and other everyday digital needs.</p>
            </div>
            <div className="drives reveal">
              <h3>What drives us</h3>
              <div className="drive-item"><div className="t">Digital Access</div><p>Making technology easier for everyday people and local businesses.</p></div>
              <div className="drive-item"><div className="t">Creative Solutions</div><p>Combining design, development, and strategy to solve real problems.</p></div>
              <div className="drive-item"><div className="t">Community Growth</div><p>Building services that support learning, productivity, and opportunity.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="band band-mist">
        <div className="wrap">
          <div className="sec-head center reveal" style={{ marginBottom: 34 }}>
            <span className="eyebrow">Founder&apos;s Message</span>
            <h2 className="sec-h" style={{ marginTop: 14 }}>A vision built through persistence and purpose</h2>
          </div>
          <div className="founder reveal">
            <p className="q">In 2014, I began Ourlime with a focus on sustainable relationships and dating. Facing challenges and an initial setback in 2016, I revisited and revamped the concept. After seven dedicated years, Ourlime is now a reality, reflecting my enduring vision. I hope users see its potential as a safe space for content and community management in their daily lives.</p>
            <p className="by">— Rishi Kowlessar, Chairman / CEO</p>
          </div>
        </div>
      </section>

      {/* OURLIME STORY */}
      <section className="band band-paper">
        <div className="wrap">
          <div className="sec-head reveal" style={{ maxWidth: 760, marginBottom: 40 }}>
            <span className="eyebrow" style={{ color: "var(--blue)", display: "inline-block", marginBottom: 14 }}>Community Value</span>
            <h2 className="sec-h" style={{ marginBottom: 16 }}>Benefits of the Ourlime Community Network</h2>
            <p className="lead">Being part of a vibrant community enhances well-being by fostering belonging and mutual support. Joining Ourlime offers exclusive content, ensures member privacy, provides direct feedback avenues, encourages innovative community strategies, and promotes mutual learning and conflict resolution.</p>
          </div>
          <div className="story-grid">
            <div className="story-card light reveal">
              <span className="eyebrow">Our Story</span>
              <h3>How Ourlime began</h3>
              <p>Ourlime, founded by Rishi Kowlessar, emerged as a response to the gaps in contemporary social media, which often compromised user data and fostered unproductivity. Introduced in October 2021 as a Private Communities Network, it valued user safety, data security, and genuine content control — launched online in January 2022 and on Google Play by March, with refinements to match the founder&apos;s vision.</p>
            </div>
            <div className="story-card dark reveal">
              <span className="eyebrow">The Way Forward</span>
              <h3>Where Ourlime is heading</h3>
              <p>Ourlime is preparing for a local launch in Trinidad and Tobago, aiming for broad accessibility via Google Play, the Apple Store, and the web. Plans include the Ourlime Messenger App, 3D capabilities, and AI integrations. A dedicated team is driving innovation, with ongoing efforts to secure funding for expansion while keeping Ourlime independent of third parties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="band band-navy">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Our Team</span>
            <h2 className="sec-h">Meet the people behind UpTech</h2>
            <p className="lead" style={{ marginTop: 14 }}>Leadership, software engineering, design, human resources, social media, and Cyber Center operations — together under one roof.</p>
          </div>
          {teamSections.map((section) => (
            <div key={section.title} className="team-block reveal">
              <h3>{section.title}</h3>
              <div className="team-grid">
                {section.members.map((m) => (
                  <div key={m.name} className="member">
                    <div className="avatar">{initials(m.name)}</div>
                    <div className="mtag">{m.tag}</div>
                    <h4>{m.name}</h4>
                    <p>{m.pos}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="band band-blue">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }} className="reveal">
            <h2 className="sec-h">Ready to connect with UpTech?</h2>
            <p style={{ color: "var(--on-blue)", fontSize: "1.1rem", margin: "16px 0 30px" }}>Whether you need digital services, Cyber Center support, or want to learn more about our work, we&apos;re ready to assist.</p>
            <div className="hero-cta" style={{ justifyContent: "center" }}>
              <Link href="/contact" className="btn btn-accent">Contact Us</Link>
              <Link href="/vacancies" className="btn btn-ghost">Join the Team</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
