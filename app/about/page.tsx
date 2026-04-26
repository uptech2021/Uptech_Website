"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect } from "react";

const teamSections = [
  {
    title: "Leadership Team",
    members: [
      {
        name: "Rishi Kowlessar",
        fullName: "Rishi Kowlessar",
        position: "Chairman / CEO",
        tag: "Director",
      },
      {
        name: "K. Nagee",
        fullName: "Kyle Nagee",
        position: "Vice Chairman / Senior Software Engineer / Head of Development",
        tag: "Director",
      },
      {
        name: "E. Ramsahai",
        fullName: "Ethan Ramsahai",
        position: "Head of Graphics & Multimedia",
        tag: "Director",
      },
      {
        name: "J. Lightfoot",
        fullName: "Jasmine Lightfoot",
        position: "Head of Human Resources / Software Developers Club",
        tag: "Director",
      },
    ],
  },
  {
    title: "Development & Design Team",
    members: [
      {
        name: "R. Mitchell",
        fullName: "Raushawn Mitchell",
        position: "Senior Software Engineer / Web Lead",
        tag: "Engineering",
      },
      {
        name: "A. Roopnarinesingh",
        fullName: "Amanda Roopnarinesingh",
        position: "Graphic / Web / App Designer",
        tag: "Design",
      },
      {
        name: "A. Ramjitsingh",
        fullName: "Amanda Ramjitsingh",
        position: "Assistant Head of Development",
        tag: "Engineering",
      },
      {
        name: "Z. Ramsaroop",
        fullName: "Zaria Ramsaroop",
        position: "Graphic Designer",
        tag: "Design",
      },
    ],
  },
  {
    title: "Operations & Cyber Center",
    members: [
      {
        name: "M. Kowlessar",
        fullName: "Mikelle Kerena Kowlessar",
        position: "Social Media Manager / Cyber Center Manager",
        tag: "Operations",
      },
    ],
  },
];

const values = ["Innovation", "Community", "Creativity", "Digital Growth"];

export default function About() {
  useEffect(() => {
    const revealOnScroll = () => {
      document.querySelectorAll(".reveal").forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (window.innerHeight > elementTop + 80) {
          element.classList.add("reveal-visible");
        }
      });
    };

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900">
      <main className="2xl:w-8/12 xl:flex flex-col mx-auto overflow-x-hidden bg-white shadow-2xl">
        <Header />

        {/* HERO */}
  <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-purple-800 text-white px-6 md:px-12 pt-28 pb-20 md:pt-12 md:pb-10">
  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center max-w-7xl mx-auto min-h-[620px]">

    <div className="reveal max-w-xl">
      <p className="text-yellow-300 font-bold tracking-widest uppercase mb-4">
        About UpTech
      </p>

      <h1 className="text-4xl md:text-5xl xl:text-[58px] font-extrabold leading-[1.05] mb-6 max-w-[620px]">
        Building digital solutions with purpose, creativity, and community.
      </h1>

      <p className="text-base md:text-lg text-blue-100 max-w-xl mb-8 leading-relaxed">
        UpTech Incorporated brings together developers, designers, and
        digital thinkers to create useful technology, support local
        businesses, and provide practical digital services through both
        our online brand and Cyber Center.
      </p>

      <div className="flex flex-wrap gap-3">
        {values.map((value) => (
          <span
            key={value}
            className="bg-white/15 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold"
          >
            {value}
          </span>
        ))}
      </div>
    </div>

    <div className="relative reveal flex justify-center lg:justify-end">
      <div className="absolute inset-0 bg-yellow-300 rounded-full blur-3xl opacity-20" />

      <Image
        src="/images/abgPc.svg"
        alt="About UpTech"
        width={620}
        height={620}
        className="relative z-10 w-full max-w-md lg:max-w-xl xl:max-w-2xl drop-shadow-2xl animate-float"
      />
    </div>

  </div>
</section>

        {/* BRAND STRIP */}
        <div className="bg-blue-600 text-white text-center py-5 px-6">
          <p className="text-lg md:text-xl font-bold text-yellow-300">
            Your strategic partner for digital growth, innovation, and real-world support.
          </p>
        </div>

        {/* WHO WE ARE */}
        <section className="px-6 md:px-12 py-20 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
            <div className="reveal">
              <p className="text-blue-600 font-bold uppercase tracking-widest mb-3">
                Who We Are
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mb-6">
                A modern tech company focused on practical impact.
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-5">
                UpTech Incorporated was created to help individuals, businesses,
                and communities access digital services in a simpler and more
                meaningful way. Our work includes software development, web and
                app design, graphic design, marketing support, and technology
                assistance.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Through UpTech Cyber Center, we also provide walk-in support for
                online shopping, printing, computer assistance, resume creation,
                study space, virtual court access, and other everyday digital
                needs.
              </p>
            </div>

            <div className="reveal bg-gradient-to-br from-yellow-300 via-green-200 to-cyan-300 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8">
                <h3 className="text-2xl font-extrabold text-blue-950 mb-4">
                  What drives us
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-blue-900">Digital Access</p>
                    <p className="text-gray-700">
                      Making technology easier for everyday people and local businesses.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-blue-900">Creative Solutions</p>
                    <p className="text-gray-700">
                      Combining design, development, and strategy to solve real problems.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-blue-900">Community Growth</p>
                    <p className="text-gray-700">
                      Building services that support learning, productivity, and opportunity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER MESSAGE */}
        <section className="px-6 md:px-12 py-20 bg-gradient-to-r from-yellow-300 via-green-200 to-cyan-300">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl reveal">
              <p className="text-blue-600 font-bold uppercase tracking-widest mb-3">
                Founder&apos;s Message
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-6">
                A vision built through persistence and purpose.
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed">
                In 2014, I began Ourlime with a focus on sustainable relationships
                and dating. Facing challenges and an initial setback in 2016, I
                revisited and revamped the concept. After seven dedicated years,
                Ourlime is now a reality, reflecting my enduring vision. I hope
                users see its potential as a safe space for content and community
                management in their daily lives.
              </p>

              <p className="mt-6 text-blue-900 font-bold">— Rishi Kowlessar</p>
            </div>
          </div>
        </section>

        {/* OURLIME CONTENT */}
        <section className="px-6 md:px-12 py-20 bg-white">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="reveal">
              <p className="text-blue-600 font-bold uppercase tracking-widest mb-3">
                Community Value
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-6">
                Benefits of using the Ourlime Community Network
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed">
                Being part of a vibrant community enhances mental well-being by
                fostering a sense of belonging and mutual support. In such
                communities, everyone, including the vulnerable, becomes
                interactive and attuned to each other&apos;s needs. Joining the
                Ourlime Community Network offers exclusive content, ensures
                member privacy, provides direct feedback avenues, encourages
                innovative community strategies, and promotes mutual learning and
                conflict resolution.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="reveal bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100">
                <p className="text-blue-600 font-bold uppercase tracking-widest mb-3">
                  Our Story
                </p>

                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-6">
                  How Ourlime began
                </h2>

                <p className="text-gray-700 text-lg leading-relaxed">
                  Ourlime, founded by Rishi Kowlessar, emerged as a response to the
                  gaps in contemporary social media, which often compromised user
                  data and fostered unproductivity. Conceived after thorough
                  brainstorming, Ourlime was introduced by October 2021 as a
                  Private Communities Network. Rishi Kowlessar identified the need
                  for a platform valuing user safety, data security, and genuine
                  content control. Goals included promoting sustainable
                  relationships, improved communication, robust networking, and
                  tools to boost productivity. Launched online in January 2022
                  and on the Google Play store by March, Ourlime required
                  significant refinements to match Rishi Kowlessar&apos;s vision.
                  Funding challenges arose, but Rishi Kowlessar remained undeterred
                  in his mission.
                </p>
              </div>

              <div className="reveal bg-blue-950 rounded-3xl p-8 shadow-lg text-white">
                <p className="text-yellow-300 font-bold uppercase tracking-widest mb-3">
                  The Way Forward
                </p>

                <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                  Where Ourlime is heading
                </h2>

                <p className="text-blue-100 text-lg leading-relaxed">
                  Ourlime is preparing for a local launch in Trinidad and Tobago,
                  aiming for broad accessibility via Google Play Store, Apple
                  Store, and the web. Our focus is on delivering a well-researched,
                  continually evolving product. Plans include introducing the
                  Ourlime Messenger App, 3D capabilities, and AI integrations to
                  enhance user experience and address key issues. A dedicated
                  team is being formed to drive innovation, with ongoing efforts
                  to secure funding for network expansion while ensuring
                  Ourlime&apos;s independence from third parties. Our pioneering
                  &quot;Ourlime Private Communities Network&quot; seeks to meet
                  user needs and uphold unwavering integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="px-6 md:px-12 py-20 bg-gradient-to-br from-blue-950 via-blue-700 to-purple-800 text-white">
          <div className="text-center max-w-3xl mx-auto mb-14 reveal">
            <p className="text-yellow-300 font-bold uppercase tracking-widest mb-3">
              Our Team
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
              Meet the people behind UpTech.
            </h2>

            <p className="text-blue-100 text-lg">
              Our team brings together leadership, software engineering, design,
              human resources, social media, and Cyber Center operations.
            </p>
          </div>

          <div className="space-y-14 max-w-7xl mx-auto">
            {teamSections.map((section) => (
              <div key={section.title} className="reveal">
                <h3 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-300">
                  {section.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.members.map((member) => (
                    <div
                      key={member.fullName}
                      className="group bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl hover:bg-white hover:text-blue-950 transition duration-300 hover:-translate-y-2"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-yellow-300 text-blue-950 font-extrabold text-xl flex items-center justify-center mb-5 shadow-lg">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .replace(".", "")}
                      </div>

                      <p className="text-xs font-bold uppercase tracking-widest text-yellow-300 group-hover:text-blue-700 mb-3">
                        {member.tag}
                      </p>

                      <h4 className="text-xl font-extrabold mb-3">
                        {member.name}
                      </h4>

                      <p className="text-blue-100 group-hover:text-blue-900 text-sm leading-relaxed">
                        {member.position}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-16 bg-blue-950 text-white text-center">
          <div className="max-w-3xl mx-auto reveal">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
              Ready to connect with UpTech?
            </h2>

            <p className="text-blue-100 text-lg mb-8">
              Whether you need digital services, Cyber Center support, or want to
              learn more about our work, we are ready to assist.
            </p>

            <a
              href="https://wa.me/18687104296"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-300 text-blue-950 font-bold px-7 py-4 rounded-2xl hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}