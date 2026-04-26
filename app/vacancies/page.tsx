"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobApplicationModal from "@/components/JobApplicationModal";
import DevClubModal from "@/components/DevelopersClubModal";
import VacancyDetailsModal from "@/components/VacancyDetailsModal";


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

export default function VacanciesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDevClubModalOpen, setIsDevClubModalOpen] = useState(false);
  const [isVacancyDetailsModalOpen, setIsVacancyDetailsModalOpen] =
    useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancies | null>(null);
  const [vacancies, setVacancies] = useState<Vacancies[]>([]);

  const handleApply = (department: string) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleViewDetails = (vacancy: Vacancies) => {
    setSelectedVacancy(vacancy);
    setIsVacancyDetailsModalOpen(true);
  };

  const loadVacancies = async () => {
    try {
      const vacanciesData = (await getDocs(collection(db, "jobs"))).docs.map(
        (doc) => doc.data() as Vacancies
      );

      setVacancies(vacanciesData);
    } catch (error) {
      console.error("Error loading vacancies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVacancies();
  }, []);

  useEffect(() => {
    if (isVacancyDetailsModalOpen || isModalOpen || isDevClubModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isVacancyDetailsModalOpen, isModalOpen, isDevClubModalOpen]);

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
<section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-purple-800 text-white px-6 md:px-12 pt-28 pb-20 md:pt-10 md:pb-8">
  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center max-w-7xl mx-auto min-h-[620px]">
    <div className="reveal max-w-xl">
      <p className="text-yellow-300 font-bold tracking-widest uppercase mb-4">
        Join UpTech
      </p>

      <h1 className="text-4xl md:text-5xl xl:text-[58px] font-extrabold leading-[1.05] mb-6 max-w-[620px]">
        Grow your skills with a real digital team.
      </h1>

      <p className="text-base md:text-lg text-blue-100 max-w-xl mb-8 leading-relaxed">
        At UpTech, you can build experience, work on real digital projects,
        and develop new skills in a supportive, creative environment.
      </p>

      <div className="flex flex-wrap gap-3">
        {["Careers", "Developers Club", "Growth", "Innovation"].map((value) => (
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
        src="/images/careerPC.svg"
        alt="Join UpTech"
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
            Grow your skills, work on real projects, and be part of something meaningful.
          </p>
        </div>

        {/* DEVELOPERS CLUB */}
        <section className="px-6 md:px-12 py-20 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div className="reveal">
              <p className="text-blue-600 font-bold uppercase tracking-widest mb-3">
                Developers Club
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mb-6">
                Learn, collaborate, and build real digital solutions.
              </h2>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  The UpTech Software Developers Club is a community for people
                  who are passionate about technology, whether they are just
                  starting out or already have experience.
                </p>

                <p>
                  Members can collaborate on real projects, explore new
                  technologies, share knowledge, and grow their skills in a
                  supportive environment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  "Learn by doing",
                  "Work on real projects",
                  "Build practical skills",
                  "Grow with a team",
                ].map((benefit) => (
                  <div
                    key={benefit}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-4 font-bold text-blue-950 shadow-sm"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal bg-gradient-to-br from-yellow-300 via-green-200 to-cyan-300 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 text-center">
                <Image
                  src="/images/devClub.svg"
                  alt="Developers Club"
                  width={240}
                  height={200}
                  className="mx-auto mb-6 animate-float"
                />

                <h3 className="text-2xl font-extrabold text-blue-950 mb-4">
                  Join Our Developers Club
                </h3>

                <p className="text-gray-700 mb-6">
                  Connect with other developers, improve your skills, and
                  become part of UpTech&apos;s growing technology community.
                </p>

                <button
                  className="bg-blue-950 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-800 transition transform hover:scale-105 shadow-lg"
                  onClick={() => setIsDevClubModalOpen(true)}
                >
                  Join Developers Club
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* VACANCIES */}
        <section className="px-6 md:px-12 py-20 bg-gradient-to-br from-blue-950 via-blue-700 to-purple-800 text-white">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <p className="text-yellow-300 font-bold uppercase tracking-widest mb-3">
              Available Vacancies
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
              Discover where you fit.
            </h2>

            <p className="text-blue-100 text-lg leading-relaxed">
              Explore opportunities that match your skills and passion while
              growing in an environment that encourages experimentation,
              learning, and development.
            </p>
          </div>

          <main className="space-y-6 max-w-5xl mx-auto">
            {isLoading ? (
              <div className="bg-white/10 border border-white/10 rounded-3xl p-8 text-center reveal">
                <p className="text-blue-100">Loading vacancies...</p>
              </div>
            ) : vacancies.length === 0 ? (
              <div className="bg-white/10 border border-white/10 rounded-3xl p-8 text-center reveal">
                <p className="text-blue-100">
                  There are no vacancies available right now. Please check back soon.
                </p>
              </div>
            ) : (
              vacancies.map((vacancy, index) => (
                <div
                  key={index}
                  className="reveal group bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl hover:bg-white hover:text-blue-950 transition duration-300 hover:-translate-y-2"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-yellow-300 group-hover:text-blue-700 mb-3">
                        {vacancy.department}
                      </p>

                      <h3 className="font-extrabold text-2xl md:text-3xl leading-tight mb-3">
                        {vacancy.title}
                      </h3>

                      {vacancy.status && (
                        <span className="inline-block bg-white/15 group-hover:bg-blue-100 text-white group-hover:text-blue-900 px-4 py-2 rounded-full text-sm font-bold">
                          {vacancy.status}
                        </span>
                      )}
                    </div>

                    <button
                      className="bg-yellow-300 text-blue-950 font-bold rounded-2xl px-6 py-3 hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg"
                      onClick={() => handleViewDetails(vacancy)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </main>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-16 bg-gray-50 text-center">
          <div className="max-w-3xl mx-auto reveal">
            <p className="text-blue-600 font-bold uppercase tracking-widest mb-3">
              Ready to Join?
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-5">
              Your next opportunity could start here.
            </h2>

            <p className="text-gray-700 text-lg">
              Review the available vacancies, view the details, and apply using
              the existing application form.
            </p>
          </div>
        </section>

        <VacancyDetailsModal
          isOpen={isVacancyDetailsModalOpen}
          onClose={() => setIsVacancyDetailsModalOpen(false)}
          vacancy={selectedVacancy}
          onApply={handleApply}
        />

        {selectedDepartment && (
          <JobApplicationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            department={selectedDepartment}
          />
        )}
      </main>

      <Footer />

      <DevClubModal
        isOpen={isDevClubModalOpen}
        onClose={() => setIsDevClubModalOpen(false)}
        title="Developers Club Coming Soon!"
        message="We're working hard to bring you an amazing developers community experience. Stay tuned for the launch!"
      />

      <style jsx global>{`
        .no-scroll {
          overflow: hidden;
        }

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