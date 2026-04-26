"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const agencyServices = [
  {
    title: "Graphic Design",
    desc: "We create visually stunning designs that capture attention and communicate your brand message clearly.",
    image: "/images/graphicservices.svg",
  },
  {
    title: "Marketing & Sales",
    desc: "We create marketing content designed to increase reach, attract leads, and support business growth.",
    image: "/images/marketing.svg",
  },
  {
    title: "Web/App Development",
    desc: "We help businesses build modern websites and apps that create smooth digital experiences.",
    image: "/images/webapp.svg",
  },
  {
    title: "Administrative Services",
    desc: "We provide reliable business support including data entry, customer support, and virtual assistance.",
    image: "/images/admin.svg",
  },
];

const cyberServices = [
  "Online Shopping Assistance",
  "Printing, Photocopying & Laminating",
  "Resume / CV Creation",
  "Website Development",
  "Graphic Design Services",
  "PC Repairs",
  "Cyber Cafe & Study Zone",
  "Computer Classes",
  "Email Setup & Account Assistance",
  "Virtual Court Support",
];

const steps = [
  { title: "Consult", image: "/images/consult.svg" },
  { title: "Choose", image: "/images/choose.svg" },
  { title: "Connect", image: "/images/connect.svg" },
  { title: "Receive", image: "/images/receive.svg" },
];

export default function Home() {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;

    if (publicKey) {
      emailjs.init(publicKey);
    }

    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".reveal");

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowBottom = window.innerHeight;

        if (windowBottom > elementTop + 100) {
          element.classList.add("reveal-visible");
        }
      });
    };

    animateOnScroll();
    window.addEventListener("scroll", animateOnScroll);

    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

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

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        toast.success(
          "Thank you for getting in touch. We'll get back to you soon!"
        );
        form.current?.reset();
      })
      .catch(() => {
        toast.error("Error sending email. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      <main className="2xl:w-8/12 xl:flex flex-col mx-auto overflow-x-hidden bg-white shadow-2xl">
        <Header />

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-purple-800 text-white px-6 md:px-12 pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center max-w-7xl mx-auto">
            <div className="reveal">
              <p className="text-yellow-300 font-bold tracking-widest uppercase mb-4">
                UpTech Incorporated
              </p>

             <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6 max-w-2xl">
              Digital services built to help your business grow.
             </h1>

              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                From branding and websites to online shopping support and cyber
                services, UpTech helps individuals and businesses access practical
                digital solutions.
              </p>  

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-yellow-300 text-blue-950 font-bold px-6 py-3 rounded-2xl hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg"
                >
                  Connect With Us
                </button>

                <a
                  href="https://wa.me/18687104296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/40 text-white font-bold px-6 py-3 rounded-2xl hover:bg-white hover:text-blue-900 transition transform hover:scale-105 text-center"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>

           <div className="relative reveal flex justify-center lg:justify-end">
  <div className="absolute inset-0 bg-yellow-300 rounded-full blur-3xl opacity-20" />
  <Image
    src="/images/newbg.svg"
    alt="UpTech digital services"
    width={460}
    height={460}
    className="relative z-10 w-full max-w-md lg:max-w-lg drop-shadow-2xl animate-float"
  />
</div>
          </div>
        </section>

        {/* CYBER CENTER AD BANNER */}
        <section className="relative overflow-hidden bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-800 text-white px-6 md:px-12 py-12">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-400 rounded-full blur-3xl opacity-30" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="reveal">
              <p className="text-yellow-300 font-bold uppercase tracking-widest mb-3">
                Now Open
              </p>

              <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
                Visit UpTech Cyber Center
              </h2>

              <p className="text-lg text-blue-50 mb-6">
                Your local walk-in hub for online shopping assistance, printing,
                PC support, resume creation, study space, computer classes, and
                everyday digital help.
              </p>

              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 mb-6">
                <p className="font-bold text-yellow-300 mb-2">Location:</p>
                <p>
                  Ramsingh&apos;s Plaza #2, opposite Mid-Center Mall, Chaguanas.
                </p>
                <p className="mt-2">
                  Fifth store on the right, downstairs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/18687104296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-300 text-blue-950 px-6 py-3 rounded-2xl font-bold text-center hover:bg-yellow-400 transition transform hover:scale-105"
                >
                  Send Links via WhatsApp
                </a>

                <a
                  href="tel:+18687104296"
                  className="bg-white text-blue-800 px-6 py-3 rounded-2xl font-bold text-center hover:bg-blue-50 transition transform hover:scale-105"
                >
                  Call 1(868)710-4296
                </a>
              </div>
            </div>

            <div className="reveal">
              <div className="bg-white rounded-3xl p-3 shadow-2xl transform hover:rotate-1 hover:scale-105 transition duration-500">
                <Image
                  src="/images/cyber_center.png"
                  alt="UpTech Cyber Center flyer"
                  width={700}
                  height={700}
                  className="rounded-2xl w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CYBER SERVICES */}
        <section className="px-6 md:px-12 py-16 bg-blue-950 text-white">
          <div className="text-center max-w-3xl mx-auto mb-10 reveal">
            <p className="text-yellow-300 font-bold uppercase tracking-widest mb-3">
              Cyber Center Services
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Everything you need in one convenient place.
            </h2>
            <p className="text-blue-100">
              Whether you need help ordering online, printing documents, fixing
              your PC, creating a resume, or using online services, UpTech Cyber
              Center is ready to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {cyberServices.map((service, index) => (
              <div
                key={service}
                className="reveal bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 text-center hover:bg-white hover:text-blue-950 transition duration-300 transform hover:-translate-y-2 shadow-lg"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-yellow-300 text-blue-950 font-extrabold flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="font-bold">{service}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AGENCY INTRO */}
        <section className="px-6 md:px-12 py-12 text-center">
          <p className="text-xl md:text-2xl font-bold text-blue-600 reveal">
            We&apos;re more than just a digital agency. We&apos;re your
            strategic partner in growth.
          </p>
        </section>

        <div className="bg-blue-600">
          <p className="text-white text-xl md:text-2xl font-normal text-center py-5">
            Here&apos;s how we help businesses like yours:
          </p>
        </div>

        {/* AGENCY SERVICES */}
        <section className="p-6 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {agencyServices.map((service, index) => (
              <div
                key={service.title}
                className="reveal group bg-blueTheme rounded-2xl p-6 text-white flex flex-col items-center text-center min-h-80 transform transition duration-500 hover:scale-105 hover:-translate-y-2 hover:bg-blue-600 shadow-xl"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <h2 className="text-xl font-extrabold mb-4">
                  {service.title}
                </h2>
                <p className="text-base mb-5">{service.desc}</p>
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full mt-auto object-contain group-hover:scale-110 transition duration-500"
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </div>
        </section>

       {/* ONLINE SHOPPING MINI AD */}
<section className="mx-6 md:mx-12 my-10 bg-gradient-to-r from-yellow-300 via-green-200 to-cyan-300 rounded-3xl p-8 md:p-10 shadow-2xl reveal">
  <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
    <div>
      <p className="font-bold text-blue-900 uppercase tracking-widest mb-2">
        Personal Online Orders
      </p>

      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">
        Send us your links. We help you shop easily.
      </h2>

      <p className="text-blue-950 text-lg mb-6">
        Customers can send product links from Amazon, SHEIN, Temu, and
        other online stores via WhatsApp. We assist with the process so
        shopping online feels simple and stress-free.
      </p>

      <a
        href="https://wa.me/18687104296"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-950 text-white font-bold px-6 py-3 rounded-2xl hover:bg-blue-800 transition transform hover:scale-105"
      >
        Start an Online Order
      </a>
    </div>

   <div className="relative w-full overflow-hidden rounded-3xl shadow-xl">

  {/* Mobile */}
  <Image
    src="/images/shopping_ad_mobile.png"
    alt="Online shopping assistance"
    width={600}
    height={800}
    className="block md:hidden w-full h-auto object-contain"
  />

  {/* Tablet */}
  <Image
    src="/images/shopping_ad_tablet.png"
    alt="Online shopping assistance"
    width={900}
    height={700}
    className="hidden md:block xl:hidden w-full h-auto object-contain"
  />

  {/* Desktop */}
  <Image
    src="/images/shopping_ad_desktop.png"
    alt="Online shopping assistance"
    width={1200}
    height={700}
    className="hidden xl:block w-full h-auto object-contain"
  />

</div>
  </div>
</section>

        {/* TAGLINE */}
        <div className="w-full text-white p-5 bg-blue-600 text-center">
          <h2 className="text-lg md:text-xl font-bold text-yellow-300">
            Freeing up your time, so you can focus on what matters most!
          </h2>
        </div>

        {/* STEPS */}
        <section className="p-6 md:p-10 text-center bg-gray-50">
          <h2 className="text-blue-600 font-extrabold text-2xl md:text-3xl mb-10 reveal">
            Four easy steps to your business solutions:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="reveal bg-blueTheme rounded-2xl p-6 text-white text-xl font-semibold flex flex-col items-center text-center shadow-xl hover:bg-blue-600 transition duration-500 h-80 w-60 mx-auto transform hover:scale-105 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span className="text-2xl font-extrabold">{step.title}</span>
                <Image
                  src={step.image}
                  alt={step.title}
                  className="w-40 h-40 mt-auto object-contain"
                  width={160}
                  height={160}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="p-4 text-center bg-blue-600 text-white">
          <h2 className="text-lg md:text-xl font-bold text-yellow-300">
            It really is that simple!
          </h2>
        </div>

        {/* CONTACT */}
        <section id="contact" className="bg-blueTheme p-4 md:p-10">
          <div className="text-center mb-8 reveal">
            <p className="text-2xl md:text-3xl font-light text-white">
              Ready to take the leap?
            </p>
          </div>

          <div className="bg-white rounded-3xl flex flex-col md:flex-row justify-between overflow-hidden shadow-2xl reveal">
            <div className="p-6 md:p-10 md:w-1/2">
              <h2 className="font-extrabold text-black text-3xl mb-6">
                Contact Us
              </h2>

              <p className="text-md md:text-lg font-bold mb-2">Email:</p>
              <p className="text-md md:text-lg text-gray-700 mb-4">
                uptechincorp@gmail.com
              </p>

              <p className="text-md md:text-lg font-bold mb-2">
                Call or WhatsApp:
              </p>
              <p className="text-md md:text-lg text-gray-700 mb-4">
                1-868-710-4296 or 1-868-492-5166
              </p>

              <p className="text-md md:text-lg font-bold mb-2">
                Cyber Center Location:
              </p>
              <p className="text-md md:text-lg text-gray-700 mb-4">
                Ramsingh&apos;s Plaza #2, opposite Mid-Center Mall, Chaguanas.
              </p>

              <div className="flex gap-5 mt-6 items-center">
                <a
                  href="https://wa.me/18687104296"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="w-8 hover:scale-125 transition"
                    src="/images/whatsapp.svg"
                    alt="whatsapp"
                    width={32}
                    height={32}
                  />
                </a>

                <a
                  href="https://www.instagram.com/uptechincorp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="w-8 hover:scale-125 transition"
                    src="/images/instagram.svg"
                    alt="instagram"
                    width={32}
                    height={32}
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/uptechincorp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="w-9 hover:scale-125 transition"
                    src="/images/linkedin.svg"
                    alt="linkedin"
                    width={32}
                    height={32}
                  />
                </a>

                <a
                  href="https://www.facebook.com/uptech.trendz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="w-8 hover:scale-125 transition"
                    src="/images/facebook.svg"
                    alt="facebook"
                    width={32}
                    height={32}
                  />
                </a>
              </div>
            </div>

            <div className="bg-blue-800 p-6 md:p-10 text-white md:w-1/2">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
                Leave us a message and we will get back to you.
              </h2>

              <form
                id="contact-form"
                ref={form}
                onSubmit={sendEmail}
                className="space-y-5"
              >
                <input type="hidden" name="contact_number" />

                <div>
                  <label htmlFor="first-name" className="block text-sm mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="user_firstname"
                    className="p-3 w-full bg-blue-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="user_lastname"
                    className="p-3 w-full bg-blue-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    className="p-3 w-full bg-blue-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm mb-1">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="message"
                    rows={4}
                    className="p-3 w-full bg-blue-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-yellow-300 text-blue-950 font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 disabled:opacity-50 transition"
                  >
                    {isLoading ? "Sending..." : "Submit"}
                  </button>

                  <button
                    type="reset"
                    disabled={isLoading}
                    className="bg-gray-300 text-blue-950 font-bold px-6 py-3 rounded-xl hover:bg-gray-400 disabled:opacity-50 transition"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-8 reveal">
            <p className="text-xl md:text-2xl font-light text-white">
              Your strategic partner for business growth!
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <ToastContainer />

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