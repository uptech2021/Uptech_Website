"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-copy reveal">
            <p className="eyebrow">Get In Touch</p>
            <h1>Ready to take the leap?</h1>
            <p className="sub">Reach out by phone, WhatsApp, or email — or send us a message and we&apos;ll get back to you. We&apos;re your strategic partner for business growth.</p>
            <div className="hero-cta">
              <a href="#message" className="btn btn-accent">Send a Message</a>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="btn btn-ghost">WhatsApp Us</a>
            </div>
          </div>
          <div className="hero-art reveal" style={{ justifyContent: "flex-end" }}>
            <div className="qc-card">
              <a className="qc-item" href="tel:+18687104296">
                <span className="qc-ico">&#x1F4DE;</span>
                <span><span className="k">Call Us</span><span className="v">1-868-710-4296</span></span>
              </a>
              <a className="qc-item" href="https://wa.me/18687104296" target="_blank" rel="noopener">
                <span className="qc-ico"><Image src="/images/whatsapp.svg" alt="" width={22} height={22} /></span>
                <span><span className="k">WhatsApp</span><span className="v">Message us anytime</span></span>
              </a>
              <a className="qc-item" href="mailto:uptechincorp@gmail.com">
                <span className="qc-ico">&#x2709;&#xFE0F;</span>
                <span><span className="k">Email</span><span className="v">uptechincorp@gmail.com</span></span>
              </a>
            </div>
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#F1F6FF"></path>
        </svg>
      </section>

      {/* CONTACT */}
      <section className="band band-mist" id="message">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Contact Us</span>
            <h2 className="sec-h">Let&apos;s start a conversation</h2>
          </div>
          <div className="contact-grid reveal">
            <div className="contact-info">
              <h2>Contact Details</h2>
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

      {/* CTA */}
      <section className="band band-navy">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }} className="reveal">
            <h2 className="sec-h">Prefer to drop by?</h2>
            <p style={{ color: "var(--on-blue)", fontSize: "1.1rem", margin: "16px 0 30px" }}>Visit the UpTech Cyber Center in Chaguanas — fifth store on the right, downstairs at Ramsingh&apos;s Plaza #2.</p>
            <a href="https://maps.google.com/?q=Ramsingh's+Plaza+Chaguanas" target="_blank" rel="noopener" className="btn btn-accent">Get Directions</a>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </>
  );
}
