# Frente 1 — Indexação, Search Console e Rotas Bilíngues

Objetivo: dar fundação técnica para o Google rastrear e indexar **as duas versões (PT e EN)** do site, e zerar findings de SEO.

---

## 1. Separar rotas por idioma (Opção A — hreflang real)

**Por quê:** hoje PT e EN compartilham a mesma URL e o conteúdo PT é invisível para o Google. Sem isso, toda a Frente 3 (conteúdo BR) é desperdiçada.

**Mudanças de código:**
- `src/App.tsx` — envolver rotas com prefixo `/:lang(en|pt)`. Resultado: `/en/`, `/en/solutions`, `/pt/`, `/pt/solutions`, etc.
- Adicionar redirect raiz `/` → `/en` ou `/pt` baseado em `navigator.language` (com fallback `en`)
- Manter redirects 301 client-side das URLs antigas (`/solutions` → `/en/solutions`) para preservar backlinks
- `src/contexts/LanguageContext.tsx` — idioma passa a vir de `useParams().lang` (URL é a fonte da verdade); `localStorage` vira só memória da última escolha para o redirect inicial
- `src/components/LanguageSelector.tsx` (e variantes) — trocar idioma vira `navigate(pathname.replace('/en/', '/pt/'))`, preservando a página atual
- Helper novo `localizedPath(path)` em `src/utils/` — usado por todos os `<Link to>` e `navigate()` internos
- Auditar links internos em Header, Footer, CTAs, cards de Solutions/Stories e aplicar o helper
- `src/components/common/SEOHead.tsx` — canonical com prefixo de idioma + injetar `<link rel="alternate" hreflang="en" />`, `hreflang="pt-BR" />` e `hreflang="x-default" />` apontando para a EN
- `index.html` — remover `<link rel="canonical">` estático (Helmet assume per-route); manter og:* sitewide como fallback social

## 2. Atualizar sitemap.xml

- Duplicar as 6 entradas para PT e EN (12 URLs no total)
- Manter `BASE_URL = https://i6-website.lovable.app`
- Considerar gerar via script (`scripts/generate-sitemap.ts`) já que Frente 3 vai adicionar muitas rotas

## 3. Verificar domínio no Google Search Console

- Solicitar token de verificação META via API do GSC
- Injetar `<meta name="google-site-verification">` no `index.html`
- Confirmar verificação e adicionar `https://www.infinity6.ai/` como propriedade
- Submeter `sitemap.xml`

## 4. robots.txt

- Confirmar que `Sitemap:` aponta para a URL correta (já aponta hoje)
- Sem mais mudanças

## 5. Zerar findings ativos do SEO scanner

- Rodar `list_findings` e tratar cada um (títulos, descriptions, canonicals)
- Marcar como `fixed` após verificação

---

## Ordem de execução
1. Refatoração de rotas + LanguageContext + helper (passos 1)
2. SEOHead com hreflang + remoção de canonical estático
3. Sitemap atualizado (passo 2)
4. Verificação GSC + submissão (passo 3)
5. Limpeza de findings (passo 5)

## Riscos e mitigações
- **Perda temporária do ranking atual** (2 keywords no US) durante reindexação — custo baixo, ganho alto
- **Links internos esquecidos** — mitigado por busca global de `to="/` e teste manual de navegação em todas as rotas após refatoração
- **Preview social (LinkedIn/Slack)** continua mostrando og:* estático em EN — limitação de SPA sem SSR, aceitável

## Entregáveis
- App rodando em `/en/...` e `/pt/...` com troca de idioma preservando a página
- hreflang correto em todas as rotas
- Sitemap com 12 URLs
- Domínio verificado no GSC + sitemap submetido
- 0 findings ativos no SEO scanner

Aprove para começar.
