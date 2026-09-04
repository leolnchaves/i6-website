# Implementação

1. Em `BuilderModels.tsx`, adicionar uma faixa vertical absoluta na borda **direita** da coluna da lista (mesma largura, cor e raio da faixa do item ativo: 2px, `hsl(var(--primary))`).
   - Altura acompanhando a lista (medida pelo `ResizeObserver` já existente ou por `inset-y` com pequeno recuo, como na faixa do item).
   - Visível apenas de `md` para cima, junto com a linha de conexão.

2. Ajustar o cálculo da linha SVG para que `x1` passe a ser a posição dessa faixa (borda direita da lista) em vez da borda do botão, mantendo `x2` no quadro e o círculo somente na ponta direita.

3. Manter animação de traço da linha e fade do quadro, ambas suprimidas com `prefers-reduced-motion`.

4. Nenhuma alteração em `content.ts`, `placeholders.ts`, rota, SEO ou formulário.

## Validação
- Build e typecheck OK.
- Screenshots em PT, EN e ES; conferir alinhamento da faixa com a altura da lista.
- Conferir mobile: faixa nova e linha ocultas abaixo de `md`.
