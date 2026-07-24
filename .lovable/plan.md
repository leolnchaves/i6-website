# Fundir vídeo com o fundo (EN)

O halo visível é o fundo escuro do vídeo (quase preto) sobre o `#0B1224` do site — tons próximos, mas não idênticos, criando um retângulo perceptível.

## Solução

Aplicar **`mix-blend-mode: screen`** no `<video>` em `src/components/hometeste/HeroDecisaoV4.tsx`.

Como o vídeo tem fundo escuro com traços claros (laranja, azul, branco), o modo *screen* faz os pixels escuros "desaparecerem" (preto → transparente) enquanto preserva integralmente os traços claros — resultado equivalente a um chroma-key de preto, sem reprocessar o arquivo.

## Ajustes complementares

- Manter a máscara radial atual como fallback suave nas bordas.
- Definir `bg-transparent` explicitamente no container do vídeo (herda `#0B1224`).
- Não mexer no PT nem no restante da hero.

## Se `screen` clarear demais os traços

Alternativa: trocar por `mix-blend-mode: lighten` (mais conservador — só substitui pixels mais escuros que o fundo, preservando cor dos traços). Se você notar shift de cor após aplicar screen, ajusto para lighten no follow-up.