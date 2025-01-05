// Import the Firebase Admin SDK
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// TODO if this doesn't work then copy the object into this variable instead of importing
const serviceAccount = require('./service-account.json');

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const auth = getAuth();

async function createUser(email, password) {
  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
    });
    const db = getFirestore();
    await db.collection('users').doc(userRecord.uid).set({
      email: email,
      createdAt: Timestamp.now(),
      isAdmin: true,
    });
    console.log('Successfully created new user:', userRecord.uid);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}


createUser(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);