// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD5_Ty4m5K3LkMx23jTRkjjsgWw-_XrXM",
  authDomain: "uptech-31efe.firebaseapp.com",
  projectId: "uptech-31efe",
  storageBucket: "uptech-31efe.appspot.com",
  messagingSenderId: "31863675692",
  appId: "1:31863675692:web:a30d6141fdcfab7432ea89"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Export what's needed
window.auth = auth;
window.db = db;
