# Phase 4: NGO Profiles - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Definir como perfis de ONGs funcionam depois do cadastro: analise por admin, aprovacao/reprovacao, motivo de reprovação, rastreabilidade da analise, reenvio apos reprovação, bloqueio de edicao apos aprovação, visibilidade publica e comportamento de contas pendentes, reprovadas, aprovadas ou suspensas. Esta fase nao reabre cadastro/autenticacao; ela herda as decisoes das fases 2 e 3.

</domain>

<decisions>
## Implementation Decisions

### Analise por admin

- **D-01:** Somente usuario com papel `admin` pode aprovar ou reprovar uma ONG.
- **D-02:** ONG nasce com `status_analise = pendente`.
- **D-03:** Admin revisa `cnpj`, `razao_social` e `logo`.
- **D-04:** Admin pode aprovar ou reprovar.
- **D-05:** ONG aprovada pode acessar dashboard e publicar oportunidades.
- **D-06:** ONG reprovada pode corrigir dados e reenviar para analise, desde que a conta nao esteja suspensa.

### Motivo e rastreabilidade da analise

- **D-07:** Reprovacao exige motivo obrigatorio.
- **D-08:** `motivo_reprovacao` deve aceitar ate 2.000 caracteres.
- **D-09:** A ONG reprovada deve ver o motivo da reprovacao.
- **D-10:** Ao aprovar/reprovar, registrar o admin responsavel em `analisado_por_usuario_id`.
- **D-11:** Ao aprovar/reprovar, registrar data/hora em `analisado_em`.
- **D-12:** Ao reenviar dados para nova analise, registrar `reenviado_em`.
- **D-13:** Ao reenviar, `status_analise` volta para `pendente`.
- **D-14:** Ao reenviar, `motivo_reprovacao` deve ser limpo.
- **D-15:** Ao reenviar, `analisado_por_usuario_id` e `analisado_em` podem ser limpos para indicar nova fila de analise.

### Campos adicionais em perfis_ongs

- **D-16:** `perfis_ongs` deve incluir `motivo_reprovacao`.
- **D-17:** `perfis_ongs` deve incluir `analisado_por_usuario_id`.
- **D-18:** `perfis_ongs` deve incluir `analisado_em`.
- **D-19:** `perfis_ongs` deve incluir `reenviado_em`.

### Edicao do perfil da ONG

- **D-20:** ONG aprovada nao pode editar `cnpj`, `razao_social` nem `logo_storage_path` pelo sistema.
- **D-21:** Se uma ONG aprovada precisar alterar esses dados futuramente, isso dependeria de suporte/admin.
- **D-22:** Como suporte nao existe no MVP, alteracao de dados aprovados fica fora do escopo.
- **D-23:** ONG reprovada pode corrigir dados e reenviar.
- **D-24:** ONG pendente aguarda analise.
- **D-25:** Conta suspensa nao pode editar, corrigir, reenviar, publicar ou executar acoes protegidas.

### Visibilidade publica

- **D-26:** CNPJ nao deve aparecer publicamente.
- **D-27:** CPF nao deve aparecer publicamente em nenhum contexto de listagem/perfil publico.
- **D-28:** CPF existe apenas como dado interno para unicidade de perfil voluntario.
- **D-29:** CNPJ existe apenas como dado interno/admin para validacao da ONG.
- **D-30:** Perfil publico de ONG deve mostrar apenas dados seguros e relevantes:
  - logo
  - razao social
  - indicador visual de ONG aprovada/verificada
  - oportunidades publicadas
- **D-31:** ONG pendente nao aparece publicamente.
- **D-32:** ONG reprovada nao aparece publicamente.
- **D-33:** ONG suspensa nao aparece publicamente, mesmo se ja tiver sido aprovada antes.
- **D-34:** Apenas ONG aprovada e nao suspensa aparece publicamente.

### Marketplace publico e modo guest

- **D-35:** Marketplace pode ser visualizado por usuarios guest.
- **D-36:** Guest pode ver oportunidades e perfis publicos de ONGs aprovadas.
- **D-37:** Guest nao pode interagir: nao pode se inscrever, votar/curtir, acessar dashboard ou criar oportunidade.
- **D-38:** ONG pendente ou reprovada pode navegar no marketplace em modo semelhante a guest.
- **D-39:** A autenticacao da ONG nao implica liberacao de acoes.
- **D-40:** Enquanto `status_analise != aprovado`, a ONG pode visualizar o marketplace como visitante, mas nao pode interagir nem publicar.

### Separacao entre ONG e voluntario

- **D-41:** ONG aprovada nao interage como voluntario.
- **D-42:** ONG nao pode se inscrever em oportunidades.
- **D-43:** ONG nao pode votar/curtir oportunidades como voluntario.
- **D-44:** Conta ONG serve para publicar e gerenciar oportunidades.
- **D-45:** Conta voluntario serve para interagir e se inscrever.

### Exclusao e suspensao

- **D-46:** ONG nao exclui o proprio perfil no MVP.
- **D-47:** Perfil de ONG nao deve ser apagado fisicamente no fluxo normal.
- **D-48:** Admin pode suspender a conta por meio de `usuarios.conta_suspensa`.
- **D-49:** Suspensao preserva dados para auditoria.
- **D-50:** Se a conta estiver suspensa, a ONG nao aparece publicamente.
- **D-51:** Se a conta estiver suspensa, oportunidades da ONG nao devem aceitar novas inscricoes.
- **D-52:** Se a conta estiver suspensa, a ONG nao pode publicar ou editar oportunidades.

### the agent's Discretion

- Definir os nomes exatos dos endpoints e services, desde que sigam portugues no dominio e padroes NestJS.
- Definir se as consultas publicas de ONG usam view, service dedicado ou query filtrada, desde que nunca exponham CNPJ/CPF.
- Definir UX fina das telas de admin e estados de ONG, respeitando a skill de design do Volunteer Connect.
- Definir se a rastreabilidade da analise fica apenas nos campos de `perfis_ongs` no MVP, sem tabela historica.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Projeto e requisitos

- `.planning/PROJECT.md` — contexto do produto, restricoes e stack.
- `.planning/REQUIREMENTS.md` — requisitos NGO-01..NGO-05.
- `.planning/ROADMAP.md` — objetivo e criterios de sucesso da fase 4.
- `.planning/STATE.md` — estado atual do projeto.

### Decisoes anteriores

- `.planning/phases/02-data-model-foundation/02-CONTEXT.md` — modelo de `usuarios`, `perfis_ongs`, `conta_suspensa`, `status_analise`, CNPJ, logo e Storage.
- `.planning/phases/03-authentication-and-roles/03-CONTEXT.md` — Supabase Auth, roles, RLS inicial, login por papel, ONG pendente/reprovada/aprovada e conta suspensa.

### Regras locais do projeto

- `AGENTS.md` — instrucoes do projeto, portugues por padrao, stack e skills locais.
- `.codex/skills/security-code-review/SKILL.md` — obrigatoria para auth, autorizacao, dados sensiveis, Supabase e Storage.
- `.codex/skills/volunteer-connect-design/SKILL.md` — direcao visual para perfil publico, dashboard e telas operacionais.
- `.codex/skills/po-business-rule-analyst/SKILL.md` — referencia para regras de negocio e issues futuras.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- Ainda nao ha modulo de ONG implementado no backend.
- Ainda nao ha telas de ONG implementadas no frontend.
- Contextos das fases 2 e 3 ja definem os campos e regras de base.

### Established Patterns

- Escritas de dominio devem passar pelo backend NestJS.
- Frontend nao deve escrever diretamente no banco ou Storage.
- Dados sensiveis como CPF/CNPJ nao devem aparecer publicamente.
- Supabase Auth e `usuarios.papel` guiam autenticacao/autorizacao.

### Integration Points

- Backend devera expor fluxos para admin aprovar/reprovar ONG.
- Backend devera expor fluxo para ONG reprovada corrigir e reenviar.
- Frontend devera ter tela/admin de analise e telas de estado da ONG.
- Marketplace e perfil publico devem filtrar apenas ONGs aprovadas e nao suspensas.

</code_context>

<specifics>
## Specific Ideas

- O usuario quer que apenas admin aprove/reprove ONGs.
- Motivo de reprovacao deve ser obrigatorio e ter ate 2.000 caracteres.
- A ONG pode reenviar dados para nova analise, mas conta suspensa nao pode fazer nada.
- CNPJ e CPF nunca devem aparecer publicamente.
- ONG autenticada mas nao aprovada navega como guest, sem interagir.
- ONG aprovada nao age como voluntario.

</specifics>

<deferred>
## Deferred Ideas

- Suporte/admin para alterar CNPJ, razao social ou logo de ONG ja aprovada.
- Historico completo de todas as analises em tabela separada.
- Exclusao fisica de perfil de ONG.
- Multiplos gestores por ONG.

</deferred>

---

*Phase: 04-ngo-profiles*
*Context gathered: 2026-05-07*
