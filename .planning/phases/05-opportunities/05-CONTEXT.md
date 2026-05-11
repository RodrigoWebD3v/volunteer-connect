# Phase 5: Opportunities - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Definir como ONGs aprovadas publicam oportunidades e como voluntarios/visitantes descobrem oportunidades no marketplace. Esta fase cobre criacao, edicao, listagem, detalhe, filtros, status, encerramento e visibilidade de oportunidades. Inscricoes completas pertencem a Fase 6, mas a Fase 5 deve deixar o contrato necessario para que o botao/fluxo de inscricao seja coerente.

</domain>

<decisions>
## Implementation Decisions

### Permissao de publicacao

- **D-01:** Apenas ONG aprovada e nao suspensa pode criar oportunidade.
- **D-02:** ONG pendente ou reprovada pode visualizar o marketplace como guest, mas nao pode publicar nem interagir.
- **D-03:** ONG aprovada nao interage como voluntario e nao pode se inscrever em oportunidades.
- **D-04:** Voluntarios e guests podem visualizar o marketplace.
- **D-05:** Guest pode visualizar lista/detalhe, mas ao tentar se inscrever deve ser direcionado para login/cadastro.

### Campos obrigatorios

- **D-06:** Campos obrigatorios da oportunidade no MVP:
  - `titulo`
  - `descricao`
  - `tipo_atividade`
  - `cidade`
  - `estado`
  - `data_inicio`
  - `data_fim`
  - `prazo_inscricao`
  - `quantidade_vagas`
- **D-07:** Se novos campos forem necessarios, eles podem ser adicionados em fase futura sem bloquear o MVP.

### Imagem da oportunidade

- **D-08:** Oportunidade nao tera imagem propria no MVP.
- **D-09:** Cards/listagens devem usar a logo da ONG como imagem/sinal visual principal.

### Inscricao

- **D-10:** Voluntario pode se inscrever ate `prazo_inscricao` e enquanto houver vaga.
- **D-11:** A Fase 5 deve exibir CTA de inscricao, mas a implementacao completa de inscricoes pertence a Fase 6.
- **D-12:** Oportunidade sem vagas disponiveis nao deve permitir nova inscricao.
- **D-13:** Oportunidade com prazo encerrado nao deve permitir nova inscricao.

### Filtros e busca

- **D-14:** Marketplace deve permitir busca por texto.
- **D-15:** Marketplace deve permitir filtro por cidade/estado.
- **D-16:** Marketplace deve permitir filtro por tipo de atividade.
- **D-17:** Marketplace deve permitir filtro por data.
- **D-18:** A experiencia deve ser simples e clara, mas a estrutura deve suportar combinacao de filtros.

### Status da oportunidade

- **D-19:** Status permitidos:
  - `rascunho`
  - `publicada`
  - `encerrada`
  - `cancelada`
- **D-20:** `rascunho` nao aparece publicamente.
- **D-21:** `publicada` aparece no marketplace ativo.
- **D-22:** `encerrada` aparece como historico, separada das oportunidades ativas.
- **D-23:** `cancelada` nao aceita inscricao.

### Encerramento

- **D-24:** Oportunidade deve ser encerrada automaticamente pelo sistema.
- **D-25:** Quando uma oportunidade encerrar, se a ONG precisar da mesma atividade novamente, deve publicar uma nova oportunidade.
- **D-26:** O encerramento automatico deve considerar `data_fim`.
- **D-27:** Depois de encerrada, a oportunidade pode permanecer visivel como historico separado, desde que a ONG nao esteja suspensa.

### ONG suspensa

- **D-28:** Publicacoes de ONGs suspensas devem ficar suspensas tambem.
- **D-29:** Oportunidade de ONG suspensa nao pode ser visualizada por ninguem no marketplace publico.
- **D-30:** Oportunidade de ONG suspensa continua existindo no banco para auditoria.
- **D-31:** Oportunidade de ONG suspensa nao aceita inscricao.

### Experiencia visual

- **D-32:** Marketplace deve seguir a base visual Airbnb definida para o projeto: cards claros, tom humano, oportunidades facilmente escaneaveis e navegacao simples.
- **D-33:** Cards de oportunidade devem destacar titulo, ONG, logo, cidade/estado, tipo de atividade, datas/prazo e vagas.
- **D-34:** Historico de oportunidades encerradas deve ficar visualmente separado das oportunidades ativas para nao confundir o voluntario.

### the agent's Discretion

- Definir formato final de query/filtros, desde que cubra texto, cidade/estado, tipo e data.
- Definir se o encerramento automatico sera feito por job, rotina backend, consulta calculada ou processo agendado, desde que a regra de negocio seja preservada.
- Definir microcopy e layout fino dos cards com base na skill `volunteer-connect-design`.
- Definir se o status `encerrada` sera persistido automaticamente ou derivado de `data_fim` em consultas, desde que o comportamento final seja claro e testavel.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Projeto e requisitos

- `.planning/PROJECT.md` — contexto do produto, restricoes e stack.
- `.planning/REQUIREMENTS.md` — requisitos OPP-01..OPP-05.
- `.planning/ROADMAP.md` — objetivo e criterios de sucesso da fase 5.
- `.planning/STATE.md` — estado atual do projeto.

### Decisoes anteriores

- `.planning/phases/02-data-model-foundation/02-CONTEXT.md` — modelo de `oportunidades`, ONGs, usuarios, suspensao e inscricoes.
- `.planning/phases/03-authentication-and-roles/03-CONTEXT.md` — roles, Supabase Auth, conta suspensa, guest e regras de acesso.
- `.planning/phases/04-ngo-profiles/04-CONTEXT.md` — ONG aprovada/reprovada/pendente, visibilidade publica, modo guest e suspensao de ONG.

### Regras locais do projeto

- `AGENTS.md` — instrucoes do projeto, portugues por padrao, stack e skills locais.
- `.codex/skills/security-code-review/SKILL.md` — obrigatoria para autorizacao, IDOR, dados sensiveis e Supabase.
- `.codex/skills/volunteer-connect-design/SKILL.md` — direcao visual do marketplace e cards.
- `.codex/skills/po-business-rule-analyst/SKILL.md` — referencia para novas regras de negocio e issues futuras.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- Ainda nao ha modulo de oportunidades implementado no backend.
- Ainda nao ha telas de marketplace implementadas no frontend.
- Contextos das fases anteriores ja definem regras de ONG aprovada, suspensao, guest e separacao ONG/voluntario.

### Established Patterns

- Escritas de dominio passam pelo backend NestJS.
- Frontend nao escreve diretamente no banco.
- Dados sensiveis de CPF/CNPJ nao aparecem publicamente.
- Marketplace publico pode ser visto por guest, mas interacoes exigem autenticacao adequada.

### Integration Points

- Backend devera validar ONG aprovada e nao suspensa antes de criar/editar oportunidade.
- Frontend devera listar oportunidades publicadas de ONGs aprovadas e nao suspensas.
- Fase 6 devera consumir o contrato de inscricao: prazo, vagas disponiveis e status da oportunidade.
- Fase 7 devera consumir `data_inicio`/`data_fim` para eventos e participacao.

</code_context>

<specifics>
## Specific Ideas

- O usuario escolheu manter oportunidades encerradas como historico separado.
- O usuario escolheu nao usar imagem propria de oportunidade no MVP; usar logo da ONG.
- O usuario escolheu filtros completos: texto, cidade/estado, tipo e data.
- O usuario escolheu encerramento automatico pelo sistema.
- O usuario decidiu que publicacoes de ONGs suspensas ficam suspensas tambem: nao aparecem, nao aceitam inscricao, mas continuam existindo.

</specifics>

<deferred>
## Deferred Ideas

- Imagem propria para oportunidade.
- Reabrir oportunidade encerrada.
- Publicacao por pessoa fisica.
- Ranking/reputacao detalhada de oportunidades ou ONGs.
- Recomendacoes automaticas de oportunidades.

</deferred>

---

*Phase: 05-opportunities*
*Context gathered: 2026-05-07*
