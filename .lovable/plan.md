## Mudanças

1. **Reordenar a Home** — mover `InsightsSection` para depois de `ClientesSection` (que é o carrossel de logos):
   ```
   Hero → Tese → Sinais → Resultados → Clientes (logos) → Insights → CTA
   ```

2. **Adicionar flag `featured` no frontmatter dos MDs de insights**
   - Novo campo opcional: `featured: true` (ausente ou `false` = não aparece na home)
   - Atualizar o tipo `InsightFrontmatter` em `src/hooks/useInsights.ts`
   - Criar nova função `useFeaturedInsights(limit)` que filtra por `featured === true` + idioma
   - `InsightsSection` (home) passa a usar `useFeaturedInsights(3)`
   - Página `/insights` continua mostrando todos via `useInsights()`

3. **Marcar os MDs atuais**
   - Adicionar `featured: true` em `previsao-demanda-ia-pt.md`, `previsao-demanda-ia-en.md` e `exemplo-linkedin-pt.md` para que continuem visíveis na home enquanto você cria os próximos drafts.

## Comportamento

- Para destacar um post na home: adicionar `featured: true` no frontmatter.
- Para tirar da home (mantendo na listagem `/insights`): remover a flag ou usar `featured: false`.
- Home mostra no máximo 3 destacados, ordenados por data desc.

## Arquivos tocados

- `src/pages/HomeTeste.tsx` (reordenar)
- `src/hooks/useInsights.ts` (campo + hook novo)
- `src/components/hometeste/InsightsSection.tsx` (trocar hook)
- 3 arquivos `.md` em `src/content/insights/` (adicionar `featured: true`)