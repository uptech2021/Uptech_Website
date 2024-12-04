// Function to handle file uploads using Cloudinary
async function uploadFile(file, folder) {
    if (!file) return null;
    
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        
        // Determine resource type based on file extension
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const isRawFile = ['pdf', 'doc', 'docx'].includes(fileExtension);
        
        // Set appropriate upload endpoint and parameters
        const resourceType = isRawFile ? 'raw' : 'auto';
        const uploadEndpoint = `https://api.cloudinary.com/v1_1/dgvqhlcug/${resourceType}/upload`;
        
        formData.append('resource_type', resourceType);
        formData.append('folder', folder);

        fetch(uploadEndpoint, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.error.message || 'Upload failed');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.secure_url) {
                // Update the file info to include download button
                const fileInfo = document.getElementById(`${folder === 'resumes' ? 'resume' : 'portfolio'}-file-info`);
                const fileName = document.getElementById(`${folder === 'resumes' ? 'resume' : 'portfolio'}-file-name`);
                if (fileInfo && fileName) {
                    // Add download button next to the file name
                    const downloadButton = document.createElement('a');
                    downloadButton.className = 'ml-2 text-blue-500 hover:text-blue-700 download-button';
                    downloadButton.innerHTML = 'Download';
                    downloadButton.href = data.secure_url;
                    downloadButton.download = file.name; // Original filename
                    //downloadButton.setAttribute('target', '_blank');
                    
                    // Remove existing download button if any
                    const existingDownloadButton = fileInfo.querySelector('.download-button');
                    if (existingDownloadButton) {
                        existingDownloadButton.remove();
                    }
                    
                    // Insert download button before the remove button
                    const removeButton = fileInfo.querySelector('.text-red-500');
                    if (removeButton) {
                        fileInfo.insertBefore(downloadButton, removeButton);
                    } else {
                        fileInfo.appendChild(downloadButton);
                    }
                }
                resolve(data.secure_url);
            } else {
                throw new Error('Upload failed: No secure URL received');
            }
        })
        .catch(error => {
            console.error('Upload error:', error);
            reject(error);
        });
    });
}

// Function to update file name display
function updateFileName(inputId) {
    const input = document.getElementById(inputId);
    const fileInfo = document.getElementById(`${inputId}-file-info`);
    const fileName = document.getElementById(`${inputId}-file-name`);
    
    if (input.files && input.files[0]) {
        fileName.textContent = input.files[0].name;
        fileInfo.classList.remove('hidden');
        
        // Remove existing download button if any
        const existingDownloadButton = fileInfo.querySelector('.download-button');
        if (existingDownloadButton) {
            existingDownloadButton.remove();
        }
    }
}

// Function to submit application
async function submitApplication(formData) {
    try {
        // Upload resume
        const resumeUrl = await uploadFile(
            document.getElementById('resume').files[0], 
            'resumes'
        );
        
        // Upload portfolio if present
        const portfolioFile = document.getElementById('portfolio').files[0];
        const portfolioFileUrl = portfolioFile ? await uploadFile(portfolioFile, 'portfolios') : null;
        
        // Get portfolio web URL and ensure it's not an empty string
        const webUrl = formData.get('portfolioUrl');
        const portfolioWebUrl = webUrl && webUrl.trim() !== '' ? webUrl : null;

        // Prepare data for Firestore
        const applicationData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            position: formData.get('position'),
            phone: formData.get('Number'),
            email: formData.get('email'),
            resumeUrl: resumeUrl,
            portfolio: {
                fileUrl: portfolioFileUrl,     // Uploaded portfolio file URL
                webUrl: portfolioWebUrl        // Portfolio website URL
            },
            comment: formData.get('comment'),
            status: "pending",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Log the data being saved (for debugging)
        console.log('Saving application data:', applicationData);

        // Save to Firestore
        await db.collection('applications').add(applicationData);
        return true;
    } catch (error) {
        console.error('Error submitting application:', error);
        throw error;
    }
}

// Function to show/hide loading state
function toggleLoadingState(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    const closeButton = document.getElementById('closeForm');
    
    submitButton.textContent = isLoading ? 'Submitting...' : 'Submit';
    submitButton.disabled = isLoading;
    closeButton.disabled = isLoading;
}

// Function to show success message and reset form
function handleSuccess(form) {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');
    
    setTimeout(() => {
        successMessage.classList.add('hidden');
        form.reset();
        document.getElementById('resume-file-info').classList.add('hidden');
        document.getElementById('portfolio-file-info').classList.add('hidden');
        form.closest('#applicationForm').classList.add('hidden');
        toggleLoadingState(form, false);
    }, 3000);
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', () => {
    const applicationForm = document.querySelector('#applicationForm');
    if (!applicationForm) return;

    applicationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        try {
            toggleLoadingState(form, true);
            await submitApplication(formData);
            handleSuccess(form);
        } catch (error) {
            alert('There was an error submitting your application. Please try again.');
            toggleLoadingState(form, false);
        }
    });
});
