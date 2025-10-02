'use client';
import TeamMember from '@/components/TeamSection/TeamMember';
import { TeamSection as TeamSectionType } from '@/types/teamsection';

type TeamSectionProps = {
  section: TeamSectionType;
  variant?: 'grid' | 'list' | 'featured';
};

export default function TeamSection({ 
  section, 
  variant = 'grid'
}: TeamSectionProps) {
    const getGridClasses = () => {
        const memberCount = section.members.length;
        
        switch (variant) {
          case 'featured':
            return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 justify-items-center place-items-center';
          case 'list':
            return 'space-y-4';
          case 'grid':
          default:
            // Dynamic grid with perfect centering for all screen sizes
            if (memberCount === 1) {
              return 'flex justify-center items-center';
            } else if (memberCount === 2) {
              return 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 justify-items-center place-items-center max-w-2xl mx-auto';
            } else if (memberCount === 3) {
              return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 justify-items-center place-items-center max-w-4xl mx-auto';
            } else if (memberCount === 4) {
              return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 justify-items-center place-items-center max-w-5xl mx-auto';
            } else {
              // 5 or more members - use auto-fit for perfect centering
              return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 justify-items-center place-items-center max-w-6xl mx-auto';
            }
        }
      };

  return (
    <div className="mb-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blueText-dark mb-6 md:mb-8">
        {section.title}
      </h2>
      <div className={`${getGridClasses()} max-w-5xl mx-auto`}>
        {section.members
          .sort((a, b) => a.order - b.order)
          .map((member) => (
            <TeamMember
              key={member.id}
              member={member}
              variant={variant === 'list' ? 'list' : 'card'}
            />
          ))}
      </div>
    </div>
  );
}