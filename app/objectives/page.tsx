"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect } from "react";

const focusAreas = [
  {
    title: "User Safety",
    image: "/images/userSafetyImage.svg",
    text: "The implementation of algorithms to detect sensitive phrases, words, and duplicate accounts, combined with robust user verification measures, would significantly enhance user safety. These efforts aim to protect users and communities from online criminal activities such as cyberbullying, harassment, and cyberstalking.",
  },
  {
    title: "Privacy",
    image: "/images/privacyImage.svg",
    text: "The Ourlime user profile page will include advanced features designed to prioritize user privacy. These features will offer customizable privacy settings, allowing users to control their level of visibility and data access.",
  },
  {
    title: "Data Security",
    image: "/images/dataSecurityPicture.svg",
    text: "Personal data, including names, addresses, email addresses, contact information, and dates of birth, will not be used for marketing purposes or sold to any third party for profit.",
  },
];

const audienceList = [
  "Secondary schools",
  "Universities",
  "Trade unions",
  "Religious organizations",
  "Political organizations",
  "Corporations",
  "Social groups",
  "News agencies",
];

export default function Objectives() {
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
        Objectives
      </p>

      <h1 className="text-4xl md:text-5xl xl:text-[58px] font-extrabold leading-[1.05] mb-6 max-w-[620px]">
        Building safer, smarter, and more productive communities.
      </h1>

      <p className="text-base md:text-lg text-blue-100 max-w-xl mb-8 leading-relaxed">
        Ourlime Communities Network is designed to create a safer,
        more meaningful, and more productive digital space for
        communities and their members.
      </p>

      <div className="flex flex-wrap gap-3">
        {["Safety", "Privacy", "Productivity", "Community"].map((value) => (
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
        src="/images/objectivesPc.svg"
        alt="Ourlime objectives"
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
            Building a secure, productive, and community-focused digital future.
          </p>
        </div>

        {/* INTRO */}
        <section className="px-6 md:px-12 py-20 bg-white">
          <div className="max-w-6xl mx-auto text-center reveal">
            <p className="text-blue-600 font-bold uppercase tracking-widest mb-3">
              Our Mission
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mb-6">
              Welcome to UpTech Incorporated LLC
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              At UpTech Incorporated LLC, our primary mission is the development
              and launch of the Ourlime Communities Network — a groundbreaking
              platform designed to revolutionize social networking. Ourlime is
              built with tools and resources that promote meaningful social and
              professional interactions while fostering productivity within a
              safe, secure, and user-controlled virtual environment.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mt-5">
              Our vision is to transform social networking into a space that
              combines productivity with enjoyment, empowering communities and
              their members. Ourlime is the first social network purpose-built
              to inspire youth productivity in the modern digital age, featuring
              innovative solutions such as project management, e-learning, and
              shopping tools integrated with advanced AI, AR, and 3D
              technologies.
            </p>
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="px-6 md:px-12 py-20 bg-gradient-to-r from-yellow-300 via-green-200 to-cyan-300">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="reveal">
              <p className="text-blue-700 font-bold uppercase tracking-widest mb-3">
                Who It Serves
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mb-6">
                Ourlime was built for communities of every size.
              </h2>

              <p className="text-lg text-blue-950 leading-relaxed">
                Ourlime is designed to support organizations ranging from small
                local groups to large global communities. Since everyone belongs
                to different social, professional, private, or public
                communities, the platform aims to empower connection,
                collaboration, and productivity across every sphere.
              </p>
            </div>

            <div className="reveal bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {audienceList.map((item) => (
                  <div
                    key={item}
                    className="bg-blue-950 text-white rounded-2xl p-4 font-bold text-center shadow-lg"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOCUS AREAS */}
        <section className="px-6 md:px-12 py-20 bg-gradient-to-br from-blue-950 via-blue-700 to-purple-800 text-white">
          <div className="text-center max-w-3xl mx-auto mb-14 reveal">
            <p className="text-yellow-300 font-bold uppercase tracking-widest mb-3">
              Core Objectives
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
              A platform designed around trust and protection.
            </h2>

            <p className="text-blue-100 text-lg">
              Ourlime focuses on improving user safety, protecting privacy, and
              strengthening data security so communities can interact with
              confidence.
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-10">
            {focusAreas.map((area, index) => (
              <div
                key={area.title}
                className={`reveal grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <p className="text-yellow-300 font-bold uppercase tracking-widest mb-3">
                    Objective {index + 1}
                  </p>

                  <h3 className="text-3xl md:text-4xl font-extrabold mb-5">
                    {area.title}
                  </h3>

                  <p className="text-blue-100 text-lg leading-relaxed">
                    {area.text}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Image
                    src={area.image}
                    alt={area.title}
                    width={420}
                    height={420}
                    className="w-full max-w-sm md:max-w-md drop-shadow-2xl animate-float"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL DIRECTION */}
        <section className="px-6 md:px-12 py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center reveal">
            <p className="text-blue-600 font-bold uppercase tracking-widest mb-3">
              The Bigger Goal
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mb-6">
              Redefining what a social network can be.
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ourlime is dedicated to creating an environment that enriches and
              enhances users’ virtual lives. By combining productivity,
              community management, digital safety, privacy, and innovation,
              Ourlime aims to offer a comprehensive and immersive experience for
              modern communities.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-16 bg-blue-950 text-white text-center">
          <div className="max-w-3xl mx-auto reveal">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
              Want to learn more about Ourlime?
            </h2>

            <p className="text-blue-100 text-lg mb-8">
              Connect with UpTech to learn more about the platform, our
              objectives, and our future direction.
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