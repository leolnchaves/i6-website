## Objetivo
No `/i6-blog`, os chips de filtro **TEMA** devem exibir o `theme_label` (nome legível) em vez do slug. O clique continua filtrando pelo slug internamente.

## Mudanças

### 1. `src/pages/Blog.tsx`
Trocar `themes: string[]` por uma lista de opções `{ value: slug, label: theme_label }`. Construir a partir dos artigos, preferindo qualquer `theme_label` preenchido para cada slug:

```ts
const themeOptions = useMemo(() => {
  const map = new Map<string, string>(); // slug -> label
  articles.forEach((a) => {
    if (!a.theme) return;
    const current = map.get(a.theme);
    if (!current && a.theme_label) map.set(a.theme, a.theme_label);
    else if (!map.has(a.theme)) map.set(a.theme, a.theme);
  });
  return Array.from(map, ([value, label]) => ({ value, label }));
}, [articles]);
```

Passar `themes={themeOptions}` para `BlogFilters`.

### 2. `src/components/blog/BlogFilters.tsx`
Alterar a prop:
```ts
themes: { value: string; label: string }[];
```
Renderizar `label` no botão e usar `value` no `onThemeChange`. Filtro por tag permanece como está.

## O que NÃO muda
- Lógica de filtragem em `filtered` continua comparando `a.theme === activeTheme` (slug).
- Rails, hero, recentes, tags: sem mudanças.