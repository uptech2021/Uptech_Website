"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import JobApplicationModal from "@/components/JobApplicationModal";
import VacancyDetailsModal from "@/components/VacancyDetailsModal";
import careerPcImage from "@/public/images/careerPC.svg";

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
  useReveal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVacancyDetailsModalOpen, setIsVacancyDetailsModalOpen] = useState(false);
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
    if (isVacancyDetailsModalOpen || isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => { document.body.classList.remove("no-scroll"); };
  }, [isVacancyDetailsModalOpen, isModalOpen]);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero-aura relative overflow-hidden text-white" style={{ background: "var(--field)" }} id="top">
        <div className="relative z-[2] max-w-[1200px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1.02fr_.98fr] gap-12 items-center pt-20 pb-[84px]">
          <div className="reveal">
            <p className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">Join UpTech</p>
            <h1 className="text-[clamp(2.3rem,4.4vw,3.7rem)] my-[18px] mb-[22px]">Grow your skills with a real digital team.</h1>
            <p className="text-[1.15rem] text-on-blue max-w-[32rem] mb-[30px] leading-[1.6]">At UpTech, you can build experience, work on real digital projects, and develop new skills in a supportive, creative environment.</p>
            <div className="flex flex-wrap gap-[11px]">
              <span className="inline-flex items-center gap-1.5 bg-white/[.13] border border-white/[.22] backdrop-blur-[4px] py-[.55rem] px-[1.1rem] rounded-full font-bold text-[.92rem]"><b className="text-accent">&#x25C6;</b> Careers</span>
              <span className="inline-flex items-center gap-1.5 bg-white/[.13] border border-white/[.22] backdrop-blur-[4px] py-[.55rem] px-[1.1rem] rounded-full font-bold text-[.92rem]"><b className="text-accent">&#x25C6;</b> Growth</span>
              <span className="inline-flex items-center gap-1.5 bg-white/[.13] border border-white/[.22] backdrop-blur-[4px] py-[.55rem] px-[1.1rem] rounded-full font-bold text-[.92rem]"><b className="text-accent">&#x25C6;</b> Innovation</span>
            </div>
          </div>
          <div className="relative flex justify-center reveal lg:order-none order-[-1] max-lg:max-w-[440px] max-lg:mx-auto">
            <Image src={careerPcImage} alt="Join UpTech" width={480} height={480} className="animate-float" style={{ width: "auto", height: "auto" }} />
          </div>
        </div>
        <svg className="block w-full h-auto -mt-px" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF"></path>
        </svg>
      </section>

      {/* STRIP */}
      <div className="bg-navy text-white text-center py-5 px-6">
        <p className="font-extrabold text-[1.05rem]">Grow your skills, work on <span className="text-accent">real projects</span>, and be part of something meaningful.</p>
      </div>

      {/* VACANCIES */}
      <section className="py-[88px] max-sm:py-[60px] bg-navy text-white">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[640px] mx-auto text-center mb-12 reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-accent">Available Vacancies</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Discover where you fit</h2>
            <p className="text-[1.075rem] text-on-blue mt-3.5">Explore opportunities that match your skills and passion while growing in an environment that encourages experimentation, learning, and development.</p>
          </div>
          <div className="flex flex-col gap-4 mt-10">
            {isLoading ? (
              <div className="text-center p-10 text-on-blue">Loading vacancies...</div>
            ) : vacancies.length === 0 ? (
              <div className="text-center p-10 text-on-blue">There are no vacancies available right now. Please check back soon.</div>
            ) : (
              vacancies.map((v, i) => (
                <div key={i} className="bg-white/[.08] border border-white/[.16] rounded-card-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[.78rem] font-extrabold tracking-[.1em] uppercase text-accent mb-1.5">{v.department}</div>
                    <h3 className="text-[1.15rem]">{v.title}</h3>
                    {v.status && <span className="inline-block bg-accent/20 text-accent text-[.78rem] font-bold py-1 px-2.5 rounded-full mt-1.5">{v.status}</span>}
                  </div>
                  <button className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap shrink-0" onClick={() => handleViewDetails(v)}>View &amp; Apply</button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[88px] max-sm:py-[60px] bg-mist">
        <div className="max-w-[1200px] mx-auto px-7">
          <div className="max-w-[760px] mx-auto text-center reveal">
            <span className="font-extrabold text-[.82rem] tracking-[.16em] uppercase text-brand inline-block mb-3.5">Ready to Join?</span>
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-black tracking-[-0.025em]">Your next opportunity could start here</h2>
            <p className="text-[1.075rem] text-ink-soft mt-4 mb-[30px]">Review the available roles, reach out with your details, and our HR team will be in touch about next steps.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-brand text-white shadow-glow-blue cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-brand-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap">Apply / Get in Touch</Link>
          </div>
        </div>
      </section>

      <Footer />

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
    </>
  );
}
