import React, { useState, useRef } from 'react';
import { EmailUserModalProps } from '../types/dashboard';
import { toast } from 'react-toastify';
import { Upload, X, FileText } from 'lucide-react';

export default function EmailUserModal({
  onClose,
  recipientEmail,
  firstName,
}: EmailUserModalProps) {
  const [emailTemplate, setEmailTemplate] = useState('acceptance');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const templateOptions = [
    { value: 'acceptance', label: 'Application Acceptance', description: 'Notify the applicant of their acceptance' },
    { value: 'rejection', label: 'Application Rejection', description: 'Notify the applicant of their rejection' },
    { value: 'post_interview_rejection', label: 'Post-Interview Rejection', description: 'Rejection after interview stage' },
    { value: 'awaiting_review', label: 'Application Under Review', description: 'Let applicant know their application is being reviewed' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(droppedFiles)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const recipientFirstName = firstName;

      const attachments = await Promise.all(
        files.map((file) =>
          new Promise<{ content: string; filename: string; type: string; disposition: string }>(
            (resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve({
                  content: (reader.result as string).split(',')[1],
                  filename: file.name,
                  type: file.type,
                  disposition: 'attachment',
                });
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            }
          )
        )
      );

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: recipientEmail,
          emailTemplate,
          dynamicData: { firstName: recipientFirstName },
          attachments: emailTemplate === 'acceptance' ? attachments : undefined,
        }),
      });

      if (response.ok) {
        toast.success('Email sent successfully!');
        onClose();
      } else {
        const { error } = await response.json();
        toast.error(`Failed to send email: ${error}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email.');
    }
  };

  return (
    <div id="emailModal" className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-paper rounded-card shadow-card-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-navy rounded-t-card px-6 py-5">
          <h3 className="text-white text-lg font-bold">
            Send Application Update
          </h3>
          <p className="text-white/70 text-sm mt-1">
            To: <span className="text-white font-medium">{recipientEmail}</span>
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          <form id="emailForm" className="space-y-5" onSubmit={handleSubmit}>
            {/* Template selector as visual radio cards */}
            <div>
              <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-3">
                Email Template
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templateOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setEmailTemplate(option.value)}
                    className={`text-left p-3 rounded-card-sm border-2 transition ${
                      emailTemplate === option.value
                        ? 'border-brand bg-mist-2'
                        : 'border-line bg-paper hover:bg-mist'
                    }`}
                  >
                    <span className={`block text-sm font-bold ${
                      emailTemplate === option.value ? 'text-brand-deep' : 'text-ink'
                    }`}>
                      {option.label}
                    </span>
                    <span className="block text-xs text-ink-soft mt-1">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* File upload zone (only for acceptance) */}
            {emailTemplate === 'acceptance' && (
              <div>
                <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-3">
                  Attachments (PDF)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-card-sm p-6 text-center cursor-pointer transition ${
                    isDragActive
                      ? 'border-brand bg-mist-2'
                      : 'border-line bg-mist hover:bg-mist-2'
                  }`}
                >
                  <Upload className={`w-8 h-8 mx-auto mb-2 ${isDragActive ? 'text-brand' : 'text-ink-soft'}`} />
                  <p className="text-ink-soft text-sm font-medium">
                    {isDragActive ? 'Drop files here' : 'Drag & drop PDFs or click to browse'}
                  </p>
                  <input
                    ref={fileInputRef}
                    id="fileUpload"
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* File list */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-mist border border-line rounded-card-sm px-3 py-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-brand shrink-0" />
                          <span className="text-ink text-sm truncate">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 shrink-0 ml-2 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-4 border-t border-line flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-transparent text-ink-soft border border-line rounded-full hover:bg-mist px-6 py-2.5 font-bold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-brand text-white rounded-full shadow-glow-blue hover:bg-brand-deep px-6 py-2.5 font-bold transition"
              >
                Send Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
