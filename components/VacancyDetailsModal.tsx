import React from 'react';
import DOMPurify from 'dompurify';

type VacancyDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vacancy: {
    title: string;
    description: string;
    department: string;
  } | null;
  onApply: (department: string) => void;
};

export default function VacancyDetailsModal({ 
  isOpen, 
  onClose, 
  vacancy, 
  onApply,
}: VacancyDetailsModalProps) {
  if (!isOpen || !vacancy) return null;

  const handleApply = () => {
    onApply(vacancy.department);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 pr-4 break-words">
              {vacancy.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold flex-shrink-0"
            >
              ×
            </button>
          </div>

          {/* Department Badge */}
          <div className="mt-4">
            <span className="bg-blueTheme text-white px-3 py-1 rounded-full text-sm font-medium">
              {vacancy.department}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Job Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Job Description
              </h3>
              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(vacancy.description),
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
            >
              Close
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-3 bg-blueTheme text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}