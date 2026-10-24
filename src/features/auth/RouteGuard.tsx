"use client";

/**
 * RouteGuard — protects private routes from unauthenticated access.
 *
 * SECURITY NOTE: This is a UX guard only.
 * Real security is enforced by Firestore Security Rules on the server.
 * A user that bypasses this component would still be denied by the Rules.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Show nothing while resolving auth state to avoid flash of protected content
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading__spinner" aria-label="Verificando autenticação..." />
      </div>
    );
  }

  // Redirecting — show nothing
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
