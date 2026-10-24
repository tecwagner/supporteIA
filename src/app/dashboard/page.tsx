"use client";

/**
 * Dashboard page — /dashboard
 * Protected route: requires active authentication.
 * Placeholder for Etapa 3 (Organizations) and Etapa 7 (real metrics).
 */

import { RouteGuard } from "@/features/auth/RouteGuard";
import { useAuth } from "@/features/auth/AuthContext";

export default function DashboardPage() {
  return (
    <RouteGuard>
      <DashboardContent />
    </RouteGuard>
  );
}

function DashboardContent() {
  const { user, signOut } = useAuth();

  return (
    <div className="app-shell">
      {/* Top Bar */}
      <header className="app-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <div className="login-page__logo-icon" style={{ width: 32, height: 32, fontSize: "0.875rem" }}>
            S
          </div>
          <span style={{ fontWeight: 600, fontSize: "1rem" }}>SupportAI</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          {user?.photoURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.photoURL}
              alt={user.displayName ?? "Avatar"}
              width={32}
              height={32}
              style={{ borderRadius: "50%", border: "2px solid var(--border-default)" }}
            />
          )}
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            {user?.displayName ?? user?.email}
          </span>
          <button
            id="btn-signout"
            className="btn btn--ghost btn--sm"
            onClick={signOut}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Sidebar placeholder */}
      <aside className="app-sidebar">
        <nav aria-label="Navegação principal">
          <ul style={{ listStyle: "none", padding: "0 var(--space-3)" }}>
            {[
              { label: "Dashboard", icon: "⊞", href: "/dashboard" },
              { label: "Assistente", icon: "✦", href: "/knowledge" },
              { label: "Documentos", icon: "📄", href: "/knowledge/documents" },
              { label: "Chamados", icon: "🎫", href: "/tickets" },
              { label: "Usuários", icon: "👥", href: "/settings/members" },
              { label: "Configurações", icon: "⚙", href: "/settings" },
            ].map((item) => (
              <li key={item.href} style={{ marginBottom: "var(--space-1)" }}>
                <a
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    padding: "var(--space-2) var(--space-3)",
                    borderRadius: "var(--border-radius-md)",
                    color: "var(--text-secondary)",
                    fontSize: "0.9375rem",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--color-neutral-100)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="app-content">
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "var(--space-2)" }}>
          Dashboard
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-8)" }}>
          Bem-vindo, {user?.displayName?.split(" ")[0]}! 👋
        </p>

        {/* Onboarding card — shown until org is configured (Etapa 3) */}
        <div className="card" style={{ maxWidth: 560 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "var(--border-radius-lg)",
                background: "var(--color-brand-50)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}
            >
              🏗️
            </div>
            <div>
              <h2 style={{ fontSize: "1.0625rem", fontWeight: 600, marginBottom: "var(--space-2)" }}>
                Configuração em andamento
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "var(--space-4)" }}>
                A fundação está pronta! Você está autenticado com sucesso.
                A próxima etapa é configurar sua organização e a base de conhecimento.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {[
                  { done: true, label: "✅ Etapa 1 — Diagnóstico e planejamento" },
                  { done: true, label: "✅ Etapa 2 — Fundação e autenticação" },
                  { done: false, label: "⏳ Etapa 3 — Organizações e permissões" },
                  { done: false, label: "⏳ Etapa 4 — Base de conhecimento" },
                  { done: false, label: "⏳ Etapa 5 — RAG e Inteligência Artificial" },
                  { done: false, label: "⏳ Etapa 6 — Atendimento e chamados" },
                  { done: false, label: "⏳ Etapa 7 — Dashboard e publicação" },
                ].map((item) => (
                  <span
                    key={item.label}
                    style={{
                      fontSize: "0.875rem",
                      color: item.done ? "var(--color-success)" : "var(--text-secondary)",
                    }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
