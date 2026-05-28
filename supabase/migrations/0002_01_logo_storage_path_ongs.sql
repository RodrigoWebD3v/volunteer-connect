-- Volunteer Connect - adiciona referencia do logo da ONG no Storage.

alter table if exists public.perfis_ongs
  add column if not exists logo_storage_path text;
