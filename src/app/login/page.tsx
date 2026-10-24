"use client";

/**
 * Login Page — /login
 *
 * Entry point for unauthenticated users.
 * Handles Google sign-in flow with error states.
 * On success, redirects to /dashboard (handled by RouteGuard in reverse).
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";
import type { Metadata } from "next";

// NOTE: Metadata export is not available in "use client" files.
// Add metadata in a parent server component if needed.

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect already-authenticated users
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  async function handleGoogleSignIn() {
    setError(null);
    setSigningIn(true);
    try {
      await signIn();
      // Redirect happens via useEffect above after onAuthStateChanged fires
    } catch (err: unknown) {
      console.error("[Login error]", err);
      const authErr = err as { code?: string; message?: string };
      const code = authErr?.code || "";
      const message = authErr?.message || "";

      if (code === "auth/popup-closed-by-user" || message.includes("popup-closed")) {
        // Usuário apenas fechou o popup, não exibe erro
        return;
      }

      if (code === "auth/operation-not-allowed") {
        setError("O provedor Google não está ativado no Console do Firebase (Authentication > Sign-in method).");
      } else if (code === "auth/unauthorized-domain") {
        setError("Domínio não autorizado no Console do Firebase (Authentication > Settings > Authorized domains).");
      } else if (code === "auth/popup-blocked") {
        setError("O navegador bloqueou o popup de login. Por favor, permita popups neste site.");
      } else if (code === "auth/network-request-failed") {
        setError("Falha de conexão. Se alterou o .env.local, reinicie o 'npm run dev' no terminal.");
      } else {
        setError(`Erro ao entrar (${code || "desconhecido"}): ${message || "Tente novamente."}`);
      }
    } finally {
      setSigningIn(false);
    }
  }

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading__spinner" aria-label="Carregando..." />
      </div>
    );
  }

  // Already authenticated — waiting for redirect
  if (user) return null;

  return (
    <main className="login-page">
      {/* Hero Section */}
      <div className="login-page__hero" aria-hidden="true">
        <div className="login-page__hero-content">
          <span className="login-page__hero-badge">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <circle cx="6" cy="6" r="4" />
            </svg>
            SaaS B2B · Firebase Spark
          </span>
          <h1 className="login-page__hero-title">
            Suporte inteligente,<br />fundamentado em dados.
          </h1>
          <p className="login-page__hero-subtitle">
            Transforme manuais, políticas e FAQs em respostas verificáveis,
            com referências rastreáveis e encaminhamento humano quando necessário.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="login-page__form-area">
        <div className="login-page__form-inner">
          {/* Logo */}
          <div className="login-page__logo">
            <div className="login-page__logo-icon" aria-hidden="true">S</div>
            <span className="login-page__logo-text">SupportAI</span>
          </div>

          <h2 className="login-page__title">Bem-vindo de volta</h2>
          <p className="login-page__subtitle">
            Entre com sua conta Google para acessar a plataforma da sua organização.
          </p>

          {error && (
            <div className="error-message" role="alert" aria-live="polite">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zm.75 6.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z"/>
              </svg>
              {error}
            </div>
          )}

          <button
            id="btn-google-signin"
            className="btn btn--google"
            onClick={handleGoogleSignIn}
            disabled={signingIn}
            aria-label="Entrar com Google"
          >
            {signingIn ? (
              <>
                <span className="auth-loading__spinner" style={{ width: 20, height: 20, borderWidth: 2 }} aria-hidden="true" />
                Entrando...
              </>
            ) : (
              <>
                {/* Google SVG Icon */}
                <svg className="btn--google-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuar com Google
              </>
            )}
          </button>

          <div className="login-page__footer">
            Ao entrar, você concorda com os{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>Termos de Uso</a>
            {" "}e a{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>Política de Privacidade</a>.
          </div>
        </div>
      </div>
    </main>
  );
}
