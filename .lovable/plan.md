
## Objetivo

Corrigir a apresentação do i6 Article/eBook em duas telas, definir o esquema de imagens inline no corpo, e adaptar o script de sync ao novo formato de imagens do i6HUB (URLs assinadas do Supabase Storage no lugar de base64).

---

## Parte 1 — UI

**Card em `/i6-intelligence`** (`InsightMiniCard` em `src/components/hometeste/InsightsSection.tsx`):

- Título: exibir **sem truncar** (remover `line-clamp-2`).
- Excerpt: manter `line-clamp-3` (comportamento atual).
- Sem outras mudanças de layout, badge, borda ou hover.

**Tela do artigo `/i6-intelligence/<slug>`** (`src/pages/InsightArticle.tsx`):

- Manter estrutura atual: título → excerpt (subtítulo) → cover → `ReactMarkdown` do `content`.
- O "linguição" some porque o HUB deixa de duplicar excerpt em content.

## Parte 2 — Normalização defensiva do excerpt

Em `src/hooks/useInsights.ts`:

1. Em `parseFrontmatter`, para valores entre aspas duplas, decodificar escapes JSON básicos (`\n`, `\t`, `\"`, `\\`).
2. Helper `plainTextExcerpt(raw)` aplicado ao popular `excerpt`: remove `**`, `*`, `_`, `~`, `#`, `>`; troca `[label](url)` por `label`; colapsa whitespace. Sem truncar — `line-clamp-3` no card cuida do visual.

## Parte 3 — Imagens inline no corpo (mesma convenção da capa)

No `body_md` do Article, autor insere:
```markdown
![alt](body-1.jpg)
```
Paths **relativos ao diretório do artigo**, iguais aos que o feed envia. Nada de URL absoluta, nada de `/content/...` no MD.

**Ajuste no site:** em `src/pages/InsightArticle.tsx`, no wrapper `div.prose`, adicionar `prose-img:rounded-xl prose-img:my-8 prose-img:w-full`. Nenhum override de componente `ReactMarkdown` — o `remark-gfm` já resolve `![alt](body-1.jpg)` a partir do path servido.

Os arquivos ficam em `public/content/insights/{slug}/{lang}/body-N.ext`, servidos estaticamente pelo GitHub Pages (mesmo padrão da capa hoje).

---

## Parte 4 — Adaptação do `scripts/sync-content-from-i6hub.mjs` ao novo formato do HUB

### Contexto (mudança no HUB)

O i6HUB deixa de embutir imagens em base64. Cada imagem passa a vir como:
```json
{ "path": "slug/lang/kind-n.ext", "url": "<signed-supabase-url>", "mime": "image/webp", "expires_at": "..." }
```
- `url` é URL assinada do Supabase Storage, válida por 24h.
- `path` já vem pronto (`slug/lang/kind-n.ext`) — usar como-está sob `public/content/{type-dir}/`.
- Header de auth do feed **inalterado**: `X-Sync-Token: I6HUB_SYNC_TOKEN`.

**Feeds afetados:** `public-insights-feed`, `public-stories-feed`, `public-research-feed`.
**Feed inalterado:** `public-landings-feed` (landings não têm imagem materializada).

**Compatibilidade:** durante a transição o feed envia **ambos** os formatos (base64 legado + novo objeto). O script deve **priorizar** o novo (`cover.url` / `logo.url` / `body_images[].url`) quando presente e cair para base64 apenas como fallback. Após 1 release, remover a decodificação base64.

### Mudanças no script

Novo helper `downloadImageToPath({ signedUrl, relPath, baseDir, keepSet, counters, label, slug })`:

- Faz `fetch(signedUrl)`. Se `!ok`, lança erro (build aborta com log claro — não publicar item incompleto).
- Extensão vem de `mime` (via `mimeToExt`) ou do próprio `path`.
- Grava em `path.join(baseDir, relPath)` (cria subdirs), popula `keepSet` com o caminho relativo, incrementa `counters.written`.
- Retorna `{ localPath: "${webPath}/${relPath}", fileName: relPath }`.

**Ordem de resolução por imagem** (nova prioridade):

1. **Objeto novo com `url`** (`cover: { path, url, mime }`, `logo: { ... }`, `body_images: [ ... ]`) → `downloadImageToPath`.
2. **base64 legado** (`cover_image_data` + `cover_image_mime`, `logo_data` + `logo_mime`) → caminho atual, marcado como *deprecated*, remover após 1 release.
3. **URL absoluta ou path relativo já no disco** → caminho atual (preservação).

**Ajustes por tipo de feed:**

- `insights` (i6 Article, i6 eBook, i6 on Media, i6 Social):
  - `cover`: aceitar `it.cover` como objeto novo; fallback para `cover_image_data` + `cover_image_mime`; fallback final para `cover_image` (URL/path).
  - `body_images`: novo. Para cada `img` em `it.body_images ?? []`, baixar para `public/content/insights/${img.path}` (o `path` inclui `slug/lang/body-N.ext`). Popular `keepBodyImages` set para cleanup de órfãos.
  - `body_md`/`content`: usar como vem — imagens relativas (`![alt](body-1.jpg)`) resolvem contra o diretório do artigo servido em `/content/insights/{slug}/{lang}/`.
- `research`: mesmo tratamento de `cover` do insights. Sem `body_images` nesta fase (não solicitado; se o feed enviar, ignorar por ora).
- `stories`: mesmo tratamento de `cover` + novo tratamento de `logo` como objeto (`it.logo = { path, url, mime }`). Fallback base64 mantido por 1 release.

**Paralelização:** por artigo, `Promise.all([downloadCover(), downloadLogo(), ...body_images.map(downloadBodyImage)])`. Entre artigos, manter o loop sequencial atual — evita picos de RAM e mantém logs legíveis. Não paralelizar globalmente.

**Falha de download:** qualquer `fetch` que retorne não-OK, ou `writeFile` que falhe, lança erro que:
- Loga `[${TYPE}] ${slug} FATAL: falha ao baixar ${label} ${relPath}: ${status}`.
- **Aborta o build** (`process.exit(1)`) — não gravar MD incompleto, não deixar artigo com imagem faltando publicar.

**Cleanup:** estender `cleanupOrphans` para varrer subdirs (`slug/lang/body-N.ext`) e remover arquivos cujo `relPath` não esteja em `keepBodyImages`. Cleanup só roda no final, após todos os artigos processados.

**Layout final em disco (insights):**
```
public/content/insights/
  <slug>.jpg                          ← cover (padrão atual, mantido)
  <slug>/<lang>/body-1.webp           ← novo, body_images
  <slug>/<lang>/body-2.webp
```

**Fallback base64 (deprecated):** marcar com `console.warn("[deprecated] using base64 fallback for ${slug} ${label}")` e comentário no código apontando release-alvo para remoção.

---

## Arquivos alterados

1. `src/hooks/useInsights.ts` — decode de escapes YAML + `plainTextExcerpt`.
2. `src/components/hometeste/InsightsSection.tsx` — remover `line-clamp-2` do título no `InsightMiniCard`.
3. `src/pages/InsightArticle.tsx` — adicionar `prose-img:rounded-xl prose-img:my-8 prose-img:w-full` na `div.prose`.
4. `scripts/sync-content-from-i6hub.mjs` — novo helper `downloadImageToPath`; nova ordem de resolução (signed URL → base64 legado → path/URL); suporte a `body_images` para insights; cleanup estendido para subdirs; abort-on-error.

## Fora do escopo

- Alterar `public-landings-feed` (sem imagem).
- `IntelligenceArticle.tsx`, `useIntelligence.ts`, `LeadGateForm`, i6 Research body images.
- SEO, sitemap, traduções.

## Verificação

- `/pt|en/i6-intelligence`: card com título completo; excerpt em 3 linhas com reticência; sem `\n\n` ou `**` visíveis.
- `/pt|en/i6-intelligence/<slug>`: título → subtítulo → cover → corpo com imagens inline renderizadas com cantos arredondados e espaçamento.
- Rodar sync localmente contra o feed novo:
  - Confere `public/content/insights/<slug>/<lang>/body-1.<ext>` no disco.
  - Confere `keepBodyImages` limpando órfãos.
  - Simular fetch falho: build aborta, MD não gravado.
- `tsgo` clean.
