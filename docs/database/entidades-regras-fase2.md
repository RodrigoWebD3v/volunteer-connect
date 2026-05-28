# Entidades e regras de integridade

Este documento resume o contrato atual do modelo de dados usado pelo backend.

## 1) `usuarios`

- Espelha o usuario do Supabase Auth.
- `papel` aceita `voluntario`, `ong` ou `admin`.
- `conta_suspensa` bloqueia novas acoes sensiveis sem apagar historico.
- Credenciais e senhas ficam no Supabase Auth, nao nesta tabela.

## 2) `perfis_voluntarios`

- Um perfil por `usuario_id`.
- CPF e unico quando preenchido.
- CPF e telefone nao devem aparecer em respostas publicas.

## 3) `perfis_ongs`

- Um perfil por `usuario_gestor_id`.
- CNPJ e unico.
- `status_analise` aceita `pendente`, `aprovado` ou `reprovado`.
- ONG reprovada exige `motivo_reprovacao`.
- Apenas ONG aprovada e nao suspensa pode publicar oportunidades.

## 4) `oportunidades`

- Pertence a `perfil_ong_id`.
- Campos principais: `titulo`, `descricao`, `tipo_atividade`, `cidade`, `estado`, `data_inicio`, `data_fim`, `prazo_inscricao`, `quantidade_vagas`, `status`.
- `status` aceita `rascunho`, `publicada`, `encerrada` ou `cancelada`.
- `quantidade_vagas` deve ser maior que zero.
- `data_fim` deve ser maior ou igual a `data_inicio`.
- `prazo_inscricao` deve ser menor ou igual a `data_inicio`.

## 5) `inscricoes`

- Deve existir no maximo uma inscricao por `(oportunidade_id, voluntario_usuario_id)`.
- `status` aceita `pendente`, `aprovada`, `reprovada` ou `cancelada`.
- Apenas inscricoes `aprovada` consomem vaga.
- Aprovar inscricao usa a funcao `aprovar_inscricao_com_vaga` para controlar capacidade.

## 6) `presencas`

- Uma presenca por `inscricao_id`.
- `status` aceita `presente`, `ausente` ou `cancelada`.
- Presenca exige inscricao aprovada.
- Presenca so pode ser registrada apos conclusao da oportunidade.
- ONG so pode registrar presenca em oportunidades proprias.

## Regras transversais

- Backend deve checar autenticacao, papel, suspensao e ownership antes de acoes sensiveis.
- Dados sensiveis nao devem aparecer em endpoints publicos.
- O seed versionado deve usar apenas dados ficticios em dominios `example.org` ou `example.com`.
