# Fluxo local de desenvolvimento

Este guia consolida o passo a passo de desenvolvimento local do Volunteer Connect para backend (NestJS) e frontend (SvelteKit).

## 1) Pré-requisitos

- Node.js 20+
- npm 10+
- Projeto Supabase remoto

## 2) Instalação de dependências

No diretório raiz do projeto:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

## 3) Configuração de ambiente

1. Crie o arquivo `.env` na raiz a partir de `.env.example`.
2. Opcionalmente, crie também `backend/.env` a partir de `backend/.env.example` e `frontend/.env` a partir de `frontend/.env.example` para setups por aplicação.
3. Preencha apenas com valores do ambiente remoto autorizado.
4. Nunca commitar arquivos `.env`.

Variáveis esperadas:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (somente backend)
- `DATABASE_URL` (quando necessário para scripts/migrations)

## 4) Execução em desenvolvimento

### Backend e frontend juntos

```bash
npm run dev
```

### Somente backend

```bash
npm run dev:backend
```

### Somente frontend

```bash
npm run dev:frontend
```

## 5) Verificação de qualidade

### Verificação completa

```bash
npm run verify
```

### Comandos separados

```bash
npm run lint
npm run format
npm run check
npm test
```

## 6) Fluxo recomendado antes de abrir PR

1. Sincronizar branch com a base do projeto.
2. Rodar `npm run verify`.
3. Revisar alterações de segurança e segredos.
4. Confirmar que documentação e scripts refletem o estado atual.
5. Abrir PR com descrição objetiva de escopo e validação.

## 7) Problemas comuns

- `npm warn Unknown env config "http-proxy"`:
  - É aviso de configuração de ambiente do npm e não bloqueia os scripts de qualidade.
- Erro de porta em desenvolvimento:
  - Verifique se já existe outro processo ocupando `3000` (backend) ou `5173` (frontend).
- Falha por variáveis de ambiente ausentes:
  - Revalide o `.env` com base no `.env.example`.
