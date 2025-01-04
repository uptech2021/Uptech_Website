import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword };

// Function to initialize authentication
export function initializeAuth(): void {
  const checkAuth = setInterval(() => {
    if (auth) {
      clearInterval(checkAuth);

      // Check if user is already logged in
      auth.onAuthStateChanged((user) => {
        if (user) {
          window.location.href = '/admin/dashboard';
        }
      });

      // Set up login form handler
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        loginForm.addEventListener('submit', async (e: Event) => {
          e.preventDefault();

          const email = (document.getElementById('email') as HTMLInputElement).value;
          const password = (document.getElementById('password') as HTMLInputElement).value;
          const errorMessage = document.getElementById('error-message');

          try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '/admin/dashboard';
          } catch (error: any) {
            if (errorMessage) {
              errorMessage.textContent = error.message;
              errorMessage.classList.remove('hidden');
            }
          }
        });
      }
    }
  }, 100);
}