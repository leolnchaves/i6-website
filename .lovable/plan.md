## Objetivo

Reharmonizar a tela inicial do `/kiosk` (AttractScreen) trazendo mais respiro vertical e uma nova hierarquia visual:

- **Topo**: bloco de posicionamento "The Platform for **Decision Advantage**" (branco + coral), grande e centralizado.
- **Meio-baixo**: headline atual ("Decida antes do mercado.") + botão "Toque para começar" descidos, mais próximos do centro-inferior da tela.
- **Base**: apenas o **símbolo** da infinity6 (não o wordmark) como assinatura discreta.

## Mudanças

### 1. `src/components/kiosk/AttractScreen.tsx`
Reorganizar o layout em três faixas verticais usando `justify-between` em vez do `pt-[12vmin]` atual:

```
┌─────────────────────────────┐
│  TOP  → "The Platform for   │
│         Decision Advantage" │
│                             │
│  MID  → Headline + botão    │
│         (anéis pulsantes    │
│          atrás do botão)    │
│                             │
│  BOT  → símbolo infinity6   │
└─────────────────────────────┘
```

- Trocar o container raiz para `flex flex-col justify-between min-h-screen py-[8vmin]`.
- **Topo**: título de posicionamento renderizado em texto (não imagem) para nitidez em qualquer resolução do totem:
  - `The Platform for` em branco, seguido de quebra e `Decision Advantage` em `#F4845F`.
  - Fonte bold, ~`text-[6vmin]`, `leading-[1.05]`, `tracking-tight`.
- **Meio**: manter os anéis pulsantes centrados atrás do bloco headline + botão. Remover o `mt-[14vmin]` fixo e deixar o flex layout cuidar do espaçamento.
- **Base**: novo asset com o **símbolo** infinity6 (usar `user-uploads://infinity6_CMYK_white_symbol_300dpi-3.png`) publicado via `lovable-assets` como `src/assets/infinity6-symbol-white.png.asset.json`. Renderizado em ~`h-[8vmin]`, opacidade ~0.85.
- Remover o wordmark atual (`logoWhite`) e o pequeno subtítulo `The Platform for Decision Advantage` que hoje ficam junto do logo no topo — eles são substituídos pelo bloco de topo.

### 2. Assets
- Publicar o símbolo `infinity6_CMYK_white_symbol_300dpi-3.png` via `lovable-assets create` gerando `src/assets/infinity6-symbol-white.png.asset.json`.

## Fora de escopo
- Nenhuma mudança em quiz, resultados, demo, ebook CTA, footer ou traduções.
- Sem mexer em `config.ts` (`attract.brand`, `attract.headline`, `attract.tapHint` continuam iguais).
