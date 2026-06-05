## Plano: as 3 opções

### Opção 1 — `robots.txt` com diretiva Sitemap
**Já está pronto.** Verifiquei `public/robots.txt`: a última linha já contém `Sitemap: https://infinity6.ai/sitemap.xml`. Nenhuma alteração necessária.

### Opção 2 — Auditoria do `sitemap.xml`
Conferi `public/sitemap.xml` contra `scripts/prerender-seo-stubs.mjs` e `public/content/page-success-stories-pt.md`. Cobertura está completa:

- Home PT/EN
- `/solutions`, `/success-stories`, `/contact`, `/privacy-policy`, `/ethics-policy`, `/insights` (PT/EN)
- 6 artigos de success-stories (PT/EN cada): `marketplace-excellence-pharmacy`, `customer-engagement-online-sales`, `assortment-precision-sales-growth`, `sales-forecast-precision`, `cross-sell-propensity-intelligence`, `demand-forecast-accuracy`
- 1 artigo de insights (PT/EN): `previsao-demanda-ia`

Total: 26 URLs, todas com `hreflang` en/pt-BR/x-default. Bate com as rotas reais.

**Única correção:** todos os `<lastmod>` estão em `2026-05-13` (data antiga). Vou atualizar para a data de hoje (`2026-06-05`) — sinaliza ao Google que o conteúdo foi revisado, acelerando o re-crawl agora que o GSC foi linkado.

### Opção 3 — SEO scan
Rodar o scanner pra ver findings atuais. Fluxo:

1. `seo--list_findings` — ver findings existentes
2. `seo--trigger_scan` — disparar nova varredura (requer aprovação sua no card)
3. Se findings triviais aparecerem (title/description default, canonical faltando, og:image), corrijo no mesmo passe — o `prerender-seo-stubs.mjs` já cobre quase tudo por rota, então não espero achados graves
4. Abrir painel SEO pra você acompanhar (~1min)

## Arquivos afetados

- `public/sitemap.xml` — substituir `2026-05-13` por `2026-06-05` nos 26 `<lastmod>`
- Eventuais arquivos extras se o scan encontrar problemas (improvável)

## Fora de escopo

- `robots.txt` (já tem `Sitemap:`)
- `prerender-seo-stubs.mjs`, `index.html` base, rotas
- Configurações no GA4/GSC (link GSC↔GA4, publish da coleção "Search Console") — continuam manuais no console do Google
