-- Volunteer Connect - contrato local para oportunidades.
-- Proposta versionada: nao executar remotamente sem revisao e autorizacao explicita.

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
  constraint oportunidades_status_check check (
    status in ('rascunho', 'publicada', 'encerrada', 'cancelada')
  ),
  constraint oportunidades_datas_check check (data_fim >= data_inicio),
  constraint oportunidades_prazo_check check (prazo_inscricao <= data_inicio)
);

create index if not exists idx_oportunidades_perfil_ong_id
  on oportunidades (perfil_ong_id);

create index if not exists idx_oportunidades_status
  on oportunidades (status);

create index if not exists idx_oportunidades_cidade_estado
  on oportunidades (cidade, estado);

create index if not exists idx_oportunidades_tipo_atividade
  on oportunidades (tipo_atividade);

create index if not exists idx_oportunidades_periodo
  on oportunidades (data_inicio, data_fim);

create index if not exists idx_oportunidades_busca_texto
  on oportunidades using gin (to_tsvector('portuguese', titulo || ' ' || descricao));
