# Fix: Research sync grava `gated` e `asset_url`

Diagnóstico confirmado. Em `scripts/sync-content-from-i6hub.mjs`, `fmInsights` (linhas 249/254) já serializa `gated` e `asset_url`, mas `fmResearch` (linhas 262–283) ignora os dois campos — então o feed do i6Hub pode entregar `gated: true` + PDF e o `.md` de Research sai sem nada, fazendo o `IntelligenceArticle` cair direto no conteúdo destrancado.

## Mudanças

### 1) `scripts/sync-content-from-i6hub.mjs` — `fmResearch`

Adicionar as duas linhas, espelhando o padrão de `fmInsights`:

```js
`featured: ${!!it.featured}`,
`gated: ${!!it.gated}`,                                    // ← novo
finalCover ? `cover_image: ${yaml(finalCover)}` : null,
it.related_product ? `related_product: ${it.related_product}` : null,
it.related_story_slug ? `related_story_slug: ${it.related_story_slug}` : null,
it.asset_url ? `asset_url: ${yaml(it.asset_url)}` : null,  // ← novo
```

`gated` sempre escrito (booleano explícito, como em Insights). `asset_url` só quando presente.

### 2) `src/content/intelligence/README.md` — schema

Adicionar `gated` e `asset_url` à lista de campos aceitos no frontmatter de Research, com a mesma semântica documentada em Insights (gate via `LeadGateForm`, PDF opcional liberado após submit).

## Fora de escopo (do lado do app)

- `useIntelligence.ts` já lê `gated` e `asset_url` da frontmatter (linhas 17–19 do hook), e `IntelligenceArticle.tsx` já usa `piece.gated`/`pdfUrl`. Nada a mudar no runtime.

## Ação no i6Hub (lado de fora deste repo)

No registro do research `ruptura-gondola-ia-preditiva`, marcar **PT** como `gated: true` e popular `asset_url` (copiando o do EN ou um PDF dedicado em PT). Depois rodar o sync — o `.md` PT vai passar a sair com gate ativo.

Posso seguir?
