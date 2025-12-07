import React, { useState } from 'react';
import { Application } from "@/types/dashboard";
import { DevelopersClubApplication } from "@/lib/types/developersClub";
import { Mail, Trash } from "lucide-react";
import { toast } from 'react-toastify';
import EmailUserModal from './EmailUserModal';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ApplicationDetailsModalProps {
    application: Application | DevelopersClubApplication; // Allow both job and dev club applications
    onClose: () => void;
    onUpdateStatus: (id: string, status: string, reason: string, isDevClub?: boolean) => void;
    isDevClubApplication?: boolean; // Flag to identify dev club applications
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
    application,
    onClose,
    onUpdateStatus,
    isDevClubApplication = false,
}) => {
    // Detect if it's a developers club application by checking for unique fields
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

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-4">
                    {isDevClub ? "Developers Club Application Details" : "Application Details"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <p className="mt-1 text-sm text-gray-900">{application.firstName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <p className="mt-1 text-sm text-gray-900">{application.lastName}</p>
                    </div>
                    
                    {/* Conditional fields based on application type */}
                    {isDevClub ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <p className="mt-1 text-sm text-gray-900">{application.dateOfBirth || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                                <p className="mt-1 text-sm text-gray-900">{application.contactNumber || 'N/A'}</p>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <p className="mt-1 text-sm text-gray-900">{application.address || 'N/A'}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Position</label>
                                <p className="mt-1 text-sm text-gray-900">{application.position || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contact</label>
                                <p className="mt-1 text-sm text-gray-900">{application.contactNumber || 'N/A'}</p>
                            </div>
                        </>
                    )}
                    
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="flex items-center gap-2">
                            <p className="mt-1 text-sm text-gray-900">{application.email}</p>
                            <button
                                onClick={handleEmailButtonClick}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Mail className="w-4 h-4 mr-2" /> Send Email
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Resume</label>
                        <p className="mt-1 text-sm text-gray-900">
                            {application.resumeFileUrl ? (
                                <a
                                    href={application.resumeFileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    <i className="fas fa-file-alt mr-2"></i>View Resume
                                </a>
                            ) : (
                                'N/A'
                            )}
                        </p>
                    </div>
                    
                    {/* Conditional fields for job applications */}
                    {!isDevClub && (
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                            <div className="mt-1 text-sm text-gray-900 space-y-2">
                                {application.portfolioFileUrl && (
                                    <p>
                                        <a
                                            href={application.portfolioFileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <i className="fas fa-file-alt mr-2"></i>View Portfolio File
                                        </a>
                                    </p>
                                )}
                                {application.portfolioUrl && (
                                    <p>
                                        <a
                                            href={application.portfolioUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <i className="fas fa-external-link-alt mr-2"></i>View Portfolio Website
                                        </a>
                                    </p>
                                )}
                                {!application.portfolioFileUrl && !application.portfolioUrl && 'N/A'}
                            </div>
                        </div>
                    )}
                    
                    {/* Conditional fields for developers club applications */}
                    {isDevClub ? (
                        <>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Why Interested in Joining</label>
                                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded border">
                                    {application.interestReason || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Software Knowledge</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                        application.hasSoftwareKnowledge === "yes" 
                                            ? "bg-green-100 text-green-800" 
                                            : "bg-gray-100 text-gray-800"
                                    }`}>
                                        {application.hasSoftwareKnowledge === "yes" ? "Yes" : "No"}
                                    </span>
                                </p>
                            </div>
                            {application.hasSoftwareKnowledge === "yes" && application.softwareKnowledgeDetails && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Software Knowledge Details</label>
                                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded border">
                                        {application.softwareKnowledgeDetails}
                                    </p>
                                </div>
                            )}
                            {devClubApp && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Interest Type</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                {devClubApp.interestType === "app" ? "App Development" : devClubApp.interestType === "web" ? "Web Development" : "N/A"}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Weekly Hours</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {devClubApp.weeklyHours === "more" ? "MORE" : devClubApp.weeklyHours ? `${devClubApp.weeklyHours} hours` : "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Work Preference</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                                                {devClubApp.workPreference === "day" ? "Day" : devClubApp.workPreference === "night" ? "Night" : "N/A"}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Needs Parent Permission</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                                devClubApp.needsParentPermission === "yes" 
                                                    ? "bg-yellow-100 text-yellow-800" 
                                                    : "bg-gray-100 text-gray-800"
                                            }`}>
                                                {devClubApp.needsParentPermission === "yes" ? "Yes" : devClubApp.needsParentPermission === "no" ? "No" : "N/A"}
                                            </span>
                                        </p>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Comment</label>
                            <p className="mt-1 text-sm text-gray-900">
                                {application.comment || 'No comment'}
                            </p>
                        </div>
                    )}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Date Applied</label>
                        <p className="mt-1 text-sm text-gray-900">
                            {application.dateApplied 
                                ? (application.dateApplied.toDate 
                                    ? application.dateApplied.toDate().toLocaleDateString()
                                    : new Date(application.dateApplied).toLocaleDateString())
                                : 'N/A'}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="applicationStatus"
                            value={application.status || "pending"}
                            onChange={handleStatusChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="pending">Pending</option>
                            <option value="accepted">Accept</option>
                            <option value="rejected">Reject</option>
                        </select>
                    </div>
                </div>
                <div className="mt-5 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Close</button>
                    <button onClick={handleAccept} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Accept</button>
                    <button onClick={handleReject} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Reject</button>
                    <button onClick={() => setDeletePromptOpen(true)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {isEmailModalOpen && (
                <EmailUserModal 
                    onClose={handleCloseEmailModal} 
                    recipientEmail={application.email}
                    firstName={application.firstName}
                />
            )}
            {isDeletePromptOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
                        <p>Are you sure you want to delete this application? This action cannot be undone.</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button onClick={() => setDeletePromptOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Cancel</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationDetailsModal;