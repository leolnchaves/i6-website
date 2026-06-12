# Plano de execução — Fases 11, 12 e 13

Fase 10 já concluída (4 landings MD + i6HUB-ready). Seguimos com o restante do GEO v10.1.

---

## Fase 11 — Glossário GEO em `/our-ai`

**Objetivo:** dar a LLMs (ChatGPT, Gemini, Perplexity, Claude) um bloco canônico de definições curtas dos termos que a infinity6 usa, citável via `DefinedTermSet`.

**Onde:** nova seção `<section id="glossario">` em `src/pages/OurAI.tsx`, inserida **antes** do `OurAICTA` e depois de `CommunitySection`.

**Componente novo:** `src/components/our-ai/GlossarySection.tsx`
- Layout `<dl>` minimalista, grid 2 colunas no desktop / 1 no mobile.
- Termo em coral (`#F4845F`), definição em 2–3 linhas, navy de fundo.
- Sem ícones, sem cards — só tipografia + divisores sutis (mantém o tom discreto de `/our-ai`).
- Reusa `useScrollAnimation` para fade-in.

**Conteúdo (estático em `src/data/staticData/ourAIContent.ts`):** ~10 termos PT/EN:
1. Predição comportamental
2. Propensão de conversão
3. Elasticidade dinâmica
4. Aderência contextual
5. Ruptura de gôndola
6. MAML (Model-Agnostic Meta-Learning)
7. Topological Loss
8. Active Learning
9. i6-RecSys-Base.g1
10. i6Signal

**SEO/GEO:**
- JSON-LD `DefinedTermSet` injetado no `SEOHead` da página `/our-ai`, com cada termo como `DefinedTerm` (`@id` = `https://infinity6.ai/{lang}/our-ai#glossario-<slug>`).
- Cada `<dt>` recebe `id="glossario-<slug>"` para deep-link.
- `llms.txt` ganha bloco "Glossário" com âncoras `/{lang}/our-ai#glossario-<slug>`.

---

## Fase 12 — `Statistic` JSON-LD + bloco "Resultados em números"

**Objetivo:** publicar números reais de clientes de forma estruturada, citável por LLMs e renderizada visualmente em pontos-chave do site.

**Fonte da verdade:** criar `src/data/staticData/realResults.ts` consolidando 6 KPIs extraídos de `successStoriesData.ts` (label PT/EN, valor, unidade, fonte/cliente, setor).

**Componente novo:** `src/components/common/RealResultsStrip.tsx`
- Strip horizontal com 4–6 KPIs (número grande coral + label navy + fonte em caption).
- Variante compacta (Home) e expandida (`/our-ai` e landings).
- Mesmo tom navy/coral, sem cards coloridos.

**Inserção:**
- **Home** (`HomeTeste.tsx`): após `ResultadosSection`.
- **`/our-ai`**: entre `EnginesGrid` e `ExplainabilitySection`.
- **4 landings**: a seção `## Results` do MD já vira KPI strip — passamos a usar `RealResultsStrip` como renderer comum, lendo do mesmo dataset quando o frontmatter `stats` referenciar slugs de `realResults.ts` (fallback: parser atual do MD).

**JSON-LD:**
- `Statistic` aninhado em `Organization` na Home (cada KPI vira um `Statistic` com `observationDate`, `measurementMethod`, `value`).
- `QuantitativeValue` dentro de cada `Service` nas 4 landings (já existe `Service` JSON-LD — só estender).

**llms.txt:** novo bloco "Provas em números (dados reais de clientes infinity6)" com os 6 KPIs em texto plano.

---

## Fase 13 — Auditoria pós-deploy

**Entregável:** relatório `.lovable/audit-geo-v10.md`.

**Checklist:**
1. **Rich Results Test** em: Home, `/our-ai`, 4 landings, `/i6-intelligence`, 1 artigo Intelligence, `/success-stories`, 1 case.
2. **Validação manual de JSON-LD** em `validator.schema.org` — 1 amostra por tipo (`Organization`, `Service`, `FAQPage`, `BreadcrumbList`, `Article`, `DefinedTermSet`, `Statistic`).
3. **GSC:** confirmar `sitemap.xml` submetido, monitorar cobertura das novas URLs.
4. **Testes de citação em LLMs** (ChatGPT, Gemini, Perplexity, Claude) com 6 prompts:
   - "o que é i6 Previsio?"
   - "o que é i6-RecSys-Base.g1?"
   - "como reduzir ruptura de gôndola no varejo farma com IA?"
   - "quem é infinity6?"
   - "empresas brasileiras de IA proprietária para varejo"
   - "como monetizar dados de clientes no varejo"
5. **Lighthouse** em Home, `/our-ai`, 1 landing — meta ≥ 90 SEO/Best Practices.
6. **Relatório** consolidando: prints/links das validações, citações capturadas, scores Lighthouse, e lista de ajustes residuais (se houver).

---

## Detalhes técnicos

- Zero novas libs. Reusa `SEOHead`, `useScrollAnimation`, `react-helmet-async`, MD glob existente.
- `prerender-seo-stubs.mjs` ganha os blocos `DefinedTermSet` (em `/our-ai`) e `Statistic` (Home + landings) dentro do stub HTML.
- `seoData.ts` e `sitemap.xml` não mudam (URLs já estão indexadas — só conteúdo novo no `/our-ai`).
- Sem backend, sem mudanças em i6HUB nesta etapa (glossário e KPIs ficam em código por enquanto; podem virar MD-gerenciáveis numa Fase 14 se necessário).

---

## Ordem de execução

1. Fase 11 (Glossário) → 1 commit.
2. Fase 12 (RealResults + Statistic) → 1 commit.
3. Fase 13 (Auditoria) → roda após deploy estabilizado, gera o relatório final.
