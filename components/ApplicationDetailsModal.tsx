import React, { useState } from 'react';
import { Application } from "@/types/dashboard";
import { DevelopersClubApplication } from "@/lib/types/developersClub";
import { Mail, Trash, AlertTriangle } from "lucide-react";
import { toast } from 'react-toastify';
import EmailUserModal from './EmailUserModal';
import { doc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ApplicationDetailsModalProps {
    application: Application | DevelopersClubApplication;
    onClose: () => void;
    onUpdateStatus: (id: string, status: string, reason: string, isDevClub?: boolean) => void;
    isDevClubApplication?: boolean;
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
    application,
    onClose,
    onUpdateStatus,
    isDevClubApplication = false,
}) => {
    const isDevClub = isDevClubApplication || !('position' in application) || ('hasSoftwareKnowledge' in application);
    const devClubApp = isDevClub ? (application as DevelopersClubApplication) : null;
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [isDeletePromptOpen, setDeletePromptOpen] = useState(false);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        onUpdateStatus(application.id, newStatus, '', isDevClub);
    };

    const handleAccept = () => {
        onUpdateStatus(application.id, "accepted", "", isDevClub);
        toast.success('Application accepted successfully!');
        onClose();
    };

    const handleReject = () => {
        onUpdateStatus(application.id, "rejected", "", isDevClub);
        toast.error('Application rejected successfully!');
        onClose();
    };

    const handleEmailButtonClick = () => {
        setEmailModalOpen(true);
    };

    const handleCloseEmailModal = () => {
        setEmailModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            const collectionName = isDevClub ? "developersClubApplications" : "applications";
            const applicationRef = doc(db, collectionName, application.id);
            await deleteDoc(applicationRef);
            toast.success('Application deleted successfully!');
            window.location.reload();
        } catch (error) {
            console.error("Error deleting application:", error);
            toast.error('Failed to delete application.');
        }
    };

    const statusBadgeClasses = () => {
        switch (application.status) {
            case 'accepted':
                return 'bg-green-100 text-green-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-accent/20 text-accent-ink';
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-paper rounded-card shadow-card-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                {/* Navy header strip */}
                <div className="bg-navy rounded-t-card px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-white text-xl font-bold">
                        {application.firstName} {application.lastName}
                    </h2>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusBadgeClasses()}`}>
                        {application.status || 'pending'}
                    </span>
                </div>

                {/* Content body */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">First Name</label>
                            <p className="text-ink">{application.firstName}</p>
                        </div>
                        <div>
                            <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Last Name</label>
                            <p className="text-ink">{application.lastName}</p>
                        </div>

                        {isDevClub && devClubApp ? (
                            <>
                                <div>
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Date of Birth</label>
                                    <p className="text-ink">{devClubApp.dateOfBirth || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Contact Number</label>
                                    <p className="text-ink">{devClubApp.contactNumber || 'N/A'}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Address</label>
                                    <p className="text-ink">{devClubApp.address || 'N/A'}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Position</label>
                                    <p className="text-ink">{(application as Application).position || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Contact</label>
                                    <p className="text-ink">{(application as Application).contactNumber || 'N/A'}</p>
                                </div>
                            </>
                        )}

                        <div className="md:col-span-2">
                            <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Email</label>
                            <div className="flex items-center gap-3">
                                <p className="text-ink">{application.email}</p>
                                <button
                                    onClick={handleEmailButtonClick}
                                    className="inline-flex items-center bg-brand text-white rounded-full shadow-glow-blue hover:bg-brand-deep px-4 py-1.5 text-sm font-bold transition"
                                >
                                    <Mail className="w-4 h-4 mr-2" /> Send Email
                                </button>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Resume</label>
                            <p className="text-ink">
                                {application.resumeFileUrl ? (
                                    <a
                                        href={application.resumeFileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand hover:text-brand-deep underline underline-offset-2 font-medium transition"
                                    >
                                        View Resume
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </p>
                        </div>

                        {!isDevClub && (
                            <div className="md:col-span-2">
                                <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Portfolio</label>
                                <div className="text-ink space-y-2">
                                    {application.portfolioFileUrl && (
                                        <p>
                                            <a
                                                href={application.portfolioFileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-brand hover:text-brand-deep underline underline-offset-2 font-medium transition"
                                            >
                                                View Portfolio File
                                            </a>
                                        </p>
                                    )}
                                    {application.portfolioUrl && (
                                        <p>
                                            <a
                                                href={application.portfolioUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-brand hover:text-brand-deep underline underline-offset-2 font-medium transition"
                                            >
                                                View Portfolio Website
                                            </a>
                                        </p>
                                    )}
                                    {!application.portfolioFileUrl && !application.portfolioUrl && 'N/A'}
                                </div>
                            </div>
                        )}

                        {isDevClub && devClubApp ? (
                            <>
                                <div className="md:col-span-2">
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Why Interested in Joining</label>
                                    <p className="text-ink whitespace-pre-wrap bg-mist p-4 rounded-card-sm border border-line">
                                        {devClubApp.interestReason || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Software Knowledge</label>
                                    <p className="text-ink">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                            devClubApp.hasSoftwareKnowledge === "yes"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-mist text-ink-soft"
                                        }`}>
                                            {devClubApp.hasSoftwareKnowledge === "yes" ? "Yes" : "No"}
                                        </span>
                                    </p>
                                </div>
                                {devClubApp.hasSoftwareKnowledge === "yes" && devClubApp.softwareKnowledgeDetails && (
                                    <div className="md:col-span-2">
                                        <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Software Knowledge Details</label>
                                        <p className="text-ink whitespace-pre-wrap bg-mist p-4 rounded-card-sm border border-line">
                                            {devClubApp.softwareKnowledgeDetails}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Interest Type</label>
                                    <p className="text-ink">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-on-blue text-brand-deep">
                                            {devClubApp.interestType === "app" ? "App Development" : devClubApp.interestType === "web" ? "Web Development" : "N/A"}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Weekly Hours</label>
                                    <p className="text-ink">
                                        {devClubApp.weeklyHours === "more" ? "MORE" : devClubApp.weeklyHours ? `${devClubApp.weeklyHours} hours` : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Work Preference</label>
                                    <p className="text-ink">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-on-blue text-brand-deep">
                                            {devClubApp.workPreference === "day" ? "Day" : devClubApp.workPreference === "night" ? "Night" : "N/A"}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Needs Parent Permission</label>
                                    <p className="text-ink">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                            devClubApp.needsParentPermission === "yes"
                                                ? "bg-accent/20 text-accent-ink"
                                                : "bg-mist text-ink-soft"
                                        }`}>
                                            {devClubApp.needsParentPermission === "yes" ? "Yes" : devClubApp.needsParentPermission === "no" ? "No" : "N/A"}
                                        </span>
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="md:col-span-2">
                                <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Comment</label>
                                <p className="text-ink">
                                    {(application as Application).comment || 'No comment'}
                                </p>
                            </div>
                        )}

                        <div className="md:col-span-2">
                            <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Date Applied</label>
                            <p className="text-ink">
                                {application.dateApplied
                                    ? (application.dateApplied instanceof Timestamp
                                        ? application.dateApplied.toDate().toLocaleDateString()
                                        : application.dateApplied instanceof Date
                                        ? application.dateApplied.toLocaleDateString()
                                        : new Date(application.dateApplied as any).toLocaleDateString())
                                    : 'N/A'}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-1">Status</label>
                            <select
                                id="applicationStatus"
                                value={application.status || "pending"}
                                onChange={handleStatusChange}
                                className="bg-mist border border-line rounded-card-sm focus:border-brand focus:ring-2 focus:ring-brand/20 px-4 py-3 w-full text-ink font-medium transition"
                            >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accept</option>
                                <option value="rejected">Reject</option>
                            </select>
                        </div>
                    </div>

                    {/* Inline delete confirmation */}
                    {isDeletePromptOpen && (
                        <div className="mt-5 bg-red-50 border border-red-200 rounded-card-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                            <p className="text-red-700 text-sm font-medium flex-1">
                                Are you sure you want to delete this application? This action cannot be undone.
                            </p>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => setDeletePromptOpen(false)}
                                    className="bg-transparent text-ink-soft border border-line rounded-full hover:bg-mist px-4 py-2 font-bold transition text-sm flex-1 sm:flex-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white rounded-full hover:bg-red-700 px-4 py-2 font-bold transition text-sm flex-1 sm:flex-none"
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action bar */}
                    <div className="mt-6 pt-5 border-t border-line flex flex-col sm:flex-row justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="bg-transparent text-ink-soft border border-line rounded-full hover:bg-mist px-6 py-2.5 font-bold transition w-full sm:w-auto"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleAccept}
                            className="bg-brand text-white rounded-full shadow-glow-blue hover:bg-brand-deep px-6 py-2.5 font-bold transition w-full sm:w-auto"
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleReject}
                            className="bg-red-600 text-white rounded-full hover:bg-red-700 px-6 py-2.5 font-bold transition w-full sm:w-auto"
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => setDeletePromptOpen(true)}
                            className="bg-red-600 text-white rounded-full hover:bg-red-700 px-4 py-2.5 font-bold transition w-full sm:w-auto inline-flex items-center justify-center gap-2"
                        >
                            <Trash className="w-4 h-4" />
                            <span className="sm:hidden">Delete</span>
                        </button>
                    </div>
                </div>
            </div>

            {isEmailModalOpen && (
                <EmailUserModal
                    onClose={handleCloseEmailModal}
                    recipientEmail={application.email}
                    firstName={application.firstName}
                />
            )}
        </div>
    );
};

export default ApplicationDetailsModal;
