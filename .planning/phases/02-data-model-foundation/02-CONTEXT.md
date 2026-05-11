# Phase 2: Data Model Foundation - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Define the initial relational data model for Volunteer Connect using Supabase remoto as the future database target. This phase documents the schema, tables, fields, relationships, constraints, storage expectations, and seed/insertion strategy for the MVP. The user explicitly decided that this step must stay local and documented only: no migration should be applied to Supabase, no remote table should be created, and no GitHub issue or PR should be changed as part of this discussion/plan.

</domain>

<decisions>
## Implementation Decisions

### Escopo de execucao

- **D-01:** A fase 2 deve manter tudo documentado localmente antes de qualquer aplicacao no Supabase remoto.
- **D-02:** Nenhuma migration deve ser executada contra o banco remoto durante esta fase de discussao/planejamento.
- **D-03:** A fase pode preparar arquivos locais de documentacao e SQL, desde que eles sejam tratados como proposta/versionamento local ate aprovacao posterior.

### Idioma e nomenclatura do banco

- **D-04:** Todo o dominio do sistema deve priorizar portugues: documentacao, nomes de tabelas, nomes de colunas, mensagens e termos de negocio.
- **D-05:** Tabelas e colunas devem usar `snake_case`.
- **D-06:** Os nomes devem ser claros e descritivos, evitando abreviacoes desnecessarias.
- **D-07:** Colunas de data devem usar nomes em portugues, como `criado_em`, `atualizado_em`, `data_inicio`, `data_fim` e `prazo_inscricao`.

### Modelo de usuarios e papeis

- **D-08:** A tabela base deve ser `usuarios`.
- **D-09:** O campo de papel deve aceitar `voluntario`, `ong` e `admin`.
- **D-10:** Suspensao deve pertencer a conta base, nao aos perfis especificos.
- **D-11:** A tabela `usuarios` deve ter a flag `conta_suspensa`.
- **D-12:** Quando `conta_suspensa = true`, o usuario perde acoes sensiveis: voluntario nao pode votar ou se inscrever; ONG nao pode publicar ou editar oportunidades.
- **D-13:** Para o MVP, nao criar ainda historico ou motivo de suspensao; manter apenas a flag `conta_suspensa`.

### Perfil de voluntario

- **D-14:** A tabela de perfil de voluntario deve ser `perfis_voluntarios`.
- **D-15:** Campos confirmados para `perfis_voluntarios`: `id`, `usuario_id`, `cpf`, `nome_completo`, `telefone`, `cidade`, `estado`, `criado_em`, `atualizado_em`.
- **D-16:** `cpf`, `nome_completo`, `telefone`, `cidade` e `estado` devem ser obrigatorios.
- **D-17:** `cpf` deve ser unico.
- **D-18:** `usuario_id` deve ser unico em `perfis_voluntarios`, impedindo mais de um perfil voluntario por usuario.
- **D-19:** CPF e dados pessoais sensiveis nao devem aparecer em listagens publicas.

### Perfil de ONG e analise

- **D-20:** A tabela de perfil de ONG deve ser `perfis_ongs`.
- **D-21:** O cadastro da ONG deve criar uma conta com `papel = ong` e depois enviar o perfil para analise.
- **D-22:** Como ainda nao ha certeza sobre todos os dados que ONGs reais possuem em comum, o MVP deve exigir apenas `cnpj`, `razao_social` e logo.
- **D-23:** Campos confirmados para `perfis_ongs`: `id`, `usuario_responsavel_id`, `cnpj`, `razao_social`, `logo_storage_path`, `status_analise`, `criado_em`, `atualizado_em`.
- **D-24:** `cnpj`, `razao_social` e `logo_storage_path` devem ser obrigatorios para enviar a ONG para analise.
- **D-25:** `cnpj` deve ser unico.
- **D-26:** `usuario_responsavel_id` deve ser unico no MVP, mantendo uma ONG por usuario responsavel.
- **D-27:** `status_analise` deve aceitar `pendente`, `aprovado` e `reprovado`.
- **D-28:** ONG com `status_analise = pendente` ou `reprovado` nao pode publicar oportunidades.
- **D-29:** ONG so pode publicar oportunidades quando `status_analise = aprovado` e a conta nao estiver suspensa.
- **D-30:** Se o perfil for reprovado, a ONG deve poder corrigir dados e reenviar para analise, voltando para `pendente`.

### Supabase Storage

- **D-31:** A logo da ONG deve ser armazenada no Supabase Storage.
- **D-32:** O bucket de logos pode ser publico no MVP, pois a logo e um dado visual publico do marketplace.
- **D-33:** O banco deve guardar `logo_storage_path` como referencia principal, em vez de depender somente de uma URL fixa.

### Oportunidades como marketplace

- **D-34:** A experiencia deve funcionar como um marketplace de oportunidades, nao como feed social generico.
- **D-35:** A entidade principal de publicacao deve ser `oportunidades`.
- **D-36:** Apenas ONGs podem publicar oportunidades no marketplace.
- **D-37:** Voluntarios podem navegar, votar com like/dislike e se inscrever em oportunidades.
- **D-38:** Pessoas fisicas nao podem publicar oportunidades no MVP, reduzindo risco de moderacao, fraude e complexidade de autorizacao.

### Votos e inscricoes

- **D-39:** Likes/dislikes devem ser modelados em uma tabela separada, como `votos_oportunidades`.
- **D-40:** Cada usuario deve votar no maximo uma vez por oportunidade.
- **D-41:** Inscricoes devem ser modeladas em `inscricoes`, ligando voluntarios a oportunidades.
- **D-42:** Cada voluntario deve poder se inscrever no maximo uma vez na mesma oportunidade.

### Reputacao de ONG

- **D-43:** Sistema detalhado de reputacao de ONG fica fora da implementacao imediata do MVP.
- **D-44:** O modelo deve nao bloquear reputacao futura.
- **D-45:** No MVP, sinais simples como `perfis_ongs.status_analise`, `perfis_ongs` aprovado/reprovado e votos em oportunidades podem servir como base futura de reputacao.
- **D-46:** Nao criar agora tabelas de estrelas, ranking, comentarios avaliativos ou `avaliacoes_ongs`.

### the agent's Discretion

- Escolher os nomes finais de enums/check constraints, desde que permaneçam em portugues e claros.
- Escolher a organizacao local dos arquivos SQL e docs da fase, desde que nada seja aplicado remotamente.
- Definir indices basicos e constraints tecnicas coerentes com PostgreSQL/Supabase, mantendo o modelo simples para o MVP.
- Definir se os status serao implementados como `check constraint` textual ou `enum` PostgreSQL no SQL proposto.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Projeto e requisitos

- `.planning/PROJECT.md` — contexto do produto, restricoes, stack e decisao por Supabase remoto.
- `.planning/REQUIREMENTS.md` — requisitos DATA-01..DATA-07 que a fase 2 precisa cobrir.
- `.planning/ROADMAP.md` — objetivo e criterios de sucesso da fase 2.
- `.planning/STATE.md` — estado atual, decisao de Supabase remoto e fase corrente.
- `.planning/research/STACK.md` — stack recomendada: NestJS, SvelteKit, TypeScript, Supabase remoto, Supabase client e SQL migrations/scripts.

### Contexto anterior

- `.planning/phases/01-project-foundation/01-CONTEXT.md` — decisoes da fase 1: estrutura simples, npm, Supabase remoto e adiamento da modelagem para fase 2.

### Regras locais do projeto

- `AGENTS.md` — instrucoes do projeto, portugues por padrao, stack e skills locais.
- `.codex/skills/security-code-review/SKILL.md` — revisar riscos de segredo, Supabase, banco, auth/autorizacao e storage antes de executar ou publicar mudancas sensiveis.
- `.codex/skills/po-business-rule-analyst/SKILL.md` — referencia para documentar regras de negocio em portugues quando surgirem novas regras.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `.env.example` ja define `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` e `DATABASE_URL` com placeholders.
- `README.md` ja explica que banco, schema, migrations e dados iniciais pertencem a fase 2.
- O backend NestJS existe apenas com estrutura inicial (`backend/src/app.module.ts`, `app.controller.ts`, `app.service.ts`), sem modulo de banco ainda.

### Established Patterns

- Projeto usa estrutura simples: `backend` e `frontend`, sem monorepo formal.
- Projeto usa `npm` e scripts raiz de qualidade.
- Documentacao deve ser em portugues.
- Supabase remoto e a decisao de evitar Prisma ja estao documentados no projeto.

### Integration Points

- Futuras migrations/scripts locais devem se conectar ao `DATABASE_URL` somente quando a execucao remota for explicitamente autorizada.
- A futura integracao de Storage deve usar Supabase Storage para logos de ONGs em bucket publico.
- Fase 3 de autenticacao deve consumir `usuarios.papel`, `usuarios.conta_suspensa` e os perfis vinculados.
- Fases 4, 5 e 6 dependem de `perfis_ongs`, `oportunidades` e `inscricoes`.

</code_context>

<specifics>
## Specific Ideas

- O usuario quer que a plataforma conecte voluntarios a ONGs.
- A experiencia de oportunidades deve parecer um marketplace.
- A ONG se cadastra, informa dados obrigatorios e envia perfil para analise.
- Como nao ha conhecimento suficiente sobre dados comuns das ONGs, o MVP deve exigir apenas CNPJ, razao social e logo.
- A logo deve ficar em bucket publico do Supabase Storage.
- Reputacao de ONG e desejavel no futuro, mas nao deve ser implementada agora.

</specifics>

<deferred>
## Deferred Ideas

- Sistema detalhado de reputacao de ONG com estrelas, ranking, comentarios ou avaliacoes dedicadas.
- Usuarios pessoa fisica publicando oportunidades.
- Multiplos gestores por ONG via tabela `membros_ong` ou equivalente.
- Historico detalhado de suspensao com motivo, autor da suspensao e data.
- Execucao real de migrations no Supabase remoto.

</deferred>

---

*Phase: 02-data-model-foundation*
*Context gathered: 2026-05-07*
