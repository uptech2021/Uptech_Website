'use client';
import Image from 'next/image';
import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    // Toggle mobile menu
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuButton && mobileMenu) {
      menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // Function to animate elements when they come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('p, img');
      elements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add('animated');
        }
      });
    };

    // Custom function to check if an element is in the viewport
    const isInViewport = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // Initial call to animate elements on load
    animateOnScroll();

    // Call animateOnScroll when scrolling
    window.addEventListener('scroll', animateOnScroll);

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="bg-gray-100">
      <head>
        <title>Uptech Incorporated Limited</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className="2xl:w-8/12 xl:flex flex-col mx-auto container overflow-x-hidden">
        <header className="pt-4 px-6 flex flex-row items-center justify-between relative z-20">
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
              <li><a href="./">Home</a></li>
              <li><a href="../objectives">Objectives</a></li>
              <li><a href="../vacancy">Vacancy</a></li>
              <li><a href="#">About Us</a></li>
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
              <li><a href="../index.html">Home</a></li>
              <li><a href="../objectives">Objectives</a></li>
              <li><a href="../career">Vacancy</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </nav>
        </header>
        <div className="w-full h-1 bg-black my-4"></div>

        <div className="flex flex-col items-center text-center">
          <div className="w-full relative text-center lg:mt-10">
            {/* Mobile Image */}
            <div style={{ width: '140vw' }} className="-ml-16 md:hidden">
              <Image
                className="w-full h-full"
                src="/images/abg.svg"
                alt="background image"
                width={500}
                height={500}
              />
            </div>

            {/* PC Image */}
            <div className="hidden md:block ml-auto md:w-1/2">
              <Image
                className="w-full"
                src="/images/abgPc.svg"
                alt="background image"
                width={500}
                height={500}
              />
            </div>

            <Image
              style={{ width: '100vw' }}
              className="w-full"
              src="/images/rectangle.svg"
              alt="background image"
              width={500}
              height={500}
            />

            {/* Mobile Heading */}
            <div className="h-full absolute md:hidden top-0 mt-10 left-1/2 transform -translate-x-1/2 z-10">
              <h1>About Us</h1>
              <p className="mt-3 ThiccboiBold">
                Discover who we are and what drives our passion here!
              </p>
            </div>

            {/* PC/Tablet heading */}
            <div className="hidden md:flex w-8/12 ml-10 flex-col gap-3 text-left absolute top-0 -mt-10 md:mt-10">
              <h1>About Us</h1>
              <p className="ThiccboiBold">
                Discover who we are and what drives our <br /> passion here!
              </p>
            </div>
          </div>

          <main className="text-center m-10">
            <div className="mb-60 uppercase">
              <h2 className="blueText-dark uppercase lg:mb-40">OUR TEAM</h2>
              <div className="flex flex-col lg:flex-row lg:gap-20 items-center lg:mb-10">
                <div className="lg:w-1/2">
                  <h3 className="blueText-dark text-2xl mb-2">Rishi Kowlessar</h3>
                  <p className="mb-6 font-bold">FOUNDER /CHAIRMAN/ CEO</p>
                </div>
                <div className="lg:w-1/2">
                  <h3 className="blueText-dark text-2xl mb-2">Aaron Hazzard</h3>
                  <p className="mb-6 font-bold">CO-FOUNDER/VICE CHAIRMAN/Senior SOFTWARE ENGINEERING DIRECTOR</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-20 items-center lg:mb-10">
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Quanne Dann</h3>
                  <p className="mb-6 font-bold">DATABASE ADMINISTRATIVE DIRECTOR</p>
                </div>
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Romario Solomon</h3>
                  <p className="mb-6 font-bold">MARKETING AND BRAND MANAGER</p>
                </div>
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Kyle Nagee</h3>
                  <p className="mb-6 font-bold">JUNIOR SOFTWARE ENGINEERING DIRECTOR</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-20 items-center lg:mb-10">
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Hermione Ramsohan</h3>
                  <p className="mb-6 font-bold">JUNIOR SOFTWARE ENGINEERING</p>
                </div>
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Raushawn Mitchell</h3>
                  <p className="mb-6 font-bold">JUNIOR SOFTWARE ENGINEERING</p>
                </div>
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Josiah James</h3>
                  <p className="mb-6 font-bold">JUNIOR SOFTWARE ENGINEERING</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-20 items-center lg:mb-10">
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Ethan Ramsahai</h3>
                  <p className="mb-6 font-bold">JUNIOR SOFTWARE ENGINEERING</p>
                </div>
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Saeed Sinanan</h3>
                  <p className="mb-6 font-bold">JUNIOR SOFTWARE ENGINEERING</p>
                </div>
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Jason Dookeran</h3>
                  <p className="mb-6 font-bold">ADVISOR</p>
                </div>
                <div className="lg:w-1/3">
                  <h3 className="blueText-dark text-2xl mb-2">Xian Ramdass</h3>
                  <p className="mb-6 font-bold">ADVISOR</p>
                </div>
              </div>

              {/* Top Border */}
              <div className="px-6 py-12 space-y-12">
                <div className="flex justify-center md:w-1/2 mx-auto">
                  <Image
                    className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                    src="/images/top.svg"
                    alt="background image"
                    width={500}
                    height={500}
                  />
                </div>

                {/* Founder's Message */}
                <div className="text-center space-y-6">
                  <h2 className="text-2xl md:text-4xl font-bold blueText-dark uppercase" id="foundersMessage">
                    Founder's Message
                  </h2>
                  <p className="text-black text-lg md:text-xl font-semibold">
                    In 2014, I began Ourlime with a focus on sustainable relationships and dating. Facing challenges and an initial setback in 2016, I revisited and revamped the concept. After seven dedicated years, Ourlime is now a reality, reflecting my enduring vision. I hope users see its potential as a safe space for content and community management in their daily lives.
                  </p>
                </div>

                {/* Separator line */}
                <hr className="border-t-4 rounded-xl border-blue-600 opacity-50 w-3/4 mx-auto" />

                {/* Benefits */}
                <div className="text-center space-y-6">
                  <h2 className="text-2xl md:text-4xl font-bold blueText-dark uppercase">
                    Benefits of using the Ourlime Community Network
                  </h2>
                  <p className="text-black text-lg md:text-xl font-semibold">
                    Being part of a vibrant community enhances mental well-being by fostering a sense of belonging and mutual support. In such communities, everyone, including the vulnerable, becomes interactive and attuned to each other's needs. Joining the Ourlime Community Network offers exclusive content, ensures member privacy, provides direct feedback avenues, encourages innovative community strategies, and promotes mutual learning and conflict resolution.
                  </p>
                </div>

                {/* Separator line */}
                <hr className="border-t-4 rounded-xl border-blue-600 opacity-50 w-3/4 mx-auto" />

                {/* Our Story */}
                <div className="text-center space-y-6">
                  <h2 className="text-2xl md:text-4xl font-bold blueText-dark uppercase" id="ourStory">Our Story</h2>
                  <p className="text-black text-lg md:text-xl font-semibold">
                    Ourlime, founded by Rishi Kowlessar, emerged as a response to the gaps in contemporary social media, which often compromised user data and fostered unproductivity. Conceived after thorough brainstorming, Ourlime was introduced by October 2021 as a Private Communities Network. Rishi identified the need for a platform valuing user safety, data security, and genuine content control. Goals included promoting sustainable relationships, improved communication, robust networking, and tools to boost productivity. Launched online in January 2022 and on the Google Play store by March, Ourlime required significant refinements to match Rishi's vision. Funding challenges arose, but Rishi remained undeterred in his mission.
                  </p>
                </div>

                {/* Separator line */}
                <hr className="border-t-4 rounded-xl border-blue-600 opacity-50 w-3/4 mx-auto" />

                {/* The Way Forward */}
                <div className="text-center space-y-6">
                  <h2 className="text-2xl md:text-4xl font-bold blueText-dark uppercase" id="theWayForward">
                    The Way Forward
                  </h2>
                  <p className="text-black text-lg md:text-xl font-semibold">
                    Ourlime is preparing for a local launch in Trinidad and Tobago, aiming for broad accessibility via Google Play Store, Apple Store, and the web. Our focus is on delivering a well-researched, continually evolving product. Plans include introducing the Ourlime Messenger App, 3D capabilities, and AI integrations to enhance user experience and address key issues. A dedicated team is being formed to drive innovation, with ongoing efforts to secure funding for network expansion while ensuring Ourlime's independence from third parties. Our pioneering "Ourlime Private Communities Network" seeks to meet user needs and uphold unwavering integrity.
                  </p>
                </div>
              </div>

              {/* Bottom Border */}
              <div className="flex justify-center md:w-1/2 mx-auto">
                <Image
                  className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                  src="/images/bottom.svg"
                  alt="background image"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black px-5 py-20 flex flex-col gap-3">
        <div className="md:w-2/6 lg:w-1/4">
          <Image className="w-full" src="/images/footerLogo.svg" alt="footer logo" width={100} height={100} />
        </div>

        <div className="flex gap-5">
          <a href="https://wa.me/+18687104296" target="_blank" rel="noopener noreferrer">
            <Image className="w-8 md:w-6" src="/images/whatsapp.svg" alt="whatsapp" width={32} height={32} />
          </a>
          <a href="https://www.facebook.com/uptechtrinidad" target="_blank" rel="noopener noreferrer">
            <Image className="w-8 md:w-6" src="/images/facebook.svg" alt="facebook" width={32} height={32} />
          </a>
          <a href="https://www.instagram.com/uptech_tt/" target="_blank" rel="noopener noreferrer">
            <Image className="w-8 md:w-6" src="/images/instagram.svg" alt="instagram" width={32} height={32} />
          </a>
          <a href="https://www.linkedin.com/company/uptech-trinidad" target="_blank" rel="noopener noreferrer">
            <Image className="w-8 md:w-6" src="/images/linkedin.svg" alt="linkedin" width={32} height={32} />
          </a>
        </div>

        <p className="text-white">uptechtt@gmail.com</p>
        <p className="text-white">© 2023 Uptech Incorporated Limited</p>
      </footer>
    </div>
  );
}