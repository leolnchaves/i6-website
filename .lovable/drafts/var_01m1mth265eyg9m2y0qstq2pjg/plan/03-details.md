## Detalhes técnicos

- Novos assets em `public/content/logos/`, PNG com fundo transparente, ~600x160, gerados como wordmarks simples: `demo-logo-neofeed.png`, `demo-logo-cnn.png`, `demo-logo-exame.png`, `demo-logo-valor.png`, `demo-logo-mittr.png`, `demo-logo-linkedin.png`, `demo-logo-instagram.png`, `demo-logo-youtube.png`.
- `cover_image` no frontmatter passa a apontar para `/content/logos/demo-logo-*.png` (resolvido por `resolveCoverImage` + `getPublicAssetUrl`, mesmo padrão dos logos de parceiros).
- Mapeamento (PT e EN com o mesmo logo):
  - `demo-media-ia-previsao-varejo` → neofeed (segue `featured: true`)
  - `demo-media-precificacao-dinamica` → exame
  - `demo-media-recomendacao-ecommerce` → cnn
  - `demo-media-ia-responsavel-dados` → valor
  - `demo-media-industria-40-campinas` → permanece `cover_image: null` (testa o fallback do símbolo infinity6)
  - `demo-social-bastidores-engenharia` → linkedin
  - `demo-social-comunidade-builders` → instagram
  - `demo-social-numero-da-semana` → youtube
- Nenhuma alteração em `Insights.tsx`, `useInsights.ts`, parser, sync do i6 HUB ou rotas — apenas frontmatter dos 16 arquivos `demo-*` e os novos PNGs.
- Validação: build + verificação visual de `/pt/insights` e `/en/insights` (logo enquadrado dentro de `max-h-12`, card featured e card com fallback).
- Remoção posterior: `rm public/content/logos/demo-logo-*.png src/content/insights/demo-*.md src/content/intelligence/demo-*.md`.
