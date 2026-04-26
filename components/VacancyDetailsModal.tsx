import React from "react";
import DOMPurify from "dompurify";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col border border-white/20">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-purple-800 text-white p-6 md:p-8 flex-shrink-0">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-yellow-300 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-cyan-300 rounded-full blur-3xl opacity-20" />

          <div className="relative z-10 flex justify-between items-start gap-4">
            <div>
              <p className="text-yellow-300 font-bold uppercase tracking-widest text-sm mb-3">
                Vacancy Details
              </p>

              <h2 className="text-2xl md:text-4xl font-extrabold leading-tight pr-4 break-words">
                {vacancy.title}
              </h2>

              <span className="inline-block mt-5 bg-white/15 border border-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold">
                {vacancy.department}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white hover:text-blue-950 text-white text-2xl font-bold flex items-center justify-center transition"
              aria-label="Close vacancy details"
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 md:p-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-extrabold text-blue-950 mb-5">
                Job Description
              </h3>

              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed prose-headings:text-blue-950 prose-strong:text-blue-950 prose-a:text-blue-700"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(vacancy.description),
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-5 md:p-6 border-t border-gray-100 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-blue-100 text-blue-950 rounded-2xl font-bold hover:bg-blue-50 transition"
            >
              Close
            </button>

            <button
              onClick={handleApply}
              className="px-6 py-3 bg-yellow-300 text-blue-950 rounded-2xl font-bold hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}