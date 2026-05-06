---
name: "volunteer-connect-design"
description: "Use sempre que criar ou alterar UI, layout, componente visual, fluxo frontend, tela publica, dashboard, area logada, design spec ou issue de UX do Volunteer Connect. Define a direcao visual principal: base Airbnb para descoberta publica de oportunidades com fotos reais, cards claros, tom quente e humano, navegacao simples para descobrir/aplicar/gerenciar; e influencia Notion/Cal.com para dashboards e areas logadas limpas, organizadas e operacionais."
metadata:
  short-description: "Design principal do Volunteer Connect"
---

# Volunteer Connect Design

Esta e a skill principal de design do Volunteer Connect. Use-a em toda decisao de UI.

## Fontes de referencia

- `DESIGN_AIRBNB.md`: fonte detalhada para tokens, cards, busca, navegacao, fotografia, arredondamentos e tom visual publico.
- `DESIGN_NOTION.md`: fonte complementar para dashboards, area logada, gestao de ONG e clareza operacional.

Leia apenas os trechos necessarios desses arquivos quando precisar de tokens ou padroes especificos.

## Direcao central

Volunteer Connect deve parecer uma plataforma humana, confiavel e acolhedora para conectar voluntarios e ONGs.

Use:

- **Airbnb como base visual publica**: descoberta, oportunidades, detalhe de oportunidade, primeira experiencia e paginas orientadas a exploracao.
- **Notion / Cal.com como complemento operacional**: dashboards de ONG, area logada, gestao de candidaturas, eventos, participacao e configuracoes.

## Base visual: Airbnb

Para telas publicas e fluxos de descoberta:

- use fotos reais de voluntariado, ONGs, eventos e impacto social;
- use cards claros para oportunidades, com imagem, titulo, local, data/status e CTA objetivo;
- mantenha tom quente, humano e confiavel;
- use navegacao simples para `descobrir`, `aplicar` e `gerenciar`;
- prefira canvas claro, espacamento generoso e cantos suaves;
- use coral quente como acento principal, inspirado em `#ff385c`, sem dominar toda a interface;
- use imagem real como sinal de contexto, nao decoracao generica.

## Complemento: Notion / Cal.com

Para dashboards e areas logadas:

- priorize telas limpas, organizadas e faceis de entender;
- reduza marketing visual e aumente clareza operacional;
- use listas, tabelas simples, filtros, abas e paineis de detalhe quando o usuario precisa gerenciar dados;
- mantenha acoes recorrentes sempre previsiveis;
- use estados vazios claros, com proxima acao;
- evite hero grande, gradiente decorativo e composicao editorial dentro de dashboards.

## Aplicacao por area

### Home e descoberta de oportunidades

- Deve abrir diretamente na experiencia util, com busca/filtros e oportunidades visiveis.
- Pode usar uma area inicial calorosa, mas sem virar landing page vazia.
- Oportunidades devem ser photo-first quando houver imagem real.
- Cards devem permitir escaneamento rapido: causa, local, data, disponibilidade e CTA.

### Detalhe de oportunidade

- Use fotografia real ou galeria curta quando disponivel.
- Mostre informacoes praticas antes de textos longos: local, data, requisitos, vagas, ONG responsavel.
- CTA principal deve ser claro: `Aplicar`, `Salvar` ou `Entrar em contato`, conforme a fase.
- Reforce confianca com dados da ONG, impacto e historico quando existirem.

### Dashboard de ONG

- Use padrao Notion/Cal.com: organizado, operacional, sem hero.
- Priorize acoes: criar oportunidade, revisar candidaturas, registrar participacao, gerenciar eventos.
- Use tabelas/listas com status claros.
- Cards de metrica devem ser discretos e funcionais.

### Area do voluntario

- Mostre proximas atividades, candidaturas e historico de participacao.
- Mantenha o caminho para descobrir novas oportunidades sempre acessivel.
- Evite excesso administrativo.

## Regras visuais obrigatorias

- Nao use tema dark como identidade principal.
- Nao use visual tecnico/dev como Supabase, Vercel, Linear ou Cursor para a marca principal.
- Nao use gradientes decorativos como base do layout.
- Nao crie cards dentro de cards.
- Nao use hero gigante em telas operacionais.
- Nao use imagens stock abstratas quando o usuario precisa entender uma oportunidade real.
- Nao dependa apenas de cor para status; use texto e icone/label.
- Nao esconda acoes principais em menus quando houver espaco para mostra-las.
- Preserve acessibilidade: contraste, foco visivel, labels, teclado e responsividade.

## Tokens iniciais recomendados

Use `DESIGN_AIRBNB.md` como fonte detalhada. Quando precisar decidir rapidamente:

- Primary: `#ff385c`
- Primary active: `#e00b41`
- Ink: `#222222`
- Body: `#3f3f3f`
- Muted: `#6a6a6a`
- Hairline: `#dddddd`
- Canvas: `#ffffff`
- Surface soft: `#f7f7f7`
- Card surface: `#ffffff`
- Radius card: `14px`
- Radius pill: `9999px`
- Section spacing: `64px`

## Resultado esperado

Ao implementar UI, entregue:

- componentes alinhados com esta direcao;
- estados de loading, vazio, erro e sucesso quando aplicavel;
- responsividade mobile/desktop;
- texto em portugues;
- verificacao visual quando houver mudanca significativa de frontend.

Ao criar issue de UI/UX, descreva:

- objetivo de negocio da tela;
- experiencia esperada do usuario;
- referencia visual: Airbnb publico ou Notion/Cal.com operacional;
- componentes esperados;
- criterios de aceite visuais e funcionais.
