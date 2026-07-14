## Reduzir altura do bloco hero + recentes no /i6-blog

Objetivo: deixar filtros e primeiros temas "espiando" na fold para incentivar scroll.

### Alvos e mudanças

1. **`src/pages/Blog.tsx`**
   - Reduzir top-padding do section de `pt-32` para `pt-24` e o gap do header (`mb-10` → `mb-6`) para trazer o hero mais alto.
   - Aplicar `lg:max-h-[62vh]` no grid `hero + recentes` para limitar a altura vertical do bloco em telas grandes.

2. **`src/components/blog/BlogHero.tsx`**
   - Reduzir tamanho de fonte do título: `text-3xl md:text-4xl lg:text-4xl xl:text-5xl` → `text-2xl md:text-3xl lg:text-3xl xl:text-4xl`.
   - Reduzir padding interno: `p-6 md:p-10 lg:p-14` → `p-6 md:p-8 lg:p-10`.
   - Manter proporção `aspect-[21/9]` em mobile e `h-full` no lg, mas com a nova max-height do grid, o card fica mais baixo.
   - Reduzir `mb-6` do link "Ler artigo" para `mb-2` e `mb-3 md:mb-4` do título para `mb-2 md:mb-3`.

3. **`src/components/blog/RecentStrip.tsx`** (layout side)
   - Reduzir altura dos cards horizontais de `h-[110px] md:h-[120px]` para `h-[92px] md:h-[100px]`.
   - Reduzir gap entre cards de `gap-3` para `gap-2.5`.
   - Reduzir `mb-3` do título "Insights recentes" para `mb-2`.

### Fora de escopo
- Nada em mobile/tablet layout row.
- Sem mudanças em ThemeRail, filtros ou conteúdo.
