"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import aboutHeroImage from "@/public/images/abgPc.svg";

const teamSections = [
  {
    title: "Leadership Team",
    members: [
      { name: "Rishi Kowlessar", pos: "Founder / CEO / Chairman", tag: "Director" },
      {
        name: "K Nagee",
        pos: "Co-Founder / Director of Software Engineering",
        tag: "Director",
      },
      {
        name: "J Lightfoot",
        pos: "Director of Human Resources / Director of Uptech Software Developers Club",
        tag: "Director",
      },
      {
        name: "D Baptiste",
        pos: "Corporate Secretary",
        tag: "Director",
      },
    ],
  },
  {
    title: "Engineering Team",
    members: [
      { name: "R Mitchell", pos: "Senior Software Engineer / Web Lead", tag: "Engineering" },
      { name: "J Edwards", pos: "Senior Software Engineer", tag: "Engineering" },
      { name: "D Mar", pos: "Senior Trainee Software Engineer", tag: "Engineering" },
      { name: "C Mitchell", pos: "Junior Software Engineer", tag: "Engineering" },
      { name: "C Walker", pos: "Junior Trainee Software Engineer", tag: "Engineering" },
      { name: "C Lee Browne", pos: "Junior Trainee Software Engineer", tag: "Engineering" },
      { name: "N Logan", pos: "Junior Trainee Software Engineer / Beta Tester", tag: "Engineering" },
      { name: "A Ramjitsingh", pos: "Assistant to Director Software Engineering", tag: "Engineering" },
    ],
  },
  {
    title: "Design & Creative Team",
    members: [
      { name: "A Roopnarinesingh", pos: "Web / App Designer / Social Media Manager", tag: "Design" },
      { name: "S Persad", pos: "Graphics Designer / Beta Tester", tag: "Design" },
      { name: "K Alleyne", pos: "Graphics Designer / Beta Tester", tag: "Design" },
      { name: "Z Ramsaroop", pos: "Graphic Designer", tag: "Design" },
      { name: "K Girdiharry", pos: "Graphic Designer / Social Media Assistant", tag: "Design" },
    ],
  },
  {
    title: "Quality Assurance",
    members: [
      { name: "M Khan", pos: "Beta Tester", tag: "QA" },
    ],
  },
  {
    title: "Operations & Cyber Center",
    members: [
      {
        name: "I Oberlin",
        pos: "Manager - Uptech Business & Cyber Center",
        tag: "Operations",
      },
    ],
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function About() {
  useReveal();

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
              About UpTech
            </p>
            <h1 className="text-[clamp(2.3rem,4.4vw,3.7rem)] my-[18px] mb-[22px] max-w-[14ch]">
              Building digital solutions with purpose, creativity, and community.
            </h1>
            <p className="text-[1.15rem] text-on-blue max-w-[32rem] mb-[30px] leading-[1.6]">
              UpTech Incorporated brings together developers, designers, and digital thinkers to
              create useful technology, support local businesses, and provide practical digital
              services through both our online brand and Cyber Center.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <span className="bg-white/[.13] border border-white/[.22] backdrop-blur-[4px] py-[.55rem] px-[1.1rem] rounded-full font-bold text-[.92rem]">
                <b className="text-accent">◆</b> Innovation
              </span>
              <span className="bg-white/[.13] border border-white/[.22] backdrop-blur-[4px] py-[.55rem] px-[1.1rem] rounded-full font-bold text-[.92rem]">
                <b className="text-accent">◆</b> Community
              </span>
              <span className="bg-white/[.13] border border-white/[.22] backdrop-blur-[4px] py-[.55rem] px-[1.1rem] rounded-full font-bold text-[.92rem]">
                <b className="text-accent">◆</b> Creativity
              </span>
              <span className="bg-white/[.13] border border-white/[.22] backdrop-blur-[4px] py-[.55rem] px-[1.1rem] rounded-full font-bold text-[.92rem]">
                <b className="text-accent">◆</b> Digital Growth
              </span>
            </div>
          </div>
          <div className="relative flex justify-center reveal lg:order-none order-[-1] max-lg:max-w-[440px] max-lg:mx-auto">
            <Image
              src={aboutHeroImage}
              alt="About UpTech"
              width={480}
              height={480}
              className="animate-float w-full max-w-[480px]"
              style={{ height: "auto" }}
            />
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
            fill="#FFFFFF"
          />
        </svg>
      </section>

      {/* STRIP */}
      <div className="bg-navy text-white text-center py-5 px-6">
        <p className="font-extrabold text-[1.05rem]">
          Your strategic partner for{" "}
          <span className="text-accent">
            digital growth, innovation, and real-world support
          </span>
          .
        </p>
      </div>

      {/* WHO WE ARE */}
      <section className="py-[88px] max-sm:py-[60px] bg-paper">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="reveal">
              <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand inline-block mb-3.5">
                Who We Are
              </span>
              <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em] mb-[18px]">
                A modern tech company focused on practical impact.
              </h2>
              <p className="text-[1.075rem] text-ink-soft mb-4">
                UpTech Incorporated was created to help individuals, businesses, and communities
                access digital services in a simpler and more meaningful way. Our work includes
                software development, web and app design, graphic design, marketing support, and
                technology assistance.
              </p>
              <p className="text-[1.075rem] text-ink-soft">
                Through UpTech Cyber Center, we also provide walk-in support for online shopping,
                printing, computer assistance, resume creation, study space, virtual court access,
                and other everyday digital needs.
              </p>
            </div>
            <div className="bg-mist border border-line rounded-card p-[30px] reveal">
              <h3 className="text-[1.2rem] mb-5">What drives us</h3>
              <div className="border-b border-line/60 pb-5 mb-5">
                <div className="font-bold text-[1.05rem] mb-1">Digital Access</div>
                <p className="text-ink-soft text-[.95rem]">
                  Making technology easier for everyday people and local businesses.
                </p>
              </div>
              <div className="border-b border-line/60 pb-5 mb-5">
                <div className="font-bold text-[1.05rem] mb-1">Creative Solutions</div>
                <p className="text-ink-soft text-[.95rem]">
                  Combining design, development, and strategy to solve real problems.
                </p>
              </div>
              <div>
                <div className="font-bold text-[1.05rem] mb-1">Community Growth</div>
                <p className="text-ink-soft text-[.95rem]">
                  Building services that support learning, productivity, and opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER'S MESSAGE */}
      <section className="py-[88px] max-sm:py-[60px] bg-mist">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="text-center mb-[34px] reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">
              Founder&apos;s Message
            </span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em] mt-3.5">
              A vision built through persistence and purpose
            </h2>
          </div>
          <div className="founder-quote relative bg-white rounded-card p-10 pl-[70px] max-w-[760px] mx-auto shadow-card reveal">
            <p className="text-[1.075rem] text-ink-soft leading-[1.7]">
              In 2014, I began Ourlime with a focus on sustainable relationships and dating. Facing
              challenges and an initial setback in 2016, I revisited and revamped the concept. After
              seven dedicated years, Ourlime is now a reality, reflecting my enduring vision. I hope
              users see its potential as a safe space for content and community management in their
              daily lives.
            </p>
            <p className="mt-5 font-bold text-ink text-[.95rem]">
              — Rishi Kowlessar, Chairman / CEO
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNITY VALUE */}
      <section className="py-[88px] max-sm:py-[60px] bg-paper">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[760px] mb-10 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand inline-block mb-3.5">
              Community Value
            </span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em] mb-4">
              Benefits of the Ourlime Community Network
            </h2>
            <p className="text-[1.075rem] text-ink-soft">
              Being part of a vibrant community enhances well-being by fostering belonging and mutual
              support. Joining Ourlime offers exclusive content, ensures member privacy, provides
              direct feedback avenues, encourages innovative community strategies, and promotes mutual
              learning and conflict resolution.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-line rounded-card p-8 reveal">
              <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand">
                Our Story
              </span>
              <h3 className="text-[1.2rem] mt-3 mb-2.5">How Ourlime began</h3>
              <p className="text-ink-soft text-[.95rem] leading-[1.6]">
                Ourlime, founded by Rishi Kowlessar, emerged as a response to the gaps in
                contemporary social media, which often compromised user data and fostered
                unproductivity. Introduced in October 2021 as a Private Communities Network, it
                valued user safety, data security, and genuine content control — launched online in
                January 2022 and on Google Play by March, with refinements to match the
                founder&apos;s vision.
              </p>
            </div>
            <div className="bg-navy text-white rounded-card p-8 reveal">
              <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">
                The Way Forward
              </span>
              <h3 className="text-[1.2rem] mt-3 mb-2.5">Where Ourlime is heading</h3>
              <p className="text-on-blue text-[.95rem] leading-[1.6]">
                Ourlime is preparing for a local launch in Trinidad and Tobago, aiming for broad
                accessibility via Google Play, the Apple Store, and the web. Plans include the
                Ourlime Messenger App, 3D capabilities, and AI integrations. A dedicated team is
                driving innovation, with ongoing efforts to secure funding for expansion while
                keeping Ourlime independent of third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-[88px] max-sm:py-[60px] bg-navy text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="text-center reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">
              Our Team
            </span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">
              Meet the people behind UpTech
            </h2>
            <p className="text-[1.075rem] text-on-blue mt-3.5">
              Leadership, software engineering, design, human resources, social media, and Cyber
              Center operations — together under one roof.
            </p>
          </div>
          {teamSections.map((section) => (
            <div key={section.title} className="mt-12 reveal">
              <h3 className="text-[1.2rem] mb-5">{section.title}</h3>
              <div className={`${section.members.length <= 2 ? "flex flex-wrap justify-center" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"} gap-5`}>
                {section.members.map((m) => (
                  <div
                    key={m.name}
                    className="bg-white/[.08] border border-white/[0.16] rounded-card-sm p-6 text-center min-w-[220px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/[.12] grid place-items-center font-bold text-lg mx-auto mb-3">
                      {initials(m.name)}
                    </div>
                    <div className="inline-block bg-accent/20 text-accent text-[.75rem] font-bold px-3 py-[.3rem] rounded-full mb-2">
                      {m.tag}
                    </div>
                    <h4 className="text-[1.05rem] font-bold">{m.name}</h4>
                    <p className="text-on-blue text-[.88rem] mt-1">{m.pos}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-[88px] max-sm:py-[60px] text-white"
        style={{ background: "var(--field)" }}
      >
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[760px] mx-auto text-center reveal">
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">
              Ready to connect with UpTech?
            </h2>
            <p className="text-on-blue text-[1.1rem] mt-4 mb-[30px]">
              Whether you need digital services, Cyber Center support, or want to learn more about
              our work, we&apos;re ready to assist.
            </p>
            <div className="flex gap-3.5 flex-wrap justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap"
              >
                Contact Us
              </Link>
              <Link
                href="/vacancies"
                className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-transparent text-white border-[1.5px] border-white/45 cursor-pointer transition-[transform,box-shadow,background] duration-[180ms] hover:bg-white hover:text-brand-700 hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap"
              >
                Join the Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
