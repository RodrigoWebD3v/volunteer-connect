-- Volunteer Connect - migration inicial do modelo relacional do MVP.
-- Executar apenas em ambiente de desenvolvimento autorizado.

create extension if not exists pgcrypto;

-- Enums
create type papel_usuario as enum ('voluntario', 'ong', 'admin');
create type status_oportunidade as enum ('rascunho', 'publicada', 'encerrada');
create type status_inscricao as enum ('pendente', 'aprovada', 'rejeitada', 'cancelada');
create type status_evento as enum ('agendado', 'realizado', 'cancelado');
create type status_participacao as enum ('confirmada', 'presente', 'ausente', 'justificada');

-- Tabela de usuarios (espelha identidade de conta do app)
create table if not exists usuarios (
  id uuid primary key default gen_random_uuid(),
  nome_completo text not null,
  email text not null unique,
  papel papel_usuario not null,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

-- Perfil de voluntario (1:1 com usuario)
create table if not exists perfis_voluntarios (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null unique references usuarios(id) on delete cascade,
  telefone text,
  cidade text,
  estado text,
  biografia text,
  data_nascimento date,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

-- Perfil de ONG (1:1 com usuario gestor)
create table if not exists perfis_ongs (
  id uuid primary key default gen_random_uuid(),
  usuario_gestor_id uuid not null unique references usuarios(id) on delete restrict,
  nome_fantasia text not null,
  cnpj text not null unique,
  descricao text,
  site_url text,
  cidade text,
  estado text,
  verificada boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

-- Oportunidades publicadas por ONGs
create table if not exists oportunidades (
  id uuid primary key default gen_random_uuid(),
  ong_id uuid not null references perfis_ongs(id) on delete cascade,
  titulo text not null,
  descricao text not null,
  localizacao text,
  data_inicio date,
  data_fim date,
  vagas integer not null check (vagas > 0),
  status status_oportunidade not null default 'rascunho',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint oportunidade_datas_validas check (data_fim is null or data_inicio is null or data_fim >= data_inicio)
);

-- Candidaturas de voluntarios para oportunidades
create table if not exists inscricoes (
  id uuid primary key default gen_random_uuid(),
  oportunidade_id uuid not null references oportunidades(id) on delete cascade,
  voluntario_id uuid not null references perfis_voluntarios(id) on delete cascade,
  mensagem text,
  status status_inscricao not null default 'pendente',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint inscricao_unica_por_oportunidade unique (oportunidade_id, voluntario_id)
);

-- Eventos vinculados a oportunidade
create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  oportunidade_id uuid not null references oportunidades(id) on delete cascade,
  titulo text not null,
  descricao text,
  inicio_em timestamptz not null,
  fim_em timestamptz,
  localizacao text,
  status status_evento not null default 'agendado',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint evento_intervalo_valido check (fim_em is null or fim_em >= inicio_em)
);

-- Historico de participacao do voluntario
create table if not exists participacoes (
  id uuid primary key default gen_random_uuid(),
  oportunidade_id uuid not null references oportunidades(id) on delete cascade,
  voluntario_id uuid not null references perfis_voluntarios(id) on delete cascade,
  evento_id uuid references eventos(id) on delete set null,
  status status_participacao not null default 'confirmada',
  horas_voluntariadas numeric(6,2) not null default 0 check (horas_voluntariadas >= 0),
  observacoes text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_usuarios_papel on usuarios (papel);
create index if not exists idx_oportunidades_ong_id on oportunidades (ong_id);
create index if not exists idx_oportunidades_status on oportunidades (status);
create index if not exists idx_inscricoes_oportunidade_id on inscricoes (oportunidade_id);
create index if not exists idx_inscricoes_voluntario_id on inscricoes (voluntario_id);
create index if not exists idx_eventos_oportunidade_id on eventos (oportunidade_id);
create index if not exists idx_participacoes_oportunidade_id on participacoes (oportunidade_id);
create index if not exists idx_participacoes_voluntario_id on participacoes (voluntario_id);
