## Contexto

O scanner de SEO reportou que o `sitemap.xml` está desalinhado, mas o diagnóstico é incorreto neste projeto:

1. **Domínio**: o site oficial é `https://infinity6.ai` (custom domain via GitHub Pages — `public/CNAME` + workflow `deploy-gh-pages.yml`). O `i6-website.lovable.app` é apenas staging. Logo, é **correto** que todas as URLs do sitemap apontem para `infinity6.ai`.

2. **Rotas i18n**: o app só expõe rotas prefixadas por idioma (`/en/*` e `/pt/*`). Não existem rotas `/solutions`, `/contact`, `/privacy-policy` sem prefixo — o scanner está aplicando uma heurística que não vale aqui.

3. **Cobertura real**: o `sitemap.xml` atual já lista as 28 URLs reais (home PT/EN, solutions, success-stories + 6 artigos, contact, privacy, ethics, insights + 1 artigo) em ambos os idiomas. Está em dia.

## Ação

Marcar o finding como `fixed` via `seo--update_findings`, com explicação clara de que:
- o domínio canônico é `infinity6.ai` (custom domain), não `lovable.app`;
- as rotas do app são todas prefixadas por idioma e já estão presentes no sitemap.

Nenhum arquivo precisa ser alterado.

## Observação

O scanner pode reabrir esse finding em scans futuros, já que a heurística dele não tem como saber dessas duas particularidades. Se isso virar ruído, podemos ignorá-lo permanentemente em vez de marcar como fixed a cada scan.