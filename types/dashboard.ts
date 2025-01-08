export type Job = {
  id: string;
  title: string;
  department: string;
  status: string;
  description: string;
};

export type Application = {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  contactNumber: string;
  email: string;
  resumeUrl?: string;
  portfolio?: {
    fileUrl?: string;
    webUrl?: string;
  };
  status: string;
  comment?: string;
};

export interface EmailUserModalProps {
  onClose: () => void;
  recipientEmail: string;
    firstName: string; 
  };


