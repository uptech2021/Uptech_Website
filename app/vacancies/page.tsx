"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import JobApplicationModal from "@/components/JobApplicationModal";
import Header from "@/components/Header";
import DOMPurify from "dompurify";
import Footer from "@/components/Footer";
import DevClubModal from "@/components/DevelopersClubModal";

type Vacancies = {
  department: string;
  description: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};

const VacanciesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedVacancy, setExpandedVacancy] = useState<number | null>(null);
  const [isDevClubModalOpen, setIsDevClubModalOpen] = useState(false);

  const handleApply = (department: string) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const toggleVacancyDetails = (index: number) => {
    setExpandedVacancy(expandedVacancy === index ? null : index);
  };

  const [vacancies, setVacancies] = useState<Vacancies[]>([]);

  const loadVacancies = async () => {
    try {
      const vacanciesData = (await getDocs(collection(db, "jobs"))).docs.map(
        (doc) => doc.data() as Vacancies
      );
      //console.log(vacanciesData);

      setVacancies(vacanciesData);
    } catch (error) {
      console.error("Error loading vacancies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVacancies();
  });

  useEffect(() => {
    // Toggle mobile menu
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuButton && mobileMenu) {
      menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  });

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalOpen]);

  return (
    <>
      <style jsx global>{`
        .no-scroll {
          overflow: hidden;
        }
      `}</style>
      <div className="bg-gray-100">
        <div className="2xl:w-8/12 xl:flex flex-col mx-auto overflow-x-hidden">
          <Header />
          <div className="w-full h-1 bg-black my-4"></div>

          <header className="flex flex-col items-center text-center">
            <div className="w-full relative text-center mt-10 lg:mt-20">
              <div className="w-full h-1/2 md:hidden">
                <Image
                  className="w-full h-full object-contain"
                  src="/images/career.svg"
                  alt="background image"
                  width={150}
                  height={150}
                />
              </div>

              <div className="hidden md:block ml-auto w-1/2">
                <Image
                  className="w-full h-full object-contain"
                  src="/images/careerPC.svg"
                  alt="background image"
                  width={150}
                  height={150}
                />
              </div>
              <Image
                className="w-full h-full object-contain"
                src="/images/rectangle.svg"
                alt="background image"
                width={150}
                height={150}
              />

              {/* Mobile Heading */}
              <div className="h-full absolute md:hidden top-0 mt-10 left-1/2 transform -translate-x-1/2 z-10">
                <h1>Why Join Us?</h1>
                <p className="mt-3 ThiccboiBold">
                  Join our team and help create unforgettable experiences every
                  day!
                </p>
              </div>

              {/* PC/Tablet heading */}
              <div className="hidden md:flex w-8/12 ml-10 flex-col gap-3 text-left absolute top-0 -mt-10 md:mt-10">
                <h1>Why Join Us?</h1>
                <p className="ThiccboiBold">
                  Join our team and help create unforgettable experiences every
                  day!
                </p>
              </div>
            </div>
            <p className="mt-20 mx-4 mb-20 text-lg lg:text-2xl lg:w-3/5 lg:mx-auto">
              Your skills. Your passion. Your future. At our team, you’ll find
              more than just a career—you’ll find an environment that helps you
              grow, experiment, and develop new skills while taking on exciting
              opportunities.
            </p>
          </header>

          {/* Developers Club Section */}
          <div className="my-6 mx-4 md:mx-6 lg:mx-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Text info */}
              <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  About Uptech Software Developers Club
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    The Uptech Software Developers Club is a vibrant community
                    for anyone passionate about technology, whether you’re just
                    starting out or already have experience. We believe that
                    building apps, designing websites, or creating social
                    platforms shouldn’t be limited by degrees. What matters most
                    is curiosity, dedication, and the willingness to learn.
                  </p>
                  <p>
                    Our club offers a supportive environment where members can
                    collaborate on real projects, explore new technologies, and
                    grow their skills. By connecting with like minded
                    individuals, sharing knowledge, and working together, our
                    members achieve more than they could alone. With a range of
                    resources, hands-on opportunities, and a community driven
                    approach, the Uptech Developers Club is the perfect place to
                    turn your passion for technology into real world experience
                    and future success.
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Our Developers Club Benefits:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blueTheme rounded-full mr-3"></span>
                      Learn by doing - from the basics of coding to building
                      real websites and mobile apps.
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blueTheme rounded-full mr-3"></span>
                      Collaborate on real projects - social networks, commercial
                      websites, blogs, and mobile applications for iOS and
                      Android.
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blueTheme rounded-full mr-3"></span>
                      Grow with support - mentors, workshops, and a community of
                      learners who want to see you win.
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blueTheme rounded-full mr-3"></span>
                      Build your future - with practical skills that prepare you
                      for freelancing, tech jobs, or launching your own ideas.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Dev Club Rounded container*/}
              <div className="flex justify-center lg:justify-start w-full lg:w-auto">
                <div className="w-72 sm:w-80 md:w-96 lg:w-80 xl:w-80 h-72 sm:h-80 md:h-84 lg:h-96 xl:h-84 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                  {/* Temporary Image Placeholder */}
                  <div className="w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-48 bg-gray-200 rounded-lg mb-3 sm:mb-4 md:mb-5 flex items-center justify-center">
                    <Image
                      src="/images/devClub.svg"
                      alt="Developers Club"
                      width={100}
                      height={70}
                      className="sm:w-[130px] sm:h-[100px] md:w-[150px] md:h-[110px]"
                    />
                  </div>
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-grey-800 mb-3 sm:mb-4">
                    Join Our Developers Club Community
                  </h3>
                  {/* Desc */}
                  <p className="text-xs sm:text-sm text-grey-600 mb-4 sm:mb-6 px-2 sm:px-4">
                    Connect and learn with fellow developers and grow your
                    skills.
                  </p>
                  {/* Button */}
                  <div className="flex flex-col gap-2 sm:gap-3 w-full px-2 sm:px-4">
                    <button
                      className="relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base transform hover:scale-100 hover:shadow-lg backdrop-blur-md border border-green-500/80 animate-pulse"
                      onClick={() => setIsDevClubModalOpen(true)}
                    >
                      <span className="relative z-10">
                        Join Developers Club
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-11/12 mx-auto h-1 bg-gray-400 my-4"></div>

          {/* Vacancies Section */}
          <div className="flex-1 p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="inline-block">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 relative">
                  <span className="bg-gradient-to-r from-blueTheme to-blue-600 bg-clip-text">
                    Available Vacancies
                  </span>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blueTheme to-blue-600 rounded-full"></div>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Join our team and be part of something amazing. Discover
                  exciting career opportunities that match your skills and
                  passion, while growing in an environment that encourages
                  experimentation, continuous learning, and the development of
                  new skills.
                </p>
              </div>
            </div>
          </div>

          <main className="space-y-6 px-4 mb-10 xl:w-9/12 mx-auto">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              vacancies.map((vacancy, index) => (
                <div
                  key={index}
                  className={`text-white bg-blueTheme rounded-md p-4 flex flex-col md:flex-row `}
                >
                  <div className="w-full flex flex-col">
                    <h1 className="font-bold text-3xl">{vacancy.title}</h1>
                    <button
                      className="mt-2 bg-white text-blueTheme font-bold rounded-md px-2 py-1"
                      onClick={() => toggleVacancyDetails(index)}
                    >
                      {expandedVacancy === index
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                    {expandedVacancy === index && (
                      <div>
                        <div
                          className="mt-2 space-y-1"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(vacancy.description),
                          }}
                        />
                        <button
                          className="mt-4 bg-white text-blueTheme font-bold rounded-md px-4 py-2"
                          onClick={() => handleApply(vacancy.department)}
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </main>
          {selectedDepartment && (
            <JobApplicationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              department={selectedDepartment}
            />
          )}
        </div>

        <Footer />

        {/* Developers Club Modal*/}
        <DevClubModal
          isOpen={isDevClubModalOpen}
          onClose={() => setIsDevClubModalOpen(false)}
          title="Developers Club Coming Soon!"
          message="We're working hard to bring you an amazing developers community experience. Stay tuned for the launch!"
        />
      </div>
    </>
  );
};

export default VacanciesPage;
