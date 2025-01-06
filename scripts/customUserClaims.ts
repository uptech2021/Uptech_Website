import { adminAuth } from "../firebase/firebase-admin";

// Function to set custom claims
async function setAdminRole(uid: string) {
  try {
    await adminAuth.setCustomUserClaims(uid, { isAdmin: true });
    console.log(`Successfully set isAdmin for user with UID: ${uid}`);
  } catch (error) {
    console.error("Error setting custom user claims:", error);
  }
}

// Example usage: Pass the UID of the user you want to set as admin
(async () => {
  const userUid = "7fbHlnTGPjYWBF1O3PlZPB6wWl33"; // Replace with the actual user UID
  await setAdminRole(userUid);
})();
