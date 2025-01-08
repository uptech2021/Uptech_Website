import React, { useState } from 'react';
import { EmailUserModalProps } from '../types/dashboard';

export default function EmailUserModal({
  onClose,
  recipientEmail,
  firstName, 
}: EmailUserModalProps) {
  const [emailTemplate, setEmailTemplate] = useState('acceptance');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const recipientFirstName = firstName; 

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: recipientEmail,
          emailTemplate,
          dynamicData: { firstName: recipientFirstName },
        }),
      });

      if (response.ok) {
        alert('Email sent successfully!');
        onClose();
      } else {
        const { error } = await response.json();
        alert(`Failed to send email: ${error}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
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
