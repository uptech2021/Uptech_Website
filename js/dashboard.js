// Check authentication state
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        loadApplications();
    }
});

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
                       class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-file-alt mr-2"></i>View
                    </a>
                ` : 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${application.portfolioUrl ? `
                    <a href="${application.portfolioUrl}" target="_blank"
                       class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-external-link-alt mr-2"></i>View
                    </a>
                ` : 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${getStatusColor(application.status)}">
                    ${application.status || 'New'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="viewApplication('${application.id}')"
                    class="text-blue-600 hover:text-blue-900 mr-4">
                    View
                </button>
            </td>
        `;
        applicationsTable.appendChild(row);
    });
}

// Update position filter options
function updatePositionFilter(applications) {
    const positionFilter = document.getElementById('positionFilter');
    const positions = [...new Set(applications.map(app => app.position))];
    
    positions.forEach(position => {
        const option = document.createElement('option');
        option.value = position;
        option.textContent = position;
        positionFilter.appendChild(option);
    });
}

// Get status color class
function getStatusColor(status) {
    switch (status) {
        case 'new':
            return 'bg-blue-100 text-blue-800';
        case 'reviewed':
            return 'bg-yellow-100 text-yellow-800';
        case 'contacted':
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
                    <label class="block text-sm font-medium text-gray-700">FirstName</label>
                    <p class="mt-1 text-sm text-gray-900">${application.firstName}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">LastName</label>
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
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <p class="mt-1 text-sm text-gray-900">${application.email}</p>
                </div>
                <div>
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
                <div>
                    <label class="block text-sm font-medium text-gray-700">Portfolio</label>
                    <p class="mt-1 text-sm text-gray-900">
                        ${application.portfolioUrl ? `
                            <a href="${application.portfolioUrl}" target="_blank"
                               class="text-blue-600 hover:text-blue-900">
                                <i class="fas fa-external-link-alt mr-2"></i>View Portfolio
                            </a>
                        ` : 'N/A'}
                    </p>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Comment</label>
                    <p class="mt-1 text-sm text-gray-900">${application.comment || 'No comment'}</p>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <select id="applicationStatus" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option value="new" ${application.status === 'new' ? 'selected' : ''}>New</option>
                        <option value="reviewed" ${application.status === 'reviewed' ? 'selected' : ''}>Reviewed</option>
                        <option value="contacted" ${application.status === 'contacted' ? 'selected' : ''}>Contacted</option>
                        <option value="rejected" ${application.status === 'rejected' ? 'selected' : ''}>Rejected</option>
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

// Close modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('applicationModal').classList.add('hidden');
});

// Update application status
async function updateApplicationStatus(applicationId, status) {
    try {
        await db.collection('applications').doc(applicationId).update({
            status: status,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating application status:', error);
    }
}

// Filter handlers
document.getElementById('positionFilter').addEventListener('change', filterApplications);
document.getElementById('statusFilter').addEventListener('change', filterApplications);

async function filterApplications() {
    const position = document.getElementById('positionFilter').value;
    const status = document.getElementById('statusFilter').value;
    
    let query = db.collection('applications');
    
    if (position) {
        query = query.where('position', '==', position);
    }
    if (status) {
        query = query.where('status', '==', status);
    }
    
    try {
        const snapshot = await query.orderBy('timestamp', 'desc').get();
        const applications = [];
        snapshot.forEach(doc => {
            applications.push({ id: doc.id, ...doc.data() });
        });
        renderApplications(applications);
    } catch (error) {
        console.error('Error filtering applications:', error);
    }
}
