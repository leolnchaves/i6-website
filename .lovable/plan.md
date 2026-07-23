## Objetivo
Nos cards de alavancas da Home (`SinaisSection.tsx`), torná-los puramente institucionais: remover o CTA "Ver as soluções desta alavanca ↓" e remover o clique (link) do card. O comportamento clicável continua existindo apenas em `/solutions`.

## Mudança
**Arquivo:** `src/components/hometeste/SinaisSection.tsx`

- Trocar o wrapper `<Link to={...}>` de cada card por um `<div>` com as mesmas classes visuais (manter hover coral, faixa superior, escala, borda).
- Remover o bloco final do card:
  ```tsx
  <div className="mt-auto flex items-center gap-1.5 text-xs font-medium text-[#F4845F]">
    {territoriesBlock.ctaLabel}
    <ArrowDown className="w-3.5 h-3.5" />
  </div>
  ```
- Limpar imports que ficarem sem uso: `Link` do `react-router-dom` e `ArrowDown` do `lucide-react`.
- Remover `territoriesBlock` da desestruturação se não for mais usado (fica só `territories`).

## Fora de escopo
- `/solutions` e `TerritoriesBlock.tsx` permanecem intactos (lá o card continua clicável).
- Nenhuma alteração nos dados/conteúdo (`solutionsV2/content.ts`).
