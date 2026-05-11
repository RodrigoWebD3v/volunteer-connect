# Phase 8: UX, Accessibility, And Verification - Context

**Gathered:** 2026-05-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Fechar o MVP tornando o fluxo principal simples, acessivel, responsivo e verificavel. Esta fase cobre a primeira tela baseada no marketplace de oportunidades, as jornadas obrigatorias de validacao, criterios minimos de acessibilidade, verificacao documental local e testes automatizados/E2E para os fluxos principais.

</domain>

<decisions>
## Implementation Decisions

### Primeira tela

- **D-01:** A primeira tela deve abrir no marketplace de oportunidades.
- **D-02:** O marketplace pode ter um bloco inicial curto explicando a plataforma, mas nao deve virar uma landing page de marketing.
- **D-03:** A copy inicial deve ser simples no primeiro momento.
- **D-04:** A mensagem principal pode seguir a ideia: conectar voluntarios a ONGs com oportunidades reais e organizadas.
- **D-05:** A primeira tela deve oferecer acoes claras para descobrir oportunidades, entrar/cadastrar e acessar fluxos de ONG quando aplicavel.

### Jornadas obrigatorias

- **D-06:** A jornada de guest deve permitir descobrir uma oportunidade sem login.
- **D-07:** A jornada de voluntario deve cobrir cadastro e inscricao em oportunidade.
- **D-08:** A jornada de ONG deve cobrir cadastro, envio para analise e criacao de oportunidade apos aprovacao.
- **D-09:** A jornada de admin deve cobrir aprovacao de ONG.
- **D-10:** Essas jornadas devem ser validadas como utilizaveis sem orientacao externa.

### Acessibilidade minima

- **D-11:** Main pages devem ter navegacao por teclado.
- **D-12:** Formularios devem ter labels acessiveis.
- **D-13:** Contraste deve ser adequado.
- **D-14:** Layout deve ser responsivo em mobile e desktop.
- **D-15:** Mensagens de erro devem ser claras e em portugues.
- **D-16:** Controles principais devem ser alcancaveis e compreensiveis sem depender apenas de cor.

### Verificacao final

- **D-17:** A fase deve produzir checklist documental local de verificacao do MVP.
- **D-18:** A fase tambem deve planejar testes automatizados/E2E para os fluxos principais.
- **D-19:** Cada requisito v1 deve ser marcado como verificado ou explicitamente bloqueado.
- **D-20:** Bloqueios devem registrar motivo e proximo passo recomendado.
- **D-21:** A verificacao deve cobrir funcionalidade, UX, acessibilidade basica e seguranca relevante.

### Design e linguagem

- **D-22:** A base visual publica continua sendo Airbnb: marketplace humano, claro, com cards escaneaveis.
- **D-23:** Areas logadas e dashboards continuam seguindo Notion/Cal.com: limpos, organizados e operacionais.
- **D-24:** Todo texto de interface, mensagens e documentos devem ficar em portugues.
- **D-25:** Evitar excesso de marketing; priorizar clareza operacional.

### the agent's Discretion

- Definir a copy exata do bloco inicial, desde que seja simples e alinhada ao core value.
- Definir ferramenta exata de E2E conforme stack existente, com preferencia por abordagem compativel com SvelteKit/NestJS.
- Definir formato final do checklist documental, desde que seja local, rastreavel e cubra todos os requisitos v1.
- Definir detalhes de layout responsivo seguindo a skill `volunteer-connect-design`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Projeto e requisitos

- `.planning/PROJECT.md` — contexto do produto, restricoes, core value e stack.
- `.planning/REQUIREMENTS.md` — requisitos UX-01..UX-04 e lista completa de requisitos v1.
- `.planning/ROADMAP.md` — objetivo e criterios de sucesso da fase 8.
- `.planning/STATE.md` — estado atual do projeto.

### Decisoes anteriores

- `.planning/phases/03-authentication-and-roles/03-CONTEXT.md` — login, cadastro, roles, guest e suspensao.
- `.planning/phases/04-ngo-profiles/04-CONTEXT.md` — fluxo de analise/aprovacao de ONG e separacao de papeis.
- `.planning/phases/05-opportunities/05-CONTEXT.md` — marketplace, oportunidades, filtros e primeira experiencia publica.
- `.planning/phases/06-applications/06-CONTEXT.md` — inscricao do voluntario e gestao de inscricoes.
- `.planning/phases/07-events-and-participation/07-CONTEXT.md` — presencas e historico, se entrar na verificacao final.

### Regras locais do projeto

- `AGENTS.md` — instrucoes do projeto, portugues por padrao, stack e skills locais.
- `.codex/skills/volunteer-connect-design/SKILL.md` — direcao visual obrigatoria para UI/UX.
- `.codex/skills/security-code-review/SKILL.md` — obrigatoria antes de PR/build e para revisar riscos de auth, autorizacao, dados e frontend.
- `.codex/skills/po-business-rule-analyst/SKILL.md` — referencia para novas regras/ajustes descobertos durante verificacao.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- A Fase 5 define o marketplace como experiencia publica principal.
- A Fase 6 define o fluxo voluntario de inscricao.
- A Fase 4 define o fluxo admin de aprovacao de ONG.
- A skill `volunteer-connect-design` define a base visual para primeira tela e areas logadas.

### Established Patterns

- Marketplace publico pode ser acessado por guest.
- Interacoes exigem autenticacao e papel correto.
- ONG e voluntario nao compartilham acoes de papel.
- Frontend nao escreve diretamente no banco para dominio.
- Documentacao e UI devem ficar em portugues.
- Dados sensiveis como CPF/CNPJ nao aparecem publicamente.

### Integration Points

- Primeira tela deve conectar marketplace, login/cadastro e detalhe de oportunidade.
- Jornada de voluntario deve atravessar marketplace, cadastro/login e inscricao.
- Jornada de ONG deve atravessar cadastro, analise/aprovacao e criacao de oportunidade.
- Jornada de admin deve atravessar listagem/detalhe de ONGs pendentes e aprovacao.
- Checklist final deve mapear todos os requisitos v1 de `.planning/REQUIREMENTS.md`.
- Testes E2E devem cobrir os fluxos principais definidos nesta fase.

</code_context>

<specifics>
## Specific Ideas

- Primeira tela: marketplace de oportunidades, nao landing page.
- Copy simples: conectar voluntarios a ONGs com oportunidades reais e organizadas.
- Jornadas obrigatorias:
  - guest descobre oportunidade;
  - voluntario se cadastra e se inscreve;
  - ONG se cadastra, envia perfil para analise e cria oportunidade;
  - admin aprova ONG.
- Acessibilidade minima confirmada: teclado, labels, contraste, responsividade e erros claros.
- Verificacao final deve combinar checklist documental local e testes automatizados/E2E.

</specifics>

<deferred>
## Deferred Ideas

- Copy institucional refinada/marketing completo.
- Landing page separada do marketplace.
- Auditoria de acessibilidade avancada com padroes alem do basico do MVP.
- Testes visuais completos/regressao visual, salvo se o planejamento decidir que cabe no tempo.
- Recomendacoes automaticas, chat, notificacoes avancadas e app mobile permanecem fora do MVP.

</deferred>

---

*Phase: 08-ux-accessibility-and-verification*
*Context gathered: 2026-05-10*
