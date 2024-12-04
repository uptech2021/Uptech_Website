// Wait for Firebase to initialize
function initializeAuth() {
    const checkAuth = setInterval(() => {
        if (window.auth) {
            clearInterval(checkAuth);
            
            // Check if user is already logged in
            window.auth.onAuthStateChanged((user) => {
                if (user) {
                    window.location.href = 'dashboard.html';
                }
            });

            // Set up login form handler
            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const errorMessage = document.getElementById('error-message');
                
                try {
                    await window.auth.signInWithEmailAndPassword(email, password);
                    window.location.href = 'dashboard.html';
                } catch (error) {
                    errorMessage.textContent = error.message;
                    errorMessage.classList.remove('hidden');
                }
            });
        }
    }, 100);
}

// Initialize authentication check
initializeAuth();
