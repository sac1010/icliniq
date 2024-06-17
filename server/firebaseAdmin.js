// firebaseAdmin.js
import admin from 'firebase-admin';
import { serviceAccount } from './firebaseServiceAccountKey.js';


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;
