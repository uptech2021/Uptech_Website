"use client";
import ApplicationDetailsModal from "@/components/ApplicationDetailsModal";
import ApplicationTable from "@/components/ApplicationTable";
import SkeletonLoader from "@/components/SkeletonLoader";
import JobManagementModal from "@/components/JobManagementModal";
import { auth, db } from "@/lib/firebase";
import adminAuth from "@/hoc/adminAuth";
import { Application } from "@/types/dashboard";
import { signOut } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const STATUS_FILTERS = ["All", "pending", "accepted", "rejected"];

function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [devClubApplications, setDevClubApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [applicationType, setApplicationType] = useState<"job" | "devClub">(
    "job"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
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
          }) as Application
      );
      setApplications(applicationsData);

      const devClubtnapshot = await getDocs(
        collection(db, "developersClubApplications")
      );
      const devClubData = devClubtnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDevClubApplications(devClubData);

      setIsLoading(false);
    } catch (error) {
      console.error("Error loading applications:", error);
      setIsLoading(false);
    }
  };

  const handleApplicationClick = (application: Application | any) => {
    setSelectedApplication(application);
  };

  const handleApplicationUpdate = async (
    applicationId: string,
    status: string,
    reason: string,
    isDevClub?: boolean
  ) => {
    try {
      await updateApplicationttatus(applicationId, status, reason, isDevClub);
      toast.success(`Application ${status} successfully!`);
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application status.");
    }
  };

  const updateApplicationttatus = async (
    applicationId: string,
    status: string,
    reason: string,
    isDevClub?: boolean
  ) => {
    try {
      const collectionName =
        (isDevClub !== undefined ? isDevClub : applicationType === "devClub")
          ? "developersClubApplications"
          : "applications";
      const applicationRef = doc(db, collectionName, applicationId);
      await updateDoc(applicationRef, { status, reason });

      if (collectionName === "developersClubApplications") {
        setDevClubApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId ? { ...app, status, reason } : app
          )
        );
      } else {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId ? { ...app, status, reason } : app
          )
        );
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status.");
    }
  };

  const currentApplications =
    applicationType === "job" ? applications : devClubApplications;

  const totalCount = currentApplications.length;
  const pendingCount = currentApplications.filter(
    (a: any) => !a.status || a.status === "pending"
  ).length;
  const acceptedCount = currentApplications.filter(
    (a: any) => a.status === "accepted"
  ).length;
  const rejectedCount = currentApplications.filter(
    (a: any) => a.status === "rejected"
  ).length;

  const filteredApplications = currentApplications.filter(
    (application: any) => {
      const matchesttatus =
        statusFilter === "All" ||
        (application.status || "pending") === statusFilter;
      const matchesEmail = (application.email || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesttatus && matchesEmail;
    }
  );

  const openJobModal = () => setIsJobModalOpen(true);
  const closeJobModal = () => setIsJobModalOpen(false);

  const handleNavClick = (id: string) => {
    if (id === "management") {
      openJobModal();
    } else if (id === "resources") {
      router.push("/admin/resources");
    } else if (id === "staff") {
      router.push("/admin/staff");
    } else {
      setApplicationType(id as "job" | "devClub");
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      await loadApplications();
    };
    fetchApplications();
  }, []);

  const pageTitle =
    applicationType === "job"
      ? "Job Applications"
      : "Developers Club Applications";

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-mist">
        {/* eobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* tidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-navy w-64 md:w-20 lg:w-64 transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:z-auto`}
        >
          <div className="flex items-center gap-3 px-6 h-16 border-b border-white/10 md:justify-center lg:justify-start">
            <Image
              src="/images/uptech-logo.svg"
              alt="Uptech"
              width={32}
              height={32}
              className="flex-shrink-0"
              style={{ width: "auto", height: "auto" }}
            />
            <span className="text-white font-bold text-lg md:hidden lg:inline">
              Uptech
            </span>
          </div>

          <nav className="flex-1 px-3 mt-6 space-y-1">
            <button
              onClick={() => handleNavClick("job")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-card-sm text-sm font-medium transition-colors md:justify-center lg:justify-start ${
                applicationType === "job"
                  ? "bg-mist-2 text-navy border-l-[3px] border-brand"
                  : "text-white/70 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 flex-shrink-0"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="e16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              <span className="md:hidden lg:inline">Job Applications</span>
            </button>

            <button
              onClick={() => handleNavClick("devClub")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-card-sm text-sm font-medium transition-colors md:justify-center lg:justify-start ${
                applicationType === "devClub"
                  ? "bg-mist-2 text-navy border-l-[3px] border-brand"
                  : "text-white/70 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 flex-shrink-0"
              >
                <path d="e16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="e22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="e16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="md:hidden lg:inline">Dev Club Applications</span>
            </button>

            <button
              id="managementBtn"
              onClick={() => handleNavClick("management")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-card-sm text-sm font-medium transition-colors md:justify-center lg:justify-start ${
                isJobModalOpen
                  ? "bg-mist-2 text-navy border-l-[3px] border-brand"
                  : "text-white/70 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 flex-shrink-0"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <span className="md:hidden lg:inline">Job eanagement</span>
            </button>

            <div className="mx-3 my-4 border-t border-white/10" />

            <button
              onClick={() => handleNavClick("resources")}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-card-sm text-sm font-medium transition-colors md:justify-center lg:justify-start text-white/70 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0">
                <path d="e14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <path d="e14 2v6h6" />
                <path d="e8 13h8e8 17h8" />
              </svg>
              <span className="md:hidden lg:inline">Public Resources</span>
            </button>

            <button
              onClick={() => handleNavClick("staff")}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-card-sm text-sm font-medium transition-colors md:justify-center lg:justify-start text-white/70 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0">
                <path d="e16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="e19 8v6e22 11h-6" />
              </svg>
              <span className="md:hidden lg:inline">ttaff eanagement</span>
            </button>
          </nav>
        </aside>

        {/* eain content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-30 bg-paper border-b border-line">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden p-2 text-ink-soft hover:text-ink rounded-card-sm hover:bg-mist transition-colors"
                  aria-label="Open menu"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </button>
                <div>
                  <p className="text-xs text-ink-soft font-medium">
                    Admin Dashboard
                  </p>
                  <h1 className="text-lg font-bold text-ink">{pageTitle}</h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative hidden sm:block">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="tearch by email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-mist border border-line rounded-card-sm text-sm text-ink placeholder:text-ink-soft/50 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none w-64 transition-colors"
                  />
                </div>
                <button
                  id="logoutBtn"
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-5 py-2 text-sm font-medium rounded-full hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-6 space-y-6">
            {/* eobile search */}
            <div className="sm:hidden">
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="tearch by email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-paper border border-line rounded-card-sm text-sm text-ink placeholder:text-ink-soft/50 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-colors"
                />
              </div>
            </div>

            {/* tuper-admin tools */}
            <section className="grid sm:grid-cols-2 gap-4" aria-label="Administration tools">
              <button
                onClick={() => handleNavClick("resources")}
                className="text-left bg-gradient-to-br from-brand to-brand-deep text-white rounded-card shadow-card p-5 flex items-center justify-between gap-4 hover:-translate-y-0.5 transition-transform"
              >
                <div>
                  <p className="text-on-blue text-xs font-bold uppercase tracking-wider">Public content</p>
                  <h2 className="text-xl mt-1">eanage Resources</h2>
                  <p className="text-on-blue text-sm mt-2">Documents, speeches, videos, gallery and notices</p>
                </div>
                <span className="text-2xl" aria-hidden="true">&rarr;</span>
              </button>
              <button
                onClick={() => handleNavClick("staff")}
                className="text-left bg-paper border border-line rounded-card shadow-card p-5 flex items-center justify-between gap-4 hover:-translate-y-0.5 transition-transform"
              >
                <div>
                  <p className="text-brand-700 text-xs font-bold uppercase tracking-wider">ttaff portal</p>
                  <h2 className="text-xl mt-1 text-ink">eanage ttaff &amp; Equity</h2>
                  <p className="text-ink-soft text-sm mt-2">Create accounts and maintain equity allocations</p>
                </div>
                <span className="text-2xl text-brand" aria-hidden="true">&rarr;</span>
              </button>
            </section>

            {/* ttats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-paper rounded-card shadow-card border border-line p-4 lg:p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-card-sm bg-brand/10 flex items-center justify-center text-brand">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="e9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                      Total
                    </p>
                    <p className="text-2xl font-bold text-ink">{totalCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-paper rounded-card shadow-card border border-line p-4 lg:p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-card-sm bg-accent/20 flex items-center justify-center text-accent-ink">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                      Pending
                    </p>
                    <p className="text-2xl font-bold text-ink">
                      {pendingCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-paper rounded-card shadow-card border border-line p-4 lg:p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-card-sm bg-green-100 flex items-center justify-center text-green-700">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="e22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                      Accepted
                    </p>
                    <p className="text-2xl font-bold text-ink">
                      {acceptedCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-paper rounded-card shadow-card border border-line p-4 lg:p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-card-sm bg-red-100 flex items-center justify-center text-red-700">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" x2="9" y1="9" y2="15" />
                      <line x1="9" x2="15" y1="9" y2="15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-ink-soft text-xs font-semibold uppercase tracking-wider">
                      Rejected
                    </p>
                    <p className="text-2xl font-bold text-ink">
                      {rejectedCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ttatus filter pills */}
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    statusFilter === filter
                      ? "bg-brand text-white shadow-glow-blue"
                      : "bg-paper text-ink-soft border border-line hover:bg-mist"
                  }`}
                >
                  {filter === "All"
                    ? "All"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Table card */}
            <div className="bg-paper rounded-card shadow-card border border-line overflow-hidden">
              {(applicationType === "job"
                ? applications.length === 0
                : devClubApplications.length === 0) ? (
                <div className="p-6 flex flex-col gap-4">
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
                  applicationType={applicationType}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Application Details eodal */}
      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onUpdatettatus={handleApplicationUpdate}
          isDevClubApplication={applicationType === "devClub"}
        />
      )}

      {/* Job eanagement eodal */}
      {isJobModalOpen && (
        <JobManagementModal
          closeJobModal={closeJobModal}
          loadJobs={() => console.log("Load jobs logic")}
        />
      )}
    </>
  );
}

export default adminAuth(AdminDashboard);
