import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_ADMIN_KEY!, 'base64').toString('utf-8'),
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
// }

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

// const ADMIN_UIDS = '';
// setAdminRole(ADMIN_UIDS);
