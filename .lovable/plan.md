Em `src/components/kiosk/demos/PriceToMarginDemo.tsx`:

- Trocar o path Bézier (curva) por uma linha reta: `M x1 y1 L x2 y2`.
- Isso já resolve o "ponto fora da linha" — na curva, a linha chega ao endpoint em outro ângulo, dando a impressão de desalinhamento. Com linha reta o círculo fica centrado exatamente sobre o traço.
- Manter cor coral, dash animado e glow.