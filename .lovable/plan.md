# Glossário em /our-ai — análise e alinhamento

## 1) O que cada fonte lista hoje

### (a) Cards renderizados na seção "Vocabulário"
Fonte: `src/data/staticData/ourAIContent.ts` (`glossary.terms`), renderizados por `src/components/our-ai/GlossaryCondensed.tsx` L26-31 com `id="glossario-<slug>"`. **6 termos por idioma.**

PT (L275-282): MAML `#glossario-maml` · Active Learning `#glossario-active-learning` · Topological Loss `#glossario-topological-loss` · i6-RecSys-Base.g1 `#glossario-i6-recsys-base-g1` · Predição comportamental `#glossario-predicao-comportamental` · Elasticidade dinâmica `#glossario-elasticidade-dinamica`

EN (L474-481): mesmos 4 primeiros slugs · Behavioral prediction `#glossario-behavioral-prediction` · Dynamic elasticity `#glossario-dynamic-elasticity`

ES (L673-680): mesmos 4 primeiros slugs · Predicción conductual `#glossario-prediccion-conductual` · Elasticidad dinámica `#glossario-elasticidad-dinamica`

### (b) DefinedTermSet do JSON-LD estático
Fonte: `scripts/prerender-seo-stubs.mjs` L280-305 (lista própria, duplicada) → L312-325. **8 termos**, e apenas duas variantes: lista PT usada para `pt` **e para `es`**; lista EN para `en`.

Divergências (todas em `scripts/prerender-seo-stubs.mjs`):
- **Sobra em (b), ausente na página:** `propensao-conversao` / `conversion-propensity` (L282 / L292) e `aderencia-contextual` / `contextual-adherence` (L284 / L294) — 2 termos por idioma sem card e sem âncora real.
- **Falta em (b) no ES:** os cards ES `prediccion-conductual` e `elasticidad-dinamica` não existem no dado estruturado; em `es` o script emite `predicao-comportamental` e `elasticidade-dinamica` (L281, L283) → `@id`/`url` apontam para âncoras inexistentes em `/es/our-ai`.
- `inLanguage` do set fica `pt-BR` também para `es` (L316).
- Definições encurtadas e desatualizadas em relação à página (ex.: `i6-recsys-base-g1` L287/L297 ainda diz "treinado em 20 bi de registros"; a página já usa a redação nova).
- O mesmo vale para o HTML oculto `#seo-prerender` (L307), que expande a mesma lista de 8.

### (c) llms.base.txt / llms.txt
`public/llms.base.txt` L53-64 (copiado literalmente para `public/llms.txt` L53-64, o gerador só substitui `{{GENERATED_CONTENT}}`). **8 termos, só em inglês, links sempre `/en/our-ai#...`**:
i6-RecSys-Base.g1, MAML, Topological Loss, Active Learning, Behavioral prediction, **Conversion propensity** (L62), **Dynamic elasticity**, **Contextual adherence** (L64).

Divergências: `conversion-propensity` (L62) e `contextual-adherence` (L64) não existem em (a) em nenhum idioma. Nada falta em (c) em relação a (a).

## 2) "Glossário completo na documentação"

- **Link:** `GlossaryCondensed.tsx` L34 → `localized('/docs/glossario')` → `/pt/docs/glossario`, `/en/docs/glossario`, `/es/docs/glossario`.
- **Stub estático:** **não existe.** `dist/{pt,en,es}/docs/` contém apenas `pesquisa.html`. `staticRoutes` em `scripts/prerender-seo-stubs.mjs` L221 não inclui `docs/glossario`.
- **Sitemap:** **nenhuma entrada.** O coletor (`scripts/lib/content-collector.mjs` L199) só aceita docs cujo slug esteja em `INDEXABLE_DOC_SLUGS = ['pesquisa']` (`scripts/lib/seo-route-config.mjs` L21). Logo, glossário também está fora do `llms.txt`.
- **Arquivos:** `src/content/docs/glossario-{pt,en,es}.md`, todos com `site_managed: true`, `section: glossary`, `order: 50`, `slug: glossario`, `description` própria e **9 termos cada**.
  - PT: Active Learning, Aderência contextual, Elasticidade dinâmica, i6-RecSys-Base.g1, MAML, Predição comportamental, Propensão de conversão, Ruptura de gôndola, Topological Loss.
  - EN: …, Contextual fit, …, Shelf out-of-stock, … (note: EN usa "Contextual fit", enquanto (b)/(c) usam "Contextual adherence").
  - ES: **espanhol real, não cópia do PT** (texto próprio: "Estrategia de entrenamiento en la que el propio modelo elige…", "Adherencia contextual", "Ruptura de góndola"). Os três arquivos têm tamanho e redação independentes.
  - Nenhum dos três traz `date` no frontmatter (relevante para `lastmod`).

## 3) Diff proposto (não aplicado)

### (a) Alinhar dado estruturado ao que a página mostra
1. `scripts/prerender-seo-stubs.mjs`: **remover a lista duplicada** L280-305 e importar os termos da fonte única. Como o arquivo é `.mjs` e `ourAIContent.ts` é TS, extrair os termos para `src/data/ourAIGlossary.json` (6 termos × pt/en/es, com `slug`, `term`, `definition`) e fazer `ourAIContent.ts` consumir esse JSON — mesmo padrão já usado em `realResults.json`.
2. Com isso: `glossaryHtml`, `hasDefinedTerm` e as âncoras passam a ter exatamente 6 termos por idioma, com os slugs certos em ES; `conversion-propensity`/`contextual-adherence` saem do stub.
3. `inLanguage` do `DefinedTermSet` (L316) passa a usar `HTML_LANG[lang]` (pt-BR / en / es) em vez de `tl`.
4. `scripts/validate-jsonld.mjs`: nova checagem — todo `DefinedTerm` do grafo precisa ter âncora correspondente no `#seo-prerender` da mesma página, e a contagem precisa ser igual à do JSON de origem (falha se divergir).
5. `public/llms.base.txt` L57-64: remover as duas linhas órfãs (Conversion propensity, Contextual adherence) e manter 6 termos.

### (b) Glossário em stubs, sitemap e llms.txt (igual a /docs/pesquisa)
1. `scripts/lib/seo-route-config.mjs`: `INDEXABLE_DOC_SLUGS = ['pesquisa', 'glossario']` e `ES_TRANSLATED_ROUTES` += `'docs/glossario'` (ES tem tradução real, confirmado acima).
2. `scripts/prerender-seo-stubs.mjs`: `staticRoutes` L221 += `'docs/glossario'`; entrada `seo['docs/glossario']` (title/description por idioma, reaproveitando a `description` do frontmatter); bloco de corpo análogo ao de `docs/pesquisa` (L374+), lendo `src/content/docs/glossario-${lang}.md` e emitindo os 9 termos como `DefinedTermSet`/`DefinedTerm` com âncoras `#<slug-do-heading>` — `@id` distinto do set de `/our-ai` para não colidir.
3. `scripts/generate-sitemap.mjs`: nada a mudar — o glossário entra automaticamente pelo coletor nos 3 idiomas (sem `lastmod`, pois não há `date` no frontmatter). O `llms.txt` também passa a listá-lo desde que se adicione a seção `{ type: 'Docs', heading: 'Documentation' }` em `SECTIONS` (`scripts/generate-llms.mjs` L21-28) — hoje `Docs` não tem seção, então `pesquisa` também não aparece; alternativa é deixar ambos fora do `llms.txt` e citá-los só no bloco manual da base.
4. Resultado esperado: 39 → 42 URLs no sitemap, 42 stubs, `validate` exigindo stub para cada URL continua passando.

### Ponto a decidir
`llms.txt`: criar a seção "Documentation" (entram pesquisa + glossário, 3 idiomas cada) ou manter docs fora das seções geradas e apenas adicionar um link manual ao glossário em `llms.base.txt`?
