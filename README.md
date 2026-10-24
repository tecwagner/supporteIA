# SupportAI

Plataforma SaaS B2B de suporte inteligente com base de conhecimento e IA.
Transforma manuais, políticas e FAQs em respostas verificáveis com referências rastreáveis.

**Plano:** Firebase Spark (gratuito) — sem custos de infraestrutura no MVP.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript strict |
| Hosting | Firebase Hosting (Spark) |
| Auth | Firebase Authentication (Google) |
| Banco | Cloud Firestore (Spark) |
| IA | Firebase AI Logic + Gemini Developer API |
| Testes | Vitest + Firebase Emulator Suite |

---

## Pré-requisitos

- Node.js ≥ 20
- npm ≥ 9
- Java 11+ (para Firebase Emulator Suite)
- Conta Firebase com projeto `suporteia-1c42d`

---

## Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd suporteIA

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com os valores do seu projeto Firebase
```

---

## Desenvolvimento Local

### 1. Inicie os emuladores Firebase

```bash
npm run emulators
```

Emuladores disponíveis:
- **Auth:** http://localhost:9099
- **Firestore:** http://localhost:8080
- **Hosting:** http://localhost:5000
- **Emulator UI:** http://localhost:4000

### 2. Inicie o servidor de desenvolvimento Next.js

Em outro terminal:

```bash
npm run dev
```

Acesse: http://localhost:3000

> Em `development`, o app conecta automaticamente aos emuladores se `NEXT_PUBLIC_USE_EMULATORS=true`.

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento Next.js |
| `npm run build` | Build estático (gera `out/`) |
| `npm run emulators` | Inicia Auth + Firestore + Hosting emulados |
| `npm test` | Roda todos os testes com Vitest |
| `npm run test:rules` | Testa Security Rules contra emuladores |
| `npm run deploy` | Build + deploy no Firebase Hosting |
| `npm run deploy:rules` | Deploy apenas das Security Rules |

---

## Configuração Firebase

### Authentication
Habilite o provedor Google no [Firebase Console](https://console.firebase.google.com):
1. Authentication → Sign-in method → Google → Ativar
2. Adicione `localhost` nos domínios autorizados para desenvolvimento

### Firestore
O banco `(default)` já está configurado na região `nam5`.
As regras ficam em `firestore.rules` e são versionadas no repositório.

---

## Estrutura do Projeto

```
src/
  app/            # Páginas Next.js (App Router)
  features/       # Funcionalidades por domínio
  lib/firebase/   # Cliente Firebase singleton
  types/          # Tipos de domínio
  tests/          # Testes unitários e de regras
firestore.rules   # Security Rules (principal barreira de segurança)
AGENTS.md         # Regras para agentes de desenvolvimento
```

---

## Segurança

- A configuração pública do Firebase (`firebaseConfig`) **não é um segredo** — é necessária no client-side.
- A segurança real está nas `firestore.rules` — são executadas no servidor e não podem ser bypassadas pelo cliente.
- Nunca commit o `.env.local`.
- Nunca exponha chaves de API de LLM ou credenciais administrativas.

Veja `docs/security.md` para análise completa de ameaças.

---

## Limitações do MVP (Firebase Spark)

| Limitação | Impacto | Alternativa |
|---|---|---|
| Sem Cloud Storage | Arquivos não persistidos no servidor | Processamento local no browser |
| Sem Cloud Functions | Sem lógica server-side privilegiada | SDK client + Security Rules |
| Sem backend Go | Sem servidor de aplicação dedicado | SPA estática |
| RAG sem vetores | Busca lexical (BM25) em vez de semântica | Upgrade futuro com Blaze |

---

## Etapas de Desenvolvimento

- [x] Etapa 1 — Diagnóstico e planejamento
- [x] Etapa 2 — Fundação e autenticação  
- [ ] Etapa 3 — Organizações e permissões
- [ ] Etapa 4 — Base de conhecimento
- [ ] Etapa 5 — RAG e Inteligência Artificial
- [ ] Etapa 6 — Atendimento e chamados
- [ ] Etapa 7 — Dashboard e publicação
