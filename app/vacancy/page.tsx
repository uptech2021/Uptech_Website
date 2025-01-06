
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/firebase';

interface Job {
  id: string;
  title: string;
  description: string;
}

export default function Career() {
  const [jobListings, setJobListings] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Initialize Firebase and load job listings
    const initializeJobs = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const q = query(collection(db, 'jobs'), where('status', '==', 'open'));
        const snapshot = await getDocs(q);
        const jobs: Job[] = [];
        snapshot.forEach((doc: DocumentData) => {
          jobs.push({ id: doc.id, ...doc.data() });
        });
        setJobListings(jobs);
      } catch (error) {
        setErrorMessage('Failed to load job listings.');
      } finally {
        setLoading(false);
      }
    };

    initializeJobs();
  }, []);

  const showAll = () => {
    // Logic to show all job listings
  };

  const showVacancies = () => {
    // Logic to show only vacancies
  };

  const showNoVacancies = () => {
    // Logic to show no vacancies
  };

  return (
    <div className="bg-gray-100">
      <header>
        <title>Uptech Incorporated Limited</title>
        <link rel="icon" href="/favicon.ico" />
      </header>
      <div className="2xl:w-8/12 xl:flex flex-col mx-auto">
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
              <li><a href="#">Vacancy</a></li>
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
              <li><a href="../index.html">Home</a></li>
              <li><a href="../objectives">Objectives</a></li>
              <li><a href="#">Vacancy</a></li>
              <li><a href="../about">About Us</a></li>
            </ul>
          </nav>
        </header>
        <div className="w-full h-1 bg-black my-4"></div>

        <div className="flex flex-col items-center text-center">
          <div className="w-full relative text-center mt-10 lg:mt-20">
            <div className="w-full h-1/2 md:hidden">
              <Image
                className="w-full h-full object-contain"
                src="/images/career.svg"
                alt="background image"
                width={500}
                height={500}
              />
            </div>

            <div className="hidden md:block ml-auto w-1/2">
              <Image
                className="w-full h-full object-contain"
                src="/images/careerPC.svg"
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
            <div className="pb-32 flex flex-col justify-between h-full absolute md:hidden top-0 left-1/2 transform -translate-x-1/2 z-10">
              <h1 className="mt-32">Vacancies</h1>
              <p style={{ width: '90vw' }} className="ThiccboiBold">
                Join our team and help create unforgettable experiences every day!
              </p>
            </div>

            {/* PC/Tablet heading */}
            <div className="hidden md:flex w-8/12 ml-10 flex-col gap-3 text-left absolute top-0">
              <h1>Vacancies</h1>
              <p className="w-3/4 ThiccboiBold">
                Join our team and help create unforgettable experiences every day!
              </p>
            </div>
          </div>
          <main className="mt-20 mx-4 mb-20 text-lg">
            {loading ? (
              <p>Loading job listings...</p>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              jobListings.map(job => (
                <div key={job.id} className="job-listing">
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.description}</p>
                  <button className="apply-button" onClick={() => {/* Apply logic */}}>
                    Apply Now
                  </button>
                </div>
              ))
            )}
          </main>
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