"use client";
import ApplicationDetailsModal from "@/components/ApplicationDetailsModal";
import ApplicationTable from "@/components/ApplicationTable";
import SkeletonLoader from "@/components/SkeletonLoader";
import JobManagementModal from "@/components/JobManagementModal"; // Import Job Management Modal
import { auth, db } from "@/lib/firebase";
import adminAuth from "@/hoc/adminAuth";
import { Application } from "@/types/dashboard";
import { signOut } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isJobModalOpen, setIsJobModalOpen] = useState(false); // State for Job Management Modal

  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/admin/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const loadApplications = async () => {
    try {
      const snapshot = await getDocs(collection(db, "applications"));
      const applicationsData: Application[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Application)
      );
      setApplications(applicationsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading applications:", error);
      setIsLoading(false);
    }
  };

  const handleApplicationClick = (application: Application) => {
    setSelectedApplication(application);
  };

  const handleApplicationUpdate = async (
    applicationId: string,
    status: string,
    reason: string
  ) => {
    try {
      await updateApplicationStatus(applicationId, status, reason);
      toast.success(`Application ${status} successfully!`);
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application status.");
    }
  };

  const updateApplicationStatus = async (
    applicationId: string,
    status: string,
    reason: string
  ) => {
    try {
      const applicationRef = doc(db, "applications", applicationId);
      await updateDoc(applicationRef, { status, reason });
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === applicationId ? { ...app, status, reason } : app
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status.");
    }
  };

  const filteredApplications = applications.filter((application) => {
    const matchesStatus =
      statusFilter === "All" || application.status === statusFilter;
    const matchesEmail = application.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesEmail;
  });

  const openJobModal = () => setIsJobModalOpen(true); // Open Job Modal
  const closeJobModal = () => setIsJobModalOpen(false); // Close Job Modal

  useEffect(() => {
    const fetchApplications = async () => {
      await loadApplications();
    };
    fetchApplications();
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
              <div className="flex flex-row gap-4 items-center">
                <button
                  id="logoutBtn"
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-900"
                >
                  Logout
                </button>

                <button
                  id="managementBtn"
                  onClick={openJobModal}
                  className="bg-blueTheme text-white px-4 py-1 rounded"
                >
                  Management
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
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search by email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded p-2 mb-4"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded p-2 mb-4 bg-white"
                  >
                    <option value="All">All</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                {applications.length === 0 ? (
                  <div className="flex flex-col gap-4">
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </div>
                ) : (
                  <ApplicationTable
                    applications={filteredApplications}
                    handleApplicationUpdate={handleApplicationUpdate}
                    onApplicationClick={handleApplicationClick}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Application Details Modal */}
        {selectedApplication && (
          <ApplicationDetailsModal
            application={selectedApplication}
            onClose={() => setSelectedApplication(null)}
            onUpdateStatus={handleApplicationUpdate}
          />
        )}

        {/* Job Management Modal */}
        {isJobModalOpen && (
          <JobManagementModal
            closeJobModal={closeJobModal}
            loadJobs={() => console.log("Load jobs logic")}
          />
        )}
      </div>
    </>
  );
}

export default adminAuth(AdminDashboard);
