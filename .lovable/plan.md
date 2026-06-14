## Diagnóstico

O `public/sitemap.xml` **está correto** e já inclui as 4 landings (PT+EN), `/our-ai`, `/i6-intelligence`, success stories, insights, contato, políticas e home — 252 linhas, XML válido. As URLs no sitemap batem exatamente com os `<link rel="canonical">` emitidos pelo `TransformationLanding.tsx` (mesmo domínio `https://infinity6.ai`, mesmo path, sem trailing slash). O `robots.txt` referencia `Sitemap: https://infinity6.ai/sitemap.xml`.

A mensagem do Google Search Console **"Nenhum sitemap de referência detectado"** na inspeção de URL **não significa que o sitemap está errado**. Ela significa apenas que, no momento em que o Google indexou aquela URL, ele ainda não tinha lido um sitemap contendo-a. Causas típicas:

1. As landings foram adicionadas ao sitemap **depois** que o Google descobriu as URLs por outros caminhos (links internos, indexação manual).
2. O Google ainda não re-buscou `sitemap.xml` desde a última atualização (o `lastmod` global do arquivo não muda automaticamente).
3. O sitemap nunca foi **submetido manualmente** em Search Console → Sitemaps.

## Ações no código

**1. Atualizar `lastmod` das landings e do nosso conteúdo recente para `2026-06-14`** em `public/sitemap.xml`:
- 4 landings PT + 4 EN (hoje estão `2026-06-12`)
- `/our-ai` PT+EN
- `/i6-intelligence` index + artigo
Isso sinaliza freshness e força o Google a re-baixar o sitemap na próxima passagem.

**2. Nada mais a mudar no código** — canonical, hreflang, robots.txt e prerender de stubs SEO já estão coerentes.

## Ações que **você** precisa fazer no Google Search Console (fora do código)

1. **Search Console → Sitemaps** → adicionar `https://infinity6.ai/sitemap.xml` e clicar em **Enviar** (mesmo se já estiver lá, reenvie depois do deploy de hoje).
2. Em **Inspeção de URL**, colar cada landing (ex.: `https://infinity6.ai/pt/solutions/demand-supply-efficiency`) → **Solicitar indexação**. Em 1-3 dias o status muda para "URL está nos sitemaps enviados".
3. Opcional: reenviar também em Bing Webmaster Tools.

## Observação técnica

O `public/sitemap.xml` é **estático e versionado** (não é gerado por script). O workflow `.github/workflows/deploy-gh-pages.yml` apenas faz `cp public/sitemap.xml dist/sitemap.xml`. Portanto, atualizar `lastmod` aqui e fazer commit/deploy é suficiente — não há gerador automático para reconfigurar.