## Problema

O Google Search Console acusa erro de **Product snippet** em `infinity6.ai/solutions`: o schema `Product` exige `offers`, `review` ou `aggregateRating`, e nenhum desses faz sentido aqui — os 4 itens (i6ElasticPrice, i6Previsio, i6RecSys, i6Signal) são engines de IA, não produtos de e-commerce com preço/avaliação.

## Causa

`src/components/solutions/ModernSolutionCard.tsx` (linhas 80-93) marca cada card com microdata `schema.org/Product`:

```tsx
<article itemScope itemType="https://schema.org/Product" ...>
  <meta itemProp="brand" content="infinity6" />
  <meta itemProp="name" content={engine} />
  <meta itemProp="category" content="AI software" />
```

Como engines não têm `offers`/`review`/`aggregateRating`, o Google marca como crítico e bloqueia o rich result.

## Correção

Trocar `Product` por `schema.org/SoftwareApplication` no `ModernSolutionCard`, que é o tipo correto para software e **não exige** offers/review:

- `itemType` → `https://schema.org/SoftwareApplication`
- adicionar `<meta itemProp="applicationCategory" content="BusinessApplication" />`
- adicionar `<meta itemProp="operatingSystem" content="Cloud" />`
- manter `brand`, `name`, `description`, `alternateName`

Nenhuma outra mudança de UI/conteúdo. Após o deploy, pedir reindexação no GSC (o erro some no próximo crawl, ~dias).

### Arquivos alterados
- `src/components/solutions/ModernSolutionCard.tsx` — 1 atributo + 2 metas.

### Validação
- Testar `/solutions` no [Rich Results Test](https://search.google.com/test/rich-results) após publicar — deve passar sem erro crítico.