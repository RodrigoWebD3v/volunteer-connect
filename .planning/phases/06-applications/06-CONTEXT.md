# Phase 6: Applications - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Definir como voluntarios se inscrevem em oportunidades e como ONGs gerenciam essas inscricoes. Esta fase cobre criacao de inscricao, status, cancelamento pelo voluntario, aprovacao/reprovacao pela ONG, consumo de vagas, visibilidade e contato simples. Chat em tempo real e notificacoes avancadas ficam fora do MVP.

</domain>

<decisions>
## Implementation Decisions

### Condicoes para inscricao

- **D-01:** Guest nao se inscreve; ao tentar, deve ir para login/cadastro.
- **D-02:** Apenas usuario com papel `voluntario` pode se inscrever.
- **D-03:** Conta voluntaria suspensa nao pode se inscrever.
- **D-04:** ONG nao pode se inscrever como voluntaria.
- **D-05:** Oportunidade deve estar `publicada`.
- **D-06:** Oportunidade de ONG suspensa nao aceita inscricao.
- **D-07:** ONG dona da oportunidade precisa estar aprovada e nao suspensa.
- **D-08:** Inscricao so pode ocorrer ate `prazo_inscricao`.
- **D-09:** Inscricao so pode ocorrer enquanto houver vaga.
- **D-10:** Cada voluntario pode se inscrever no maximo uma vez na mesma oportunidade.

### Campos da inscricao

- **D-11:** Campos da tabela `inscricoes`:
  - `id`
  - `oportunidade_id`
  - `voluntario_usuario_id`
  - `status`
  - `mensagem`
  - `criado_em`
  - `atualizado_em`
- **D-12:** `mensagem` do voluntario e opcional.

### Status da inscricao

- **D-13:** Status permitidos:
  - `pendente`
  - `aprovada`
  - `reprovada`
  - `cancelada`
- **D-14:** Nova inscricao nasce como `pendente`.
- **D-15:** `aprovada` representa aceite pela ONG.
- **D-16:** `reprovada` representa recusa pela ONG.
- **D-17:** `cancelada` representa cancelamento pelo voluntario enquanto permitido.

### Cancelamento pelo voluntario

- **D-18:** Voluntario pode cancelar inscricao enquanto ela estiver `pendente`.
- **D-19:** Voluntario nao cancela inscricao aprovada no MVP.
- **D-20:** Cancelamento deve preservar o registro para auditoria/historico.

### Resposta da ONG

- **D-21:** ONG pode aprovar ou reprovar inscricoes das proprias oportunidades.
- **D-22:** ONG pode incluir observacao opcional ao aprovar/reprovar.
- **D-23:** Motivo/observacao nao e obrigatorio na reprovacao no MVP.
- **D-24:** ONG so gerencia inscricoes das proprias oportunidades.
- **D-25:** ONG suspensa nao gerencia inscricoes.

### Capacidade e vagas

- **D-26:** Apenas inscricao `aprovada` consome vaga.
- **D-27:** Inscricao `pendente` nao consome vaga.
- **D-28:** O sistema nao deve aprovar inscricao se a quantidade de vagas ja estiver completa.
- **D-29:** O sistema deve considerar `quantidade_vagas` da oportunidade e numero de inscricoes aprovadas.

### Contato/comunicacao

- **D-30:** Chat em tempo real fica fora do MVP.
- **D-31:** A inscricao deve mostrar orientacao simples: `A ONG entrará em contato pelos dados informados no cadastro.`
- **D-32:** A Fase 6 deve expor dados basicos da inscricao e status, sem criar canal de mensagem em tempo real.

### Visibilidade

- **D-33:** Voluntario ve apenas as proprias inscricoes.
- **D-34:** ONG ve apenas inscricoes das proprias oportunidades.
- **D-35:** Admin pode auditar inscricoes no futuro, mas isso nao e foco do MVP desta fase.
- **D-36:** Publico/guest nao ve inscricoes.

### the agent's Discretion

- Definir campo opcional para observacao da ONG, desde que fique claro que e opcional.
- Definir nomes dos endpoints e services conforme padroes NestJS.
- Definir layout operacional das telas de inscricao seguindo a skill de design.
- Definir estrategia transacional para evitar aprovar mais inscricoes que `quantidade_vagas`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Projeto e requisitos

- `.planning/PROJECT.md` — contexto do produto, restricoes e stack.
- `.planning/REQUIREMENTS.md` — requisitos APP-01..APP-05.
- `.planning/ROADMAP.md` — objetivo e criterios de sucesso da fase 6.
- `.planning/STATE.md` — estado atual do projeto.

### Decisoes anteriores

- `.planning/phases/02-data-model-foundation/02-CONTEXT.md` — modelo de `inscricoes`, `usuarios`, `perfis_voluntarios`, `perfis_ongs` e oportunidades.
- `.planning/phases/03-authentication-and-roles/03-CONTEXT.md` — roles, conta suspensa, guest e Supabase Auth.
- `.planning/phases/04-ngo-profiles/04-CONTEXT.md` — ONG aprovada, suspensa, modo guest e separacao ONG/voluntario.
- `.planning/phases/05-opportunities/05-CONTEXT.md` — contrato de oportunidade, prazo, vagas, status e CTA de inscricao.

### Regras locais do projeto

- `AGENTS.md` — instrucoes do projeto, portugues por padrao, stack e skills locais.
- `.codex/skills/security-code-review/SKILL.md` — obrigatoria para autorizacao, IDOR, dados sensiveis, Supabase e regras de inscricao.
- `.codex/skills/volunteer-connect-design/SKILL.md` — direcao visual para marketplace, area logada e dashboards.
- `.codex/skills/po-business-rule-analyst/SKILL.md` — referencia para novas regras de negocio e issues futuras.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- Ainda nao ha modulo de inscricoes implementado.
- A Fase 5 define o contrato de oportunidade que a inscricao consome.

### Established Patterns

- Escritas de dominio passam pelo backend NestJS.
- Frontend nao escreve diretamente no banco.
- Usuarios guest podem visualizar marketplace, mas interacoes exigem autenticacao.
- Roles e suspensao devem ser validados no backend.

### Integration Points

- Backend de inscricoes deve consultar oportunidades e ONGs para validar status/prazo/vagas.
- Frontend de detalhe da oportunidade deve chamar fluxo de inscricao da Fase 6.
- Dashboard da ONG deve listar inscricoes por oportunidade.
- Area do voluntario deve listar proprias inscricoes e status.

</code_context>

<specifics>
## Specific Ideas

- Mensagem do voluntario na inscricao e opcional.
- ONG aprova/reprova com observacao opcional.
- Apenas inscricao aprovada consome vaga.
- Voluntario so cancela enquanto pendente.
- Contato sera simples, sem chat: a ONG entrara em contato pelos dados do cadastro.

</specifics>

<deferred>
## Deferred Ideas

- Chat em tempo real.
- Notificacoes avancadas.
- Cancelamento de inscricao aprovada pelo voluntario.
- Area admin completa para auditoria de inscricoes.
- Motivo obrigatorio para reprovacao de inscricao.

</deferred>

---

*Phase: 06-applications*
*Context gathered: 2026-05-07*
