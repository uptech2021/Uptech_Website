"use client";

import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FileText, X, User, Calendar, MapPin, Phone, Mail, MessageSquare, Code, Sparkles } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { db, storage } from "../lib/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "@emailjs/browser";
import type { DevelopersClubModalProps } from "../lib/types/developersClub";

export default function DevelopersClubModal({ 
  isOpen, 
  onClose, 
}: DevelopersClubModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [interestReason, setInterestReason] = useState("");
  const [hasSoftwareKnowledge, setHasSoftwareKnowledge] = useState<"yes" | "no" | "">("");
  const [softwareKnowledgeDetails, setSoftwareKnowledgeDetails] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  /**
   * Scrolls to first field when modal opens and initializes EmailJS
   */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const firstInput = document.getElementById("firstName");
        if (firstInput && formRef.current) {
          firstInput.scrollIntoView({ behavior: "smooth", block: "center" });
          firstInput.focus();
        }
      }, 300);
    }

    // Initialize EmailJS
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, [isOpen]);

  /**
   * Handles file drop for resume upload
   * @param e - Drag event
   */
  const handleResumeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragging");
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.type.includes("document") || file.type.includes("text"))) {
      setResumeFile(file);
      setFieldErrors(prev => ({ ...prev, resume: "" }));
    } else {
      toast.error("Please upload a valid document file (PDF, DOC, DOCX)");
      setFieldErrors(prev => ({ ...prev, resume: "Please upload a valid document file (PDF, DOC, DOCX)" }));
    }
  };

  /**
   * Handles drag over event for file upload area
   * @param e - Drag event
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("dragging");
  };

  /**
   * Handles drag leave event
   * @param e - Drag event
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragging");
  };

  /**
   * Uploads a file to Firebase Storage
   * @param file - File to upload
   * @returns Download URL of uploaded file
   */
  const uploadFile = async (file: File): Promise<string | undefined> => {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `developersClub/resumes/${fileName}`);
    setStatus("pending");
    try {
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);
      setStatus("idle");
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Failed to upload resume");
      setStatus("error");
      toast.error("Failed to upload resume. Please try again.");
      return undefined;
    }
  };

  /**
   * Removes the selected resume file
   */
  const removeResumeFile = () => {
    setResumeFile(null);
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  /**
   * Validates a single field
   * @param fieldName - Name of the field to validate
   * @param value - Value to validate
   * @returns Error message or empty string
   */
  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.trim().length < 2) return "First name must be at least 2 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return "First name can only contain letters, spaces, hyphens, and apostrophes";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.trim().length < 2) return "Last name must be at least 2 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return "Last name can only contain letters, spaces, hyphens, and apostrophes";
        return "";
      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        return "";
      case "address":
        if (!value.trim()) return "Address is required";
        if (value.trim().length < 10) return "Please provide a complete address";
        return "";
      case "contactNumber":
        if (!value.trim()) return "Contact number is required";
        if (!/^\d+$/.test(value)) return "Contact number can only contain numbers";
        if (value.length < 7) return "Contact number must have at least 7 digits";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return "";
      case "interestReason":
        if (!value.trim()) return "Please tell us why you want to join";
        const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
        if (wordCount < 50) return `Please provide at least 50 words (currently ${wordCount} words)`;
        return "";
      case "softwareKnowledgeDetails":
        if (hasSoftwareKnowledge === "yes" && !value.trim()) {
          return "Please provide details about your software knowledge";
        }
        return "";
      default:
        return "";
    }
  };

  /**
   * Validates all form fields
   * @returns True if all fields are valid
   */
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    errors.firstName = validateField("firstName", firstName);
    errors.lastName = validateField("lastName", lastName);
    errors.dateOfBirth = validateField("dateOfBirth", dateOfBirth);
    errors.address = validateField("address", address);
    errors.contactNumber = validateField("contactNumber", contactNumber);
    errors.email = validateField("email", email);
    errors.interestReason = validateField("interestReason", interestReason);
    
    if (hasSoftwareKnowledge === "yes") {
      errors.softwareKnowledgeDetails = validateField("softwareKnowledgeDetails", softwareKnowledgeDetails);
    }
    
    if (!resumeFile) {
      errors.resume = "Please upload your resume";
    }

    setFieldErrors(errors);
    return Object.values(errors).every(error => error === "");
  };

  /**
   * Checks if form is ready to submit
   * @returns True if form is valid
   */
  const isFormValid = (): boolean => {
    return (
      firstName.trim().length >= 2 &&
      /^[a-zA-Z\s'-]+$/.test(firstName.trim()) &&
      lastName.trim().length >= 2 &&
      /^[a-zA-Z\s'-]+$/.test(lastName.trim()) &&
      dateOfBirth !== "" &&
      address.trim().length >= 10 &&
      contactNumber.trim().length >= 7 &&
      /^\d+$/.test(contactNumber) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      interestReason.trim().split(/\s+/).filter(word => word.length > 0).length >= 50 &&
      hasSoftwareKnowledge !== "" &&
      (hasSoftwareKnowledge === "no" || (hasSoftwareKnowledge === "yes" && softwareKnowledgeDetails.trim().length > 0)) &&
      resumeFile !== null
    );
  };

  /**
   * Gets all current validation errors
   * @returns Array of error messages
   */
  const getAllErrors = (): string[] => {
    const errors: string[] = [];
    
    if (!firstName.trim() || firstName.trim().length < 2 || !/^[a-zA-Z\s'-]+$/.test(firstName.trim())) {
      errors.push("First name is required and must contain only letters");
    }
    if (!lastName.trim() || lastName.trim().length < 2 || !/^[a-zA-Z\s'-]+$/.test(lastName.trim())) {
      errors.push("Last name is required and must contain only letters");
    }
    if (!dateOfBirth) {
      errors.push("Date of birth is required");
    }
    if (!address.trim() || address.trim().length < 10) {
      errors.push("Complete address is required");
    }
    if (!contactNumber.trim() || !/^\d+$/.test(contactNumber) || contactNumber.length < 7) {
      errors.push("Contact number is required (numbers only, minimum 7 digits)");
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Valid email address is required");
    }
    const wordCount = interestReason.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (!interestReason.trim()) {
      errors.push("Interest reason is required");
    } else if (wordCount < 50) {
      // Only show word count error if field has been touched (has error in fieldErrors)
      if (fieldErrors.interestReason) {
        errors.push(`Interest reason must be at least 50 words (currently ${wordCount} words)`);
      } else {
        errors.push("Interest reason must be at least 50 words");
      }
    }
    if (hasSoftwareKnowledge === "") {
      errors.push("Please select if you have software knowledge");
    }
    if (hasSoftwareKnowledge === "yes" && !softwareKnowledgeDetails.trim()) {
      errors.push("Please provide details about your software knowledge");
    }
    if (!resumeFile) {
      errors.push("Resume upload is required");
    }
    
    return errors;
  };

  /**
   * Handles field blur validation
   * @param fieldName - Name of the field
   * @param value - Value of the field
   */
  const handleFieldBlur = (fieldName: string, value: string) => {
    const error = validateField(fieldName, value);
    setFieldErrors(prev => ({ ...prev, [fieldName]: error }));
    setFocusedField(null);
  };

  /**
   * Handles form submission
   * @param e - Form event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setStatus("pending");

    try {
      // Check for duplicate applications
      const applicationsRef = collection(db, "developersClubApplications");
      const q = query(
        applicationsRef,
        where("email", "==", email)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setStatus("idle");
        toast.error("You have already submitted an application with this email.", {
          position: "top-center",
          autoClose: 5000,
          style: {
            background: "#fee2e2",
            color: "#dc2626",
            border: "2px solid #dc2626",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            padding: "16px",
          }
        });
        return;
      }

      // Upload resume
      if (!resumeFile) {
        setErrorMessage("Resume file is required");
        setStatus("idle");
        toast.error("Resume file is required");
        return;
      }
      
      const resumeFileUrl = await uploadFile(resumeFile);
      if (!resumeFileUrl) {
        return;
      }

      // Save application to Firestore
      await addDoc(applicationsRef, {
        firstName,
        lastName,
        dateOfBirth,
        address,
        contactNumber,
        email,
        interestReason,
        hasSoftwareKnowledge,
        softwareKnowledgeDetails: hasSoftwareKnowledge === "yes" ? softwareKnowledgeDetails : "",
        resumeFileUrl,
        dateApplied: Timestamp.now(),
        status: "pending",
      });

      // Send email notification to Uptech using EmailJS (same as contact form)
      try {
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        // Use a notification template ID if available, otherwise use the contact form template
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;

        if (serviceId && templateId && publicKey) {
          // Format the email content similar to contact form
          const emailParams = {
            user_firstname: firstName,
            user_lastname: lastName,
            user_email: email,
            message: `New Developers Club Application Received!

Applicant Details:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Contact Number: ${contactNumber}
- Date of Birth: ${dateOfBirth}
- Address: ${address}

Interest Reason:
${interestReason}

Software Knowledge: ${hasSoftwareKnowledge === "yes" ? "Yes" : "No"}
${hasSoftwareKnowledge === "yes" ? `\n\nDetails:\n${softwareKnowledgeDetails}` : ""}

Resume Link: ${resumeFileUrl}

Please review this application in the admin dashboard.`,
            contact_number: contactNumber,
          };

          await emailjs.send(serviceId, templateId, emailParams, publicKey);
          console.log("Email notification sent successfully via EmailJS");
        } else {
          console.error("EmailJS configuration missing:", {
            serviceId: !!serviceId,
            templateId: !!templateId,
            publicKey: !!publicKey,
          });
          // Fallback: try API route if EmailJS not configured
          try {
            await fetch('/api/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userEmail: 'uptechincorp@gmail.com',
                emailTemplate: 'developers_club_application_notification',
                dynamicData: {
                  firstName,
                  lastName,
                  email,
                  contactNumber,
                  dateOfBirth,
                  address,
                  interestReason,
                  hasSoftwareKnowledge,
                  softwareKnowledgeDetails: hasSoftwareKnowledge === "yes" ? softwareKnowledgeDetails : "N/A",
                  resumeLink: resumeFileUrl,
                },
              }),
            });
            console.log("Email sent via API route fallback");
          } catch (fallbackError) {
            console.error("Both EmailJS and API route failed:", fallbackError);
          }
        }
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        // Don't fail the submission if email fails, but log it
      }

      // Show success state
      setStatus("success");
      setSuccessMessage("Application submitted successfully! We'll be in touch soon.");
      setErrorMessage("");

      // Show success toast
      toast.success("Application submitted successfully! We'll be in touch soon.", {
        position: "top-center",
        autoClose: 5000,
        style: {
          background: "#d1fae5",
          color: "#065f46",
          border: "2px solid #10b981",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          padding: "16px",
        }
      });

      resetFields();
      
      // Small delay to show success message before closing
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setStatus("error");
      setErrorMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };

  /**
   * Resets all form fields to initial state
   */
  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setAddress("");
    setContactNumber("");
    setEmail("");
    setInterestReason("");
    setHasSoftwareKnowledge("");
    setSoftwareKnowledgeDetails("");
    setResumeFile(null);
    setErrorMessage("");
    setSuccessMessage("");
    setStatus("idle");
    setFocusedField(null);
    setFieldErrors({});
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  /**
   * Handles modal close with field reset
   */
  const handleClose = () => {
    resetFields();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 my-8 transform transition-all duration-300 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 flex-shrink-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 ThiccboiBold">
              Join Our Developers Club
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 animate-form-fade-in overflow-y-auto flex-1">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`form-field-container ${focusedField === "firstName" ? "field-focused" : ""}`}>
                <label htmlFor="firstName" className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                  <User className="w-4 h-4 text-blueTheme" />
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      // Only allow letters, spaces, hyphens, and apostrophes
                      if (inputValue === "" || /^[a-zA-Z\s'-]*$/.test(inputValue)) {
                        setFirstName(inputValue);
                        if (fieldErrors.firstName) {
                          setFieldErrors(prev => ({ ...prev, firstName: validateField("firstName", inputValue) }));
                        }
                      }
                    }}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={(e) => {
                      handleFieldBlur("firstName", e.target.value);
                    }}
                    className={`form-input w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white placeholder-gray-200 border-2 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-200 transition-all duration-300 ${
                      fieldErrors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-blueTheme"
                    }`}
                    placeholder="Enter your first name (letters only)"
                  />
                  {fieldErrors.firstName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠</span> {fieldErrors.firstName}
                    </p>
                  )}
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80 pointer-events-none" />
                  {focusedField === "firstName" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>
              <div className={`form-field-container ${focusedField === "lastName" ? "field-focused" : ""}`}>
                <label htmlFor="lastName" className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                  <User className="w-4 h-4 text-blueTheme" />
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={lastName}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      // Only allow letters, spaces, hyphens, and apostrophes
                      if (inputValue === "" || /^[a-zA-Z\s'-]*$/.test(inputValue)) {
                        setLastName(inputValue);
                        if (fieldErrors.lastName) {
                          setFieldErrors(prev => ({ ...prev, lastName: validateField("lastName", inputValue) }));
                        }
                      }
                    }}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={(e) => {
                      handleFieldBlur("lastName", e.target.value);
                    }}
                    className={`form-input w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white placeholder-gray-200 border-2 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-200 transition-all duration-300 ${
                      fieldErrors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-blueTheme"
                    }`}
                    placeholder="Enter your last name (letters only)"
                  />
                  {fieldErrors.lastName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠</span> {fieldErrors.lastName}
                    </p>
                  )}
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80 pointer-events-none" />
                  {focusedField === "lastName" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div className={`form-field-container ${focusedField === "dateOfBirth" ? "field-focused" : ""}`}>
              <label htmlFor="dateOfBirth" className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                <Calendar className="w-4 h-4 text-blueTheme" />
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dateOfBirth"
                  required
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                    if (fieldErrors.dateOfBirth) {
                      setFieldErrors(prev => ({ ...prev, dateOfBirth: validateField("dateOfBirth", e.target.value) }));
                    }
                  }}
                  onFocus={() => setFocusedField("dateOfBirth")}
                  onBlur={(e) => {
                    handleFieldBlur("dateOfBirth", e.target.value);
                  }}
                  max={new Date().toISOString().split('T')[0]}
                  className={`form-input w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white placeholder-gray-200 border-2 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-200 transition-all duration-300 ${
                    fieldErrors.dateOfBirth ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-blueTheme"
                  }`}
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80 pointer-events-none" />
                {focusedField === "dateOfBirth" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                )}
                {fieldErrors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {fieldErrors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className={`form-field-container ${focusedField === "address" ? "field-focused" : ""}`}>
              <label htmlFor="address" className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                <MapPin className="w-4 h-4 text-blueTheme" />
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="address"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (fieldErrors.address) {
                      setFieldErrors(prev => ({ ...prev, address: validateField("address", e.target.value) }));
                    }
                  }}
                  onFocus={() => setFocusedField("address")}
                  onBlur={(e) => {
                    handleFieldBlur("address", e.target.value);
                  }}
                  rows={3}
                  className={`form-input w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white placeholder-gray-200 border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-200 resize-none transition-all duration-300 ${
                    fieldErrors.address ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-blueTheme"
                  }`}
                  placeholder="Enter your full address"
                />
                {focusedField === "address" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                )}
                {fieldErrors.address && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {fieldErrors.address}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Number and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`form-field-container ${focusedField === "contactNumber" ? "field-focused" : ""}`}>
                <label htmlFor="contactNumber" className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                  <Phone className="w-4 h-4 text-blueTheme" />
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="contactNumber"
                    required
                    value={contactNumber}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      // Only allow numbers
                      if (inputValue === "" || /^\d+$/.test(inputValue)) {
                        setContactNumber(inputValue);
                        if (fieldErrors.contactNumber) {
                          setFieldErrors(prev => ({ ...prev, contactNumber: validateField("contactNumber", inputValue) }));
                        }
                      }
                    }}
                    onFocus={() => setFocusedField("contactNumber")}
                    onBlur={(e) => {
                      handleFieldBlur("contactNumber", e.target.value);
                    }}
                    className={`form-input w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white placeholder-gray-200 border-2 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-200 transition-all duration-300 ${
                      fieldErrors.contactNumber ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-blueTheme"
                    }`}
                    placeholder="e.g., 8687261669 (numbers only)"
                  />
                  <div className="mt-1 text-xs text-gray-500 italic">
                    Format: Numbers only, minimum 7 digits (e.g., 8687261669)
                  </div>
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80 pointer-events-none" />
                  {focusedField === "contactNumber" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  )}
                  {fieldErrors.contactNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠</span> {fieldErrors.contactNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className={`form-field-container ${focusedField === "email" ? "field-focused" : ""}`}>
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                  <Mail className="w-4 h-4 text-blueTheme" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) {
                        setFieldErrors(prev => ({ ...prev, email: validateField("email", e.target.value) }));
                      }
                    }}
                    onFocus={() => setFocusedField("email")}
                    onBlur={(e) => {
                      handleFieldBlur("email", e.target.value);
                    }}
                    className={`form-input w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white placeholder-gray-200 border-2 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-200 transition-all duration-300 ${
                      fieldErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-blueTheme"
                    }`}
                    placeholder="Enter your email address"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80 pointer-events-none" />
                  {focusedField === "email" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  )}
                  {fieldErrors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠</span> {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Why interest in joining */}
            <div className={`form-field-container ${focusedField === "interestReason" ? "field-focused" : ""}`}>
              <label htmlFor="interestReason" className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                <MessageSquare className="w-4 h-4 text-blueTheme" />
                Why are you interested in joining the Uptech Software Developers Club? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="interestReason"
                  required
                  value={interestReason}
                  onChange={(e) => {
                    setInterestReason(e.target.value);
                    // Only clear error while typing, don't show new errors until blur
                    if (fieldErrors.interestReason && e.target.value.trim().split(/\s+/).filter(word => word.length > 0).length >= 50) {
                      setFieldErrors(prev => ({ ...prev, interestReason: "" }));
                    }
                  }}
                  onFocus={() => setFocusedField("interestReason")}
                  onBlur={(e) => {
                    handleFieldBlur("interestReason", e.target.value);
                  }}
                  rows={4}
                  className={`form-input w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white placeholder-gray-200 border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-200 resize-none transition-all duration-300 ${
                    fieldErrors.interestReason ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-blueTheme"
                  }`}
                  placeholder="Tell us why you want to join our developers club... (minimum 50 words)"
                />
                {focusedField === "interestReason" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    {fieldErrors.interestReason && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <span>⚠</span> {fieldErrors.interestReason}
                      </p>
                    )}
                  </div>
                  <p className={`text-xs ${
                    interestReason.trim().split(/\s+/).filter(word => word.length > 0).length >= 50 
                      ? "text-green-600 font-semibold" 
                      : "text-gray-500"
                  }`}>
                    {interestReason.trim().split(/\s+/).filter(word => word.length > 0).length} / 50 words
                  </p>
                </div>
                {!fieldErrors.interestReason && interestReason.trim().split(/\s+/).filter(word => word.length > 0).length >= 50 && (
                  <div className="mt-2 flex items-center gap-2 text-green-600 text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Word count requirement met!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Software Knowledge */}
            <div className="space-y-4 form-field-container">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                <Code className="w-4 h-4 text-blueTheme" />
                Do you have any knowledge of software? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group relative">
                  <div className="relative">
                    <input
                      type="radio"
                      name="softwareKnowledge"
                      value="yes"
                      checked={hasSoftwareKnowledge === "yes"}
                      onChange={(e) => {
                        setHasSoftwareKnowledge("yes");
                        if (e.target.value !== "yes") {
                          setSoftwareKnowledgeDetails("");
                        }
                      }}
                      required
                      className="w-5 h-5 text-blueTheme border-2 border-gray-300 focus:ring-2 focus:ring-blueTheme cursor-pointer transition-all duration-300 appearance-none checked:bg-blueTheme checked:border-blueTheme relative z-10"
                    />
                    {hasSoftwareKnowledge === "yes" && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 bg-white rounded-full animate-radio-pulse"></div>
                      </div>
                    )}
                  </div>
                  <span className={`text-gray-700 font-medium transition-all duration-300 ${
                    hasSoftwareKnowledge === "yes" 
                      ? "text-blueTheme font-semibold scale-105" 
                      : "group-hover:text-blueTheme"
                  }`}>
                    Yes
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group relative">
                  <div className="relative">
                    <input
                      type="radio"
                      name="softwareKnowledge"
                      value="no"
                      checked={hasSoftwareKnowledge === "no"}
                      onChange={(e) => {
                        setHasSoftwareKnowledge("no");
                        setSoftwareKnowledgeDetails("");
                      }}
                      required
                      className="w-5 h-5 text-blueTheme border-2 border-gray-300 focus:ring-2 focus:ring-blueTheme cursor-pointer transition-all duration-300 appearance-none checked:bg-blueTheme checked:border-blueTheme relative z-10"
                    />
                    {hasSoftwareKnowledge === "no" && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 bg-white rounded-full animate-radio-pulse"></div>
                      </div>
                    )}
                  </div>
                  <span className={`text-gray-700 font-medium transition-all duration-300 ${
                    hasSoftwareKnowledge === "no" 
                      ? "text-blueTheme font-semibold scale-105" 
                      : "group-hover:text-blueTheme"
                  }`}>
                    No
                  </span>
                </label>
              </div>

              {/* Animated Details Box */}
              {hasSoftwareKnowledge === "yes" && (
                <div className="software-knowledge-details animate-software-knowledge">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce-subtle">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <label htmlFor="softwareKnowledgeDetails" className="block text-sm font-semibold text-gray-800">
                      Please list your software knowledge and experience <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <textarea
                    id="softwareKnowledgeDetails"
                    required={hasSoftwareKnowledge === "yes"}
                    value={softwareKnowledgeDetails}
                    onChange={(e) => {
                      setSoftwareKnowledgeDetails(e.target.value);
                      if (fieldErrors.softwareKnowledgeDetails) {
                        setFieldErrors(prev => ({ ...prev, softwareKnowledgeDetails: validateField("softwareKnowledgeDetails", e.target.value) }));
                      }
                    }}
                    onFocus={() => setFocusedField("softwareKnowledgeDetails")}
                    onBlur={(e) => {
                      handleFieldBlur("softwareKnowledgeDetails", e.target.value);
                    }}
                    rows={4}
                    className={`form-input w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white placeholder-gray-200 border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:shadow-lg focus:shadow-green-200 resize-none transition-all duration-300 ${
                      fieldErrors.softwareKnowledgeDetails ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-blueTheme"
                    }`}
                    placeholder="List your programming languages, frameworks, tools, or any software-related experience..."
                  />
                  {focusedField === "softwareKnowledgeDetails" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  )}
                  {fieldErrors.softwareKnowledgeDetails && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠</span> {fieldErrors.softwareKnowledgeDetails}
                    </p>
                  )}
                  <div className="mt-3 flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 animate-fade-in">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 animate-check-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <span className="font-semibold text-green-700">Awesome!</span> Share your experience - whether it's programming languages, frameworks, tools, or projects you've worked on. Every bit of knowledge counts!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Resume Upload */}
            <div className="form-field-container">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                <FileText className="w-4 h-4 text-blueTheme" />
                Resume <span className="text-red-500">*</span>
              </label>
              <div
                className="upload-area border-2 border-dashed border-blueTheme rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] group"
                onDrop={handleResumeDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => resumeInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={resumeInputRef}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.type === "application/pdf" || file.type.includes("document") || file.type.includes("text")) {
                        setResumeFile(file);
                        setFieldErrors(prev => ({ ...prev, resume: "" }));
                      } else {
                        toast.error("Please upload a valid document file (PDF, DOC, DOCX)");
                        setFieldErrors(prev => ({ ...prev, resume: "Please upload a valid document file (PDF, DOC, DOCX)" }));
                      }
                    }
                  }}
                />
                {resumeFile ? (
                  <div className="file-info flex items-center justify-between bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border-2 border-green-300 shadow-md animate-file-upload">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                        <FileText className="text-white" size={20} />
                      </div>
                      <div>
                        <span className="text-gray-800 font-semibold block">{resumeFile.name}</span>
                        <span className="text-sm text-gray-500">Ready to upload</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeResumeFile();
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                      aria-label="Remove file"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="relative">
                      <FileText className="text-blueTheme group-hover:scale-110 transition-transform duration-300" size={56} />
                      <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-sparkle" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-700 font-semibold text-lg mb-1">Drag and drop your resume here</p>
                      <p className="text-gray-500 text-sm">or click to browse files</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                      <span className="text-xs font-medium text-blueTheme">Accepted: PDF, DOC, DOCX</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Success Message */}
            {successMessage && status === "success" && (
              <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-green-800 font-semibold text-base mb-1">Application Submitted Successfully!</h3>
                    <p className="text-green-700 text-sm">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-red-800 font-semibold text-base mb-1">Error</h3>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Validation Errors Summary */}
            {!isFormValid() && status !== "pending" && (
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 animate-fade-in">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-yellow-800 mb-2">
                      Please fix the following errors to submit:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                      {getAllErrors().map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 font-bold rounded-xl px-6 py-3.5 hover:from-gray-300 hover:to-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Cancel
              </button>
          <button
                type="submit"
                disabled={status === "pending" || !isFormValid()}
                className={`flex-1 font-bold rounded-xl px-6 py-3.5 transition-all duration-300 relative overflow-hidden group ${
                  status === "pending" || !isFormValid()
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white transform hover:scale-105 hover:shadow-xl hover:shadow-green-300/50"
                }`}
                title={!isFormValid() && status !== "pending" ? `Please fix ${getAllErrors().length} error(s) to submit` : ""}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === "pending" ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </span>
                {status !== "pending" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
          </button>
            </div>
          </form>

          <style jsx>{`
            @keyframes form-fade-in {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes field-slide-in {
              from {
                opacity: 0;
                transform: translateX(-10px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            .animate-form-fade-in {
              animation: form-fade-in 0.6s ease-out;
            }

            .form-field-container {
              animation: field-slide-in 0.5s ease-out both;
            }

            .form-field-container:nth-child(1) { animation-delay: 0.1s; }
            .form-field-container:nth-child(2) { animation-delay: 0.15s; }
            .form-field-container:nth-child(3) { animation-delay: 0.2s; }
            .form-field-container:nth-child(4) { animation-delay: 0.25s; }
            .form-field-container:nth-child(5) { animation-delay: 0.3s; }
            .form-field-container:nth-child(6) { animation-delay: 0.35s; }
            .form-field-container:nth-child(7) { animation-delay: 0.4s; }
            .form-field-container:nth-child(8) { animation-delay: 0.45s; }

            .form-input {
              box-shadow: 0 2px 4px rgba(68, 140, 255, 0.1);
            }

            .form-input:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 8px rgba(68, 140, 255, 0.15);
            }

            .form-input:focus {
              transform: translateY(-2px) scale(1.01);
            }

            .field-focused {
              animation: field-pulse 0.6s ease-out;
            }

            @keyframes field-pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.02);
              }
              100% {
                transform: scale(1);
              }
            }

            .field-focused .form-input {
              border-color: #22c55e;
              box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1), 0 8px 16px rgba(34, 197, 94, 0.15);
            }

            .upload-area.dragging {
              border-color: #62a3ff;
              background-color: rgba(68, 140, 255, 0.1);
            }

            @keyframes softwareKnowledgeSlideIn {
              from {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
                max-height: 0;
                margin-top: 0;
                padding-top: 0;
                padding-bottom: 0;
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
                max-height: 600px;
                margin-top: 1rem;
                padding-top: 1.25rem;
                padding-bottom: 1.25rem;
              }
            }

            @keyframes radio-pulse {
              0% {
                transform: scale(0.8);
                opacity: 0.8;
              }
              50% {
                transform: scale(1.1);
                opacity: 1;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }

            @keyframes bounce-subtle {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-3px);
              }
            }

            @keyframes check-pulse {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
            }

            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateX(-10px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes sparkle {
              0%, 100% {
                opacity: 1;
                transform: scale(1) rotate(0deg);
              }
              50% {
                opacity: 0.7;
                transform: scale(1.2) rotate(180deg);
              }
            }

            @keyframes file-upload {
              from {
                opacity: 0;
                transform: scale(0.9) translateY(-10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }

            .animate-sparkle {
              animation: sparkle 2s ease-in-out infinite;
            }

            .animate-file-upload {
              animation: file-upload 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .animate-software-knowledge {
              animation: softwareKnowledgeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              overflow: hidden;
            }

            .animate-radio-pulse {
              animation: radio-pulse 0.4s ease-out;
            }

            .animate-bounce-subtle {
              animation: bounce-subtle 2s ease-in-out infinite;
            }

            .animate-check-pulse {
              animation: check-pulse 2s ease-in-out infinite;
            }

            .animate-fade-in {
              animation: fade-in 0.6s ease-out 0.2s both;
            }

            .software-knowledge-details {
              background: linear-gradient(135deg, rgba(68, 140, 255, 0.08) 0%, rgba(98, 163, 255, 0.08) 50%, rgba(34, 197, 94, 0.05) 100%);
              border: 2px solid rgba(68, 140, 255, 0.3);
              border-radius: 16px;
              padding: 1.25rem;
              box-shadow: 0 10px 25px -5px rgba(68, 140, 255, 0.15), 0 4px 6px -2px rgba(68, 140, 255, 0.1);
              position: relative;
              overflow: hidden;
            }

            .software-knowledge-details::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 3px;
              background: linear-gradient(90deg, #448CFF 0%, #62a3ff 50%, #22c55e 100%);
              transform: scaleX(0);
              animation: slide-in-line 0.5s ease-out 0.3s forwards;
            }

            @keyframes slide-in-line {
              to {
                transform: scaleX(1);
              }
            }

            .software-knowledge-details textarea:focus {
              border-color: #22c55e;
              box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15), 0 4px 12px rgba(34, 197, 94, 0.1);
              transform: translateY(-1px);
            }

            .software-knowledge-details textarea {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
