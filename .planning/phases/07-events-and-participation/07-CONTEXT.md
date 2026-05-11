# Phase 7: Events And Participation - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Registrar presenca e historico de participacao depois das inscricoes aprovadas em oportunidades. Nesta fase, a oportunidade e tratada como a atividade principal; nao havera subeventos dentro da oportunidade no MVP. A ONG confirma presenca dos voluntarios aprovados depois que a oportunidade estiver concluida, e o voluntario visualiza historico apenas de oportunidades concluidas.

</domain>

<decisions>
## Implementation Decisions

### Modelo simplificado

- **D-01:** Nao criar entidade separada de evento/subevento dentro da oportunidade no MVP.
- **D-02:** A propria oportunidade representa a publicacao/atividade principal.
- **D-03:** A ONG descreve a atividade no conteudo da oportunidade; a Fase 7 nao altera o modelo de postagem da oportunidade.
- **D-04:** A Fase 7 deve focar em presenca e historico, nao em agenda detalhada de multiplas atividades.

### Elegibilidade da presenca

- **D-05:** Apenas voluntarios com inscricao `aprovada` podem ter presenca registrada.
- **D-06:** Guest nao visualiza nem interage com presencas.
- **D-07:** Voluntario suspenso nao deve ganhar novas interacoes, mas historico existente deve ser preservado.
- **D-08:** ONG suspensa nao confirma presenca nem gerencia historico.
- **D-09:** ONG so registra presenca em oportunidades proprias.

### Confirmacao pela ONG

- **D-10:** Apenas a ONG pode confirmar presenca.
- **D-11:** Voluntario nao confirma a propria presenca no MVP.
- **D-12:** A presenca deve ser marcada depois da conclusao da oportunidade.
- **D-13:** A ONG pode marcar presenca para os voluntarios aprovados de uma oportunidade concluida.

### Status de presenca

- **D-14:** Status permitidos:
  - `presente`
  - `ausente`
  - `cancelada`
- **D-15:** `presente` significa que o voluntario participou/compareceu.
- **D-16:** `ausente` significa que o voluntario estava aprovado, mas nao participou.
- **D-17:** `cancelada` significa que a presenca/atividade foi cancelada ou nao deve contar como comparecimento.

### Historico do voluntario

- **D-18:** Voluntario ve historico apenas de oportunidades concluidas.
- **D-19:** Voluntario ve apenas o proprio historico.
- **D-20:** Historico deve mostrar oportunidade, ONG, data/local relevante e status de presenca.
- **D-21:** O historico nao deve exibir CPF, CNPJ ou dados internos de analise da ONG.

### Historico da ONG

- **D-22:** ONG ve historico de engajamento apenas das proprias oportunidades.
- **D-23:** ONG consegue consultar presencas por oportunidade concluida.
- **D-24:** ONG deve conseguir distinguir voluntarios `presente`, `ausente` e `cancelada`.
- **D-25:** A visualizacao da ONG deve ser operacional, simples e em portugues.

### Suspensao e auditoria

- **D-26:** Se a ONG for suspensa, o historico deve ser preservado para auditoria.
- **D-27:** Dados de presenca de ONG suspensa nao devem aparecer publicamente.
- **D-28:** Suspensao nao deve apagar oportunidades, inscricoes ou presencas existentes.
- **D-29:** Publico/guest nao tem acesso a historico de presenca.

### Linguagem do sistema

- **D-30:** Usar o termo `presenca` no sistema em vez de `participacao`, por ser mais claro para o usuario.
- **D-31:** A documentacao pode mencionar que `presenca` e o registro de participacao historica do voluntario.

### Imagens da oportunidade

- **D-32:** O usuario mencionou que oportunidades podem ter texto e imagens, mas isso altera a decisao anterior da Fase 5.
- **D-33:** A Fase 7 nao deve implementar imagem de oportunidade.
- **D-34:** Revisar suporte a imagens de oportunidade em fase futura ou ajuste separado da Fase 5, sem bloquear presenca/historico.

### the agent's Discretion

- Definir o nome tecnico da tabela, preferindo portugues e clareza, como `presencas`.
- Definir se a marcacao de presenca sera em lote ou individual, desde que apenas ONG dona consiga registrar.
- Definir se a oportunidade concluida sera inferida por `status = encerrada` ou por regra derivada de `data_fim`, conforme contrato final da Fase 5.
- Definir microcopy das telas seguindo a skill de design.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Projeto e requisitos

- `.planning/PROJECT.md` — contexto do produto, restricoes e stack.
- `.planning/REQUIREMENTS.md` — requisitos EVT-01..EVT-04.
- `.planning/ROADMAP.md` — objetivo e criterios de sucesso da fase 7.
- `.planning/STATE.md` — estado atual do projeto.

### Decisoes anteriores

- `.planning/phases/02-data-model-foundation/02-CONTEXT.md` — modelo inicial de eventos/participacoes, usuarios, oportunidades e inscricoes.
- `.planning/phases/03-authentication-and-roles/03-CONTEXT.md` — roles, Supabase Auth, conta suspensa e separacao de permissoes.
- `.planning/phases/04-ngo-profiles/04-CONTEXT.md` — ONG aprovada, suspensa, visibilidade publica e separacao ONG/voluntario.
- `.planning/phases/05-opportunities/05-CONTEXT.md` — oportunidade como publicacao principal, status, encerramento e suspensao.
- `.planning/phases/06-applications/06-CONTEXT.md` — inscricoes aprovadas, ownership, visibilidade e regras de ONG/voluntario.

### Regras locais do projeto

- `AGENTS.md` — instrucoes do projeto, portugues por padrao, stack e skills locais.
- `.codex/skills/security-code-review/SKILL.md` — obrigatoria para autorizacao, IDOR, dados sensiveis, Supabase e historico.
- `.codex/skills/volunteer-connect-design/SKILL.md` — direcao visual para areas logadas e dashboards operacionais.
- `.codex/skills/po-business-rule-analyst/SKILL.md` — referencia para novas regras de negocio e issues futuras.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- Ainda nao ha modulo de presencas/eventos implementado.
- A Fase 5 define oportunidade, status e encerramento.
- A Fase 6 define inscricoes aprovadas, que sao a fonte para registrar presenca.

### Established Patterns

- Escritas de dominio passam pelo backend NestJS.
- Frontend nao escreve diretamente no banco.
- Roles e suspensao devem ser validados no backend.
- Dados sensiveis de CPF/CNPJ nao aparecem publicamente.
- ONG ve apenas recursos das proprias oportunidades.
- Voluntario ve apenas dados proprios.

### Integration Points

- Backend de presencas deve consultar inscricoes aprovadas.
- Backend deve validar ownership da oportunidade pela ONG.
- Area da ONG deve listar oportunidades concluidas e voluntarios aprovados para marcar presenca.
- Area do voluntario deve exibir historico de oportunidades concluidas com status de presenca.
- Historico deve respeitar suspensao de ONG e voluntario sem apagar dados.

</code_context>

<specifics>
## Specific Ideas

- O usuario preferiu simplificar: a oportunidade ja e a atividade/postagem principal.
- O termo `presenca` ficou mais claro do que `participacao`.
- Apenas a ONG confirma presenca.
- Historico do voluntario mostra somente oportunidades concluidas.
- Status escolhidos: `presente`, `ausente`, `cancelada`.
- Imagens em oportunidade foram mencionadas, mas ficam fora desta fase por conflitar com a decisao anterior da Fase 5.

</specifics>

<deferred>
## Deferred Ideas

- Subatividades/subeventos dentro de uma oportunidade.
- Agenda detalhada com multiplas datas por oportunidade.
- Confirmacao de presenca pelo proprio voluntario.
- Certificados, horas voluntarias e comprovantes formais.
- Imagens proprias na oportunidade, caso a Fase 5 seja revisada.
- Dashboard admin completo para auditoria de historico.

</deferred>

---

*Phase: 07-events-and-participation*
*Context gathered: 2026-05-07*
