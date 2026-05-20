## Diagnóstico

O Google está marcando as páginas de Success Stories como **soft 404**. As URLs respondem 200, mas o HTML que o Googlebot recebe na primeira passada (antes do JS executar) é **idêntico para todas as rotas** — uma cópia direta de `dist/index.html`:

- `<title>` genérico: "infinity6 – Predictive Intelligence for Business"
- `<meta description>` genérico
- Sem `<link rel="canonical">`
- Sem `<h1>` nem conteúdo no `<body>` (só o root vazio do React)

O conteúdo real só aparece **depois** de: 1) JS hidratar, 2) hook `useSuccessStoriesMarkdown` fazer `fetch('/content/page-success-stories-*.md')`, 3) Helmet injetar título/descrição. Para o Googlebot:

- Todas as URLs parecem **duplicatas** (mesmo `<title>` e meta nas N páginas indexadas)
- Conteúdo "thin" no snapshot renderizado (renderização do Googlebot tem timeout e nem sempre completa o fetch externo)
- Sem canonical no HTML estático
- Resultado: classificação como **soft 404**

A correção do plan.md anterior (gerar stubs como `.html` em vez de pasta) resolveu o erro de **redirect**, mas não o soft 404 — porque os stubs continuam todos iguais.

## Solução

Gerar stubs **com metadados únicos por rota** no build do GitHub Actions, fazendo prerender mínimo de SEO. Cada arquivo `.html` recebe título, descrição, canonical, hreflang, OG tags e um bloco de conteúdo (h1 + parágrafo) específicos da página, ANTES do `<div id="root">` ser preenchido pelo React.

### Como

1. Criar `scripts/prerender-seo-stubs.mjs` (Node, roda no CI após `npm run build`):
   - Lê `dist/index.html` como template
   - Lê `public/content/page-success-stories-{pt,en}.md` e parseia (mesma lógica de `useSuccessStoriesMarkdown.ts`) para extrair, por slug: title, description, image, segment, client
   - Faz o mesmo para `page-solutions-*.md` e demais páginas estáticas (mapa fixo para Home, Solutions, Insights, Contact, Privacy, Ethics em PT/EN — usar textos de `src/data/staticData/seoData.ts`)
   - Para cada rota, gera um HTML derivado do template substituindo:
     - `<title>` por título real da página
     - `<meta name="description">` pela descrição real
     - Adiciona `<link rel="canonical" href="https://infinity6.ai/{rota}">`
     - Adiciona `<link rel="alternate" hreflang="...">` para EN/PT/x-default
     - Atualiza `<meta property="og:title|description|url|image">` e `<meta name="twitter:*">`
     - Injeta dentro do `<body>`, antes do `<div id="root">`, um bloco oculto para crawlers com `<h1>{title}</h1><p>{description}</p>` (não-oculto via CSS; o React substitui ao montar). Isso garante conteúdo único mesmo se o JS não rodar a tempo
     - Para artigos de success story, injeta também JSON-LD `Article` + `BreadcrumbList` (mesma estrutura que `SuccessStoryArticle.tsx` já gera via Helmet)
   - Escreve em `dist/{rota}.html` (e `dist/{en,pt}/index.html` para as raízes de idioma)

2. Substituir o passo "Create static route stubs for SEO" do workflow por:
   ```yaml
   - name: Prerender SEO stubs
     run: node scripts/prerender-seo-stubs.mjs
   ```
   O script enumera as rotas a partir do próprio markdown (não precisa lista hardcoded), eliminando o array `ROUTES` atual. Novas histórias publicadas em markdown viram stubs automaticamente.

3. Validação após deploy:
   ```bash
   curl -s https://infinity6.ai/pt/success-stories/marketplace-excellence-pharmacy | grep -E '<title>|canonical|<h1>'
   ```
   Deve mostrar título e h1 da história, não o genérico.
   No Search Console, "Inspecionar URL → Solicitar indexação" em 1-2 artigos. As demais re-rastreiam naturalmente em dias.

### Ganhos colaterais

- Cada URL passa a ter sinais únicos (resolve o soft 404 nas histórias E também previne em Solutions/Insights/Contact que hoje têm o mesmo problema latente)
- Compartilhamento em redes sociais (LinkedIn/Twitter) passa a mostrar preview correto por artigo, mesmo antes do JS
- Canonical no HTML estático impede ambiguidade caso o Google indexe versões com/sem trailing slash ou parâmetros UTM

### Arquivos alterados

- `.github/workflows/deploy-gh-pages.yml` (substituir o bloco de stubs)
- `scripts/prerender-seo-stubs.mjs` (novo)

Nenhuma mudança em código React, sitemap ou conteúdo markdown.
