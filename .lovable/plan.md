## Causa raiz

Verifiquei em produção com `curl -I`:

```
GET https://infinity6.ai/pt/success-stories
→ HTTP/2 301  Location: https://infinity6.ai/pt/success-stories/
GET https://infinity6.ai/pt/success-stories/
→ HTTP/2 200
```

O workflow `.github/workflows/deploy-gh-pages.yml` cria os stubs de SEO como **pasta + index.html** (`dist/pt/success-stories/index.html`). O GitHub Pages então força um 301 adicionando `/` no final.

Como o `sitemap.xml` e o `<link rel="canonical">` (gerado por `SEOHead`) declaram a URL **sem barra**, o Googlebot vê: "URL declarada → 301 → outra URL". Isso é classificado como **"Erro de redirecionamento"** e a página não é indexada. Vale para todas as rotas (`/en/solutions`, `/pt/insights`, `/pt/insights/{slug}`, etc.).

## Correção

Alterar **somente** o passo "Create static route stubs for SEO" no workflow para escrever os stubs como **arquivos `.html`** (não como diretório), exceto as raízes de idioma:

```bash
for route in "${ROUTES[@]}"; do
  if [ "$route" = "en" ] || [ "$route" = "pt" ]; then
    mkdir -p "dist/$route"
    cp dist/index.html "dist/$route/index.html"
  else
    mkdir -p "$(dirname "dist/$route")"
    cp dist/index.html "dist/$route.html"
  fi
done
```

Resultado:
- `dist/pt/success-stories.html` → GET `/pt/success-stories` responde **200 direto**, sem 301
- `dist/pt/insights/previsao-demanda-ia.html` → idem
- `/en` e `/pt` continuam servidos por `index.html` da pasta (já funcionam sem redirect)

Os canonicals e o sitemap (sem barra) continuam batendo exatamente com a URL servida.

## Validação

1. Após o deploy, rodar `curl -I https://infinity6.ai/pt/success-stories` → esperar `HTTP/2 200` direto.
2. No Search Console: **Inspecionar URL → Solicitar indexação** em 1 ou 2 páginas. As outras serão re-rastreadas naturalmente.

## Arquivos alterados

- `.github/workflows/deploy-gh-pages.yml` (apenas o bloco de stubs)

Nada de código React, sitemap ou conteúdo precisa mudar.
