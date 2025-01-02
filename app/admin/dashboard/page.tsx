'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import tinymce from 'tinymce/tinymce'; // Import TinyMCE
import 'tinymce/themes/silver'; // Import the theme
import 'tinymce/icons/default'; // Import the icons
import 'tinymce/models/dom'; // Import necessary models
import 'tinymce/plugins/advlist'; // Import required plugins
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';

declare namespace tinymce {
  export interface Editor {
    // Add any additional properties or methods you need
  }
}

declare module 'tinymce' {
  interface Editor {
    getContainer: () => HTMLElement;
  }
}

export default function AdminDashboard() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const openJobModal = () => {
    setIsJobModalOpen(true);
  };

  const closeJobModal = () => {
    setIsJobModalOpen(false);
  };

  useEffect(() => {
    // Initialize TinyMCE
    tinymce.init({
      selector: "textarea#jobDescription",
      height: 300,
      menubar: true,
      plugins: [
        "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount fontsize",
      ],
      toolbar:
        "undo redo | fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
      font_size_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",
      setup: function (editor) {
        editor.on("change", function () {
          editor.save(); // This will update the textarea with the content
        });
      },
      init_instance_callback: function (editor: tinymce.Editor) {
        editor.on("focus", function () {
          // Remove any validation styling when focused
          editor.getContainer().style.border = "1px solid #D1D5DB";
        });
      },
    });

    // Logout button functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        // Implement your logout logic here
        console.log('Logging out...');
      });
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-full mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/images/uptech-logo.svg"
                  alt="Uptech Logo"
                  className="h-8 w-auto"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="flex items-center">
              <button
                id="logoutBtn"
                className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Job Applications</h2>

              {/* Filters */}
              <div className="mb-6 flex flex-wrap gap-4">
                <select
                  id="positionFilter"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                >
                  <option value="">All Positions</option>
                </select>
                <select
                  id="statusFilter"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button
                  id="managementBtn"
                  onClick={openJobModal}
                  className="bg-blueTheme text-white px-4 py-1 rounded"
                >
                  Management
                </button>
              </div>

              {/* Applications Table */}
              <div className="overflow-x-auto bg-white rounded-lg shadow w-full">
                <div className="min-w-screen bg-gray-100">
                  <div className="w-full">
                    <table className="w-full table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FirstName</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LastName</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody id="applicationsTable" className="bg-white divide-y divide-gray-200">
                        {/* Applications will be loaded here */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              <div id="loadingState" className="hidden text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading applications...</p>
              </div>

              {/* Empty State */}
              <div id="emptyState" className="hidden text-center py-12">
                <p className="text-gray-500">No applications found</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Application Details Modal */}
      <div id="applicationModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 hidden">
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Application Details</h3>
            <div id="modalContent" className="space-y-4">
              {/* Application details will be loaded here */}
            </div>
            <div className="mt-5 flex justify-end gap-4">
              <button id="closeModal" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Close</button>
              <button id="updateStatus" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update Status</button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Management Modal */}
      {isJobModalOpen && (
        <div id="jobManagementModal" className="fixed inset-0 bg-gray-600 bg-opacity-50">
          <div className="relative my-10 mx-auto p-5 border w-auto max-w-[90%] bg-white rounded-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Jobs</h2>
              <button onClick={closeJobModal} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
              {/* Job Creation Form */}
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Create New Job</h3>
                <form id="jobForm" className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Job Title</label>
                      <input type="text" id="jobTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" required />
                    </div>
                    <div className="w-48">
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <select id="jobDepartment" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" required>
                        <option value="graphic">Graphic Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="administrative">Administrative</option>
                        <option value="engineering">Engineering</option>
                      </select>
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select id="jobStatus" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" required>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="jobDescription" name="jobDescription" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" style={{ height: '120px' }} required></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Job</button>
                  </div>
                </form>
              </div>

              {/* Existing Jobs List */}
              <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                <h3 className="text-lg font-semibold mb-4">Existing Jobs</h3>
                <div id="jobsList" className="space-y-4">
                  {/* Jobs will be dynamically added here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      <div id="emailModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 hidden">
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Send Application Update to <span id="emailRecipient" className="font-semibold"></span>
            </h3>
            <form id="emailForm" className="space-y-4">
              <input type="hidden" id="recipientEmail" />
              <div>
                <label htmlFor="emailTemplate" className="block text-sm font-medium text-gray-700">Email Template</label>
                <select id="emailTemplate" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500">
                  <option value="acceptance">Application Acceptance</option>
                  <option value="rejection">Application Rejection</option>
                  <option value="post_interview_rejection">Post-Interview Rejection</option>
                  <option value="awaiting_review">Application Under Review</option>
                </select>
              </div>
              <div>
                <label htmlFor="emailSubject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input type="text" id="emailSubject" name="subject" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="emailBody" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="emailBody" name="body" rows={6} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"></textarea>
              </div>
              <div className="mt-5 flex justify-end gap-4">
                <button type="button" id="closeEmailModal" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Cancel</button>
                <button type="submit" id="sendEmailButton" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Send Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Firebase Scripts */}
      <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
      <script src="/js/firebase-config.js"></script>
      <script src="/js/dashboard.js"></script>
      <script src="/js/application-handler.js"></script>
      <script src="/js/job-management.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    </div>
  );
}