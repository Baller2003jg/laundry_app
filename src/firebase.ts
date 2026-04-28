import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// ─────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS (one-time, free):
//  1. Go to https://console.firebase.google.com
//  2. Create a new project (e.g. "ht-laundry")
//  3. Click "Realtime Database" → Create database → Start in test mode
//  4. Go to Project Settings → Your apps → Add web app → copy config below
// ─────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCqwW8-SRSUWircGnpqzqsOpY89Aj48UxU",
  authDomain: "ht-laundry.firebaseapp.com",
  databaseURL: "https://ht-laundry-default-rtdb.firebaseio.com",
  projectId: "ht-laundry",
  storageBucket: "ht-laundry.firebasestorage.app",
  messagingSenderId: "595444675094",
  appId: "1:595444675094:web:66b456422f76fb54f67b37",
  measurementId: "G-BPQ0MCBVH4"
};

let db: ReturnType<typeof getDatabase> | null = null;

try {
  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
} catch {
  console.warn('Firebase not configured — running in local-only mode.');
}

export { db };
