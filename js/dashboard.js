// Wait for Firebase to initialize and then check authentication state
function initializeAuth() {
    const checkAuth = setInterval(() => {
        if (window.auth) {
            clearInterval(checkAuth);
            window.auth.onAuthStateChanged((user) => {
                if (!user) {
                    console.log('User is not authenticated');
                    window.location.href = 'login.html';
                } else {
                    console.log('User is authenticated');
                    loadApplications();
                }
            });
        }
    }, 100);
}

// Initialize authentication check
initializeAuth();

// Logout functionality
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await auth.signOut();
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Error signing out:', error);
            }
        });
    }
});

// Load applications from Firestore
async function loadApplications() {
    console.log('Starting to load applications...');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');
    const applicationsTable = document.getElementById('applicationsTable');
    
    loadingState.classList.remove('hidden');
    emptyState.classList.add('hidden');
    applicationsTable.innerHTML = '';

    try {
        console.log('Fetching applications from Firestore...');
        const snapshot = await db.collection('applications').orderBy('timestamp', 'desc').get();
        console.log('Snapshot received:', snapshot);
        
        if (snapshot.empty) {
            console.log('No applications found in Firestore');
            loadingState.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        const applications = [];
        snapshot.forEach(doc => {
            console.log('Application data:', doc.data());
            applications.push({ id: doc.id, ...doc.data() });
        });

        console.log('Total applications loaded:', applications.length);

        // Update position filter options
        updatePositionFilter(applications);

        // Render applications
        renderApplications(applications);
        
        loadingState.classList.add('hidden');
    } catch (error) {
        console.error('Error loading applications:', error);
        loadingState.classList.add('hidden');
    }
}

// Render applications in the table
function renderApplications(applications) {
    const applicationsTable = document.getElementById('applicationsTable');
    applicationsTable.innerHTML = '';

    applications.forEach(application => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${application.firstName}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${application.lastName}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${application.position}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${application.phone}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${application.email}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${application.resumeUrl ? `
                    <a href="${application.resumeUrl}" target="_blank" 
                       class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        <i class="fas fa-file-alt mr-2"></i>Resume
                    </a>
                ` : 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col space-y-2">
                    ${application.portfolio?.fileUrl ? `
                        <a href="${application.portfolio.fileUrl}" target="_blank"
                           class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                            <i class="fas fa-file-alt mr-2"></i>Portfolio
                        </a>
                    ` : ''}
                    ${application.portfolio?.webUrl ? `
                        <a href="${application.portfolio.webUrl}" target="_blank"
                           class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            <i class="fas fa-external-link-alt mr-2"></i>Website
                        </a>
                    ` : ''}
                    ${!application.portfolio?.fileUrl && !application.portfolio?.webUrl ? 'N/A' : ''}
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${getStatusColor(application.status)}">
                    ${application.status || 'pending'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                    <button onclick="viewApplication('${application.id}')"
                            class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="deleteApplication('${application.id}')" 
                            class="text-red-600 hover:text-red-900">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        applicationsTable.appendChild(row);
    });
}

// Update position filter options
function updatePositionFilter(applications) {
    const positionFilter = document.getElementById('positionFilter');
    // Clear existing options except the first one (All Positions)
    while (positionFilter.options.length > 1) {
        positionFilter.remove(1);
    }
    
    const positions = [...new Set(applications.map(app => app.position))]
        .filter(Boolean)
        .sort();
    
    console.log('Available positions:', positions);
    
    positions.forEach(position => {
        const option = document.createElement('option');
        option.value = position;
        option.textContent = position;
        positionFilter.appendChild(option);
    });
}

// Get status color class
function getStatusColor(status) {
    switch (status?.toLowerCase()) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'accepted':
            return 'bg-green-100 text-green-800';
        case 'rejected':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

// View application details
async function viewApplication(applicationId) {
    const modal = document.getElementById('applicationModal');
    const modalContent = document.getElementById('modalContent');
    
    try {
        const doc = await db.collection('applications').doc(applicationId).get();
        const application = { id: doc.id, ...doc.data() };
        
        modalContent.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">First Name</label>
                    <p class="mt-1 text-sm text-gray-900">${application.firstName}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Last Name</label>
                    <p class="mt-1 text-sm text-gray-900">${application.lastName}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Position</label>
                    <p class="mt-1 text-sm text-gray-900">${application.position}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Contact</label>
                    <p class="mt-1 text-sm text-gray-900">${application.phone}</p>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <div class="flex items-center gap-2">
                        <p class="mt-1 text-sm text-gray-900">${application.email}</p>
                        <button onclick="emailUser('${application.email}', '${application.firstName} ${application.lastName}', '${application.position}')" 
                                class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <i class="fas fa-envelope mr-2"></i>Send Email
                        </button>
                    </div>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Resume</label>
                    <p class="mt-1 text-sm text-gray-900">
                        ${application.resumeUrl ? `
                            <a href="${application.resumeUrl}" target="_blank" 
                               class="text-blue-600 hover:text-blue-900">
                                <i class="fas fa-file-alt mr-2"></i>View Resume
                            </a>
                        ` : 'N/A'}
                    </p>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Portfolio</label>
                    <div class="mt-1 text-sm text-gray-900 space-y-2">
                        ${application.portfolio?.fileUrl ? `
                            <p>
                                <a href="${application.portfolio.fileUrl}" target="_blank"
                                   class="text-blue-600 hover:text-blue-900">
                                    <i class="fas fa-file-alt mr-2"></i>View Portfolio File
                                </a>
                            </p>
                        ` : ''}
                        ${application.portfolio?.webUrl ? `
                            <p>
                                <a href="${application.portfolio.webUrl}" target="_blank"
                                   class="text-blue-600 hover:text-blue-900">
                                    <i class="fas fa-external-link-alt mr-2"></i>View Portfolio Website
                                </a>
                            </p>
                        ` : ''}
                        ${!application.portfolio?.fileUrl && !application.portfolio?.webUrl ? 'N/A' : ''}
                    </div>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Comment</label>
                    <p class="mt-1 text-sm text-gray-900">${application.comment || 'No comment'}</p>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <select id="applicationStatus" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option value="pending" ${application.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="accepted" ${application.status === 'accepted' ? 'selected' : ''}>Accept</option>
                        <option value="rejected" ${application.status === 'rejected' ? 'selected' : ''}>Reject</option>
                    </select>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        
        // Update status button handler
        document.getElementById('updateStatus').onclick = async () => {
            const newStatus = document.getElementById('applicationStatus').value;
            await updateApplicationStatus(applicationId, newStatus);
            modal.classList.add('hidden');
            loadApplications();
        };
    } catch (error) {
        console.error('Error loading application details:', error);
    }
}

// Email templates
const emailTemplates = {
    acceptance: {
        template_id: "application_update",
        subject: "Congratulations - Your Application at Uptech Incorporated Limited",
        body: (name, position) => `Dear ${name},

We are delighted to inform you that after careful consideration of your application for the ${position} position at Uptech Incorporated Limited, we would like to invite you to join our team.

Your qualifications, experience, and the skills you've demonstrated throughout the application process have impressed us, and we believe you would be a valuable addition to our organization.

We will be sending a follow-up email shortly with more details about the next steps, including information about compensation, benefits, and start date options.

Once again, congratulations! We look forward to welcoming you to the team.

Best regards,
HR Team
Uptech Incorporated Limited`
    },
    rejection: {
        template_id: "application_update",
        subject: "Update on Your Application - Uptech Incorporated Limited",
        body: (name, position) => `Dear ${name},

Thank you for your interest in the ${position} position at Uptech Incorporated Limited and for taking the time to submit your application.

After carefully reviewing your application materials, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current requirements.

We appreciate your interest in Uptech Incorporated Limited and wish you the best in your future endeavors.

Best regards,
HR Team
Uptech Incorporated Limited`
    },
    post_interview_rejection: {
        template_id: "application_update",
        subject: "Update on Your Application - Uptech Incorporated Limited",
        body: (name, position) => `Dear ${name},

Thank you for taking the time to interview for the ${position} position at Uptech Incorporated Limited. We appreciate the effort you put into this process and enjoyed getting to know you better.

After careful consideration of all candidates, we regret to inform you that we have decided to move forward with another candidate whose qualifications and experience more closely align with our current needs.

We were impressed with your professionalism and encourage you to apply for future positions that align with your qualifications.

We wish you the best in your career pursuits.

Best regards,
HR Team
Uptech Incorporated Limited`
    },
    awaiting_review: {
        template_id: "application_update",
        subject: "Application Received - Uptech Incorporated Limited",
        body: (name, position) => `Dear ${name},

Thank you for submitting your application for the ${position} position at Uptech Incorporated Limited. We appreciate your interest in joining our team.

We are currently reviewing all applications and will be in touch with selected candidates for the next steps in the process. Due to the high volume of applications, this may take some time.

If you don't hear from us within the next two weeks, please feel free to consider other opportunities. We will keep your application on file for any future positions that match your qualifications.

Thank you for your patience and interest in Uptech Incorporated Limited.

Best regards,
HR Team
Uptech Incorporated Limited`
    }
};

// Email user function
async function emailUser(email, name, position) {
    const emailModal = document.getElementById('emailModal');
    const templateSelect = document.getElementById('emailTemplate');
    document.getElementById('emailRecipient').textContent = name;
    document.getElementById('recipientEmail').value = email;

    // Handle template selection
    const updateEmailTemplate = () => {
        const template = emailTemplates[templateSelect.value];
        document.getElementById('emailSubject').value = template.subject;
        document.getElementById('emailBody').value = template.body(name, position);
    };

    templateSelect.addEventListener('change', updateEmailTemplate);
    updateEmailTemplate(); // Set initial template

    emailModal.classList.remove('hidden');
}

// Fetch the emailjs key
const fetchKey = async () => {
    try {
        console.log("Fetching key...");
        const response = await fetch('http://localhost:3000/api/emailjs-key')
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response.ok);
        const data = await response.json();
        console.log(data.key);
        return data.key;
    } catch (error) {
        console.error("Error fetching key:", error);
        throw error;
    }
};

// Send email function
async function sendEmail(event) {
    event.preventDefault();
    const sendButton = document.getElementById('sendEmailButton');
    const recipientEmail = document.getElementById('recipientEmail').value;
    const subject = document.getElementById('emailSubject').value;
    const message = document.getElementById('emailBody').value;
    const recipientName = document.getElementById('emailRecipient').textContent;
    const jobTitle = document.getElementById('jobTitle')?.value || 'the position';
    const adminName = 'HR Team';
    const companyName = 'Uptech Inc';

    try {
        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';

        const key = await fetchKey();
        emailjs.init(key);

        await emailjs.send(
            "service_1ghwgxo",
            "application_update",
            {
                to_email: recipientEmail,
                applicant_name: recipientName,
                job_title: jobTitle,
                status_message: message,
                admin_name: adminName,
                company_name: companyName,
                subject: subject,
                reply_to: recipientEmail
            }
        );

        alert('Update sent successfully!');
        closeEmailModal();
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send update. Please try again.');
    } finally {
        sendButton.disabled = false;
        sendButton.textContent = 'Send Update';
    }
}

// Close email modal
function closeEmailModal() {
    const emailModal = document.getElementById('emailModal');
    emailModal.classList.add('hidden');
    // Clear form
    document.getElementById('emailSubject').value = '';
    document.getElementById('emailBody').value = '';
}

// Add event listeners for email modal
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('emailForm').addEventListener('submit', sendEmail);
    document.getElementById('closeEmailModal').addEventListener('click', closeEmailModal);
});

// Close modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('applicationModal').classList.add('hidden');
});

// Update application status
async function updateApplicationStatus(applicationId, status) {
    try {
        await db.collection('applications').doc(applicationId).update({
            status: status
        });
        await loadApplications(); // Refresh the table
    } catch (error) {
        console.error('Error updating application status:', error);
        alert('Failed to update application status. Please try again.');
    }
}

// Delete application
async function deleteApplication(applicationId) {
    if (!confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
        return;
    }

    try {
        await db.collection('applications').doc(applicationId).delete();
        console.log('Application deleted successfully');
        // Reload the applications to update the UI
        loadApplications();
    } catch (error) {
        console.error('Error deleting application:', error);
        alert('Error deleting application. Please try again.');
    }
}

// Filter handlers
document.getElementById('positionFilter').addEventListener('change', filterApplications);
document.getElementById('statusFilter').addEventListener('change', filterApplications);

async function filterApplications() {
    const position = document.getElementById('positionFilter').value;
    const status = document.getElementById('statusFilter').value;
    console.log('Filtering with:', { position, status });
    
    try {
        // Get all applications first
        const snapshot = await db.collection('applications')
            .orderBy('timestamp', 'desc')
            .get();

        console.log('Total applications:', snapshot.size);
        const applications = [];
        
        // Filter in memory for more flexible matching
        snapshot.forEach(doc => {
            const data = { id: doc.id, ...doc.data() };
            let include = true;
            
            if (position && data.position !== position) {
                include = false;
            }
            
            if (status && data.status?.toLowerCase() !== status.toLowerCase()) {
                include = false;
            }
            
            if (include) {
                applications.push(data);
            }
        });
        
        console.log('Filtered applications:', applications.length);
        renderApplications(applications);
    } catch (error) {
        console.error('Error filtering applications:', error);
    }
}
