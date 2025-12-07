import { Timestamp } from "firebase/firestore";

export type DevelopersClubApplication = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  contactNumber: string;
  email: string;
  interestReason: string;
  hasSoftwareKnowledge: "yes" | "no";
  softwareKnowledgeDetails: string;
  interestType: "app" | "web" | "";
  weeklyHours: "5" | "7" | "10" | "more" | "";
  workPreference: "day" | "night" | "";
  needsParentPermission: "yes" | "no" | "";
  resumeFileUrl: string;
  dateApplied: Timestamp;
  status?: string;
};

export type DevelopersClubFormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  contactNumber: string;
  email: string;
  interestReason: string;
  hasSoftwareKnowledge: "yes" | "no" | "";
  softwareKnowledgeDetails: string;
};

export type DevelopersClubModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

