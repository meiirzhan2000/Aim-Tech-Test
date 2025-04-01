import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';

// Import the service account key directly
import serviceAccount from '../serviceKey.json';

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount as any)
});

// Initialize Firestore
const db = getFirestore(app);

export { db };