# Design

## Visual Theme

Volunteer Connect usa uma interface clara, quente e humana. A experiencia publica segue uma base Airbnb: fotos reais de voluntariado, ONGs, eventos e impacto social; cards claros; acento coral; navegacao simples. Areas logadas e operacionais recebem influencia Notion/Cal.com: organizacao limpa, textos objetivos, formularios previsiveis e pouca decoracao.

## Color Palette

- Canvas: `oklch(99% 0.006 25)`
- Surface: `oklch(100% 0.004 25)`
- Surface soft: `oklch(97.5% 0.01 35)`
- Ink: `oklch(24% 0.012 35)`
- Body: `oklch(36% 0.012 35)`
- Muted: `oklch(52% 0.012 35)`
- Hairline: `oklch(88% 0.012 35)`
- Primary: `oklch(62% 0.23 15)`
- Primary strong: `oklch(54% 0.24 15)`
- Error surface: `oklch(96% 0.035 18)`
- Error text: `oklch(38% 0.16 18)`
- Success surface: `oklch(96% 0.045 145)`
- Success text: `oklch(35% 0.12 145)`

## Typography

Use system UI fonts for a native, readable product feel: `Inter`, `ui-sans-serif`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`. Headings may be confident, but product labels and form controls stay simple and predictable.

## Components

- Header claro com marca, navegacao curta e CTA principal.
- Formularios com labels sempre visiveis, foco evidente e mensagens de erro/sucesso proximas da acao.
- Botoes primarios em coral, com hover e focus consistentes.
- Cards apenas quando o conteudo precisa de limite claro. Nao usar cards dentro de cards.
- Paineis visuais podem usar imagem real de voluntariado quando ajudam a contextualizar a acao.

## Layout

Fluxos publicos usam espacamento generoso, grid responsivo e foco imediato na acao principal. Em mobile, formulario vem antes de conteudo secundario quando a tarefa e entrar ou criar conta. Em desktop, texto de contexto e formulario podem dividir a tela com uma imagem humana.

## Motion

Usar transicoes curtas de 150ms a 220ms para hover, foco e feedback. Evitar animacoes decorativas ou sequencias de entrada.
