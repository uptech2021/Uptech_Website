// Firebase configuration
const firebaseConfig = async () => {
  try {
    console.log("Fetching key...");
    const isLocalhost = window.location.hostname.includes('localhost');
    const apiUrl = isLocalhost ? 'http://localhost:3000/api/firebase-config' : 'http://138.197.0.213:3000/api/firebase-config';
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response.ok);
    const data = await response.json();
    console.log(data.config);
    return data.config;
  } catch (error) {
    console.error("Error catching config:", error);
    throw error;
  }
};
let app;
let auth;
let db;
firebaseConfig().then((firebaseConfig) => {
  console.log("Firebase config:", firebaseConfig);
  app = firebase.initializeApp(firebaseConfig);
  console.log("Firebase app:", app);
  auth = firebase.auth();
  console.log("Firebase auth:", auth);
  db = firebase.firestore();
  console.log("Firebase db:", db);
  
  window.auth = auth;
  window.db = db;
});
