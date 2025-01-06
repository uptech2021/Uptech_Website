import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

// Job Management Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    // const managementBtn = document.getElementById('managementBtn') as HTMLButtonElement;
    // const jobManagementModal = document.getElementById('jobManagementModal') as HTMLDivElement;
    const jobForm = document.getElementById('jobForm') as HTMLFormElement;
    const jobsList = document.getElementById('jobsList') as HTMLDivElement;

    // Functions
    (window as any).openJobModal = function() {
        // Check if user is authenticated
        const user = auth.currentUser;
        if (!user) {
            alert('Please log in to manage jobs');
            return;
        }

        const modal = document.getElementById('jobManagementModal') as HTMLDivElement;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        loadJobs(); // Load existing jobs when modal opens
    };

    (window as any).closeJobModal = function() {
        const modal = document.getElementById('jobManagementModal') as HTMLDivElement;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        jobForm.reset(); // Reset form when modal closes
    };

    async function handleJobSubmit(e: Event) {
        e.preventDefault();
        
        // Check authentication
        const user = auth.currentUser;
        if (!user) {
            alert('Please log in to manage jobs');
            return;
        }

        // Get TinyMCE content and validate
        const description = (window as any).tinymce.get('jobDescription').getContent();
        if (!description.trim()) {
            alert('Please enter a job description');
            return;
        }

        const jobData = {
            title: (document.getElementById('jobTitle') as HTMLInputElement).value,
            department: (document.getElementById('jobDepartment') as HTMLInputElement).value,
            description: description,
            status: (document.getElementById('jobStatus') as HTMLSelectElement).value,
            createdAt: new Date().toISOString(),
            createdBy: user.uid
        };

        try {
            if (jobForm.dataset.jobId) {
                // Update existing job
                await updateDoc(doc(db, 'jobs', jobForm.dataset.jobId), {
                    ...jobData,
                    updatedAt: new Date().toISOString(),
                    updatedBy: user.uid
                });
                delete jobForm.dataset.jobId;
                const submitBtn = jobForm.querySelector('button[type="submit"]') as HTMLButtonElement;
                submitBtn.textContent = 'Create Job';
            } else {
                // Create new job
                await addDoc(collection(db, 'jobs'), jobData);
            }
            alert('Job saved successfully!');
            jobForm.reset();
            loadJobs();
        } catch (error) {
            console.error('Error saving job:', error);
            alert('Error saving job. Please try again.');
        }
    }

    async function loadJobs() {
        // Check authentication
        const user = auth.currentUser;
        if (!user) {
            alert('Please log in to view jobs');
            return;
        }

        try {
            const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);

            jobsList.innerHTML = '';

            if (snapshot.empty) {
                jobsList.innerHTML = '<p class="text-gray-500">No jobs found. Create your first job above!</p>';
                return;
            }

            snapshot.forEach(doc => {
                const job = doc.data();
                const jobElement = createJobElement(doc.id, job);
                jobsList.appendChild(jobElement);
            });
        } catch (error) {
            console.error('Error loading jobs:', error);
            if ((error as any).code === 'permission-denied') {
                alert('You do not have permission to view jobs. Please contact your administrator.');
            } else {
                alert('Error loading jobs. Please try again.');
            }
        }
    }

    function createJobElement(id: string, job: any) {
        const div = document.createElement('div');
        div.className = 'bg-gray-50 rounded-md shadow overflow-hidden';
        div.innerHTML = `
            <div class="cursor-pointer p-4 flex justify-between items-center hover:bg-gray-100" onclick="toggleJobDetails('${id}')">
                <div class="flex items-center space-x-4">
                    <h4 class="text-lg font-semibold">${job.title}</h4>
                    <span class="px-2 py-1 rounded-full text-sm ${job.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}">
                        ${job.status}
                    </span>
                </div>
                <svg class="w-5 h-5 transform transition-transform duration-200" id="arrow-${id}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
            <div class="hidden p-4 bg-white border-t" id="details-${id}">
                <div class="space-y-2">
                    <p class="text-sm text-gray-600">Department: ${job.department}</p>
                    <div class="prose max-w-none mt-2">${job.description}</div>
                    <div class="flex justify-end space-x-2 mt-4">
                        <button onclick="toggleJobStatus('${id}', '${job.status}')" 
                                class="${job.status === 'open' ? 'bg-red-500' : 'bg-green-500'} text-white px-3 py-1 rounded">
                            ${job.status === 'open' ? 'Close Position' : 'Open Position'}
                        </button>
                        <button onclick="editJob('${id}')" class="bg-blue-500 text-white px-3 py-1 rounded">
                            Edit
                        </button>
                        <button onclick="deleteJob('${id}')" class="bg-red-500 text-white px-3 py-1 rounded">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
        return div;
    }

    // Add toggle details functionality
    (window as any).toggleJobDetails = function(id: string) {
        const detailsElement = document.getElementById(`details-${id}`) as HTMLDivElement;
        const arrowElement = document.getElementById(`arrow-${id}`) as unknown as SVGElement;
        
        if (detailsElement.classList.contains('hidden')) {
            detailsElement.classList.remove('hidden');
            arrowElement.style.transform = 'rotate(180deg)';
        } else {
            detailsElement.classList.add('hidden');
            arrowElement.style.transform = 'rotate(0)';
        }
    };

    // Event Listeners
    jobForm.addEventListener('submit', handleJobSubmit);

    // Make functions globally available
    (window as any).editJob = async function(id: string) {
        // Check authentication
        const user = auth.currentUser;
        if (!user) {
            alert('Please log in to edit jobs');
            return;
        }

        try {
            const docRef = doc(db, 'jobs', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const job = docSnap.data();
                
                // Get form elements
                const titleInput = document.getElementById('jobTitle') as HTMLInputElement;
                const departmentInput = document.getElementById('jobDepartment') as HTMLInputElement;
                const statusInput = document.getElementById('jobStatus') as HTMLSelectElement;
                const descriptionEditor = (window as any).tinymce.get('jobDescription');
                
                // Check if all required elements exist
                if (!titleInput || !departmentInput || !statusInput || !descriptionEditor) {
                    throw new Error('Required form elements are missing');
                }

                // Set form values
                titleInput.value = job.title;
                departmentInput.value = job.department;
                statusInput.value = job.status === 'open' ? 'open' : 'closed';
                descriptionEditor.setContent(job.description);
                
                // Change form submit button text
                const submitBtn = jobForm.querySelector('button[type="submit"]') as HTMLButtonElement;
                if (submitBtn) {
                    submitBtn.textContent = 'Update Job';
                }
                
                // Add job ID to form for updating
                jobForm.dataset.jobId = id;
                (window as any).openJobModal();
            }
        } catch (error) {
            console.error('Error loading job for edit:', error);
            alert('Error loading job. Please try again.');
        }
    };

    (window as any).deleteJob = async function(id: string) {
        // Check authentication
        const user = auth.currentUser;
        if (!user) {
            alert('Please log in to delete jobs');
            return;
        }

        if (confirm('Are you sure you want to delete this job?')) {
            try {
                await deleteDoc(doc(db, 'jobs', id));
                loadJobs();
                alert('Job deleted successfully!');
            } catch (error) {
                console.error('Error deleting job:', error);
                alert('Error deleting job. Please try again.');
            }
        }
    };

    (window as any).toggleJobStatus = async function(id: string, currentStatus: string) {
        // Check authentication
        const user = auth.currentUser;
        if (!user) {
            alert('Please log in to manage jobs');
            return;
        }

        try {
            const newStatus = currentStatus === 'open' ? 'closed' : 'open';
            await updateDoc(doc(db, 'jobs', id), {
                status: newStatus,
                updatedAt: new Date().toISOString(),
                updatedBy: user.uid
            });
            loadJobs(); // Refresh the job list
            alert(`Job status updated to ${newStatus}`);
        } catch (error) {
            console.error('Error updating job status:', error);
            alert('Error updating job status. Please try again.');
        }
    };
});