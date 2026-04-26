import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Image, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { db, storage } from "../lib/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JobApplicationModal({
  isOpen,
  onClose,
  department,
}: {
  isOpen: boolean;
  onClose: () => void;
  department: string;
}) {
  const [portfolioUrl, setPortfolioURL] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const portfolioInputRef = useRef<HTMLInputElement | null>(null);

  const handleResumeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragging");
    const file = e.dataTransfer.files[0];
    if (file) setResumeFile(file);
  };

  const handlePortfolioDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragging");
    const file = e.dataTransfer.files[0];
    if (file) setPortfolioFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("dragging");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragging");
  };

  const uploadFile = async (file: File, type: "resume" | "portfolio") => {
    const storageRef = ref(storage, `uploads/${type}/${file.name}`);
    setStatus("pending");

    try {
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);
      setStatus("idle");
      return fileUrl;
    } catch (error) {
      setErrorMessage("Failed to upload file");
      setStatus("error");
      return "";
    }
  };

  const removeResumeFile = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setResumeFile(null);
  };

  const removePortfolioFile = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPortfolioFile(null);
    setPortfolioURL("");
  };

  const resetFields = () => {
    setPortfolioURL("");
    setFirstName("");
    setLastName("");
    setContactNumber("");
    setEmail("");
    setResumeFile(null);
    setPortfolioFile(null);
    setErrorMessage("");
    setStatus("idle");
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let resumeFileUrl = "";
    let portfolioFileUrl = "";

    if (resumeFile) {
      resumeFileUrl = await uploadFile(resumeFile, "resume");
    }

    if (portfolioFile) {
      portfolioFileUrl = await uploadFile(portfolioFile, "portfolio");
    }

    setStatus("pending");

    try {
      const applicationsRef = collection(db, "applications");

      const q = query(
        applicationsRef,
        where("email", "==", email),
        where("position", "==", department)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrorMessage("You have already applied for this position.");
        setStatus("idle");
        toast.error("You have already applied for this position.");
        return;
      }

      await addDoc(applicationsRef, {
        firstName,
        lastName,
        contactNumber,
        email,
        resumeFileUrl,
        portfolioUrl,
        portfolioFileUrl: portfolioFileUrl || "",
        position: department,
        dateApplied: Timestamp.now(),
      });

      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: "uptechincorp@gmail.com",
          emailTemplate: "job_application_notification",
          dynamicData: {
            firstName,
            lastName,
            email,
            contactNumber,
            position: department,
            resumeLink: resumeFileUrl,
            portfolioLink: portfolioFileUrl || portfolioUrl,
          },
        }),
      });

      toast.success("Application submitted successfully!");
      setStatus("idle");
      setErrorMessage("");
      onClose();
      resetFields();
    } catch (error) {
      console.error("Error submitting application:", error);
      setStatus("error");
      setErrorMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/80 backdrop-blur-sm p-4">
        <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-purple-800 text-white p-6 md:p-8 flex-shrink-0">
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-yellow-300 rounded-full blur-3xl opacity-20" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-cyan-300 rounded-full blur-3xl opacity-20" />

            <div className="relative z-10 flex justify-between items-start gap-4">
              <div>
                <p className="text-yellow-300 font-bold uppercase tracking-widest text-sm mb-3">
                  Application Form
                </p>

                <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
                  {department} Application
                </h2>

                <span className="inline-block mt-4 bg-white/15 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
                  {department}
                </span>
              </div>

              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white hover:text-blue-950 text-white text-2xl font-bold flex items-center justify-center transition"
                aria-label="Close application form"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                      Resume
                    </label>

                    <div
                      className="upload-area"
                      onDrop={handleResumeDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => resumeInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={resumeInputRef}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setResumeFile(file);
                        }}
                      />

                      {resumeFile ? (
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-bold text-blue-950 truncate">
                            {resumeFile.name}
                          </span>
                          <X
                            className="w-5 h-5 text-red-600 cursor-pointer"
                            onClick={removeResumeFile}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center gap-2 text-center">
                          <Image className="w-8 h-8 text-blue-700" />
                          <p className="text-sm text-gray-700">
                            Drag and drop your resume here, or click to upload
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                      Portfolio File
                    </label>

                    <div
                      className="upload-area"
                      onDrop={handlePortfolioDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => portfolioInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={portfolioInputRef}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setPortfolioFile(file);
                        }}
                      />

                      {portfolioFile ? (
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-bold text-blue-950 truncate">
                            {portfolioFile.name}
                          </span>
                          <X
                            className="w-5 h-5 text-red-600 cursor-pointer"
                            onClick={removePortfolioFile}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center gap-2 text-center">
                          <Image className="w-8 h-8 text-blue-700" />
                          <p className="text-sm text-gray-700">
                            Drag and drop your portfolio here, or click to upload
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                    Portfolio URL Optional
                  </label>
                  <input
                    type="url"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioURL(e.target.value)}
                  />
                </div>

                {errorMessage && (
                  <div className="rounded-2xl bg-red-50 border border-red-100 text-red-700 px-4 py-3 text-sm font-bold">
                    {errorMessage}
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white p-5 md:p-6 border-t border-gray-100 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 border border-blue-100 text-blue-950 rounded-2xl font-bold hover:bg-blue-50 transition"
              >
                Close
              </button>

              <button
                type="submit"
                disabled={status === "pending"}
                onClick={(e) => {
                  const form = document.querySelector("form");
                  form?.requestSubmit();
                }}
                className="px-6 py-3 bg-yellow-300 text-blue-950 rounded-2xl font-bold hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "pending" ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .upload-area {
          min-height: 150px;
          border: 2px dashed #bfdbfe;
          border-radius: 1.5rem;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #f8fafc;
          transition: border-color 0.3s, background-color 0.3s, transform 0.3s;
        }

        .upload-area:hover {
          border-color: #1d4ed8;
          background: #eff6ff;
          transform: translateY(-2px);
        }

        .upload-area.dragging {
          border-color: #facc15;
          background: #fef9c3;
        }
      `}</style>
    </>
  );
}