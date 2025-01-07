"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import JobApplicationModal from "@/components/JobApplicationModal";
import Header from "@/components/Header";
import DOMPurify from "dompurify";
import Footer from "@/components/Footer";

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

  return (
    <div className="bg-gray-100">
      <div className="2xl:w-8/12 xl:flex flex-col mx-auto">
        <Header />

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
            <div className="pb-32 flex flex-col justify-between h-full absolute md:hidden top-0 left-1/2 transform -translate-x-1/2 z-10">
              <h1 className="mt-32">Vacancies</h1>
              <p style={{ width: "90vw" }} className="ThiccboiBold">
                Join our team and help create unforgettable experiences every
                day!
              </p>
            </div>

            {/* PC/Tablet heading */}
            <div className="hidden md:flex w-8/12 ml-10 flex-col gap-3 text-left absolute top-0">
              <h1>Vacancies</h1>
              <p className="w-3/4 ThiccboiBold">
                Join our team and help create unforgettable experiences every
                day!
              </p>
            </div>
          </div>
          <p className="mt-20 mx-4 mb-20 text-lg lg:text-2xl lg:w-3/5 lg:mx-auto">
            Still looking for your place? Want to find your start? Well look no
            further, you can start your journey with us!
          </p>
        </header>

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
                    {expandedVacancy === index ? "Hide Details" : "View Details"}
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
        {selectedDepartment && <JobApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          department={selectedDepartment}
        />}
        
      </div>

      <Footer />
    </div>
  );
};

export default VacanciesPage;
