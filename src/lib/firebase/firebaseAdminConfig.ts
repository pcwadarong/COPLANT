import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const adminFirestore = admin.firestore();

// export const setAdminRole = async (uid: string) => {
//   try {
//     await admin.auth().setCustomUserClaims(uid, {
//       admin: true,
//       role: 'admin',
//     });
//     console.log(`Successfully set admin claim for user ${uid}`);
//   } catch (error) {
//     console.error('Error setting custom claim:', error);
//     throw error;
//   }
// };

// const ADMIN_UIDS = 'nxwr9fTLAXM3uX68o479wDPAkuM2';

// setAdminRole(ADMIN_UIDS);