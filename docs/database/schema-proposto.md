# Schema proposto

Este documento registra a estrutura inicial proposta para o banco do Volunteer Connect.

Nada descrito aqui foi aplicado automaticamente no Supabase remoto. O conteudo deve ser revisado antes de qualquer execucao em banco de desenvolvimento.

## Objetivo

Criar um modelo relacional coerente para o fluxo principal do MVP:

1. Usuario cria uma conta com papel definido.
2. Voluntario complementa seu perfil.
3. ONG registra seu perfil institucional.
4. ONG publica oportunidades.
5. Voluntario se inscreve em oportunidades.
6. Eventos e participacoes registram a presenca e o historico.

## Entidades previstas

- `usuarios`: identidade da conta, credenciais, papel e timestamps.
- `perfis_voluntarios`: dados complementares do voluntario ligados a `usuarios`.
- `perfis_ongs`: dados institucionais da ONG ligados ao usuario gestor.
- `oportunidades`: oportunidades de voluntariado vinculadas a ONGs.
- `inscricoes`: candidaturas de voluntarios para oportunidades.
- `eventos`: agendas ou atividades vinculadas a oportunidades.
- `participacoes`: registros de presenca e historico de participacao.

## Regras iniciais

- Um usuario deve ter exatamente um papel principal: voluntario, ONG ou admin.
- Perfis de voluntario e ONG devem apontar para um usuario existente.
- Oportunidades devem pertencer a uma ONG existente.
- Inscricoes devem ligar um voluntario a uma oportunidade.
- Eventos devem pertencer a uma oportunidade.
- Participacoes devem ligar voluntario, oportunidade e, quando aplicavel, evento.
- CPFs, CNPJs e emails usados em exemplos devem ser ficticios.

## Fora desta tarefa

- Aplicar migration no Supabase remoto.
- Implementar autenticacao, JWT ou guards.
- Implementar APIs NestJS.
- Implementar telas SvelteKit.
- Definir reputacao detalhada ou recomendacoes automaticas.
