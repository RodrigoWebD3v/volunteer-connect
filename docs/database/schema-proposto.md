# Schema proposto

Este documento registra o contrato atual do banco do Volunteer Connect para o MVP acadêmico local.

Nada deve ser aplicado automaticamente no Supabase remoto. Migrations e seed devem ser revisados antes de qualquer execução em ambiente de desenvolvimento autorizado.

## Objetivo

Criar um modelo relacional coerente para o fluxo principal:

1. Usuario autentica pelo Supabase Auth e possui um registro de dominio em `usuarios`.
2. Voluntario complementa perfil em `perfis_voluntarios`.
3. ONG registra perfil institucional em `perfis_ongs` e aguarda analise.
4. ONG aprovada publica oportunidades.
5. Voluntario navega e se inscreve em oportunidades.
6. ONG avalia inscricoes e registra presencas em oportunidades concluidas.

## Padroes gerais

- Tabelas e colunas usam portugues e `snake_case`.
- Chaves primarias usam `id`.
- Datas de auditoria usam `criado_em` e `atualizado_em`.
- Datas de negocio usam nomes explicitos, como `data_inicio`, `data_fim` e `prazo_inscricao`.
- Status e papeis devem ser validados por constraints no banco.
- Credenciais permanecem no Supabase Auth; o banco da aplicacao nao armazena senha nem hash de senha.
- CPFs, CNPJs, emails e telefones nao devem aparecer em respostas publicas.
- `conta_suspensa = true` bloqueia acoes sensiveis sem apagar historico.

## Entidades

### `usuarios`

Representa a conta de dominio espelhada do Supabase Auth.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Mesmo identificador usado pelo Supabase Auth. |
| `nome_completo` | sim | nao | Nome da pessoa ou responsavel pela conta. |
| `email` | sim | sim | Email de login e contato principal. |
| `papel` | sim | nao | `voluntario`, `ong` ou `admin`. |
| `ativo` | sim | nao | Flag operacional da conta. |
| `conta_suspensa` | sim | nao | Bloqueia acoes sensiveis sem excluir dados. |
| `criado_em` | sim | nao | Data de criacao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

### `perfis_voluntarios`

Representa dados complementares de usuarios com `papel = voluntario`.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador do perfil. |
| `usuario_id` | sim | sim | Referencia `usuarios.id`. |
| `cpf` | nao no banco, requerido no cadastro atual | sim quando preenchido | CPF normalizado do voluntario. |
| `telefone` | nao | nao | Telefone de contato. |
| `cidade` | nao | nao | Cidade do voluntario. |
| `estado` | nao | nao | UF do voluntario. |
| `biografia` | nao | nao | Apresentacao curta. |
| `data_nascimento` | nao | nao | Data de nascimento, se coletada futuramente. |
| `criado_em` | sim | nao | Data de criacao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

CPF e telefone nao devem aparecer em listagens publicas.

### `perfis_ongs`

Representa dados institucionais da ONG e sua analise administrativa.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador do perfil da ONG. |
| `usuario_gestor_id` | sim | sim | Usuario gestor responsavel pela ONG. |
| `nome_fantasia` | sim | nao | Nome publico da ONG. |
| `cnpj` | sim | sim | CNPJ normalizado da ONG. |
| `descricao` | nao | nao | Descricao institucional. |
| `site_url` | nao | nao | Site publico, quando houver. |
| `cidade` | nao | nao | Cidade da ONG. |
| `estado` | nao | nao | UF da ONG. |
| `verificada` | sim | nao | Flag legada de verificacao publica. |
| `logo_storage_path` | nao no banco, requerido no cadastro atual | nao | Caminho da logo no Supabase Storage. |
| `status_analise` | sim | nao | `pendente`, `aprovado` ou `reprovado`. |
| `motivo_reprovacao` | nao | nao | Motivo informado pelo admin. |
| `analisado_por_usuario_id` | nao | nao | Admin que analisou. |
| `analisado_em` | nao | nao | Data da analise. |
| `reenviado_em` | nao | nao | Data do ultimo reenvio. |
| `criado_em` | sim | nao | Data de criacao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Regras:

- ONG recem-cadastrada inicia como `pendente`.
- `motivo_reprovacao` e obrigatorio quando `status_analise = reprovado`.
- Apenas ONG `aprovado` e com usuario ativo/nao suspenso pode publicar oportunidades.
- CNPJ nao aparece em listagens ou detalhes publicos.

### `oportunidades`

Representa oportunidades de voluntariado publicadas por ONGs.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador da oportunidade. |
| `perfil_ong_id` | sim | nao | Referencia `perfis_ongs.id`. |
| `titulo` | sim | nao | Titulo curto da oportunidade. |
| `descricao` | sim | nao | Descricao da atividade. |
| `tipo_atividade` | sim | nao | Categoria pratica. |
| `cidade` | sim | nao | Cidade da atividade. |
| `estado` | sim | nao | UF da atividade. |
| `data_inicio` | sim | nao | Inicio previsto. |
| `data_fim` | sim | nao | Fim previsto. |
| `prazo_inscricao` | sim | nao | Data limite para inscricoes. |
| `quantidade_vagas` | sim | nao | Capacidade planejada. |
| `status` | sim | nao | `rascunho`, `publicada`, `encerrada` ou `cancelada`. |
| `criado_em` | sim | nao | Data de criacao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Regras:

- Apenas ONG dona pode criar ou editar.
- Apenas oportunidades `publicada` aparecem no marketplace ativo.
- `data_fim >= data_inicio`.
- `prazo_inscricao <= data_inicio`.
- `quantidade_vagas > 0`.

### `inscricoes`

Representa candidaturas de voluntarios para oportunidades.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador da inscricao. |
| `oportunidade_id` | sim | composto | Oportunidade escolhida. |
| `voluntario_usuario_id` | sim | composto | Usuario voluntario inscrito. |
| `status` | sim | nao | `pendente`, `aprovada`, `reprovada` ou `cancelada`. |
| `mensagem` | nao | nao | Mensagem opcional do voluntario. |
| `observacao_ong` | nao | nao | Observacao ou resposta da ONG. |
| `criado_em` | sim | nao | Data da inscricao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Regras:

- A combinacao `oportunidade_id` + `voluntario_usuario_id` deve ser unica.
- Apenas inscricoes `aprovada` consomem vaga.
- Voluntario pode cancelar apenas inscricao `pendente`.
- ONG dona da oportunidade pode aprovar ou reprovar apenas inscricoes das proprias oportunidades.

### `presencas`

Representa participacao de voluntarios em oportunidades concluidas. O MVP nao usa entidade separada de evento/subevento; a propria oportunidade e a atividade principal.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador da presenca. |
| `inscricao_id` | sim | sim | Inscricao aprovada relacionada. |
| `oportunidade_id` | sim | nao | Oportunidade concluida. |
| `voluntario_usuario_id` | sim | nao | Usuario voluntario participante. |
| `status` | sim | nao | `presente`, `ausente` ou `cancelada`. |
| `observacao` | nao | nao | Observacao operacional. |
| `registrado_por_usuario_id` | sim | nao | Usuario da ONG que registrou. |
| `registrado_em` | sim | nao | Data do registro. |
| `criado_em` | sim | nao | Data de criacao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Regras:

- Presenca exige inscricao `aprovada`.
- Presenca so pode ser registrada apos conclusao da oportunidade.
- Apenas ONG dona da oportunidade, aprovada e nao suspensa pode registrar ou corrigir.
- Voluntario ve apenas seu proprio historico.

## Relacionamentos principais

- `usuarios` 1:1 `perfis_voluntarios`.
- `usuarios` 1:1 `perfis_ongs`.
- `perfis_ongs` 1:N `oportunidades`.
- `oportunidades` 1:N `inscricoes`.
- `usuarios` 1:N `inscricoes` como voluntario.
- `inscricoes` 1:1 `presencas`.
- `oportunidades` 1:N `presencas`.
- `usuarios` 1:N `presencas` como voluntario.

## Valores controlados

| Campo | Valores |
|-------|---------|
| `usuarios.papel` | `voluntario`, `ong`, `admin` |
| `perfis_ongs.status_analise` | `pendente`, `aprovado`, `reprovado` |
| `oportunidades.status` | `rascunho`, `publicada`, `encerrada`, `cancelada` |
| `inscricoes.status` | `pendente`, `aprovada`, `reprovada`, `cancelada` |
| `presencas.status` | `presente`, `ausente`, `cancelada` |

## Privacidade e seguranca

- Fluxos publicos nunca devem expor CPF, CNPJ, telefone, service role, campos internos de analise ou stack traces.
- Backend usa service role para operacoes de dominio, entao autorizacao por papel, suspensao e ownership deve existir no NestJS.
- RLS continua recomendada como defesa em profundidade no Supabase.
