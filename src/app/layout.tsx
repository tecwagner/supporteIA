import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/features/auth/AuthContext";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SupportAI — Central de Suporte Inteligente",
    template: "%s | SupportAI",
  },
  description:
    "Transforme documentos internos em uma base de conhecimento inteligente. Respostas fundamentadas com IA, rastreáveis e auditáveis.",
  keywords: ["suporte", "IA", "base de conhecimento", "atendimento", "SaaS"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
