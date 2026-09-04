## Detalhe técnico

Em `src/components/i6-builders/BuilderModels.tsx`:

- `measure()`: `y2` passa a ser igual a `y1` (centro vertical do item ativo), em vez de mirar o topo do painel. `x1` = borda direita do item, `x2` = borda esquerda do painel.
- O `<path>` com curva Bézier vira `<line>` (ou path `M x1 y1 L x2 y1`), mantendo `stroke="hsl(var(--primary))"` e a mesma espessura.
- `length` passa a ser `x2 - x1` (com a folga atual) para o traço animado `i6-draw` continuar correto.
- `<circle cx={line.x2} cy={line.y1} r="3" />` mantido na ponta.

Sem alteração em `content.ts`, rota, SEO, formulário ou envio de leads.
