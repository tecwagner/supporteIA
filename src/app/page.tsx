"use client";

/**
 * Root page — redirects to /dashboard if authenticated, /login otherwise.
 * Immediate redirect handled by RouteGuard + AuthContext.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace(user ? "/dashboard" : "/login");
    }
  }, [user, loading, router]);

  return (
    <div className="auth-loading">
      <div className="auth-loading__spinner" aria-label="Carregando SupportAI..." />
    </div>
  );
}
