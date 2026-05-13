## Objetivo

Substituir o modal por sub-páginas dedicadas para cada Success Story, ganhando URLs indexáveis, SEO específico e melhor engajamento.

## Estrutura final

```
/pt/success-stories            → listagem (página atual, com cards)
/pt/success-stories/:slug      → página dedicada de cada case
/en/success-stories
/en/success-stories/:slug
```

Card vira `<Link>` para a sub-página. Modal é removido.

## Etapas

1. **Adicionar `Slug` no MD agregado** (`public/content/page-success-stories-pt.md` e `-en.md`)
   - Cada case ganha uma linha `**Slug:** ems-farma-marketplace` (slugs estáveis em inglês, iguais nos 2 idiomas)
   - `useSuccessStoriesMarkdown` passa a ler/expor o campo `slug`

2. **Criar `src/pages/SuccessStoryArticle.tsx`**
   - Lê `:slug` da URL
   - Usa o hook existente, encontra o case pelo slug + idioma
   - Layout dedicado: hero com imagem + logo + cliente, métricas em destaque, seções "Desafio" / "Solução" / "Soluções aplicadas" / depoimento, CTA final, link "Ver outras histórias"
   - SEO completo via `react-helmet-async`: title, description (excerpt), canonical, og:*, hreflang pt/en, JSON-LD `Article` + `BreadcrumbList`

3. **Card e grid**
   - `StoryCard` recebe `slug` e vira `<Link to={localized('/success-stories/' + slug)}>` — remover `onClick`/`handleCardClick`
   - `ModernStoriesGrid`: remover estado `selectedStory`, remover `LazyStoryModal`, remover preload do modal
   - Manter filtro por segmento

4. **Rota e infra**
   - Adicionar `<Route path="success-stories/:slug" element={<SuccessStoryArticle />} />` em `src/App.tsx`
   - Adicionar stubs no `.github/workflows/deploy-gh-pages.yml` para cada slug em pt/en (HTTP 200 em deep links)
   - Atualizar `public/sitemap.xml` com as novas URLs

5. **Limpeza opcional**
   - Manter `StoryModal.tsx` no repo por enquanto (caso queira preview rápido depois) ou remover — preferência: **remover** para manter o código limpo.
   - Remover import de `LazyStoryModal` do `LazyComponents.tsx`.

## Detalhes técnicos

- O parser atual divide por `---`; basta adicionar uma propriedade nova lida no `parseMarkdownContent`.
- Slugs ficam definidos no MD (não derivados do título) para permitir trocar título sem quebrar URL.
- O conteúdo da sub-página usa os mesmos campos já presentes no MD (`description`, `challenge`, `solution`, métricas, quote). Não exige reescrever cases agora.
- Quando você quiser conteúdo mais profundo por case, podemos depois migrar cada case para um `.md` individual (igual padrão Insights) sem mudar URL.

## Não muda

- Design system, paleta, tokens, fontes, header/footer.
- Página de listagem `/success-stories` continua funcionando igual (só os cards passam a navegar).
- Idiomas, hreflang, GA4, cookie banner.

## Arquivos tocados

- `public/content/page-success-stories-pt.md` + `-en.md` (adicionar `Slug:`)
- `src/hooks/useSuccessStoriesMarkdown.ts` (parsear slug)
- `src/components/success-stories/story-components/StoryCard.tsx` (vira Link)
- `src/components/success-stories/ModernStoriesGrid.tsx` (remover modal)
- `src/components/success-stories/optimized/LazyComponents.tsx` (remover LazyStoryModal)
- `src/pages/SuccessStoryArticle.tsx` (novo)
- `src/App.tsx` (rota)
- `.github/workflows/deploy-gh-pages.yml` (stubs)
- `public/sitemap.xml` (URLs novas)
- Remover: `src/components/success-stories/story-components/StoryModal.tsx`