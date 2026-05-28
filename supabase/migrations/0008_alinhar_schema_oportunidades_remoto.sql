-- Volunteer Connect - alinha tabelas de oportunidades/inscricoes/presencas ao backend atual.
-- Esta correcao remove estruturas legadas apenas quando estao vazias.

do $$
declare
  tabela text;
  total bigint;
begin
  foreach tabela in array array[
    'participacoes',
    'eventos',
    'presencas',
    'inscricoes',
    'oportunidades'
  ]
  loop
    if to_regclass(format('public.%I', tabela)) is not null then
      execute format('select count(*) from public.%I', tabela) into total;

      if total > 0 then
        raise exception
          'Tabela public.% possui % registros. Migre os dados antes de recriar o schema.',
          tabela,
          total;
      end if;
    end if;
  end loop;
end $$;

drop table if exists public.participacoes cascade;
drop table if exists public.eventos cascade;
drop table if exists public.presencas cascade;
drop table if exists public.inscricoes cascade;
drop table if exists public.oportunidades cascade;

create table public.oportunidades (
  id uuid primary key default gen_random_uuid(),
  perfil_ong_id uuid not null references public.perfis_ongs(id) on delete cascade,
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

create table public.inscricoes (
  id uuid primary key default gen_random_uuid(),
  oportunidade_id uuid not null references public.oportunidades(id) on delete cascade,
  voluntario_usuario_id uuid not null references public.usuarios(id) on delete cascade,
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

create table public.presencas (
  id uuid primary key default gen_random_uuid(),
  inscricao_id uuid not null references public.inscricoes(id) on delete cascade,
  oportunidade_id uuid not null references public.oportunidades(id) on delete cascade,
  voluntario_usuario_id uuid not null references public.usuarios(id) on delete restrict,
  status text not null,
  observacao text,
  registrado_por_usuario_id uuid not null references public.usuarios(id) on delete restrict,
  registrado_em timestamptz not null default now(),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint presencas_status_check
    check (status in ('presente', 'ausente', 'cancelada')),
  constraint presencas_inscricao_unica unique (inscricao_id)
);

create index idx_oportunidades_perfil_ong_id
  on public.oportunidades (perfil_ong_id);
create index idx_oportunidades_status
  on public.oportunidades (status);
create index idx_oportunidades_cidade_estado
  on public.oportunidades (cidade, estado);
create index idx_oportunidades_tipo_atividade
  on public.oportunidades (tipo_atividade);
create index idx_oportunidades_periodo
  on public.oportunidades (data_inicio, data_fim);
create index idx_oportunidades_busca_texto
  on public.oportunidades using gin (
    to_tsvector('portuguese', titulo || ' ' || descricao)
  );

create index idx_inscricoes_oportunidade_id
  on public.inscricoes (oportunidade_id);
create index idx_inscricoes_voluntario_usuario_id
  on public.inscricoes (voluntario_usuario_id);
create index idx_inscricoes_status
  on public.inscricoes (status);
create index idx_inscricoes_oportunidade_status
  on public.inscricoes (oportunidade_id, status);

create index idx_presencas_oportunidade_id
  on public.presencas (oportunidade_id);
create index idx_presencas_voluntario_usuario_id
  on public.presencas (voluntario_usuario_id);
create index idx_presencas_status
  on public.presencas (status);
create index idx_presencas_registrado_por_usuario_id
  on public.presencas (registrado_por_usuario_id);
create index idx_presencas_registrado_em
  on public.presencas (registrado_em);

alter table public.perfis_voluntarios enable row level security;
alter table public.perfis_ongs enable row level security;
alter table public.oportunidades enable row level security;
alter table public.inscricoes enable row level security;
alter table public.presencas enable row level security;
