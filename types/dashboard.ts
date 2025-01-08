import { Timestamp } from "firebase/firestore";

export type Job = {
  id: string;
  title: string;
  department: string;
  status: string;
  description: string;
};

export type JobForm = {
  title: string;
  department: string;
  description: string;
  jobId: string | null;
}

export type JobManagementModalProps = {
  closeJobModal: () => void;
  loadJobs: () => void;
}

export type Application = {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  contactNumber: string;
  email: string;
  resumeFileUrl: string;
  portfolioUrl?: string; 
  portfolioFileUrl?: string;
  status: string;
  comment?: string;
  reason?: string;
  dateApplied: Timestamp;
};

export interface EmailUserModalProps {
  onClose: () => void;
  recipientEmail: string;
    firstName: string; 
  };


