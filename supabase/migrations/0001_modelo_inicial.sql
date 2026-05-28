-- Volunteer Connect - migration inicial do modelo relacional atual do MVP.
-- Executar apenas em ambiente de desenvolvimento autorizado.

create extension if not exists pgcrypto;

-- Tabela de usuarios espelhando a identidade do Supabase Auth.
-- Credenciais permanecem no Supabase Auth; esta tabela guarda o contrato de dominio.
create table if not exists usuarios (
  id uuid primary key default gen_random_uuid(),
  nome_completo text not null,
  email text not null unique,
  papel text not null,
  ativo boolean not null default true,
  conta_suspensa boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint usuarios_papel_check check (papel in ('voluntario', 'ong', 'admin'))
);

create table if not exists perfis_voluntarios (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null unique references usuarios(id) on delete cascade,
  cpf text,
  telefone text,
  cidade text,
  estado varchar(2),
  biografia text,
  data_nascimento date,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create unique index if not exists idx_perfis_voluntarios_cpf_unico
  on perfis_voluntarios (cpf)
  where cpf is not null;

create table if not exists perfis_ongs (
  id uuid primary key default gen_random_uuid(),
  usuario_gestor_id uuid not null unique references usuarios(id) on delete restrict,
  nome_fantasia text not null,
  cnpj text not null unique,
  descricao text,
  site_url text,
  cidade text,
  estado varchar(2),
  verificada boolean not null default false,
  logo_storage_path text,
  status_analise text not null default 'pendente',
  motivo_reprovacao text,
  analisado_por_usuario_id uuid references usuarios(id) on delete set null,
  analisado_em timestamptz,
  reenviado_em timestamptz,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint perfis_ongs_status_analise_valido
    check (status_analise in ('pendente', 'aprovado', 'reprovado')),
  constraint perfis_ongs_motivo_reprovacao_tamanho
    check (motivo_reprovacao is null or char_length(motivo_reprovacao) <= 2000),
  constraint perfis_ongs_reprovacao_exige_motivo
    check (
      status_analise <> 'reprovado'
      or nullif(btrim(motivo_reprovacao), '') is not null
    )
);

create table if not exists oportunidades (
  id uuid primary key default gen_random_uuid(),
  perfil_ong_id uuid not null references perfis_ongs(id) on delete cascade,
  titulo text not null,
  descricao text not null,
  tipo_atividade text not null,
  cidade text not null,
  estado varchar(2) not null,
  data_inicio timestamptz not null,
  data_fim timestamptz not null,
  prazo_inscricao timestamptz not null,
  quantidade_vagas integer not null check (quantidade_vagas > 0),
  status text not null default 'rascunho',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint oportunidades_status_check
    check (status in ('rascunho', 'publicada', 'encerrada', 'cancelada')),
  constraint oportunidades_datas_check check (data_fim >= data_inicio),
  constraint oportunidades_prazo_check check (prazo_inscricao <= data_inicio)
);

create table if not exists inscricoes (
  id uuid primary key default gen_random_uuid(),
  oportunidade_id uuid not null references oportunidades(id) on delete cascade,
  voluntario_usuario_id uuid not null references usuarios(id) on delete cascade,
  status text not null default 'pendente',
  mensagem text,
  observacao_ong text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint inscricoes_status_check
    check (status in ('pendente', 'aprovada', 'reprovada', 'cancelada')),
  constraint inscricoes_unica_por_oportunidade unique (
    oportunidade_id,
    voluntario_usuario_id
  )
);

create table if not exists presencas (
  id uuid primary key default gen_random_uuid(),
  inscricao_id uuid not null references inscricoes(id) on delete cascade,
  oportunidade_id uuid not null references oportunidades(id) on delete cascade,
  voluntario_usuario_id uuid not null references usuarios(id) on delete restrict,
  status text not null,
  observacao text,
  registrado_por_usuario_id uuid not null references usuarios(id) on delete restrict,
  registrado_em timestamptz not null default now(),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint presencas_status_check check (status in ('presente', 'ausente', 'cancelada')),
  constraint presencas_inscricao_unica unique (inscricao_id)
);

create index if not exists idx_usuarios_papel on usuarios (papel);
create index if not exists idx_usuarios_conta_suspensa on usuarios (conta_suspensa);
create index if not exists idx_perfis_ongs_status_analise on perfis_ongs (status_analise);
create index if not exists idx_perfis_ongs_analisado_por_usuario_id
  on perfis_ongs (analisado_por_usuario_id);
create index if not exists idx_oportunidades_perfil_ong_id on oportunidades (perfil_ong_id);
create index if not exists idx_oportunidades_status on oportunidades (status);
create index if not exists idx_oportunidades_cidade_estado on oportunidades (cidade, estado);
create index if not exists idx_oportunidades_tipo_atividade on oportunidades (tipo_atividade);
create index if not exists idx_oportunidades_periodo on oportunidades (data_inicio, data_fim);
create index if not exists idx_oportunidades_busca_texto
  on oportunidades using gin (to_tsvector('portuguese', titulo || ' ' || descricao));
create index if not exists idx_inscricoes_oportunidade_id on inscricoes (oportunidade_id);
create index if not exists idx_inscricoes_voluntario_usuario_id
  on inscricoes (voluntario_usuario_id);
create index if not exists idx_inscricoes_status on inscricoes (status);
create index if not exists idx_inscricoes_oportunidade_status
  on inscricoes (oportunidade_id, status);
create index if not exists idx_presencas_oportunidade_id on presencas (oportunidade_id);
create index if not exists idx_presencas_voluntario_usuario_id
  on presencas (voluntario_usuario_id);
create index if not exists idx_presencas_status on presencas (status);
create index if not exists idx_presencas_registrado_em on presencas (registrado_em);
