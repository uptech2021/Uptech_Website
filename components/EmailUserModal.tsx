import React, { useState } from 'react';
import { EmailUserModalProps } from '../types/dashboard';
import { toast } from 'react-toastify';

export default function EmailUserModal({
  onClose,
  recipientEmail,
  firstName,
}: EmailUserModalProps) {
  const [emailTemplate, setEmailTemplate] = useState('acceptance');
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Extract files
    if (files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const recipientFirstName = firstName;

      // Convert files to base64
      const attachments = await Promise.all(
        files.map((file) =>
          new Promise<{ content: string; filename: string; type: string; disposition: string }>(
            (resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve({
                  content: (reader.result as string).split(',')[1], // Base64 content
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
    <div id="emailModal" className="fixed inset-0 bg-gray-600 bg-opacity-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Send Application Update to{' '}
            <span id="emailRecipient" className="font-semibold">{recipientEmail}</span>
          </h3>
          <form id="emailForm" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="emailTemplate" className="block text-sm font-medium text-gray-700">
                Email Template
              </label>
              <select
                id="emailTemplate"
                value={emailTemplate}
                onChange={(e) => setEmailTemplate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              >
                <option value="acceptance">Application Acceptance</option>
                <option value="rejection">Application Rejection</option>
                <option value="post_interview_rejection">Post-Interview Rejection</option>
                <option value="awaiting_review">Application Under Review</option>
              </select>
            </div>

            {emailTemplate === 'acceptance' && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50 shadow-sm">
                <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload PDF(s)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="fileUpload"
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('fileUpload')?.click()}
                    className="px-3 py-2 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600"
                  >
                    Add Another File
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm bg-white p-2 rounded-md shadow-sm">
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
