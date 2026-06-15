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
  { title: "Graphic Design", desc: "Visually stunning designs that capture attention and communicate your brand message clearly.", img: "/images/graphicservices.svg" },
  { title: "Marketing & Sales", desc: "Marketing content designed to increase reach, attract leads, and support business growth.", img: "/images/marketing.svg" },
  { title: "Web / App Development", desc: "Modern websites and apps that create smooth, reliable digital experiences.", img: "/images/webapp.svg" },
  { title: "Administrative Services", desc: "Reliable business support including data entry, customer support, and virtual assistance.", img: "/images/admin.svg" },
];

const steps = [
  { title: "Consult", desc: "Tell us what you need and we'll point you the right way.", img: "/images/consult.svg" },
  { title: "Choose", desc: "Pick the service or package that fits your goals.", img: "/images/choose.svg" },
  { title: "Connect", desc: "We get to work and keep you in the loop throughout.", img: "/images/connect.svg" },
  { title: "Receive", desc: "Get your finished result, ready to put to use.", img: "/images/receive.svg" },
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
      <section className="hero" id="home">
        <div className="wrap">
          <div className="hero-copy reveal">
            <p className="eyebrow">UpTech Incorporated</p>
            <h1>Digital services built to help your business grow.</h1>
            <p className="sub">From branding and websites to online shopping support and cyber services, UpTech helps individuals and businesses access practical digital solutions.</p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-accent">Connect With Us</a>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-ghost">WhatsApp Us</a>
            </div>
            <div className="hero-stats">
              <div><div className="n">10+</div><div className="l">Digital Services</div></div>
              <div><div className="n">1-on-1</div><div className="l">Personal Support</div></div>
              <div><div className="n">Chaguanas</div><div className="l">Walk-in Cyber Center</div></div>
            </div>
          </div>
          <div className="hero-art reveal">
            <Image src="/images/newbg.svg" alt="UpTech digital services" width={440} height={440} className="hero-photo" />
            <div className="hero-badge b1"><span className="dot">&#x1F4AC;</span> WhatsApp friendly</div>
            <div className="hero-badge b2"><span className="dot">&#x26A1;</span> Same-day help</div>
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF"></path>
        </svg>
      </section>

      {/* CYBER CENTER */}
      <section className="band band-paper" id="cyber">
        <div className="wrap">
          <div className="cc-grid">
            <div className="reveal">
              <p className="eyebrow" style={{ color: "var(--blue)" }}>Now Open</p>
              <h2 className="sec-h" style={{ margin: "12px 0 14px" }}>Visit the UpTech Cyber Center</h2>
              <p className="lead">Your local walk-in hub for online shopping assistance, printing, PC support, resume creation, study space, computer classes, and everyday digital help.</p>
              <div className="cc-points">
                <div className="cc-point"><span className="cc-check">&#x2713;</span><div><b>Walk-in friendly</b> — no appointment needed, just stop by.</div></div>
                <div className="cc-point"><span className="cc-check">&#x2713;</span><div><b>Real people</b> who help you through every step.</div></div>
                <div className="cc-point"><span className="cc-check">&#x2713;</span><div><b>Everyday tasks made simple</b> — print, order, repair, learn.</div></div>
              </div>
              <div className="cc-locline">
                <span className="cc-pin">&#x1F4CD;</span>
                <span>Ramsingh&apos;s Plaza #2, opposite Mid-Center Mall, Chaguanas — fifth store on the right, downstairs.</span>
              </div>
              <div className="hero-cta">
                <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-blue">Send Links via WhatsApp</a>
                <a href="tel:+18687104296" className="btn btn-outline">Call 1 (868) 710-4296</a>
              </div>
            </div>
            <div className="cc-flyer reveal">
              <span className="cc-flyer-tag">&#x25CF; Open Now</span>
              <Image src="/images/cyber_center.png" alt="UpTech Business & Cyber Center" width={400} height={400} />
            </div>
          </div>
        </div>
      </section>

      {/* CYBER SERVICES */}
      <section className="band band-blue">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Cyber Center Services</span>
            <h2 className="sec-h">Everything you need in one convenient place</h2>
            <p className="lead" style={{ marginTop: 14 }}>Whether you need help ordering online, printing documents, fixing your PC, creating a resume, or using online services — we&apos;re ready to assist.</p>
          </div>
          <div className="chip-grid">
            {cyberServices.map((s, i) => (
              <div key={s} className="chip reveal" style={{ transitionDelay: `${i * 35}ms` }}>
                <div className="chip-n">{i + 1}</div>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENCY SERVICES */}
      <section className="band band-mist" id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">What We Do</span>
            <h2 className="sec-h">More than a digital agency — your partner in growth</h2>
            <p className="lead" style={{ marginTop: 14 }}>Here&apos;s how we help businesses like yours move forward.</p>
          </div>
          <div className="svc-grid">
            {agencyServices.map((s, i) => (
              <div key={s.title} className="svc-card reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="svc-num">0{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-art">
                  <Image src={s.img} alt={s.title} width={200} height={118} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE SHOPPING AD */}
      <section className="band band-paper">
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

      {/* STEPS */}
      <section className="band band-navy" id="how">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">How It Works</span>
            <h2 className="sec-h">Four easy steps to your solution</h2>
            <p className="lead" style={{ marginTop: 14 }}>Freeing up your time, so you can focus on what matters most.</p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={s.title} className="step reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="step-n">{i + 1}</span>
                <div className="step-art">
                  <Image src={s.img} alt={s.title} width={60} height={60} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="band band-mist" id="contact">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Get In Touch</span>
            <h2 className="sec-h">Ready to take the leap?</h2>
          </div>
          <div className="contact-grid reveal">
            <div className="contact-info">
              <h2>Contact Us</h2>
              <p className="muted">Your strategic partner for business growth.</p>
              <div className="info-item"><div className="k">Email</div><div className="v"><a href="mailto:uptechincorp@gmail.com">uptechincorp@gmail.com</a></div></div>
              <div className="info-item"><div className="k">Call or WhatsApp</div><div className="v">1-868-710-4296 &middot; 1-868-492-5166</div></div>
              <div className="info-item"><div className="k">Cyber Center</div><div className="v">Ramsingh&apos;s Plaza #2, opposite Mid-Center Mall, Chaguanas</div></div>
              <div className="socials">
                <a href="https://wa.me/18687104296" target="_blank" rel="noopener" aria-label="WhatsApp"><Image src="/images/whatsapp.svg" alt="WhatsApp" width={20} height={20} /></a>
                <a href="https://www.instagram.com/uptechincorp/" target="_blank" rel="noopener" aria-label="Instagram"><Image src="/images/instagram.svg" alt="Instagram" width={20} height={20} /></a>
                <a href="https://www.linkedin.com/in/uptechincorp/" target="_blank" rel="noopener" aria-label="LinkedIn"><Image src="/images/linkedin.svg" alt="LinkedIn" width={20} height={20} /></a>
                <a href="https://www.facebook.com/uptech.trendz" target="_blank" rel="noopener" aria-label="Facebook"><Image src="/images/facebook.svg" alt="Facebook" width={20} height={20} /></a>
              </div>
            </div>
            <form className="contact-form" ref={form} onSubmit={sendEmail}>
              <h3>Leave us a message and we&apos;ll get back to you.</h3>
              <div className="form-row">
                <div className="field"><label>First name</label><input type="text" name="user_firstname" placeholder="Jane" /></div>
                <div className="field"><label>Last name</label><input type="text" name="user_lastname" placeholder="Doe" /></div>
              </div>
              <div className="field"><label>Email</label><input type="email" name="user_email" placeholder="jane@email.com" /></div>
              <div className="field"><label>Comment</label><textarea rows={4} name="message" placeholder="How can we help?"></textarea></div>
              <button type="submit" disabled={isLoading} className="btn btn-accent" style={{ width: "100%", justifyContent: "center" }}>
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
