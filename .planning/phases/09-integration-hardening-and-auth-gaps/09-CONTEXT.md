# Phase 9: Integration Hardening And Auth Gaps - Context

**Gathered:** 2026-05-25
**Status:** Ready for planning
**Source:** Pedido direto do usuario para `$gsd-plan-phase 9`

<domain>
## Phase Boundary

A fase 9 fecha lacunas tecnicas abertas depois das fases 3 a 8. O foco nao e criar uma nova funcionalidade de negocio, mas tornar os fluxos existentes completos, integrados e defensaveis: cadastro completo, upload seguro de logo, recuperacao de senha, guards genericos, rotas protegidas, telas consumindo APIs reais e testes criticos.
</domain>

<decisions>
## Implementation Decisions

### Auth e cadastro
- Cadastro publico continua sem admin.
- Voluntario e ONG precisam gerar registros completos de dominio no backend.
- CPF/CNPJ devem ser normalizados e validados no backend.
- Logo de ONG e obrigatoria e deve ser enviada ao Supabase Storage pelo backend.
- Se Supabase Auth criar usuario e o dominio falhar, o backend deve compensar ou bloquear a conta sem liberar sessao valida.

### Frontend e roteamento
- SvelteKit continua usando `@supabase/ssr` com cookies, sem `localStorage` para token.
- Recuperacao/redefinicao de senha e sessao expirada precisam de telas proprias em portugues.
- Redirecionamento pos-login deve respeitar papel, `conta_suspensa` e `status_analise`.
- Telas criadas como scaffold nas fases anteriores devem consumir APIs reais.

### Autorizacao backend
- Backend precisa de guard/decorator reutilizavel para usuario atual, roles, suspensao, ownership e ONG aprovada.
- Service role continua restrita ao backend.
- RLS e defesa em profundidade; autorizacao sensivel precisa existir no NestJS.

### Testes e seguranca
- Testes precisam cobrir IDOR, role indevido, suspensao, duplicidade, vagas, upload invalido e vazamento de CPF/CNPJ.
- Nenhum teste ou doc pode conter segredo real.
- Respostas publicas e HTML publico nao devem expor CPF/CNPJ, motivo interno de analise, stack trace ou payload sensivel.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Plans And Gaps
- `.planning/phases/03-authentication-and-roles/03-01-PLAN.md` — plano original de auth.
- `.planning/phases/04-ngo-profiles/04-01-PLAN.md` — plano original de ONGs.
- `.planning/phases/05-opportunities/05-01-PLAN.md` — plano original de oportunidades.
- `.planning/phases/06-applications/06-01-PLAN.md` — plano original de inscricoes.
- `.planning/phases/08-ux-accessibility-and-verification/08-01-PLAN.md` — jornada e verificacao do MVP.

### Code
- `backend/src/auth/` — auth atual.
- `backend/src/ongs/` — ONGs e analise.
- `backend/src/oportunidades/` — oportunidades.
- `backend/src/inscricoes/` — inscricoes.
- `frontend/src/routes/` — telas publicas e areas logadas.
- `supabase/migrations/` — contratos SQL locais.

### Project Skills
- `.codex/skills/security-code-review/SKILL.md` — obrigatorio para revisar codigo/seguranca.
- `.codex/skills/volunteer-connect-design/SKILL.md` — obrigatorio para UI.
</canonical_refs>

<specifics>
## Specific Ideas

- Fechar ou reduzir as pendencias das issues GitHub #47, #48, #49, #54, #55, #61, #62, #79, #80, #81, #82 e #83.
- Priorizar riscos altos: upload, auth, role/ownership, IDOR e vazamento de documentos.
- Preferir testes de service/controller para regras de backend e Playwright para jornadas principais.
</specifics>

<deferred>
## Deferred Ideas

- Chat em tempo real.
- Recomendacao automatica.
- App mobile.
- Multi-ONG por usuario gestor.
</deferred>

---

*Phase: 09-integration-hardening-and-auth-gaps*
*Context gathered: 2026-05-25 via inline plan-phase*
