/**
 * Firebase client initialization — singleton pattern.
 * Only one Firebase app instance is created across the entire application.
 *
 * SECURITY NOTE: The public Firebase config is NOT a secret.
 * Real security is enforced by Firestore Security Rules and Authentication.
 *
 * SPARK PLAN: Only uses Auth, Firestore, and Hosting — all free on Spark.
 */
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  type Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Singleton Firebase app
function createFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

const app: FirebaseApp = createFirebaseApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

// Connect to emulators in development — only once per session
const EMULATORS_CONNECTED_KEY = "__firebase_emulators_connected__";

if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_USE_EMULATORS === "true" &&
  process.env.NEXT_PUBLIC_APP_ENV === "development" &&
  !(window as typeof window & { [key: string]: boolean })[EMULATORS_CONNECTED_KEY]
) {
  (window as typeof window & { [key: string]: boolean })[EMULATORS_CONNECTED_KEY] = true;
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "localhost", 8080);
  console.info("[Firebase] Connected to emulators: Auth:9099, Firestore:8080");
}

export { app, auth, db };
