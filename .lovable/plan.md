
# Plano GEO v10.1 — Fases 10 a 13 (revisado)

Fases 1–9 concluídas. Ajuste pedido: **Fase 10 deve ser gerenciável pelo i6HUB**, igual a Insights/Intelligence e Success Stories (edição via CMS → `repository_dispatch` → MDs regenerados em `/public/content/`).

---

## Fase 10 — 4 Landings por Transformação (MD + i6HUB)

Objetivo: 4 landings de alto nível ligando dor → engines → cases → CTA i6Signal, com **conteúdo 100% editável via i6HUB**.

### Ordem
1. **Demand & Supply Efficiency** → `/{lang}/solutions/demand-supply-efficiency`
2. **Data Monetization** → `/{lang}/solutions/data-monetization`
3. **Predictive Operations** → `/{lang}/solutions/predictive-operations`
4. **Behavior & Conversion** → `/{lang}/solutions/behavior-conversion`

### Arquitetura (espelha Intelligence/Stories)
- **Componente único parametrizado**: `src/pages/TransformationLanding.tsx` recebe `slug` via route param em `App.tsx` (`solutions/:slug`, com whitelist dos 4 slugs — fora isso cai no `Solutions` atual).
- **Conteúdo em Markdown**, 1 arquivo por landing × 2 idiomas:
  ```
  public/content/landing-demand-supply-efficiency-pt.md
  public/content/landing-demand-supply-efficiency-en.md
  public/content/landing-data-monetization-{pt,en}.md
  public/content/landing-predictive-operations-{pt,en}.md
  public/content/landing-behavior-conversion-{pt,en}.md
  ```
- **Frontmatter padrão**:
  ```yaml
  title, description
  hero_kicker, hero_headline, hero_sub
  sectors: [pharma, retail, industry, financial, cpg]
  hub_theme: demand | margin | inventory | mix | propensity
  related_stories: [story-slug-1, story-slug-2]
  related_engines: [i6recsys, i6previsio, i6elasticprice, i6signal]
  faq: [{q, a}]
  stats: [{label, value, source}]   # números reais de /success-stories
  ```
- **Corpo do MD** com seções marcadas por headings convencionais (`## Pain`, `## Problem`, `## Solution`, `## Application`, `## Results`) — o componente renderiza cada bloco com layout fixo (mesmo padrão dos artigos Intelligence).
- **Hook novo**: `useTransformationLanding(slug)` reaproveitando `useMarkdownContent` + gray-matter.

### Integração i6HUB (CMS)
- Estender a edge function do i6HUB para reconhecer o **tipo `landing`** (além de `insight`, `intelligence`, `success-story`).
- Form no i6HUB com campos do frontmatter + editor markdown do corpo (mesma UX dos outros tipos).
- `repository_dispatch` aciona o workflow que regrava `public/content/landing-<slug>-<lang>.md` no repo, GitHub Pages republica.
- Documentar no `docs/I6HUB_CMS_SETUP.md` o novo content type e a lista dos 4 slugs permitidos.
- **Sem novas tabelas** — segue 100% estático/MD.

### Estrutura visual (reusa tom de `/our-ai` + `/solutions`)
1. Hero (kicker + headline + sub + CTA primário)
2. **Pain** — 3 dores reais (com 1 estatística citável)
3. **Problem** — porque IA genérica falha
4. **Solution** — cards âncora para `/our-ai#<engine>` (lê `related_engines`)
5. **Application** — fluxograma SVG monocromático (dado → modelo → decisão → ativação i6Signal)
6. **Results** — KPIs reais (lê `stats`, mesmo dataset de `/success-stories`)
7. **Related stories** — cards filtrados por `related_stories` / `sectors`
8. **FAQ** — vira `FAQPage` JSON-LD
9. **CTA i6Signal** — reaproveita `SolutionsCTA`

### SEO/GEO
- JSON-LD `Service` (provider = `Organization infinity6`, `serviceType` = transformação, `areaServed` = BR + LatAm) + `BreadcrumbList` + `FAQPage`.
- Bloco `sr-only` com keywords de cauda longa + Q&A (crawlável por LLMs).
- `prerender-seo-stubs.mjs` estendido: lê os MDs e gera stub estático com body + JSON-LDs por landing × idioma.
- Atualizar `sitemap.xml`, `llms.txt`, `seoData.ts` com as 4 rotas × 2 idiomas.

### Header / Footer
- Ativar os 4 itens "Transformations" no dropdown Solutions de `HeaderNovo.tsx` (remover `comingSoon`).
- Adicionar bloco "Transformations" em `FooterNovo.tsx`.
- Atualizar memória `mem://index.md` (Core) removendo a nota "4 transformation landings ainda `comingSoon`".

---

## Fase 11 — Glossário GEO em `/our-ai`

- `<section id="glossario">` no fim de `/our-ai` (antes do CTA).
- ~10 termos: predição comportamental, propensão de conversão, elasticidade dinâmica, aderência contextual, ruptura de gôndola, MAML, Topological Loss, Active Learning, i6-RecSys-Base.g1, i6Signal.
- Layout `<dl>` minimalista, 2 colunas no desktop, termo em coral + definição curta (2–3 linhas).
- JSON-LD `DefinedTermSet` (cada termo como `DefinedTerm`, `url` com fragmento).
- `llms.txt` ganha as âncoras `/{lang}/our-ai#glossario`.

---

## Fase 12 — `Statistic` JSON-LD + bloco "Resultados em números"

- Consolidar números reais (já presentes em `successStoriesData.ts`) em `src/data/staticData/realResults.ts` como fonte da verdade.
- Componente `RealResultsStrip.tsx` (4–6 KPIs em linha, navy/coral, mesmo tom de `/our-ai`).
- Inserir em: Home, `/our-ai` (após engines, antes da Explicabilidade) e nas 4 landings (seção Results, lendo do mesmo dataset via `stats` no frontmatter).
- JSON-LD: `Statistic` no `Organization` (Home) e `QuantitativeValue` dentro de cada `Service` nas landings.
- `llms.txt` ganha bloco "Provas em números (dados reais de clientes)".

---

## Fase 13 — Auditoria pós-deploy

1. Rich Results Test em todas as novas URLs (`/our-ai`, 4 landings, hub, artigos, stories).
2. GSC: submeter sitemap atualizado, monitorar cobertura.
3. Validação manual de JSON-LDs (1 amostra por tipo) em `validator.schema.org`.
4. Testes de citação em LLMs (ChatGPT, Gemini, Perplexity, Claude) com prompts:
   - "o que é i6 Previsio?" · "o que é i6-RecSys-Base.g1?" · "como reduzir ruptura de gôndola no varejo farma com IA?" · "quem é infinity6?" · "empresas brasileiras de IA proprietária para varejo" · "como monetizar dados de clientes no varejo".
5. Lighthouse em 3 amostras (Home, `/our-ai`, 1 landing) — meta ≥ 90 SEO/Best Practices.
6. Relatório final em `.lovable/audit-geo-v10.md`.

---

## Detalhes técnicos consolidados

- **Sem novas libs.** React/TSX + MD (gray-matter) + Recharts + shadcn + react-helmet-async — tudo já no projeto.
- **Estático-first**: site continua 100% no GitHub Pages, sem backend; i6HUB apenas regrava MDs no repo via `repository_dispatch` (mesmo fluxo já em produção para Intelligence e Stories).
- **Reuso obrigatório**: `SEOHead`, `useScrollAnimation`, `useMarkdownContent`, `SolutionsCTA`, `StoryCard`, padrão de prerender do `scripts/prerender-seo-stubs.mjs`.
- **Tom visual**: navy `#0B1224` / coral `#F4845F`, SVG monocromático com 1 acento, tipografia e whitespace já validados em `/our-ai`.

---

## Próximo passo após aprovação

Começar pela **Fase 10 — landing "Demand & Supply Efficiency"**: criar `TransformationLanding.tsx` + rota + MD PT/EN iniciais + estender i6HUB para o tipo `landing` + JSON-LDs + ativar item no header. Validar o padrão e replicar para as outras 3.
