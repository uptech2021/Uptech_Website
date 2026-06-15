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
  useReveal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDevClubModalOpen, setIsDevClubModalOpen] = useState(false);
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
    if (isVacancyDetailsModalOpen || isModalOpen || isDevClubModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => { document.body.classList.remove("no-scroll"); };
  }, [isVacancyDetailsModalOpen, isModalOpen, isDevClubModalOpen]);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-copy reveal">
            <p className="eyebrow">Join UpTech</p>
            <h1>Grow your skills with a real digital team.</h1>
            <p className="sub">At UpTech, you can build experience, work on real digital projects, and develop new skills in a supportive, creative environment.</p>
            <div className="htags">
              <span className="htag"><b>&#x25C6;</b> Careers</span>
              <span className="htag"><b>&#x25C6;</b> Developers Club</span>
              <span className="htag"><b>&#x25C6;</b> Growth</span>
              <span className="htag"><b>&#x25C6;</b> Innovation</span>
            </div>
          </div>
          <div className="hero-art reveal">
            <Image src="/images/careerPC.svg" alt="Join UpTech" width={480} height={480} className="floaty" />
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 L0,34 C240,2 480,2 720,22 C960,42 1200,42 1440,18 L1440,70 Z" fill="#FFFFFF"></path>
        </svg>
      </section>

      <div className="strip"><p>Grow your skills, work on <span className="hl">real projects</span>, and be part of something meaningful.</p></div>

      {/* DEVELOPERS CLUB */}
      <section className="band band-paper">
        <div className="wrap">
          <div className="club">
            <div className="reveal">
              <span className="eyebrow" style={{ color: "var(--blue)", display: "inline-block", marginBottom: 14 }}>Developers Club</span>
              <h2 className="sec-h" style={{ marginBottom: 18 }}>Learn, collaborate, and build real digital solutions.</h2>
              <p className="lead" style={{ marginBottom: 14 }}>The UpTech Software Developers Club is a community for people passionate about technology — whether they&apos;re just starting out or already have experience.</p>
              <p className="lead">Members collaborate on real projects, explore new technologies, share knowledge, and grow their skills in a supportive environment.</p>
              <div className="benefits">
                <div className="benefit"><span className="b">&#x2713;</span> Learn by doing</div>
                <div className="benefit"><span className="b">&#x2713;</span> Work on real projects</div>
                <div className="benefit"><span className="b">&#x2713;</span> Build practical skills</div>
                <div className="benefit"><span className="b">&#x2713;</span> Grow with a team</div>
              </div>
            </div>
            <div className="club-card reveal">
              <Image src="/images/devClub.svg" alt="Developers Club" width={180} height={150} className="floaty" />
              <h3>Join Our Developers Club</h3>
              <p>Connect with other developers, improve your skills, and become part of UpTech&apos;s growing technology community.</p>
              <button className="btn btn-accent" onClick={() => setIsDevClubModalOpen(true)}>Join Developers Club</button>
            </div>
          </div>
        </div>
      </section>

      {/* VACANCIES */}
      <section className="band band-navy">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Available Vacancies</span>
            <h2 className="sec-h">Discover where you fit</h2>
            <p className="lead" style={{ marginTop: 14 }}>Explore opportunities that match your skills and passion while growing in an environment that encourages experimentation, learning, and development.</p>
          </div>
          <div className="vac-list">
            {isLoading ? (
              <div style={{ textAlign: "center", padding: 40, color: "var(--on-blue)" }}>Loading vacancies...</div>
            ) : vacancies.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "var(--on-blue)" }}>There are no vacancies available right now. Please check back soon.</div>
            ) : (
              vacancies.map((v, i) => (
                <div key={i} className="vac reveal">
                  <div>
                    <div className="dept">{v.department}</div>
                    <h3>{v.title}</h3>
                    {v.status && <span className="status">{v.status}</span>}
                  </div>
                  <button className="btn btn-accent" onClick={() => handleViewDetails(v)}>View &amp; Apply</button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band band-mist">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }} className="reveal">
            <span className="eyebrow" style={{ color: "var(--blue)", display: "inline-block", marginBottom: 14 }}>Ready to Join?</span>
            <h2 className="sec-h">Your next opportunity could start here</h2>
            <p className="lead" style={{ margin: "16px 0 30px" }}>Review the available roles, reach out with your details, and our HR team will be in touch about next steps.</p>
            <Link href="/contact" className="btn btn-blue">Apply / Get in Touch</Link>
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
      <DevClubModal
        isOpen={isDevClubModalOpen}
        onClose={() => setIsDevClubModalOpen(false)}
        title="Developers Club Coming Soon!"
        message="We're working hard to bring you an amazing developers community experience. Stay tuned for the launch!"
      />

      <style jsx global>{`
        .no-scroll { overflow: hidden; }
      `}</style>
    </>
  );
}
