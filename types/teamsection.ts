export type TeamMember = {
    id: string;
    fullName: string;
    position: string;
    role: 'director' | 'senior' | 'trainee';
    department: string;
    //bio?: string;
    imageUrl?: string;
    isDirector?: boolean;
    order: number;
  };
  
  export type TeamSection = {
    title: string;
    members: TeamMember[];
    className?: string;
  };
  
  export type TeamDisplayProps = {
    sections: TeamSection[];
    // showBios?: boolean;
    // showSocialLinks?: boolean;
  };