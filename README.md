# Volunteer Connect

Volunteer Connect é uma plataforma para conectar organizações, oportunidades de voluntariado e pessoas voluntárias.

Esta fase do projeto entrega a fundação local: backend NestJS, frontend SvelteKit, scripts npm de qualidade e variáveis de ambiente para integração com Supabase remoto. A modelagem do banco, autenticação e fluxos de produto começam na Fase 2.

## Pré-requisitos

- Node.js 20+
- npm 10+
- Um projeto Supabase remoto

## Instalação

Instale as dependências do projeto raiz, backend e frontend:

```powershell
npm install
npm --prefix backend install
npm --prefix frontend install
```

## Ambiente

Crie o arquivo `.env` a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

Depois, preencha no `.env` os valores do painel do Supabase:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`, quando for necessário executar migrations ou scripts SQL diretos

Nunca commite o `.env`. A chave `SUPABASE_SERVICE_ROLE_KEY` deve ser usada somente no backend.

## Portas locais

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

## Desenvolvimento

Rodar backend e frontend juntos:

```powershell
npm run dev
```

Rodar apenas o backend:

```powershell
npm run dev:backend
```

Rodar apenas o frontend:

```powershell
npm run dev:frontend
```

## Qualidade

Antes de commitar, rode a verificação completa:

```powershell
npm run verify
```

Comandos individuais:

```powershell
npm run lint
npm run format
npm run check
npm test
```

O backend e o frontend também continuam executáveis de forma independente com `npm --prefix backend ...` e `npm --prefix frontend ...`.

## Banco de dados

O projeto usa Supabase remoto para evitar dependência de banco local. Schema, migrations e dados iniciais serão tratados na Fase 2 com Supabase client e scripts/migrations SQL versionados no repositório.
