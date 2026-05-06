# Segurança do repositório

Este documento descreve a configuração recomendada para proteger a branch `main` e reduzir risco de mudanças inseguras.

## Status atual observado

- Repositório: `RodrigoWebD3v/volunteer-connect`
- Branch padrão: `main`
- `main` não estava protegida no momento desta configuração inicial.

## Arquivos adicionados

- `.github/workflows/ci.yml`: instala dependências e executa `npm run ci`.
- `.github/workflows/codeql.yml`: análise estática de JavaScript/TypeScript.
- `.github/workflows/dependency-review.yml`: bloqueia PR com dependência vulnerável a partir de severidade moderada.
- `.github/workflows/secret-scan.yml`: varredura de segredos com Gitleaks.
- `.github/dependabot.yml`: atualizações semanais de npm e GitHub Actions.
- `.github/CODEOWNERS`: exige owner para áreas sensíveis quando branch protection estiver ativa.
- `.github/PULL_REQUEST_TEMPLATE.md`: checklist de qualidade e segurança.
- `SECURITY.md`: política de reporte e regras de segurança.

## Branch protection recomendada para `main`

No GitHub, acesse:

`Settings` -> `Branches` -> `Add branch protection rule`

Configure:

- Branch name pattern: `main`
- Require a pull request before merging: ligado
- Required approvals: `1`
- Dismiss stale pull request approvals when new commits are pushed: ligado
- Require review from Code Owners: ligado
- Require status checks to pass before merging: ligado
- Require branches to be up to date before merging: ligado
- Required checks:
  - `Verify`
  - `Analyze JavaScript/TypeScript`
  - `Dependency Review`
  - `Gitleaks`
- Require conversation resolution before merging: ligado
- Require linear history: recomendado
- Include administrators: recomendado
- Allow force pushes: desligado
- Allow deletions: desligado

## Configurações recomendadas do repositório

Em `Settings` -> `General`:

- Allow squash merging: ligado
- Allow merge commits: desligado
- Allow rebase merging: opcional
- Automatically delete head branches: ligado
- Wikis: desligar se não for usar

Em `Settings` -> `Code security and analysis`:

- Dependabot alerts: ligado
- Dependabot security updates: ligado
- Secret scanning: ligado, se disponível no plano do repositório
- Push protection: ligado, se disponível no plano do repositório
- Code scanning: ligado via CodeQL workflow

Em `Settings` -> `Actions` -> `General`:

- Actions permissions: permitir GitHub Actions e actions verificadas.
- Workflow permissions: `Read repository contents permission`
- Allow GitHub Actions to create and approve pull requests: desligado, salvo necessidade explícita.

## Fluxo recomendado

1. Criar branch curta a partir de `main`.
2. Abrir PR.
3. Esperar CI, CodeQL, Dependency Review e Secret Scan passarem.
4. Revisar checklist do PR.
5. Fazer squash merge.
6. Deletar branch.

## Observação

Estas regras complementam a skill `.codex/skills/security-code-review/SKILL.md`. Qualquer alteração sensível deve ser revisada com essa skill antes de aprovação.
