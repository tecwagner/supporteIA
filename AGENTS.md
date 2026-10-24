# AGENTS.md — SupportAI

Regras permanentes para agentes de desenvolvimento assistido por IA.
Leia este arquivo antes de qualquer modificação no repositório.

---

## Restrição Arquitetural Obrigatória: Firebase Spark

**Este projeto deve permanecer no plano gratuito Firebase Spark.**

### Serviços permitidos
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting
- Firebase Security Rules
- Firebase Emulator Suite
- Firebase AI Logic com Gemini Developer API (apenas modelos gratuitos elegíveis)

### Serviços proibidos
- Firebase Cloud Functions
- Cloud Run
- Cloud Storage for Firebase
- Qualquer serviço que exija upgrade para o plano Blaze
- APIs pagas de LLM ou embedding
- Redis, Kafka, SQS hospedados
- PostgreSQL gerenciado ou qualquer banco pago

**Não configure o projeto para o Blaze.**
**Não presuma que um serviço é gratuito sem verificar a documentação oficial.**

---

## Regras de Desenvolvimento

### 1. Inspecione antes de alterar
- Leia o arquivo existente antes de modificá-lo.
- Não sobrescreva configurações válidas.
- Não apague comentários existentes sem necessidade.

### 2. Segurança
- Nunca exponha segredos no código cliente.
- A segurança real está nas `firestore.rules`, não no frontend.
- Guards de rota no frontend são apenas UX — não confie neles como barreira de segurança.
- Não implemente privilege escalation no cliente.
- Não armazene credenciais no Firestore.

### 3. Firebase
- Use o SDK modular do Firebase (não compat).
- Mantenha uma única instância do app Firebase (`src/lib/firebase/client.ts`).
- Conecte aos emuladores em `development` automaticamente via variáveis de ambiente.
- Não invente métodos de SDK — consulte a documentação oficial.

### 4. Next.js
- `output: "export"` é obrigatório — sem API Routes, Server Actions ou SSR.
- Não adicione rotas que dependam de servidor Next.js em produção.
- O diretório de build é `out/` (não `.next/` ou `dist/`).

### 5. TypeScript
- `strict: true` sempre.
- Não use `any` sem justificativa documentada.
- Tipos de domínio ficam em `src/types/domain.ts`.
- Tipos devem espelhar fielmente o modelo de dados Firestore.

### 6. Testes
- Testes de Security Rules usam Firebase Emulator Suite + Vitest.
- Não declare um teste como aprovado sem executá-lo.
- Cobrir: acesso permitido E negado para cada coleção crítica.

### 7. Modelo de dados
- Toda entidade organizacional vive sob `/organizations/{orgId}/`.
- Security Rules validam membership ativa em cada operação.
- Não confie em `organizationId` enviado pelo cliente como prova de autorização.
- Chunks de documentos ficam em subcoleção para facilitar exclusão em lote.

### 8. Desenvolvimento incremental
- Conclua cada etapa com testes antes de avançar.
- Não implemente toda a aplicação em uma única modificação.
- Documente limitações reais — não esconda problemas.

---

## Estrutura do Projeto

```
src/
  app/                  # Next.js App Router (páginas e layouts)
  features/             # Funcionalidades por domínio
    auth/               # AuthContext, RouteGuard
    organizations/      # Onboarding, membership
    knowledge/          # Documentos, chunks, RAG
    conversations/      # Chat com IA
    tickets/            # Ciclo de vida de chamados
    feedback/           # Avaliação de respostas
  lib/
    firebase/           # client.ts, auth.ts, firestore.ts
    validation/         # Schemas Zod
    errors/             # Tratamento de erros
  domain/               # Tipos puros de negócio (sem Firebase)
  types/                # domain.ts e outros tipos globais
  tests/
    rules/              # Testes das Security Rules
    unit/               # Testes unitários

firestore.rules         # Security Rules (linha de defesa real)
firestore.indexes.json  # Índices compostos versionados
firebase.json           # Config Firebase CLI
```

---

## Modelo de Autenticação e Autorização

```
Autenticado != Autorizado

1. Firebase Auth verifica identidade (quem é o usuário)
2. OrgMember document verifica autorização (o que pode fazer)
3. Firestore Security Rules impõem ambas no servidor

Fluxo:
  Não autenticado → /login
  Autenticado, sem org → /onboarding
  Autenticado, com org ativa → /dashboard
  Suspenso → mensagem de acesso negado
```

---

## Referências

- Prompt Mestre: arquivo interno de requisitos
- Diagnóstico Etapa 1: `.gemini/brain/.../etapa1-diagnostico.md`
- Modelo de dados: `docs/data-model.md` (a criar na Etapa 3)
- Security: `docs/security.md` (a criar na Etapa 3)
