'use client';
import TeamSection from '@/components/TeamSection/TeamSection';
import { TeamDisplayProps } from '@/types/teamsection';

export default function TeamDisplay({ 
  sections, 
}: TeamDisplayProps) {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blueText-dark mb-4 text-center w-full">
            Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center ">
            Meet the talented individuals who make Uptech a leader in technology solutions
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section, index) => (
            <TeamSection
              key={index}
              section={section}
              variant={index === 0 ? 'featured' : 'grid'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}