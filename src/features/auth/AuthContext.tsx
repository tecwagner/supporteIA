"use client";

/**
 * AuthContext — global authentication state.
 *
 * Wraps Firebase onAuthStateChanged and exposes:
 * - user: Firebase User | null
 * - loading: boolean (true while resolving initial auth state)
 * - signIn: trigger Google sign-in
 * - signOut: trigger sign-out
 *
 * IMPORTANT: Being authenticated (user != null) does NOT mean the user has
 * access to an organization. Authorization is handled separately by checking
 * the OrgMember document and enforced by Firestore Security Rules.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, signInWithGoogle, signOut as firebaseSignOut } from "@/lib/firebase/auth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase auth state changes.
    // onAuthStateChanged resolves the initial state from persisted session.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async () => {
    await signInWithGoogle();
    // onAuthStateChanged will update state automatically
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut();
    // onAuthStateChanged will set user to null automatically
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth — consume authentication context.
 * Must be used inside <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
