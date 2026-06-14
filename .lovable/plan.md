## Objetivo

Trocar a animação de fundo lateral pesada (`VerticalWaves`, pontiaguda) pela estética suave do `WaveBackground` em modo global, ocupando toda a altura de qualquer página, mas com **menos linhas** e dissolvendo suavemente na borda esquerda.

## Mudanças

### 1. Reescrever `src/components/hometeste/WaveBackground.tsx`

- Container passa a ser `fixed left-0 top-0 h-full w-[260px] pointer-events-none z-[15]` (mesma faixa visual que o `VerticalWaves` ocupava hoje), `overflow-hidden`, `aria-hidden`.
- SVG com `viewBox="0 0 260 1200"` e `preserveAspectRatio="none"` para esticar verticalmente em qualquer altura de página.
- Reduzir de 10 para **4 curvas** suaves (uma principal mais visível + 3 acompanhamento), todas com `stroke` em tons da paleta coral (`#F4845F`) e opacidades baixas (0.20–0.45), `stroke-width` entre 0.8 e 1.8.
- Curvas com pontos de controle de Bézier largos, sempre côncavas, ancoradas próximas a `x ≈ 60–180` para parecerem "encostadas" na borda esquerda.
- Aplicar `style={{ maskImage: 'linear-gradient(to right, black 30%, transparent 100%)', WebkitMaskImage: '...' }}` no `<svg>` para o desenho desaparecer suavemente em direção ao conteúdo principal.
- Manter os mesmos keyframes `curve-flow-1/2/3` já definidos em `index.css` (uma animação por curva, com durações diferentes), `motion-safe:` para respeitar `prefers-reduced-motion`.

### 2. `src/components/DarkLayout.tsx`

- Substituir o import e o uso de `VerticalWaves` por `WaveBackground` (`import WaveBackground from '@/components/hometeste/WaveBackground'`).
- Manter a regra `hideWaves` apenas para `/privacy-policy` e `/ethics-policy` (legibilidade). **Remover `/` da lista**, para que o novo fundo também apareça na Home — atendendo o pedido de "ocupando toda a página".

### 3. `src/components/hometeste/HeroMovimento.tsx`

- Remover `<WaveBackground />` daqui (e o import). Como o componente agora vive globalmente em `DarkLayout`, mantê-lo no hero geraria duplicação visual sobre a borda esquerda.

### 4. Cleanup

- Deletar `src/components/solutions/VerticalWaves.tsx` (sem mais referências).
- Atualizar a memória `mem://style/global/vertical-waves` para refletir o novo comportamento: "fundo global suave (WaveBackground) em todas as páginas, exceto `/privacy-policy` e `/ethics-policy`".

## Verificação

1. Home, Solutions, Insights, Success Stories, About: nova animação suave acompanha o scroll na borda esquerda em toda a página.
2. `/privacy-policy` e `/ethics-policy`: sem ondas.
3. Hero da Home: sem duplicação de curvas (apenas o fundo global).
4. `prefers-reduced-motion`: curvas permanecem estáticas (sem animação).

## Arquivos afetados

- Editado: `src/components/hometeste/WaveBackground.tsx`
- Editado: `src/components/DarkLayout.tsx`
- Editado: `src/components/hometeste/HeroMovimento.tsx`
- Removido: `src/components/solutions/VerticalWaves.tsx`
- Atualizada: memória `mem://style/global/vertical-waves`