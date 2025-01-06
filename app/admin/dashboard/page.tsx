'use client';
import ApplicationDetailsModal from '@/components/ApplicationDetailsModal';
import ApplicationTable from '@/components/ApplicationTable';
import EmailUserModal from '@/components/EmailUserModal';
import { auth, db } from '@/firebase/firebase';
import adminAuth from '@/hoc/adminAuth';
import { Application, Job } from '@/types/dashboard';
import { signOut } from 'firebase/auth';
import { collection, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AdminDashboard() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push('/admin/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const loadJobs = async () => {
    try {
      const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const jobsData = snapshot.docs.map((doc) => doc.data() as Job);
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const loadApplications = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'applications'));
      const applicationsData: Application[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Application));
      setApplications(applicationsData);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  const handleApplicationClick = (application: Application) => {
    setSelectedApplication(application);
  };

  const handleApplicationUpdate = async (applicationId: string, status: string, reason: string) => {
    try {
        // Update application status logic
        await updateApplicationStatus(applicationId, status, reason);
        toast.success(`Application ${status} successfully!`);
    } catch (error) {
        console.error('Error updating application:', error);
        toast.error('Failed to update application status.');
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string, reason: string) => {
    try {
        const applicationRef = doc(db, 'applications', applicationId);
        await updateDoc(applicationRef, { status, reason });
        setApplications((prevApplications) =>
            prevApplications.map((app) =>
                app.id === applicationId ? { ...app, status, reason } : app
            )
        );
    } catch (error) {
        console.error('Error updating application status:', error);
        toast.error('Failed to update application status.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([loadJobs(), loadApplications()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer />
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
                <ApplicationTable
                  applications={applications}
                  onApplicationClick={handleApplicationClick}
                  handleApplicationUpdate={handleApplicationUpdate}
                />
              </div>
            </div>
          </div>
        </main>

        <EmailUserModal />

        {/* Application Details Modal */}
        {selectedApplication && (
          <ApplicationDetailsModal
            application={selectedApplication}
            onClose={() => setSelectedApplication(null)}
            onUpdateStatus={handleApplicationUpdate}
          />
        )}
      </div>
    </>
  );
}

export default adminAuth(AdminDashboard);
