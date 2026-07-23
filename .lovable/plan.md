## Objetivo
Substituir o slogan/tagline "Predictive Intelligence for Business" (e o equivalente PT "Inteligência Preditiva para Empresas") por **"The Platform for Decision Advantage"** em todos os artefatos de SEO/GEO/social que geram o preview de link (Slack, LinkedIn, WhatsApp, Google, crawlers de IA).

## Onde está hoje (mapeado)
1. `index.html` linhas 11–12 → `<title>` e `<meta name="description">`
2. `index.html` linha 125 → `Organization.slogan` no JSON-LD ("We put decisions in motion")
3. `index.html` linha 63 → `Organization.description` no JSON-LD (contém "predictive intelligence engines")
4. `src/data/staticData/seoData.ts` → bloco `home.pt` e `home.en` (título + descrição + keywords)
5. `scripts/prerender-seo-stubs.mjs` linhas 29–30 → fallbacks pt/en usados nos stubs pré-renderizados por rota
6. `public/llms.txt` linhas 9 e 65 → posicionamento GEO (para crawlers de LLMs) e descrição da home EN

## Mudanças propostas

### Títulos (tag `<title>` e `og:title`)
- PT: `infinity6 – The Platform for Decision Advantage`
- EN: `infinity6 – The Platform for Decision Advantage`
(mantido em inglês nos dois idiomas porque é o slogan-marca, alinhado ao hero da home)

### Meta description
- PT: `Decida antes do mercado. Plataforma de IA aplicada que transforma decisões antecipadas em crescimento de receita, proteção de margem e aceleração de resultados.`
- EN: `Decide before the market. Applied-AI platform that turns anticipated decisions into revenue growth, margin protection and faster results.`

### JSON-LD Organization
- `slogan`: `"The Platform for Decision Advantage"`
- `description`: substituir a frase atual por uma alinhada ao novo posicionamento (mantendo os motores i6 citados)

### llms.txt (GEO)
- Substituir "Our positioning category is **Predictive Intelligence for Business / Decision Intelligence**…" por texto centrado em **"The Platform for Decision Advantage"** (mantendo a explicação de categoria: decisão vs. IA generativa).
- Substituir "Home (EN): Predictive Intelligence for Business — overview…" por "Home (EN): The Platform for Decision Advantage — overview…"
- Mesma troca no link da Home PT, se aplicável.

### Não mexer
- `src/data/solutionsV2/content.ts` (é copy da página Solutions, não é metadado de busca)
- `FAQSection.tsx` (é uma resposta longa de FAQ, não SEO)
- Hero/Kiosk/Footer que já usam "The Platform for Decision Advantage" — permanecem.
- Demais entradas de `seoData.ts` (Solutions, Success Stories, Contact, etc.) — o pedido é sobre o slogan da marca que aparece no card de preview da home; essas outras rotas têm títulos próprios e ficam como estão. Se quiser padronizar também, digo e incluo.

## Nota sobre cache de preview
Após publicar, os previews em Slack/LinkedIn/WhatsApp continuarão mostrando o texto antigo até esses serviços re-buscarem a página. É preciso forçar refresh nos debuggers (LinkedIn Post Inspector, Facebook Sharing Debugger, WhatsApp: reenviar após ~7 dias ou com query string nova).

## Confirmação necessária
1. Ok manter o título como `infinity6 – The Platform for Decision Advantage` nos dois idiomas (em vez de traduzir)?
2. As meta descriptions propostas acima estão boas, ou prefere que eu apenas troque o slogan mantendo o resto do texto atual?
