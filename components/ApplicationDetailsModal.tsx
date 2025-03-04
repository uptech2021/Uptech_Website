import React, { useState } from 'react';
import { Application } from "@/types/dashboard";
import { Mail, Trash } from "lucide-react";
import { toast } from 'react-toastify';
import EmailUserModal from './EmailUserModal';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ApplicationDetailsModalProps {
    application: Application;
    onClose: () => void;
    onUpdateStatus: (id: string, status: string, reason: string) => void;
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
    application,
    onClose,
    onUpdateStatus,
}) => {
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [isDeletePromptOpen, setDeletePromptOpen] = useState(false);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        onUpdateStatus(application.id, newStatus, '');
    };

    const handleAccept = () => {
        onUpdateStatus(application.id, "accepted", "");
        toast.success('Application accepted successfully!');
        onClose();
    };

    const handleReject = () => {
        onUpdateStatus(application.id, "rejected", "");
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
            const applicationRef = doc(db, "applications", application.id);
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
                <h2 className="text-xl font-bold mb-4">Application Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <p className="mt-1 text-sm text-gray-900">{application.firstName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <p className="mt-1 text-sm text-gray-900">{application.lastName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <p className="mt-1 text-sm text-gray-900">{application.position}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact</label>
                        <p className="mt-1 text-sm text-gray-900">{application.contactNumber || 'N/A'}</p>
                    </div>
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
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Comment</label>
                        <p className="mt-1 text-sm text-gray-900">
                            {application.comment || 'No comment'}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="applicationStatus"
                            value={application.status}
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