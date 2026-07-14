## Objetivo
Nas seções por tema em `/i6-blog`, exibir o **nome legível** do tema (`theme_label` vindo do i6Hub) em vez do slug (`theme`).

## Mudanças

### 1. `scripts/sync-content-from-i6hub.mjs` (`fmInsights`)
Adicionar `theme_label` no frontmatter, logo após `theme`:

```js
it.theme ? `theme: ${yaml(it.theme)}` : null,
it.theme_label ? `theme_label: ${yaml(it.theme_label)}` : null,
```

### 2. `src/hooks/useInsights.ts`
- Adicionar `theme_label?: string` em `InsightFrontmatter`.
- Ler `fm.theme_label` no mapeamento do `ALL` e propagar para o objeto `Insight`.

### 3. `src/pages/Blog.tsx`
No agrupamento `byTheme`, usar `theme_label` como rótulo, mantendo `theme` (slug) como chave estável:

```ts
const map = new Map<string, { label: string; items: Insight[] }>();
filtered.forEach((a) => {
  const key = a.theme || '__none__';
  const label = a.theme_label || a.theme || t('blog.themeFallback');
  if (!map.has(key)) map.set(key, { label, items: [] });
  map.get(key)!.items.push(a);
});
```

E passar `label` ao `ThemeRail` como `title`.

### O que NÃO muda
- Filtros por tema continuam usando o slug (`theme`) para casar valores — apenas o **rótulo visível** muda.
- Estrutura visual dos rails, hero, recentes e filtros permanece igual.
- Nenhuma alteração no i6Hub; o site apenas passa a consumir um campo já enviado.

## Follow-up
Após o próximo sync do i6Hub, os `.md` em `src/content/insights/` passam a conter `theme_label`, e os títulos dos rails deixam de mostrar o slug.
