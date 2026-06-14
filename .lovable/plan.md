## Diagnóstico

No domínio publicado (`infinity6.ai`), apenas 2 das stories têm `cover_image` no bundle (`case-ems-farmacia.jpg` e `demand-forecast-accuracy.jpg`); todas as demais saem como `cover_image: null`. No preview/dev, os MDs versionados em `src/content/stories/*-pt.md` / `*-en.md` apontam para `/content/success-stories/case-foods-1.jpg`, `case-finance-1.jpg`, etc., que existem em `public/content/success-stories/`, então as imagens aparecem normalmente.

A diferença vem do passo **"Sync stories from i6Hub CMS"** no workflow `.github/workflows/deploy-gh-pages.yml`, que executa `scripts/sync-content-from-i6hub.mjs --type=stories` e reescreve os arquivos MD com o que vier do feed do i6Hub. Em `fmStories` (linha 304), quando o feed **não** entrega `cover_image` (nem base64, nem URL absoluta, nem um path relativo cujo arquivo já exista em disco), o script escreve `cover_image: null` no MD — apagando a referência que existia antes no repositório. Como a maioria das stories no i6Hub hoje não tem capa preenchida, o build de produção termina com quase todas as `cover_image` nulas.

Mesmo problema, em menor grau, vale para `logo` das stories e `cover_image` de research/insights/landings sincronizados pelo mesmo script.

## Plano de correção

Ajuste mínimo, somente em `scripts/sync-content-from-i6hub.mjs`, mantendo o resto do fluxo.

### 1. Ler o MD existente antes de sobrescrever

Antes do `for (const it of items)` (linha 325), criar um cache `existingMd` que, para cada arquivo `${slug}-${lang}.md` já presente em `MD_DIR`, faz parse do frontmatter e guarda `{ cover_image, logo }`. Parser simples por regex linha a linha — já há precedente no resto do projeto e evita adicionar dependência.

### 2. Fallback de cover/logo para o que já estava no repo

Em `fmStories` (e analogamente em `fmInsights`, `fmResearch`, `fmLandings`), trocar:

```js
const finalCover = coverLocal ?? it.cover_image ?? null;
const finalLogo  = logoLocal  ?? it.logo ?? it.logo_image ?? null;
```

por algo equivalente a:

```js
const finalCover =
  coverLocal ?? it.cover_image ?? existingMd[fileName]?.cover_image ?? null;
const finalLogo =
  logoLocal ?? it.logo ?? it.logo_image ?? existingMd[fileName]?.logo ?? null;
```

Assim: se o feed não trouxer capa nem dado, mas o MD versionado já apontava para `/content/success-stories/case-foods-1.jpg` e o arquivo existe em `public/content/success-stories/`, esse valor é mantido em vez de virar `null`.

### 3. Proteger o cleanup de órfãos

Em `cleanupOrphans` (linha 366), além do `keepSet` populado durante `materializeImage`, também marcar como "manter" qualquer arquivo cujo basename apareça num `cover_image`/`logo` final escrito agora (ou seja, juntar o conjunto a partir dos `finalCover`/`finalLogo` que persistem por fallback). Isso garante que `case-*.jpg` versionados em git não sejam removidos como órfãos quando o feed do i6Hub não os referencia explicitamente.

### 4. Nenhuma mudança no frontend

`useSuccessStoriesMarkdown.ts`, `ModernStoriesGrid.tsx`, `StoryCard.tsx`, `getPublicAssetUrl` permanecem como estão — eles já funcionam corretamente quando `cover_image` está populado.

## Verificação

1. Rodar localmente `node scripts/sync-content-from-i6hub.mjs --type=stories` com um feed mockado (ou simplesmente sem `I6HUB_FEED_URL_STORIES`) e conferir que os MDs em `src/content/stories/` continuam com `cover_image: "/content/success-stories/case-...jpg"` e que os arquivos em `public/content/success-stories/` não são deletados.
2. `npm run build` deve continuar verde.
3. Após merge → workflow GH Actions roda → conferir nos logs `Covers preserved: N` em vez de `Covers removed: N`.
4. Em `https://infinity6.ai/success-stories`, todas as imagens das stories devem aparecer.

## Arquivos afetados

- `scripts/sync-content-from-i6hub.mjs` (único arquivo alterado).
