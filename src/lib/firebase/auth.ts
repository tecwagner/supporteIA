/**
 * Firebase Authentication helpers.
 * Uses Google provider with popup flow.
 * onAuthStateChanged is handled by AuthContext.
 */
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
  type UserCredential,
} from "firebase/auth";
import { auth } from "./client";

const googleProvider = new GoogleAuthProvider();
// Request only the scopes we actually need
googleProvider.addScope("profile");
googleProvider.addScope("email");

/**
 * Sign in with Google popup.
 * Returns UserCredential on success, throws on failure.
 */
export async function signInWithGoogle(): Promise<UserCredential> {
  return signInWithPopup(auth, googleProvider);
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  return firebaseSignOut(auth);
}

/**
 * Get the current authenticated user synchronously.
 * Prefer using AuthContext / useAuth hook in components.
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export { auth };
