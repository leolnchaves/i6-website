# Implementação

1. Em `BuilderModels.tsx`, renderizar a faixa nova **dentro do próprio botão do item ativo**, na borda direita da coluna da lista, usando exatamente as mesmas medidas da faixa esquerda: `w-[2px]`, `h-[calc(100%-2rem)]`, `top-1/2 -translate-y-1/2`, `rounded-full`, `bg-primary`.
   - Assim topo, base e altura ficam idênticos e sempre alinhados à faixa esquerda, em qualquer idioma.
   - Visível apenas de `md` para cima (a linha de conexão também é desktop-only).
   - Aparece somente no item ativo, como a faixa esquerda.

2. Ajustar `x1` da linha SVG para a posição da faixa nova (borda direita da coluna da lista), mantendo `x2` no quadro e o círculo somente na ponta direita.

3. Manter animação de traço da linha e fade do quadro, ambas suprimidas com `prefers-reduced-motion`.

4. Nenhuma alteração em `content.ts`, `placeholders.ts`, rota, SEO ou formulário.

## Validação
- Build e typecheck OK.
- Screenshots em PT, EN e ES conferindo que as duas faixas têm topo, base e altura iguais.
- Conferir mobile: faixa nova e linha ocultas abaixo de `md`.
