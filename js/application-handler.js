// Function to handle file uploads to Firebase Storage
async function uploadFile(file, folder) {
    if (!file) return null;
    const fileRef = storage.ref(`${folder}/${Date.now()}_${file.name}`);
    await fileRef.put(file);
    return await fileRef.getDownloadURL();
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
        const portfolioUrl = await uploadFile(
            document.getElementById('portfolio').files[0], 
            'portfolios'
        );

        // Prepare data for Firestore
        const applicationData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            position: formData.get('position'),
            phone: formData.get('Number'),
            email: formData.get('email'),
            resumeUrl: resumeUrl,
            portfolioFileUrl: portfolioUrl,
            portfolioUrl: formData.get('portfolioUrl'),
            comment: formData.get('comment'),
            status: "pending",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

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
