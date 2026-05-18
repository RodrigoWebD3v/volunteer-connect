# Fase 2 — Entidades e Regras do Schema

Status: proposta local para revisão técnica (não aplicada em Supabase remoto).

## Entidades

## 1) `usuarios`
- Representa a conta principal da plataforma.
- Campos-chave: `email` único, `papel` (`voluntario`, `ong`, `admin`), `ativo`.

Regras:
- Cada conta deve possuir exatamente um papel principal.
- Email deve ser único no sistema.

## 2) `perfis_voluntarios`
- Extensão 1:1 de `usuarios` para dados de voluntário.

Regras:
- `usuario_id` é único (um perfil por conta).
- Deve referenciar usuário existente.

## 3) `perfis_ongs`
- Extensão 1:1 do usuário gestor da ONG.

Regras:
- `usuario_gestor_id` é único.
- `cnpj` é único.
- ONG pode ser marcada como `verificada`.

## 4) `oportunidades`
- Oportunidades publicadas por ONGs.

Regras:
- Cada oportunidade pertence a uma ONG existente.
- `vagas` deve ser maior que zero.
- `data_fim` não pode ser anterior a `data_inicio`.
- Estado controlado por `status` (`rascunho`, `publicada`, `encerrada`).

## 5) `inscricoes`
- Candidaturas de voluntários para oportunidades.

Regras:
- Relação obrigatória com oportunidade e voluntário.
- Deve existir no máximo uma inscrição por `(oportunidade_id, voluntario_id)`.
- Estado controlado por `status` (`pendente`, `aprovada`, `rejeitada`, `cancelada`).

## 6) `eventos`
- Atividades agendadas vinculadas a oportunidades.

Regras:
- Deve pertencer a uma oportunidade.
- `fim_em` não pode ser anterior a `inicio_em`.
- Estado controlado por `status` (`agendado`, `realizado`, `cancelado`).

## 7) `participacoes`
- Histórico de presença/engajamento do voluntário.

Regras:
- Relaciona voluntário e oportunidade; `evento_id` é opcional.
- `horas_voluntariadas` não pode ser negativa.
- Estado controlado por `status` (`confirmada`, `presente`, `ausente`, `justificada`).

## Regras transversais

- Todos os dados de exemplo devem ser fictícios.
- Chaves/segredos nunca devem ser registrados em SQL/docs versionados.
- Aplicação no Supabase remoto só com revisão explícita.
