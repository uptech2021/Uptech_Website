'use client';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Objectives() {
  useEffect(() => {
    // Toggle mobile menu
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuButton && mobileMenu) {
      menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // Animation on scroll
    const animateOnScroll = () => {
      const fadeInElements = document.querySelectorAll('.fade-in');
      const flipInElements = document.querySelectorAll('.flip-in');
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      fadeInElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top + scrollTop;
        if (elementTop < scrollTop + windowHeight * 0.8) {
          element.classList.add('animated');
        }
      });

      flipInElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top + scrollTop;
        if (elementTop < scrollTop + windowHeight * 0.8) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger animation for elements already in view

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="bg-gray-100">
      <head>
        <title>Objectives</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className="2xl:w-8/12 xl:flex flex-col mx-auto">
        {/* Navbar */}
        <header className="pt-4 px-6 flex flex-row items-center justify-between relative">
          <div className="flex items-center gap-2 animate-slide-in" id="slide-in">
            <div className="w-15 h-15">
              <a href="../index.html">
                <Image
                  className="w-1/2 h-1/2"
                  src="/images/uptechlogo.svg"
                  alt="uptech logo"
                  width={100}
                  height={100}
                />
              </a>
            </div>
          </div>
          <nav className="hidden md:block">
            <ul className="flex flex-row gap-4">
              <li><a href="../">Home</a></li>
              <li><a href="#">Objectives</a></li>
              <li><a href="../career">Vacancy</a></li>
              <li><a href="../about">About Us</a></li>
            </ul>
          </nav>
          <Image
            src="/images/menu.svg"
            alt="menu"
            className="w-8 h-8 md:hidden cursor-pointer"
            id="menu-button"
            width={32}
            height={32}
          />
          <nav className="absolute top-16 right-6 bg-white p-4 rounded shadow-md md:hidden hidden z-30" id="mobile-menu">
            <ul className="flex flex-col gap-4">
              <li><a href="./">Home</a></li>
              <li><a href="#">Objectives</a></li>
              <li><a href="../career">Vacancy</a></li>
              <li><a href="../about">About Us</a></li>
            </ul>
          </nav>
        </header>
        <div className="w-full h-1 bg-black my-4"></div>

        {/* Main Section with SVG Background */}
        <div className="w-full relative text-center mt-5 top-section fade-in">
          <div className="w-full h-1/2 md:hidden">
            <Image
              className="w-full h-full object-contain"
              src="/images/objectivesBackground.svg"
              alt="background image"
              width={500}
              height={500}
            />
          </div>

          <div className="hidden md:block ml-auto md:w-1/2">
            <Image
              className="w-full h-full object-contain"
              src="/images/objectivesPc.svg"
              alt="background image"
              width={500}
              height={500}
            />
          </div>

          <Image
            className="w-full h-full object-contain"
            src="/images/rectangle.svg"
            alt="background image"
            width={500}
            height={500}
          />

          {/* Mobile Heading */}
          <div className="pb-28 flex flex-col justify-between h-full absolute md:hidden top-0 left-1/2 transform -translate-x-1/2 z-10">
            <h1 className="mt-24">Objectives</h1>
            <p className="ThiccboiBold">
              Ourlime Communities Network - Transforming social networking into a productive and enjoyable experience for communities and their members.
            </p>
          </div>

          {/* PC/Tablet heading */}
          <div className="hidden md:flex w-6/12 ml-10 flex-col gap-3 text-left absolute top-0 mt-20 lg:mt-0">
            <h1>Objectives</h1>
            <p className="ThiccboiBold">
              Ourlime Communities Network - <br className="hidden md:inline" />
              Transforming social networking into a productive and enjoyable experience for communities and their members.
            </p>
          </div>
        </div>

        {/* Objectives Section */}
        <section className="py-16 objective-section">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col items-center md:items-start">
              <section className="mt-8 animate-slide-in-left">
                <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">Welcome to Uptech Incorporated LLC</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Uptech Incorporated LLC, our primary mission is the development and launch of the Ourlime
                  Communities Network—a groundbreaking platform designed to revolutionize social networking.
                  Ourlime is built with tools and resources that promote meaningful social and professional
                  interactions while fostering productivity within a safe, secure, and user-controlled virtual
                  environment.
                  Our vision is to transform social networking into a space that combines productivity with
                  enjoyment, empowering communities and their members. Extensive research underscores a
                  strong demand for a platform that not only meets users’ networking needs but also prioritizes
                  privacy, security, personal growth, and overall user satisfaction.
                  Ourlime is the first social network purpose-built to inspire youth productivity in the modern
                  digital age. Featuring a suite of innovative solutions—including Project Management, E
                  Learning, and Shopping tools—integrated with advanced AI, AR and 3D technologies, Ourlime
                  offers a comprehensive and immersive experience. We’re dedicated to redefining what a social
                  network can be by creating an environment that enriches and enhances every aspect of its users’
                  virtual lives.
                </p>
              </section>
              <section className="mt-8 animate-slide-in-right">
                <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">Who was Ourlime conceptualized for?</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ourlime is designed to support organizations of all sizes and types, ranging from small local
                  groups to large global communities. Whether it’s secondary schools, universities, trade unions,
                  religious or political organizations, corporations, social groups, or news agencies, Ourlime
                  provides a versatile platform for all. Recognizing that everyone belongs to various social,
                  professional, private, or public communities, we aim to empower connections and collaboration
                  across every sphere.
                </p>
              </section>
            </div>
          </div>

          <section className="mt-12 md:mt-16">
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 flip-in">
                {/* User Safety */}
                <div className="flex flex-col items-center md:items-start">
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">USER SAFETY</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The implementation of algorithms to detect sensitive phrases, words, and duplicate accounts,
                    combined with robust user verification measures, would significantly enhance user safety. These
                    efforts aim to protect our users and communities from online criminal activities such as
                    cyberbullying, harassment, and cyberstalking. As part of our medium- to long-term objectives,
                    we plan to introduce a unique feature that users can utilize in emergencies, further strengthening
                    our commitment to creating a secure and supportive environment.
                  </p>
                </div>
                <div className="flex justify-center md:justify-start">
                  <Image
                    src="/images/userSafetyImage.svg"
                    alt="User Safety"
                    className="w-full"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 flip-in">
                {/* Privacy */}
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">PRIVACY</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The Ourlime user profile page will include advanced features designed to prioritize user privacy.
                    These features will offer customizable privacy settings, allowing users to control their level of
                    visibility and data access. Additionally, a secure password protection system will be
                    implemented, ensuring that stored files and other private content remain safeguarded even in the
                    event of an account breach.
                  </p>
                </div>
                <div className="order-last flex justify-center md:order-first">
                  <Image
                    src="/images/privacyImage.svg"
                    alt="Privacy"
                    className="w-full"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flip-in">
                {/* Data Security */}
                <div className="flex flex-col items-center md:items-start">
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">DATA SECURITY</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Personal data, including names, addresses, email addresses, contact information, and dates of
                    birth, will not be used for marketing purposes or sold to any third party for profit. For further
                    details, please refer to our Terms and Conditions and Privacy Policy.
                  </p>
                </div>
                <div className="flex justify-center md:justify-start">
                  <Image
                    src="/images/dataSecurityPicture.svg"
                    alt="Data Security"
                    className="w-full"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Footer */}
        <footer className="bg-black px-5 py-20 flex flex-col gap-3">
          <div className="md:w-2/6 lg:w-1/4">
            <Image className="w-full" src="/images/footerLogo.svg" alt="footer logo" width={100} height={100} />
          </div>

          <div className="flex gap-5">
            <a href="https://wa.me/+18687104296" target="_blank" rel="noopener noreferrer">
              <Image className="w-8 md:w-6" src="/images/whatsapp.svg" alt="whatsapp" width={32} height={32} />
            </a>
            <a href="https://www.instagram.com/uptechincorp/" target="_blank" rel="noopener noreferrer">
              <Image className="w-8 md:w-6" src="/images/instagram.svg" alt="instagram" width={32} height={32} />
            </a>
            <a href="https://www.linkedin.com/in/uptechincorp/" target="_blank" rel="noopener noreferrer">
              <Image className="w-8 md:w-6" src="/images/linkedin.svg" alt="linkedin" width={32} height={32} />
            </a>
            <a href="https://www.facebook.com/uptech.trendz" target="_blank" rel="noopener noreferrer">
              <Image className="w-8 md:w-6" src="/images/facebook.svg" alt="facebook" width={32} height={32} />
            </a>
          </div>

          <p className="text-white">
            Cooperation, Communication, Teamwork and Commitment
          </p>
        </footer>
      </div>
    </div>
  );
}