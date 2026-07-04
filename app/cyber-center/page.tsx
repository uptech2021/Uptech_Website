"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import cyberCenterPhoto from "@/public/images/cyber_center.png";
import shoppingAdDesktop from "@/public/images/shopping_ad_desktop_new.png";
import shoppingAdMobile from "@/public/images/shopping_ad_desktop_new_mobile.png";

const serviceCategories = [
  {
    title: "Computer & Workspace Rental",
    description: "High-speed internet, comfortable workstations, and premium software access for productive work sessions.",
    items: ["Online classes", "Research & assignments", "Job applications", "Business administration", "Document preparation", "Online meetings", "Content creation", "Freelance work"],
    features: ["High-speed internet", "Microsoft Office", "ChatGPT Premium", "Canva Premium", "Charging outlets", "Quiet professional environment"],
  },
  {
    title: "Shared Workspace & Flexible Office",
    description: "Flexible desk options for professionals who need a productive space without long-term commitments.",
    items: ["Flexible hourly rental", "Daily passes", "Weekly/monthly desk options", "Professional environment", "Internet & equipment access", "Central Chaguanas location"],
    audience: ["Startup businesses", "Online retailers", "Insurance agents", "Real estate agents", "Consultants", "Remote employees", "Freelancers"],
  },
  {
    title: "Printing, Photocopying & Documents",
    description: "Full document services — from printing and binding to formatting and application assistance.",
    items: ["B&W printing", "Colour printing", "Photocopying", "Scanning", "Binding", "Laminating", "Emailing documents", "Document formatting", "Online application assistance"],
  },
  {
    title: "Typing & Administrative Support",
    description: "Professional document preparation and administrative help for job seekers, businesses, and individuals.",
    items: ["Resume preparation", "Cover letters", "Business letters", "Contracts", "Reports", "Forms & applications", "Data entry", "Typing services", "Email setup & support"],
  },
  {
    title: "Graphic Design Services",
    description: "Eye-catching visuals for your brand, events, and marketing needs — designed to grab attention.",
    items: ["Logos", "Flyers", "Posters", "Business cards", "Social media graphics", "Banners", "Event materials", "Digital advertisements"],
  },
  {
    title: "Website & App Development",
    description: "Modern websites and digital solutions built for your business, personal brand, or project.",
    items: ["Website consultation", "Design & development", "Business websites", "Landing pages", "E-commerce", "Mobile app consultation", "UX guidance", "Website maintenance"],
  },
  {
    title: "Marketing Consultancy",
    description: "Strategic guidance to improve your visibility, reach new customers, and build your brand online.",
    items: ["Digital marketing strategies", "Social media marketing", "Promotional campaigns", "Customer engagement", "Brand building", "Online visibility improvement"],
  },
  {
    title: "Virtual Office Services",
    description: "Establish a professional business presence without maintaining a full-time office.",
    items: ["Business address services", "Mail receiving", "Professional presence", "Administrative support", "Access to workspace when needed"],
  },
];

const trainingPrograms = [
  {
    title: "Computer Literacy Training",
    description: "Build confidence with technology through structured, beginner-friendly lessons.",
    audience: "Students, job seekers, adults returning to workforce, senior citizens, and beginners",
    topics: ["Computer Essentials", "Internet & Online Safety", "Email Usage", "MS Word / Excel / PowerPoint", "File Management", "Basic Digital Skills"],
  },
  {
    title: "Basic Website Development Course",
    description: "Learn to build and publish your own website — no prior experience required.",
    audience: "Anyone interested in creating websites — no coding background needed",
    topics: ["HTML Fundamentals", "CSS Styling", "Website Structure", "Basic Web Design", "Creating Personal Websites", "Publishing Online"],
  },
];

const whoWeServe = [
  "Students and lifelong learners",
  "Remote workers and online professionals",
  "Freelancers and virtual assistants",
  "Small business owners and entrepreneurs",
  "Startup companies",
  "Insurance and real estate agents",
  "Social media managers and content creators",
  "Job seekers and professionals",
  "Consultants and independent contractors",
  "Anyone needing a productive workspace",
];

const whyChoose = [
  "Affordable Pricing",
  "Convenient Chaguanas Location",
  "Professional Environment",
  "Modern Technology & Software",
  "Business Support Services",
  "Training & Education Programs",
  "Flexible Workspace Options",
  "Friendly & Knowledgeable Staff",
  "One-on-One Assistance Available",
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
            <h1 className="text-[clamp(2.3rem,4.4vw,3.7rem)] my-[18px] mb-[22px]">UpTech Business &amp; Cyber Center</h1>
            <p className="text-[1.15rem] text-on-blue max-w-[32rem] mb-[30px] leading-[1.6]">Your affordable workspace, business support &amp; technology hub. Professional workspace, technology services, training, and digital solutions for individuals, students, entrepreneurs, freelancers, and growing businesses.</p>
            <div className="flex gap-3.5 flex-wrap">
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Send Links via WhatsApp</a>
              <a href="tel:+18687104296" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-transparent text-white border-[1.5px] border-white/45 cursor-pointer transition-[transform,box-shadow,background] duration-[180ms] hover:bg-white hover:text-brand-700 hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Call 1 (868) 710-4296</a>
            </div>
          </div>
          <div className="relative flex justify-center reveal lg:order-none order-[-1] max-lg:max-w-[440px] max-lg:mx-auto">
            <div className="relative bg-white border border-line rounded-card p-3.5 shadow-card-lg max-w-[430px] mx-auto w-full">
              <span className="absolute top-[26px] right-[26px] z-[3] text-[.74rem] font-extrabold tracking-[.1em] uppercase text-accent-ink bg-accent py-[.42rem] px-[.8rem] rounded-full shadow-sm">&#x25CF; Open Now</span>
              <Image src={cyberCenterPhoto} alt="UpTech Business & Cyber Center" className="w-full rounded-[calc(22px-10px)] block" style={{ height: "auto" }} />
            </div>
          </div>
        </div>
        <svg className="block w-full h-auto -mt-px" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF"></path>
        </svg>
      </section>

      <div className="bg-navy-deep text-white text-center py-5 px-7">
        <p className="text-[1.05rem] font-semibold">One walk-in stop for <span className="text-accent">workspace, printing, business support, training &amp; digital help</span>.</p>
      </div>

      {/* Who We Serve */}
      <section className="py-[88px] max-sm:py-[60px] bg-paper">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">Who We Serve</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Built for people who need to get things done</h2>
            <p className="text-[1.075rem] text-ink-soft mt-3.5">Whether you&apos;re a student, entrepreneur, freelancer, or job seeker — our space and services are designed for you.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 reveal">
            {whoWeServe.map((item, i) => (
              <div key={i} className="bg-mist border border-line rounded-card-sm p-4 text-center transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-card">
                <p className="text-[.92rem] font-semibold text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-[88px] max-sm:py-[60px] bg-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-14 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">Our Services</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Everything you need in one convenient place</h2>
            <p className="text-[1.075rem] text-ink-soft mt-3.5">From workspace rental to marketing consultancy — comprehensive solutions for your personal and business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceCategories.map((cat, i) => (
              <div key={cat.title} className="bg-mist border border-line rounded-card p-7 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-card-lg reveal" style={{ transitionDelay: `${i * 40}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 w-[42px] h-[42px] rounded-[12px] bg-brand text-white grid place-items-center font-black text-[1rem]">{i + 1}</div>
                  <h3 className="font-bold text-[1.15rem]">{cat.title}</h3>
                </div>
                <p className="text-ink-soft text-[.95rem] mb-4">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="bg-white border border-line rounded-full py-[.3rem] px-[.75rem] text-[.8rem] font-medium text-ink-soft">{item}</span>
                  ))}
                </div>
                {cat.features && (
                  <div className="mt-4 pt-4 border-t border-line">
                    <p className="text-[.8rem] font-bold uppercase tracking-[.1em] text-brand mb-2">Includes</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.features.map((f) => (
                        <span key={f} className="bg-brand/10 text-brand rounded-full py-[.3rem] px-[.75rem] text-[.8rem] font-semibold">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
                {cat.audience && (
                  <div className="mt-4 pt-4 border-t border-line">
                    <p className="text-[.8rem] font-bold uppercase tracking-[.1em] text-brand mb-2">Ideal For</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.audience.map((a) => (
                        <span key={a} className="bg-brand/10 text-brand rounded-full py-[.3rem] px-[.75rem] text-[.8rem] font-semibold">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Education */}
      <section className="py-[88px] max-sm:py-[60px] bg-navy text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">Training & Education</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Courses designed for real-world skills</h2>
            <p className="text-[1.075rem] text-on-blue mt-3.5">Beginner-friendly programs to build your confidence with technology and the web.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trainingPrograms.map((program, i) => (
              <div key={program.title} className="bg-white/[.08] border border-white/[0.16] rounded-card p-8 backdrop-blur-sm reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 w-[42px] h-[42px] rounded-[12px] bg-accent text-accent-ink grid place-items-center font-black text-[1rem]">
                    {i === 0 ? "💻" : "🌐"}
                  </div>
                  <h3 className="text-[1.25rem] font-bold">{program.title}</h3>
                </div>
                <p className="text-on-blue text-[.97rem] mb-3">{program.description}</p>
                <p className="text-[.85rem] text-white/70 mb-4"><span className="font-semibold text-accent">Who it&apos;s for:</span> {program.audience}</p>
                <div className="grid grid-cols-2 gap-2">
                  {program.topics.map((topic) => (
                    <div key={topic} className="flex items-center gap-2">
                      <span className="text-accent text-[.85rem]">✓</span>
                      <span className="text-[.88rem] text-white/90">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <a href="https://wa.me/18687104296?text=I%27m%20interested%20in%20your%20training%20programs" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Enquire About Training</a>
          </div>
        </div>
      </section>

      {/* Shopping Ad Section */}
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
              <Image src={shoppingAdDesktop} alt="Online shopping assistance" className="w-full h-auto object-cover" style={{ height: "auto" }} />
            </div>
            <div className="flex lg:hidden rounded-[18px] overflow-hidden shadow-card-lg">
              <Image src={shoppingAdMobile} alt="Online shopping assistance" className="w-full h-auto object-cover" style={{ height: "auto" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-[88px] max-sm:py-[60px] bg-paper">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">Why Choose Us</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">What makes UpTech the right choice</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
            {whyChoose.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-mist border border-line rounded-card-sm p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-card">
                <span className="shrink-0 w-[32px] h-[32px] rounded-full bg-accent text-accent-ink grid place-items-center font-bold text-[.9rem]">✔</span>
                <p className="font-semibold text-[.97rem]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Us */}
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
              <h3 className="text-[1.4rem] mb-1.5">UpTech Business &amp; Cyber Center</h3>
              <p className="text-on-blue leading-normal">Downstairs Ramsingh&apos;s Plaza 2, opposite Mid-Center Mall, Chaguanas.</p>
              <div className="mt-5 mb-5">
                <div className="flex justify-between py-3 border-t border-white/[0.16] text-[.92rem]"><span className="text-on-blue">Phone / WhatsApp</span><span className="font-semibold text-white">710-4296 / 347-7214</span></div>
                <div className="flex justify-between py-3 border-t border-white/[0.16] text-[.92rem]"><span className="text-on-blue">Email</span><span className="font-semibold text-white">uptechincorp@gmail.com</span></div>
                <div className="flex justify-between py-3 border-t border-white/[0.16] text-[.92rem]"><span className="text-on-blue">Languages</span><span className="font-semibold text-white">English / Spanish</span></div>
                <div className="flex justify-between py-3 border-t border-white/[0.16] text-[.92rem]"><span className="text-on-blue">Best for</span><span className="font-semibold text-white">Walk-in digital help</span></div>
              </div>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-brand text-white shadow-glow-blue cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-brand-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Message on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
