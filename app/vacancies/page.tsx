'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import JobApplicationModal from '@/components/JobApplicationModal';
import Header from '@/components/Header';

const VacanciesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const handleApply = (positions: Array<string>) => {
    setSelectedPositions(positions);
    setIsModalOpen(true);
  };

  const [vacancies, setVacancies] = useState([
    {
      department: 'Graphic Design Vacancies',
      positions: ['Junior Graphic Designer', 'Graphic and Multimedia'],
      image: '/images/S4.svg',
      className: 'bg-blueTheme',
    },
    {
      department: 'Marketing Vacancies',
      positions: ['Accounts and Finance Officer', 'Marketing and Sales Specialist'],
      image: '/images/S2.svg',
      className: 'bg-blueTheme',
    },
    {
      department: 'Administrative and Public Relations Vacancies',
      positions: ['Human Resources Officer', 'Communications Specialist'],
      image: '/images/S1.svg',
      className: 'bg-blueTheme',
    },
    {
      department: 'Engineering Vacancies',
      positions: ['Software Engineer / Web/App Developer'],
      image: '/images/S3.svg',
      className: 'bg-gray-300',
    },
  ]);


  const loadVacancies = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'jobs'));
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVacancies(jobsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVacancies();
  }, []);

  const filteredVacancies =
    filter === 'all'
      ? vacancies
      : filter === 'vacancies'
      ? vacancies.filter((v) => v.className === 'bg-blueTheme')
      : vacancies.filter((v) => v.className === 'bg-gray-300');
  return (
    <div className="bg-gray-100">
      <div className="2xl:w-8/12 xl:flex flex-col mx-auto">
      <Header />

        <header className="flex flex-col items-center text-center">
          <div className="w-full relative text-center mt-10 lg:mt-20">
            <div className="w-full h-1/2 md:hidden">
              <img className="w-full h-full object-contain" src="/images/career.svg" alt="background image" />
            </div>

            <div className="hidden md:block ml-auto w-1/2">
              <img className="w-full h-full object-contain" src="/images/careerPC.svg" alt="background image" />
            </div>
            <img className="w-full h-full object-contain" src="/images/rectangle.svg" alt="background image" />

            {/* Mobile Heading */}
            <div
              className="pb-32 flex flex-col justify-between h-full absolute md:hidden top-0 left-1/2 transform -translate-x-1/2 z-10"
            >
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
          <p className="mt-20 mx-4 mb-20 text-lg lg:text-2xl lg:w-3/5 lg:mx-auto">
            Still looking for your place? Want to find your start? Well look no further, you can start your journey with
            us!
          </p>
          <div className="text-white self-start ml-4 mb-4 flex justify-center space-x-4">
            <button
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-300'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded ${filter === 'vacancies' ? 'bg-black text-white' : 'bg-gray-300'}`}
              onClick={() => setFilter('vacancies')}
            >
              Vacancies
            </button>
            <button
              className={`px-4 py-2 rounded ${filter === 'no-vacancies' ? 'bg-black text-white' : 'bg-gray-300'}`}
              onClick={() => setFilter('no-vacancies')}
            >
              No Vacancies
            </button>
          </div>
        </header>
        <main className="space-y-6 px-4">
  {loading ? (
    <p>Loading...</p>
  ) : (
    filteredVacancies.map((vacancy, idx) => (
      <div key={idx} className={`${vacancy.className} text-white rounded-md p-4 flex flex-row`}>
        <div className="w-2/5">
          {vacancy.image ? (
            <Image
              src={vacancy.image}
              alt={vacancy.department}
              width={150}
              height={100}
            />
          ) : (
            <Image
              src="/images/placeholder.svg" // Path to your placeholder image
              alt="Placeholder image"
              width={150}
              height={100}
            />
          )}
        </div>
        <div className="w-3/4 flex flex-col">
          <p className="font-bold text-lg">{vacancy.department}</p>
          <div className="mt-2 space-y-1">
            {vacancy.positions.map((pos: string, i: number) => (
              <p key={i} className="text-sm">{pos}</p>
            ))}
          </div>
          <button
            className="mt-4 bg-white text-blueTheme font-bold rounded-md px-4 py-2"
            onClick={() => handleApply(vacancy.positions)}
          >
            Apply
          </button>
        </div>
      </div>
    ))
  )}
</main>

        <JobApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          positions={selectedPositions}
        />
      </div>
    </div>
  );
};

export default VacanciesPage;