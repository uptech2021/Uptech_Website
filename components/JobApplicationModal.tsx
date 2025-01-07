import React, { useState,useRef } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { GalleryVertical, Image, X } from "lucide-react";
import { ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage';
import { storage } from '../firebase/firebase';

export default function JobApplicationModal({
  isOpen,
  onClose,
  department,
}: {
  isOpen: boolean;
  onClose: () => void;
  department: string;
}) {
  const [portfolioURL, setPortfolioURL] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
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
    e.currentTarget.classList.remove("dragging"); // Remove dragging class
    const file = e.dataTransfer.files[0];
    setResumeFile(file);
  };

  const handlePortfolioDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragging"); // Remove dragging class
    const file = e.dataTransfer.files[0];
    setPortfolioFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("dragging"); // Add dragging class
  };

  const uploadFile = async (file: File, type: "resume" | "portfolio") => {
    if (!file) return;

    let storageRef: StorageReference = ref(storage, `uploads/${type}/${file.name}`);
    if (type === "resume") {    
      storageRef = ref(storage, `uploads/${type}/${file.name}`);
      setStatus("pending");
    } else if (type === "portfolio") {    
      storageRef = ref(storage, `uploads/${type}/${file.name}`);
      setStatus("pending");
    }
      
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setStatus("idle");
    } catch (error) {
      setErrorMessage("Failed to upload file");
      setStatus("error");
    }
  };

  const removeResumeFile = () => {
    setResumeFile(null);
  };

  const removePortfolioFile = () => {
    setPortfolioFile(null);
    setPortfolioURL("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resumeFile) {
      await uploadFile(resumeFile, "resume");
    }
    if (portfolioFile) {
      await uploadFile(portfolioFile, "portfolio");
    }

    setStatus("pending"); // Set the status to pending while processing

    try {
      // Query to check if the user has already applied for the selected position
      const applicationsRef = collection(db, "applications");
      const q = query(
        applicationsRef,
        where("email", "==", email),
        where("position", "==", selectedPosition)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setErrorMessage("You have already applied for this position.");
        setStatus("idle");
        return;
      }

      // Add a new application if not already applied
      await addDoc(applicationsRef, {
        firstName,
        lastName,
        contactNumber,
        email,
        portfolioURL,
        position: department,
      });

      setStatus("idle");
      setErrorMessage("");
      onClose();
      resetFields();
    } catch (error) {
      console.error("Error submitting application:", error);
      setStatus("error");
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const resetFields = () => {
    setPortfolioURL("");
    setSelectedPosition("");
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
            {department} Application Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="First Name"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Last Name"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          {/* <div className="mb-2">
            <select
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Choose Position
              </option>
              <option value="Graphic Design Vacancies">
                Graphic Design Vacancies
              </option>
              <option value="Marketing Vacancies">Marketing Vacancies</option>
              <option value="Administrative and Public Relations Vacancies">
                Administrative and Public Relations Vacancies
              </option>
              <option value="Engineering Vacancies">
                Engineering Vacancies
              </option>
            </select>
          </div> */}
          <div className="mb-2">
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <div className="flex flex-col md:flex-row gap-4">
              {/* LEFT */}
              <div className="flex flex-col">
                <h6>RESUME</h6>
                <div
                  className="upload-area"
                  onDrop={handleResumeDrop}
                  onDragOver={handleDragOver}
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={resumeInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setResumeFile(file);
                      }
                    }}
                  />
                  {resumeFile ? (
                    <div className="file-info">
                      <span>{resumeFile.name}</span>
                      <X name="X" onClick={removeResumeFile} />
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <Image />
                      <p>Drag and drop your RESUME here, or click to upload</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col">
                <h6>PORTFOLIO</h6>
                <div
                  className="upload-area"
                  onDrop={handlePortfolioDrop}
                  onDragOver={handleDragOver}
                  onClick={() => portfolioInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={portfolioInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPortfolioFile(file);
                      }
                    }}
                  />
                  {portfolioFile ? (
                    <div className="file-info">
                      <span>{portfolioFile.name}</span>
                      <X name="X" onClick={removePortfolioFile} />
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <Image />
                      <p>Drag and drop your PORTFOLIO here, or click to upload</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
            <style jsx>{`
              .upload-area {
                border: 2px dashed #0070f3;
                padding: 20px;
                text-align: center;
                cursor: pointer;
                transition: border-color 0.3s, background-color 0.3s;
              }
              .upload-area:hover {
                border-color: #005bb5;
              }
              .upload-area.dragging {
                border-color: #00bfff; /* Change border color when dragging */
                background-color: rgba(0, 191, 255, 0.1); /* Light blue background */
              }
              .file-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
            `}</style>
          </div>
          <div className="mb-2">
            <input
              type="url"
              placeholder="Portfolio URL (optional)"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={portfolioURL}
              onChange={(e) => setPortfolioURL(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
          )}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 text-gray-800 font-bold rounded-md p-2 w-1/2 mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={status === "pending"}
              className={`${
                status === "pending" ? "bg-gray-500" : "bg-blueTheme"
              } text-white font-bold rounded-md p-2 w-1/2`}
            >
              {status === "pending" ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
