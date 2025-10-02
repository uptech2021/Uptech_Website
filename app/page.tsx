"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/Footer";

export default function Home() {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize EmailJS
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;
    if (!publicKey) {
      console.error(
        "EmailJS public key is not defined in environment variables"
      );
      return;
    }
    emailjs.init(publicKey);

    // Toggle mobile menu
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuButton && mobileMenu) {
      menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // Animations on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        "section h2, section p, section img"
      );
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowBottom = window.innerHeight;

        // Check if the element is in view
        if (windowBottom > elementTop + 100) {
          element.classList.add("animate");
        }
      });
    };

    // Initial call
    animateOnScroll();

    // Animate on scroll
    window.addEventListener("scroll", animateOnScroll);

    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;

      setIsLoading(true);

      if (serviceId && templateId && publicKey) {
        emailjs
          .sendForm(
            serviceId,
            templateId,
            form.current,
            publicKey
          )
          .then((result) => {
            console.log("Thank you for getting in touch. We'll be sure to get back with you ASAP!", result.text);
            toast.success("Thank you for getting in touch. We'll be sure to get back with you ASAP!"); // Show success toast
          })
          .catch((error) => {
            console.error("Error sending email:", error);
            toast.error("Error sending email. Please try again."); // Show error toast
          })
          .finally(() => {
            setIsLoading(false); // Re-enable buttons
          });
      } else {
        if (!serviceId) {
          console.error("EmailJS service ID is missing.");
        }
        if (!templateId) {
          console.error("EmailJS template ID is missing.");
        }
        if (!publicKey) {
          console.error("EmailJS public key is missing.");
        }
      }
    }
  };

  return (
    <div className="bg-gray-100">
      <main className="2xl:w-8/12 xl:flex flex-col mx-auto overflow-x-hidden">
        <Header />
        <div className="w-full h-1 bg-black my-4"></div>

        {/* WELCOME */}
        <div
          className="relative text-center mt-20 py-12 md:py-20 p-6 text-white bg-blueTheme flex flex-col gap-3 items-center hero"
          style={{ top: "-50px", height: "auto" }}
        >
          <h1
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 md:text-7xl font-extrabold md:-mt-12 xl:-mt-20 welcome-heading"
            style={{ fontFamily: "'SavedByZero', sans-serif" }}
          >
            {/* Welcome Heading */}
          </h1>

          <div
            className="w-full h-3/4 md:hidden flex justify-center items-center"
            style={{ marginTop: "250px" }}
          >
            <Image
              className="w-full h-auto object-contain background-img"
              src="/images/newbg.svg"
              alt="background image"
              style={{ transform: "translateY(48px)" }}
              width={500}
              height={500}
            />
          </div>

          <div className="hidden md:block h-1/2 md:ml-auto md:w-1/2">
            <Image
              className="w-full h-full object-contain background-img"
              src="/images/newbg.svg"
              alt="background image"
              style={{ transform: "translateY(80px)" }}
              width={500}
              height={500}
            />
          </div>

          {/* Mobile Heading */}
          <div className="space-y-10 absolute md:hidden top-0 mt-10 z-10 mobile-heading">
            <div className="text-center flex flex-col items-center gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold z-10">
                A Digital Services <br />
                Company designed to <br />
                help your business <br />
                grow.
              </h2>
              <br />
              <button
                className="text-sm sm:text-base font-light rounded-xl text-blue-500 ThiccboiBold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 p-2 w-auto transition-all duration-300 backdrop-blur-md border border-yellow-300/50 animate-pulse"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Click here to connect with us!
              </button>
            </div>
          </div>

          {/* PC Heading */}
          <div className="hidden md:flex w-full md:mt-20 mt-28 xl:mt-28 flex-col gap-3 text-center absolute top-1/3 left-1/4 transform -translate-y-1/2 -translate-x-1/2 pc-heading justify-center items-center">
            <div className="text-center flex flex-col md:flex-grow items-center gap-6">
              <p className="ThiccboiBold tracking-tighter text-3xl md:text-4xl lg:text-5xl font-bold">
                A Digital Services <br />
                Company designed to <br />
                help your business <br />
                grow.
              </p>
              <button
                className="text-sm md:text-lg lg:text-lg font-light rounded-xl text-blue-500 ThiccboiBold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 p-2 w-auto transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-md border border-yellow-300/50 animate-pulse"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Click here to connect with us!
              </button>
            </div>
          </div>
        </div>
        <div className="w-full text-center py-2 px-4 md:px-12 -mt-8">
          <p className="text-xl md:text-2xl font-bold text-blue-500 mb-4">
            We're more than just a digital agency, We're your strategic partner
            in growth.
          </p>
        </div>

        <div className="bg-blue-600">
          <p className="text-white text-xl md:text-2xl font-normal text-center py-4">
            Here's How we help business like yours:
          </p>
        </div>

        {/* Cards Section */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Graphic Design Card */}
            <div className="bg-blueTheme rounded-sm p-6 text-white flex flex-col items-center text-center hover:bg-blue-600 min-h-80 transform transition hover:scale-105">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Graphic Design
              </h2>
              <p className="text-base sm:text-lg mb-4">
                We create visually stunning designs that capture attention and
                convey your brand's message effectively.
              </p>
              <Image
                src="/images/graphicservices.svg"
                alt="Graphic Design Services"
                className="w-full mt-auto object-cover"
                width={200}
                height={200}
              />
            </div>

            {/* Marketing & Sales Card */}
            <div className="bg-blueTheme rounded-sm p-6 text-white flex flex-col items-center text-center hover:bg-blue-600 min-h-80 transform transition hover:scale-105">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Marketing & Sales
              </h2>
              <p className="text-base sm:text-lg mb-4">
                Our marketing content is designed to drive traffic, generate
                leads, and boost conversions.
              </p>
              <Image
                src="/images/marketing.svg"
                alt="Marketing Services"
                className="w-full mt-auto object-cover"
                width={200}
                height={200}
              />
            </div>

            {/* Web/App Development Card */}
            <div className="bg-blueTheme rounded-sm p-6 text-white flex flex-col items-center text-center hover:bg-blue-600 min-h-80 transform transition hover:scale-105">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Web/App Developing
              </h2>
              <p className="text-base sm:text-lg mb-4">
                We help you build exceptional digital experiences that engage
                users and drive business growth.
              </p>
              <Image
                src="/images/webapp.svg"
                alt="Web Development"
                className="w-full mt-auto object-cover"
                width={200}
                height={200}
              />
            </div>

            {/* Administrative Services Card */}
            <div className="bg-blueTheme rounded-sm p-6 text-white flex flex-col items-center text-center hover:bg-blue-600 min-h-80 transform transition hover:scale-105">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Administrative Services
              </h2>
              <p className="text-base sm:text-lg mb-4">
                We provide efficient and reliable support from project
                management and data entry to customer support and virtual
                assistance.
              </p>
              <Image
                src="/images/admin.svg"
                alt="Administrative Services"
                className="w-full mt-auto object-cover"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>

        {/* Full-width Blue Box with Text */}
        <div className="w-full text-white p-4 bg-blue-600 text-center">
          <h2 className="text-lg md:text-xl font-bold text-yellow-300">
            Freeing up your time, so you can focus on what matters most!
          </h2>
        </div>

        {/* Steps Section */}
        <div className="p-6 text-center">
          <h2 className="text-blue-600 font-bold text-2xl md:text-3xl mb-6">
            FOUR EASY STEPS TO YOUR BUSINESS SOLUTIONS:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
            {/* Buttons with responsive sizing */}
            <button className="bg-blueTheme rounded-sm p-6 text-white text-xl font-semibold flex flex-col items-center text-center shadow-md hover:bg-blue-600 transition h-80 w-60 mx-auto transform hover:scale-105">
              <span className="text-2xl">Consult</span>
              <Image
                src="/images/consult.svg"
                alt="Consult Icon"
                className="w-38 h-38 mt-32"
                width={150}
                height={150}
              />
            </button>

            {/* Button for Choose */}
            <button className="bg-blueTheme rounded-sm p-6 text-white text-lg font-semibold flex flex-col items-center text-center shadow-md hover:bg-blue-600 transition h-80 w-60 mx-auto transform hover:scale-105">
              <span className="text-2xl">Choose</span>
              <Image
                src="/images/choose.svg"
                alt="Choose Icon"
                className="w-48 h-48 mt-28"
                width={100}
                height={100}
              />
            </button>

            {/* Button for Connect */}
            <button className="bg-blueTheme rounded-sm p-6 text-white text-lg font-semibold flex flex-col items-center text-center shadow-md hover:bg-blue-600 transition h-80 w-60 mx-auto transform hover:scale-105">
              <span className="text-2xl">Connect</span>
              <Image
                src="/images/connect.svg"
                alt="Connect Icon"
                className="w-48 h-48 mt-36"
                width={100}
                height={100}
              />
            </button>

            {/* Button for Receive */}
            <button className="bg-blueTheme rounded-sm p-6 text-white text-lg font-semibold flex flex-col items-center text-center shadow-md hover:bg-blue-600 transition h-80 w-60 mx-auto transform hover:scale-105">
              <span className="text-2xl">Receive</span>
              <Image
                src="/images/receive.svg"
                alt="Receive Icon"
                className="w-38 h-38 mt-28"
                width={150}
                height={150}
              />
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-4 text-center bg-blue-600 text-white">
          <h2 className="text-lg md:text-xl font-bold text-yellow-300">
            It really is that Simple!
          </h2>
        </div>
        <section id="contact" className="bg-blueTheme p-4 md:p-10">
          {/* Contact Section Heading */}
          <div className="text-center mb-6">
            <p className="text-2xl md:text-3xl font-light text-white">
              Ready to take the leap?
            </p>
          </div>

          {/* Contact Containers */}
          <div className="bg-white rounded-xl flex flex-col md:flex-row justify-between">
            {/* Contact Info */}
            <div className="rounded-xl p-4 md:p-10 md:w-1/2">
              <h2 className="font-bold text-black text-3xl mb-6">
                Contact Us:
              </h2>
              <p className="text-md md:text-lg font-bold mb-2">Email Us:</p>
              <p className="text-md md:text-lg text-gray-700 mb-4">
                uptechincorp@gmail.com
              </p>
              <p className="text-md md:text-lg font-bold mb-2">
                Call or Whatsapp:
              </p>
              <p className="text-md md:text-lg text-gray-700 mb-4">
                1-868-710-4296 or 1-868-492-5166
              </p>

              {/* Social Media Links */}
              <div className="flex gap-5 mt-6 lg:justify-start items-center">
                <a
                  href="https://wa.me/+18687104296"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="w-8 md:w-6"
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
                    className="w-8 md:w-6"
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
                    className="w-10 md:w-8"
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
                    className="w-8 md:w-6"
                    src="/images/facebook.svg"
                    alt="facebook"
                    width={32}
                    height={32}
                  />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-blue-800 rounded-xl p-4 md:p-10 text-white md:w-1/2">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
                Leave us a message and we will get back to you.
              </h2>
              <form
                id="contact-form"
                ref={form}
                onSubmit={sendEmail}
                className="space-y-6"
              >
                <input type="hidden" name="contact_number" />
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="user_firstname"
                      className="mt-1 p-2 w-full bg-blue-900 text-white rounded-md focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="user_lastname"
                      className="mt-1 p-2 w-full bg-blue-900 text-white rounded-md focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    className="mt-1 p-2 w-full bg-blue-900 text-white rounded-md focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="message"
                    rows={4}
                    className="mt-1 p-2 w-full bg-blue-900 text-white rounded-md focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 px-6 py-2 rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    disabled={isLoading}
                    className="bg-gray-400 px-6 py-2 rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Contact Section Heading */}
          <div className="text-center mb-6 mt-8">
            <p className="text-xl md:text-2xl font-light text-white">
              Your strategic partner for business growth!
            </p>
          </div>
        </section>
      </main>
      <Footer  />
      <ToastContainer />
    </div>
  );
}
