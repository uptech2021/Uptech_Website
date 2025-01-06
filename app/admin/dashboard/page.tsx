'use client';
import ApplicationDetailsModal from '@/components/ApplicationDetailsModal';
import EmailUserModal from '@/components/EmailUserModal';
import JobApplicationModal from '@/components/JobApplicationModal';
import JobManagementModal from '@/components/JobManagementModal';
import { auth, db } from '@/firebase/firebase';
import adminAuth from '@/hoc/adminAuth';
import { signOut } from 'firebase/auth';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


interface Job {
  id: string;
  title: string;
  department: string;
  status: string;
  description: string;
}

function AdminDashboard() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isJobApplicationModalOpen, setIsJobApplicationModalOpen] = useState(false);

  const openJobModal = () => setIsJobModalOpen(true);
  const closeJobModal = () => setIsJobModalOpen(false);
  const openJobApplicationModal = () => setIsJobApplicationModalOpen(true);
  const closeJobApplicationModal = () => setIsJobApplicationModalOpen(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push('/admin/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  async function loadJobs() {
    try {
      const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const jobsData = snapshot.docs.map(doc => doc.data() as Job);
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  }


  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      <header className="bg-white shadow-lg">

        <div className="max-w-full mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/images/uptech-logo.svg"
                  alt="Uptech Logo"
                  className="h-8 w-auto"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="flex items-center">
              <button
                id="logoutBtn"
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        
      </header>

      <main className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Job Applications</h2>

              <div className="mb-6 flex flex-wrap gap-4">
                <select
                  id="positionFilter"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                >
                  <option value="">All Positions</option>
                </select>
                <select
                  id="statusFilter"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button
                  id="managementBtn"
                  onClick={openJobModal}
                  className="bg-blueTheme text-white px-4 py-1 rounded"
                >
                  Management
                </button>
              </div>

              {/* Applications Table */}
              <div className="overflow-x-auto bg-white rounded-lg shadow w-full">
                <div className="min-w-screen bg-gray-100">
                  <div className="w-full">
                    <table className="w-full table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FirstName</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LastName</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody id="applicationsTable" className="bg-white divide-y divide-gray-200">
                        {/* Applications will be loaded here */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              <div id="loadingState" className="hidden text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading applications...</p>
              </div>

              {/* Empty State */}
              <div id="emptyState" className="hidden text-center py-12">
                <p className="text-gray-500">No applications found</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Application Details Modal */}
      <ApplicationDetailsModal />
      
      {/* Job Management Modal */}
      {isJobModalOpen && (
        <JobManagementModal closeJobModal={closeJobModal} loadJobs={loadJobs} jobs={jobs} />
      )}

      {/* Email Modal For Emailing Users*/}
      <EmailUserModal />

      {/* Job Application Modal */}
      {isJobApplicationModalOpen && (
        <JobApplicationModal
          isOpen={isJobApplicationModalOpen}
          onClose={closeJobApplicationModal}
          positions={['Developer', 'Designer', 'Manager']} // Example positions
        />
      )}
    </div>
  );
}
export default adminAuth(AdminDashboard)