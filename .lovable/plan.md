O i6Hub está enviando `theme`, `is_default` e `tags`, mas o script de sincronização (`scripts/sync-content-from-i6hub.mjs` → função `fmInsights`) **não grava nenhum dos três** no frontmatter do MD. Só `fmResearch` grava `theme`. Por isso:
- `theme: "Inventory"` some no sync → artigo cai no fallback "Outros"
- `is_default` some → hero é escolhido só por data
- `tags` some → filtro de tags fica vazio

**Ajustes**

1. **`scripts/sync-content-from-i6hub.mjs` → `fmInsights`**
   Acrescentar antes do `---` de fechamento:
   ```
   it.theme       ? `theme: ${yaml(it.theme)}`       : null,
   it.is_default  ? `is_default: true`               : null,
   Array.isArray(it.tags) && it.tags.length
     ? `tags: [${it.tags.map(yaml).join(', ')}]`
     : null,
   ```

2. **`src/pages/Blog.tsx`** — excluir o `heroArticle.slug` também da lista `filtered` que alimenta `byTheme`, para o artigo em destaque não reaparecer nas rails de tema.

3. **Fallback do rótulo de tema ausente** — trocar `'Outros'`/`'Other'` por chave de tradução `blog.themeFallback` (PT **"Sem tema"**, EN **"Uncategorized"**) em `Blog.tsx` + `pt.ts`/`en.ts`.

Nada muda em `RecentStrip`, `ThemeRail`, `BlogHero`, `BlogFilters` ou no parser de frontmatter (já suportava os três campos).

Depois do próximo sync do i6Hub: `theme: Inventory` agrupa a rail, `is_default: true` fixa o hero e `tags` habilitam os chips de filtro.