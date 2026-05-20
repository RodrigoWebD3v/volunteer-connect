# Schema proposto

Este documento registra a estrutura inicial proposta para o banco do Volunteer Connect.

Nada descrito aqui foi aplicado automaticamente no Supabase remoto. O conteudo deve ser revisado antes de qualquer execucao em banco de desenvolvimento autorizado.

## Objetivo

Criar um modelo relacional coerente para o fluxo principal do MVP:

1. Usuario cria uma conta com papel definido.
2. Voluntario complementa seu perfil.
3. ONG registra seu perfil institucional e aguarda analise.
4. ONG aprovada publica oportunidades.
5. Voluntario navega, vota e se inscreve em oportunidades.
6. Eventos e participacoes registram presencas e historico.

## Requisitos cobertos

- DATA-01: `usuarios` armazena identidade, credenciais, papel, suspensao e timestamps.
- DATA-02: `perfis_voluntarios` armazena dados complementares ligados a `usuarios`.
- DATA-03: `perfis_ongs` armazena dados institucionais ligados ao usuario responsavel.
- DATA-04: `oportunidades` armazena publicacoes ligadas a ONGs aprovadas.
- DATA-05: `inscricoes` liga voluntarios a oportunidades e impede duplicidade.
- DATA-06: `eventos` e `participacoes` registram agenda, presencas e historico.

## Padroes gerais

- Tabelas e colunas usam portugues e `snake_case`.
- Chaves primarias usam `id`.
- Datas de auditoria usam `criado_em` e `atualizado_em`.
- Datas de negocio usam nomes explicitos, como `data_inicio`, `data_fim` e `prazo_inscricao`.
- Status e papeis devem ser validados por constraints no banco.
- CPFs, CNPJs, emails e telefones nao devem aparecer em respostas publicas.
- Dados sensiveis devem ser retornados apenas em fluxos autenticados e autorizados.
- `conta_suspensa = true` bloqueia acoes sensiveis sem apagar dados historicos.

## Entidades

### `usuarios`

Representa a conta base usada por voluntarios, ONGs e administradores.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador da conta. |
| `email` | sim | sim | Email de login e contato principal. |
| `senha_hash` | sim | nao | Hash da senha, nunca senha em texto puro. |
| `papel` | sim | nao | Papel principal: `voluntario`, `ong` ou `admin`. |
| `conta_suspensa` | sim | nao | Flag para bloquear acoes sensiveis sem excluir a conta. |
| `criado_em` | sim | nao | Data de criacao da conta. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Regras de negocio:

- Cada usuario possui exatamente um papel principal.
- `papel` aceita somente `voluntario`, `ong` ou `admin`.
- `email` deve ser unico.
- `senha_hash` nao deve ser exposto em nenhuma API.
- Usuario suspenso nao pode executar acoes sensiveis.
- Voluntario suspenso nao pode votar nem se inscrever.
- ONG suspensa nao pode publicar, editar oportunidades ou reenviar perfil para analise.
- Admin suspenso nao deve acessar acoes administrativas.

### `perfis_voluntarios`

Representa dados complementares de usuarios com `papel = voluntario`.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador do perfil. |
| `usuario_id` | sim | sim | Referencia para `usuarios.id`. |
| `cpf` | sim | sim | CPF do voluntario. |
| `nome_completo` | sim | nao | Nome civil ou nome completo informado. |
| `telefone` | sim | nao | Telefone de contato. |
| `cidade` | sim | nao | Cidade do voluntario. |
| `estado` | sim | nao | Estado do voluntario. |
| `criado_em` | sim | nao | Data de criacao do perfil. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Relacionamentos e regras:

- `usuario_id` referencia `usuarios.id`.
- `usuario_id` deve ser unico para impedir mais de um perfil voluntario por conta.
- `cpf` deve ser unico.
- O perfil so deve existir para conta com `papel = voluntario`.
- CPF e telefone nao devem aparecer em listagens publicas.

### `perfis_ongs`

Representa dados institucionais de uma ONG e seu status de analise.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador do perfil da ONG. |
| `usuario_responsavel_id` | sim | sim | Usuario gestor responsavel pela ONG. |
| `cnpj` | sim | sim | CNPJ da ONG. |
| `razao_social` | sim | nao | Razao social da instituicao. |
| `logo_storage_path` | sim | nao | Caminho da logo no Supabase Storage. |
| `status_analise` | sim | nao | Status: `pendente`, `aprovado` ou `reprovado`. |
| `motivo_reprovacao` | nao | nao | Motivo informado pelo admin quando a ONG e reprovada. |
| `analisado_por_usuario_id` | nao | nao | Admin que aprovou ou reprovou a ONG. |
| `analisado_em` | nao | nao | Data da ultima analise administrativa. |
| `reenviado_em` | nao | nao | Data do ultimo reenvio para analise pela ONG. |
| `criado_em` | sim | nao | Data de criacao do perfil. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Relacionamentos e regras:

- `usuario_responsavel_id` referencia `usuarios.id`.
- `usuario_responsavel_id` deve ser unico no MVP, mantendo uma ONG por responsavel.
- O perfil so deve existir para conta com `papel = ong`.
- `cnpj` deve ser unico.
- `status_analise` aceita somente `pendente`, `aprovado` ou `reprovado`.
- ONG recem-cadastrada inicia como `pendente`.
- `motivo_reprovacao` e obrigatorio quando `status_analise = reprovado`.
- `motivo_reprovacao` deve ter no maximo 2.000 caracteres.
- `analisado_por_usuario_id` referencia `usuarios.id` de uma conta admin.
- `analisado_em` deve ser preenchido ao aprovar ou reprovar.
- `reenviado_em` deve ser preenchido quando uma ONG reprovada reenviar o perfil para nova analise.
- ONG `pendente` ou `reprovado` nao pode publicar oportunidades.
- Apenas ONG com `status_analise = aprovado` e `usuarios.conta_suspensa = false` pode publicar oportunidades.
- ONG reprovada pode corrigir dados e reenviar para analise, voltando para `pendente`, se a conta nao estiver suspensa.
- CNPJ nao deve aparecer em listagens ou detalhes publicos.
- `logo_storage_path` aponta para bucket publico de logos no Supabase Storage; a logo e considerada dado visual publico.

### `oportunidades`

Representa oportunidades de voluntariado publicadas no marketplace.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador da oportunidade. |
| `ong_id` | sim | nao | Referencia para `perfis_ongs.id`. |
| `titulo` | sim | nao | Titulo curto da oportunidade. |
| `descricao` | sim | nao | Descricao da atividade. |
| `tipo_atividade` | sim | nao | Categoria pratica da atividade. |
| `cidade` | sim | nao | Cidade onde a oportunidade ocorre. |
| `estado` | sim | nao | Estado onde a oportunidade ocorre. |
| `data_inicio` | sim | nao | Inicio previsto da atividade. |
| `data_fim` | sim | nao | Fim previsto da atividade. |
| `prazo_inscricao` | sim | nao | Data limite para inscricoes. |
| `quantidade_vagas` | sim | nao | Capacidade planejada. |
| `status` | sim | nao | Status: `rascunho`, `publicada`, `encerrada` ou `cancelada`. |
| `criado_em` | sim | nao | Data de criacao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Relacionamentos e regras:

- `ong_id` referencia `perfis_ongs.id`.
- Apenas ONG dona da oportunidade pode criar ou editar seus dados.
- Apenas ONGs aprovadas e nao suspensas podem publicar oportunidades.
- Pessoas fisicas, voluntarios e guests nao podem publicar oportunidades no MVP.
- `status` aceita somente `rascunho`, `publicada`, `encerrada` ou `cancelada`.
- Apenas oportunidades `publicada` aparecem no marketplace ativo.
- Oportunidades de ONG suspensa, pendente ou reprovada nao aparecem publicamente.
- `data_fim` deve ser maior ou igual a `data_inicio`.
- `prazo_inscricao` deve ser menor ou igual a `data_inicio`.
- `quantidade_vagas` deve ser maior que zero.

### `votos_oportunidades`

Representa likes e dislikes de voluntarios em oportunidades.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador do voto. |
| `oportunidade_id` | sim | composto | Referencia para `oportunidades.id`. |
| `usuario_id` | sim | composto | Usuario que votou. |
| `tipo_voto` | sim | nao | Tipo: `like` ou `dislike`. |
| `criado_em` | sim | nao | Data do voto. |
| `atualizado_em` | sim | nao | Data da ultima alteracao. |

Relacionamentos e regras:

- `oportunidade_id` referencia `oportunidades.id`.
- `usuario_id` referencia `usuarios.id`.
- A combinacao `oportunidade_id` + `usuario_id` deve ser unica.
- `tipo_voto` aceita somente `like` ou `dislike`.
- Apenas voluntario autenticado e nao suspenso pode votar.
- Voto nao substitui reputacao detalhada de ONG; e apenas sinal simples do MVP.

### `inscricoes`

Representa candidaturas de voluntarios para oportunidades.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador da inscricao. |
| `oportunidade_id` | sim | composto | Oportunidade escolhida. |
| `voluntario_usuario_id` | sim | composto | Usuario voluntario inscrito. |
| `status` | sim | nao | Status: `pendente`, `aprovada`, `reprovada` ou `cancelada`. |
| `mensagem` | nao | nao | Mensagem opcional do voluntario. |
| `observacao_ong` | nao | nao | Observacao interna ou resposta da ONG. |
| `criado_em` | sim | nao | Data da inscricao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Relacionamentos e regras:

- `oportunidade_id` referencia `oportunidades.id`.
- `voluntario_usuario_id` referencia `usuarios.id`.
- A combinacao `oportunidade_id` + `voluntario_usuario_id` deve ser unica.
- `status` aceita somente `pendente`, `aprovada`, `reprovada` ou `cancelada`.
- Apenas voluntario autenticado, com conta nao suspensa, pode se inscrever.
- A oportunidade precisa estar `publicada`, com prazo aberto, vagas disponiveis e ONG aprovada/nao suspensa.
- Apenas inscricoes `aprovada` consomem vaga.
- Voluntario nao pode se inscrever duas vezes na mesma oportunidade.

### `eventos`

Representa agendas, encontros ou atividades vinculadas a uma oportunidade.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador do evento. |
| `oportunidade_id` | sim | nao | Referencia para `oportunidades.id`. |
| `titulo` | sim | nao | Nome do encontro ou atividade. |
| `descricao` | nao | nao | Detalhes adicionais. |
| `local` | nao | nao | Local fisico ou referencia operacional. |
| `data_inicio` | sim | nao | Inicio do evento. |
| `data_fim` | sim | nao | Fim do evento. |
| `criado_em` | sim | nao | Data de criacao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Relacionamentos e regras:

- `oportunidade_id` referencia `oportunidades.id`.
- Evento pertence a uma oportunidade.
- Apenas ONG dona da oportunidade pode criar ou editar eventos.
- ONG suspensa nao pode criar ou editar eventos.
- `data_fim` deve ser maior ou igual a `data_inicio`.

### `participacoes`

Representa presencas e historico de participacao de voluntarios em eventos ou atividades. O termo de negocio "presencas" pode aparecer nas telas, mas o nome proposto da tabela e `participacoes` para manter o historico mais amplo.

| Campo | Obrigatorio | Unico | Descricao |
|-------|-------------|-------|-----------|
| `id` | sim | sim | Identificador da participacao. |
| `evento_id` | sim | composto | Evento relacionado. |
| `inscricao_id` | sim | composto | Inscricao aprovada relacionada. |
| `voluntario_usuario_id` | sim | nao | Usuario voluntario participante. |
| `status` | sim | nao | Status: `presente`, `ausente` ou `cancelada`. |
| `registrado_por_usuario_id` | sim | nao | Usuario da ONG que registrou a presenca. |
| `registrado_em` | sim | nao | Data do registro de presenca. |
| `observacao` | nao | nao | Observacao operacional opcional. |
| `criado_em` | sim | nao | Data de criacao. |
| `atualizado_em` | sim | nao | Data da ultima atualizacao. |

Relacionamentos e regras:

- `evento_id` referencia `eventos.id`.
- `inscricao_id` referencia `inscricoes.id`.
- `voluntario_usuario_id` referencia `usuarios.id`.
- `registrado_por_usuario_id` referencia `usuarios.id`.
- A combinacao `evento_id` + `inscricao_id` deve ser unica para impedir presenca duplicada no mesmo evento.
- `status` aceita somente `presente`, `ausente` ou `cancelada`.
- Participacao deve estar vinculada a inscricao `aprovada`.
- Apenas ONG dona da oportunidade pode registrar ou corrigir presenca.
- ONG suspensa nao pode registrar ou corrigir presenca.

## Relacionamentos principais

- `usuarios` 1:1 `perfis_voluntarios` para contas voluntarias.
- `usuarios` 1:1 `perfis_ongs` para contas de ONG no MVP.
- `perfis_ongs` 1:N `oportunidades`.
- `oportunidades` 1:N `votos_oportunidades`.
- `usuarios` 1:N `votos_oportunidades`.
- `oportunidades` 1:N `inscricoes`.
- `usuarios` 1:N `inscricoes` como voluntario.
- `oportunidades` 1:N `eventos`.
- `eventos` 1:N `participacoes`.
- `inscricoes` 1:N `participacoes` ao longo dos eventos de uma oportunidade.

## Valores permitidos

| Campo | Valores |
|-------|---------|
| `usuarios.papel` | `voluntario`, `ong`, `admin` |
| `perfis_ongs.status_analise` | `pendente`, `aprovado`, `reprovado` |
| `oportunidades.status` | `rascunho`, `publicada`, `encerrada`, `cancelada` |
| `votos_oportunidades.tipo_voto` | `like`, `dislike` |
| `inscricoes.status` | `pendente`, `aprovada`, `reprovada`, `cancelada` |
| `participacoes.status` | `presente`, `ausente`, `cancelada` |

## Regras transversais

- `conta_suspensa` pertence a `usuarios`, nao aos perfis.
- Suspensao preserva dados e historico, mas bloqueia acoes sensiveis.
- ONG so publica quando o perfil esta `aprovado` e a conta responsavel nao esta suspensa.
- ONG pendente, reprovada ou suspensa nao aparece em listagens publicas.
- Oportunidade de ONG pendente, reprovada ou suspensa nao aparece no marketplace.
- Fluxos publicos nunca devem expor CPF, CNPJ, `senha_hash`, telefone ou campos internos de analise.
- Alteracoes reais no Supabase remoto exigem autorizacao explicita e revisao previa.

## Fora do MVP

- Reputacao detalhada de ONG com estrelas, ranking, comentarios avaliativos ou tabela `avaliacoes_ongs`.
- Multiplos gestores por ONG.
- Historico detalhado de suspensao com motivo, autor e data.
- Pessoas fisicas publicando oportunidades.
- Recomendacoes automaticas de oportunidades.
- Chat em tempo real.

## Fora desta tarefa

- Aplicar migration no Supabase remoto.
- Implementar autenticacao, JWT ou guards.
- Implementar APIs NestJS.
- Implementar telas SvelteKit.
- Escrever a migration SQL completa.
- Escrever seed de validacao completo.
