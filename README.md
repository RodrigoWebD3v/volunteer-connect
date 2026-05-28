# Volunteer Connect

Volunteer Connect é uma plataforma web para conectar pessoas voluntárias a ONGs com oportunidades reais, organizadas e acompanháveis.

O MVP entrega backend NestJS, frontend SvelteKit, integração com Supabase remoto, autenticação, cadastro de voluntário/ONG, análise administrativa de ONGs, oportunidades, inscrições, presenças e documentação de entrega acadêmica.

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
- `SUPABASE_LOGOS_BUCKET`, opcional; padrão `logos-ongs`
- `PUBLIC_BACKEND_URL`, no frontend; padrão local `http://localhost:3000`
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

Consulte também o checklist operacional em `docs/qualidade-checklist.md`.


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

## Fluxo local

Para um guia passo a passo de setup, execução e validação local, consulte `docs/fluxo-desenvolvimento-local.md`.

## Banco de dados

O projeto usa Supabase remoto para evitar dependência de banco local. As migrations versionadas ficam em `supabase/migrations/` e são contratos locais: revise antes de executar em qualquer banco remoto.

Ordem sugerida para ambiente autorizado:

```powershell
Get-ChildItem supabase/migrations/*.sql | Sort-Object Name
```

Execute manualmente no SQL editor ou via CLI Supabase conforme a política do grupo.

## Fluxos do MVP

- Guest lista e abre oportunidades públicas.
- Voluntário cria conta, entra, inscreve-se e acompanha inscrições/presenças.
- ONG cria conta com CNPJ/logo, aguarda análise, publica oportunidades após aprovação e registra presenças.
- Admin aprova/reprova ONGs em telas administrativas.

## Entrega acadêmica

Os documentos finais estão em `docs/delivery/` e `docs/verification/`:

- `docs/delivery/guia-entrega.md`
- `docs/delivery/rastreabilidade-requisitos.md`
- `docs/delivery/arquitetura-final.md`
- `docs/delivery/demo-local.md`
- `docs/delivery/evidencias-testes.md`
- `docs/delivery/release-checklist.md`
- `docs/delivery/limitacoes-e-v2.md`
- `docs/verification/final-security-review.md`
