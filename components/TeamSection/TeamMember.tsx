'use client';
import Image from 'next/image';
import { TeamMember as TeamMemberType } from '@/types/teamsection';

type TeamMemberProps = {
  member: TeamMemberType;
  variant?: 'card' | 'list' | 'featured';
};

export default function TeamMember({ 
  member, 
  variant = 'card'
}: TeamMemberProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'director':
        return 'bg-blue-600 text-white';
      case 'senior':
        return 'bg-blue-500 text-white';
      case 'trainee':
        return 'bg-blue-400 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
        case 'featured':
          return 'flex items-center text-center p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-200 w-full h-full flex flex-col';
        case 'list':
          return 'flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 w-full';
        case 'card':
        default:
          return 'text-center p-4 md:p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 w-full h-full flex flex-col justify-between';
      }
  };

  return (
    <div className={getVariantClasses()}>
      <div className="flex-1 flex flex-col">

        <div className="relative mb-3 md:mb-4 mx-auto">
          {/* Role Badge */}
          <div
            className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(
              member.role
            )}`}
          >
            {member.role.toUpperCase()}
          </div>
        </div>

        {/* Name and Position */}
        <div className="mb-2 flex-1">
          <h3
            className={`${
              variant === "featured" ? "text-lg md:text-xl" : "text-base md:text-lg"
            } font-bold text-gray-900 mb-1 break-words leading-tight`}
          >
            {member.fullName}
          </h3>
          <p className="text-blueText-dark font-semibold text-xs md:text-sm break-words leading-tight">
            {member.position}
          </p>
          <p className="text-gray-600 text-xs break-words leading-tight">
            {member.department}
          </p>
        </div>
      </div>
    </div>
  );
}