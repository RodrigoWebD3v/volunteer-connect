-- Seed ficticio para validar relacionamentos do modelo inicial.
-- Nao usar dados reais de pessoas, ONGs ou credenciais.

truncate table participacoes, eventos, inscricoes, oportunidades, perfis_ongs, perfis_voluntarios, usuarios restart identity cascade;

insert into usuarios (id, nome_completo, email, papel) values
  ('11111111-1111-1111-1111-111111111111', 'Ana Souza', 'ana.voluntaria@example.org', 'voluntario'),
  ('22222222-2222-2222-2222-222222222222', 'Carlos Lima', 'carlos.ong@example.org', 'ong'),
  ('33333333-3333-3333-3333-333333333333', 'Patricia Admin', 'patricia.admin@example.org', 'admin');

insert into perfis_voluntarios (id, usuario_id, telefone, cidade, estado, biografia) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', '+55 11 99999-1111', 'São Paulo', 'SP', 'Voluntária focada em educação comunitária.');

insert into perfis_ongs (id, usuario_gestor_id, nome_fantasia, cnpj, descricao, cidade, estado, verificada) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'ONG Mãos Unidas', '12.345.678/0001-90', 'ONG fictícia para ações locais de impacto social.', 'São Paulo', 'SP', true);

insert into oportunidades (id, ong_id, titulo, descricao, localizacao, data_inicio, data_fim, vagas, status) values
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Apoio escolar de fim de semana', 'Suporte em reforço de leitura e matemática para crianças.', 'Centro Comunitário Vila Esperança', '2026-06-01', '2026-08-30', 20, 'publicada');

insert into inscricoes (id, oportunidade_id, voluntario_id, mensagem, status) values
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Tenho disponibilidade aos sábados pela manhã.', 'aprovada');

insert into eventos (id, oportunidade_id, titulo, descricao, inicio_em, fim_em, localizacao, status) values
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Treinamento inicial de voluntários', 'Encontro de alinhamento com equipe pedagógica.', '2026-05-30 09:00:00+00', '2026-05-30 11:00:00+00', 'Sala 2 - Centro Comunitário', 'agendado');

insert into participacoes (id, oportunidade_id, voluntario_id, evento_id, status, horas_voluntariadas, observacoes) values
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'confirmada', 0, 'Presença confirmada para o treinamento inicial.');
