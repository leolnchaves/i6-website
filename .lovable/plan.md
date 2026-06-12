## Renomear i6 Intelligence → i6 Research

Mudança puramente de label/UI. URL `/i6-intelligence`, rotas, hooks, conteúdo MD e SEO slugs permanecem inalterados.

### 1. Header — renomear item do menu
`src/data/translations/pt.ts` e `src/data/translations/en.ts`:
- `'header.intelligence'`: `'i6 Intelligence'` → `'i6 Research'` (ambos idiomas).

Nenhuma alteração em `HeaderNovo.tsx` (já consome `t('header.intelligence')`).

### 2. Página `/i6-intelligence` — remover H1 visual
`src/pages/Intelligence.tsx`:
- Remover o bloco `<h1>` que exibe "i6 Intelligence" (linha ~134/heading).
- Manter o eyebrow laranja `infinity6 · Research` como identificação visual no topo.
- Manter o subtítulo descritivo logo abaixo.
- Para SEO/acessibilidade, adicionar um H1 `sr-only` com o texto "i6 Research".
- Atualizar `<title>` do Helmet: `i6 Intelligence | infinity6` → `i6 Research | infinity6`.
- Atualizar meta description/OG se referenciar o nome antigo.

### 3. Página de artigo `/i6-intelligence/:slug`
`src/pages/IntelligenceArticle.tsx`:
- `<title>`: `${piece.title} | i6 Intelligence` → `${piece.title} | i6 Research`.
- Breadcrumb JSON-LD: item `name: 'i6 Intelligence'` → `'i6 Research'`.
- `isPartOf.name`: `'i6 Intelligence'` → `'i6 Research'`.
- Texto do link "Voltar para i6 Intelligence" / "Back to i6 Intelligence" → "Voltar para i6 Research" / "Back to i6 Research".
- Eyebrow laranja `infinity6 · Research` mantém-se.

### Fora de escopo
- Não mudar URL (`/i6-intelligence` permanece, preservando SEO/indexação).
- Não mexer em `useIntelligence.ts`, conteúdo MD em `src/content/intelligence/`, nem nomes de rotas em `App.tsx`.
- Não atualizar `sitemap.xml`, `llms.txt`, `robots.txt` ou docs (`docs/I6HUB_CMS_ROADMAP.md`) — a entidade interna continua "Intelligence"; apenas o label público muda para "Research".
- Sem atualização de Core memory (renomeação cosmética, não princípio recorrente).

### Critério de aceitação
- Header (desktop + mobile, PT/EN) mostra "i6 Research".
- Página `/en/i6-intelligence` e `/pt/i6-intelligence` carregam sem o H1 grande, mostrando apenas o eyebrow laranja "INFINITY6 · RESEARCH" + subtítulo.
- Título do browser/SEO mostra "i6 Research | infinity6".
- Artigos do tipo Intelligence mantêm link de volta funcional, agora com label "i6 Research".
