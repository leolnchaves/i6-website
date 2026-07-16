## Problema

LinkedIn (e Facebook, Slack, WhatsApp) não executam JavaScript ao gerar preview. Leem só o HTML estático da URL. Como o site é uma SPA no GitHub Pages, as tags `og:*` setadas via `react-helmet-async` nunca chegam a esses crawlers — eles caem no `index.html` de fallback e veem só o og:image genérico da marca. Por isso o LinkedIn responde "Cannot display preview" no artigo `/en/i6-blog/ai-pricing-ecommerce-margem-giro-conversao`.

Já existe o `scripts/prerender-seo-stubs.mjs` (rodado no `.github/workflows/deploy-gh-pages.yml`) gerando stubs por rota para páginas estáticas, success stories, i6 Intelligence (research) e landings. **Falta cobertura para todo o conteúdo do i6Hub que entra em `src/content/insights/`**: `i6 Article` (blog), `i6 eBook`, `i6 on Media`, `i6 Social`.

## Escopo

Estender **apenas** o `scripts/prerender-seo-stubs.mjs` para percorrer `src/content/insights/*.md` e emitir um stub HTML por slug/idioma, em cima do mesmo `buildStub` já usado hoje.

Mapeamento de tipo → rota (idêntico ao roteamento React já no ar):

| Tipo (frontmatter) | Rota gerada |
|---|---|
| `i6 Article` | `/{lang}/i6-blog/{slug}` |
| `i6 eBook` | `/{lang}/i6-intelligence/{slug}` |
| `i6 on Media` | `/{lang}/insights/{slug}` |
| `i6 Social` | `/{lang}/insights/{slug}` |

Cada stub reaproveita `buildStub`, garantindo:

- `<title>`: `{title} | infinity6`
- `<meta name="description">`: `excerpt` do frontmatter
- `<link rel="canonical">` auto-referente
- `og:title`, `og:description`, `og:url`, `og:type=article`, `og:locale`
- `og:image` / `twitter:image`: `cover_image` do frontmatter, resolvida para URL absoluta `https://infinity6.ai/...`; fallback para o og:image global se ausente
- `twitter:card=summary_large_image` + demais twitter tags
- JSON-LD `Article` com `headline`, `description`, `datePublished`, `inLanguage`, `author`, `publisher`, `mainEntityOfPage`, `image`
- Bloco `<h1>+<p>` no `#seo-prerender` para dar corpo textual aos crawlers

Também vou **remover a lista hardcoded** `insightArticles` (só cobria 1 slug de `/insights/`) — passa a ser 100% direcionado pelos MDs em `src/content/insights/`, que é o que o i6Hub popula. Fica: um único lugar de verdade.

Nada muda em componentes React, roteamento, ou no `SEOHead.tsx` (que continua atendendo Googlebot e navegadores).

## Cobertura total após a mudança

| Conteúdo | Fonte | Já coberto? |
|---|---|---|
| Home / Solutions / Our AI / Success Stories (índice) / Contact / Privacy / Ethics / Insights (índice) / i6 Intelligence (índice) | `seo` interno | ✅ Já |
| Success stories (por slug) | `public/content/page-success-stories-{lang}.md` | ✅ Já |
| Transformation landings (por slug) | `src/content/landings/*.md` | ✅ Já |
| i6 Research (por slug) | `src/content/intelligence/*.md` | ✅ Já |
| **i6 Article (blog)** | `src/content/insights/*.md` (`type: i6 Article`) | **➕ Novo** |
| **i6 eBook** | `src/content/insights/*.md` (`type: i6 eBook`) | **➕ Novo** |
| **i6 on Media** | `src/content/insights/*.md` (`type: i6 on Media`) | **➕ Novo** |
| **i6 Social** | `src/content/insights/*.md` (`type: i6 Social`) | **➕ Novo** |

Resultado: qualquer coisa que você publicar via i6Hub (que sincroniza em `src/content/insights/` no CI) passa a ter og:* estático servido pelo GitHub Pages.

## Detalhes técnicos

- O `writeStub` grava `dist/{path}.html` (ex.: `dist/en/i6-blog/ai-pricing-ecommerce-margem-giro-conversao.html`). GH Pages serve pretty-URL, então a URL sem `.html` bate no arquivo certo.
- O parser de frontmatter já presente no script cobre strings/booleans/números; para o excerpt tratarei sequências `\n` como espaço (evita vazar barra invertida no `<meta>`).
- Ignoro entradas sem `title`/`slug`/`language`/`type`/`date` (mesma validação do `useInsights.ts`).
- Cover image relativa vira absoluta usando `BASE_URL`.

## Verificação após o próximo deploy

1. `curl -s https://infinity6.ai/en/i6-blog/ai-pricing-ecommerce-margem-giro-conversao | grep -E 'og:(title|description|image)'` mostra as três tags corretas.
2. Colar a URL no LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/) para forçar refresh — o LinkedIn cacheia previews antigos, então posts que você já criou só atualizam por lá. Vou lembrar disso depois de publicarmos.

## Fora do escopo

- SSR / mudança de hospedagem.
- Alterar `SEOHead.tsx` ou o header/rotas.
- Bump de versão — publicamos depois que você validar.
