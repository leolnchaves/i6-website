## Objetivo
Conectar visualmente o card do produto selecionado ao painel "POR QUE ESTE PREÇO" e tornar o insight mais objetivo.

## Mudanças

### 1. Linha conectora (produto → insight)
Em `src/components/kiosk/demos/PriceToMarginDemo.tsx`:
- Adicionar um SVG overlay absoluto que desenha uma linha coral (`hsl(var(--brand-coral))`) partindo da borda direita do card do produto selecionado até a borda esquerda do painel "POR QUE ESTE PREÇO".
- Usar `refs` no card selecionado e no painel de insight + um `ResizeObserver` para recomputar coordenadas quando o produto muda ou o layout redimensiona.
- Estilo: linha 1.5px, com leve glow (`filter: drop-shadow`) e um pequeno ponto pulsante em cada extremidade, condizente com o restante do design.
- Só aparece quando há produto selecionado e o painel de insight está no modo "por que este preço".

### 2. Insight mais curto e objetivo
Em `src/data/kiosk/demos/priceToMargin.ts`:
- Reescrever os textos `whyThisPrice` (PT/EN) de cada produto para no máximo 2 frases curtas, mantendo apenas: sinal comportamental principal + ação prescrita.
- Exemplo (Protetor Solar FPS 60): "Buscas +38% e 3,2 abas por sessão indicam comprador indeciso. Reduzir ticket agora captura conversão antes da concorrência reagir."

## Fora de escopo
- Sem alteração no layout de dois quadros lado a lado nem nas métricas.
- Sem mudanças em outras demos.