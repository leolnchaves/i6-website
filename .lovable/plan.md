# Plano GEO v9.9 — Consolidado (status + próximas fases)

Objetivo: posicionar infinity6 como autoridade em IA aplicada (SEO + GEO/LLMs), com hub editorial, página técnica de motores proprietários e landings por transformação de negócio.

---

## ✅ Fases concluídas (1 a 8)

1. **Fundação SEO/GEO** — react-helmet-async, sitemap, robots, llms.txt, prerender, canonical+hreflang.
2. **i6 Intelligence** — hub editorial em MD com filtros e FAQPage JSON-LD.
3. **Success Stories em MD** — cases editáveis via i6HUB, `Article`+`BreadcrumbList`.
4. **i6HUB CMS** — edge function + GitHub `repository_dispatch` regerando MDs.
5. **Identidade institucional** — lowercase "infinity6", navy `#0B1224`, coral `#F4845F`, CTAs Outline Glow.
6. **Cross-links Hub ↔ Solutions ↔ Stories** — `?theme`/`?sector` na URL, CTAs nos cards e nos artigos.
7. **Organization Authority + email único** — `performance@infinity6.ai`, JSON-LD completo.
8. **Header com novo menu Solutions** — dropdown linear de 6 itens; Proprietary AI e 4 transformações ocultos via `comingSoon`.

---

## 🟡 Próximas fases

### **Fase 9 — Página `/our-ai` (Proprietary AI)** ← próximo passo

**Decisões fechadas:**
- Página **estática em React/TSX** (sem MD). Strings em `pt.ts`/`en.ts` sob `ourAI.*`.
- Conteúdo base: os 8 quadros anexados.
- **Tom visual:** elegante, discreto, minimalista — mesma linguagem do resto do site (navy `#0B1224`, coral `#F4845F` como acento pontual, tipografia atual, muito whitespace). Nada de paleta colorida ou múltiplos tons. Fluxogramas e gráficos são **monocromáticos** com 1 cor de acento por vez.

**Princípios visuais (anti-textão / anti-bagunça):**
- Cada seção é uma **unidade visual** — 1 título curto + 1 visual + 1 parágrafo curto (≤ 3 linhas) + 1 nota opcional. Nunca um bloco de texto longo.
- Ritmo alternado: seção texto-pesada → seção visual-pesada → seção mista. Evita fadiga.
- Tudo em **SVG inline** (zero imagens raster). Linhas finas (1-1.5px), tipografia pequena, monocromático com coral apenas no destaque. Inspiração: Stripe docs, Linear changelog.
- Animações sutis on-scroll (`opacity` + `translateY` 8px), sem parallax pesado, sem partículas. Reaproveitar o sistema existente do site (`useScrollAnimation`/Motion).
- Charts: usar Recharts já presente no projeto, em estilo wireframe (eixos finos, sem grid pesado, barras com 1 fill coral em destaque + cinza nas demais).

**Estrutura da página (11 seções, cada uma um componente em `src/components/our-ai/`):**

1. **Hero** — `OurAIHero.tsx`
   - Headline curta: "Proprietary AI Engines"
   - Subhead: "IA aplicada é um organismo que se constrói, se alimenta e se adapta."
   - Visual: linha SVG sutil tipo "onda de sinal" no fundo, monocromática.

2. **Tese — o que muda o jogo** — `ThesisSection.tsx`
   - 3 colunas mínimas com ícone-linha + 1 frase cada (clareza do problema · isolar comportamento · aderência contextual)
   - Card lateral com `i6-RecSys-Base.g1`: MAML + Active Learning + Topological Loss, e a estatística de bases/registros como mini-stats (4 números, sem floreio)
   - Referências acadêmicas em footnote pequena, expansível

3. **Os 4 Engines** — `EnginesGrid.tsx`
   - Grid 2×2 (desktop) / stack (mobile)
   - Cada card: logo SVG do engine (i6 RecSys / i6 Previsio / i6 ElasticPrice / i6 Signal) + 1 frase de definição + 3 mini-pills com "Recursos incomparáveis"
   - Hover: borda coral fina, sem mudança de fundo dramática
   - Cards âncora: `#i6recsys`, `#i6previsio`, `#i6elasticprice`, `#i6signal`

4. **Clareza ao caos · Números se movem** — `DualValueSection.tsx`
   - 2 colunas com fórmula visual no rodapé de cada uma:
     - `consumo + tempo + contexto + similaridade = insight acionável`
     - `dados + contexto + decisão = Influência`
   - Tipografia da fórmula em mono (JetBrains/IBM Plex Mono — fonte do projeto se já houver)

5. **IA aprende. Influência vende.** — `LearnInfluenceFlow.tsx`
   - **Fluxograma horizontal SVG** com 3 nodes conectados por linha animada:
     `Fine tuning` → `Necessidade específica (interesse · pesquisa · compra)` → `Necessidades do negócio`
   - Linha de baixo: 8 chips horizontais (Relevância · Oportunidade · Timing · Necessidade · Substituição · Elasticidade · Similaridade · Explicabilidade)

6. **Balanceamento de Diversidade** — `DiversityBalanceSection.tsx`
   - Lado esquerdo: lista de tarefas de recomendação (Recommended for you, Frequently bought together, Buy it again, Similar items, On sale) como chips empilhados
   - Centro: ícone-linha "ajuste fino" com seta
   - Lado direito: **gráfico Recharts** (histograma minimalista, eixos finos, barras cinzas + última barra em coral destacando "diversidade alcançada")

7. **Explicabilidade** — `ExplainabilitySection.tsx`
   - **Fluxograma 3 passos** SVG:
     1. Identifica motivadores (mini-tabela de features com pesos — 4 linhas, mono)
     2. Prioriza fatores (4 mini-cards: Increase in demand · Repurchase occasion · New product · High-selling product)
     3. Argumento dinâmico (3 mini-cards de output: High engagement · Optimized bundling · Strong correlation)
   - Setas finas conectando os 3 passos

8. **Segurança e Conformidade** — `SecuritySection.tsx`
   - **4 pilares em linha** (não onda — versão minimalista): ícone-linha + label + 1 frase
   - Arquitetura segura · Ambiente isolado · Conformidade by design · Pronto para escalar

9. **Desafios da IA aplicada** — `ChallengesAccordion.tsx`
   - **Accordion colapsado por padrão** (9 itens) para não dominar a página
   - Cada item expande para Desafio → Aprendizado → Como resolvemos em 3 colunas

10. **Comunidade** — `CommunitySection.tsx`
    - Bloco curto: logo Hugging Face + 1 frase + CTA "Visitar nossa comunidade" → `huggingface.co/infinity6`

11. **CTA final** — `OurAICTA.tsx`
    - Reaproveitar `SolutionsCTA` ou variante: "Converse com nosso time técnico" → `/contact`

**SEO/GEO:**
- JSON-LD `TechArticle` (página inteira) + 4× `SoftwareApplication` (um por engine, `applicationCategory: "BusinessApplication"`, `creator` = `Organization infinity6`)
- Activar item "Proprietary AI" no header (remover `comingSoon`)
- Adicionar `/our-ai` no Footer
- Atualizar `sitemap.xml` e `llms.txt`
- Estender `prerender-seo-stubs.mjs` para gerar stub estático com conteúdo crawlável (texto das 11 seções + JSON-LDs)

**Reuso e consistência:**
- Reaproveitar `SEOHead`, `useScrollAnimation`, `VerticalWaves` (se aplicável às outras páginas), classes utilitárias existentes, componentes shadcn (Accordion, Card, Badge).
- Nenhuma nova lib. Recharts e Motion já estão no projeto.

---

### Fase 10 — 4 Landings por Transformação

- Ordem fechada: começar por **Demand & Supply Efficiency**.
- Rotas: `/solutions/demand-supply-efficiency`, `/solutions/data-monetization`, `/solutions/predictive-operations`, `/solutions/behavior-conversion`
- `TransformationLanding.tsx` parametrizado + MD em `public/content/landing-<slug>-{pt,en}.md`
- Frontmatter: `sectors`, `hub_theme`, `related_stories`, `related_engines`
- Estrutura: pain → problem → solution → application → results → CTA i6Signal
- `sr-only` keywords/Q&A, JSON-LD `Service` + `BreadcrumbList`
- Activar os 4 itens no header

### Fase 11 — Glossário GEO em `/our-ai`

- Seção `<section id="glossario">` com termos canônicos (predição comportamental, propensão de conversão, elasticidade dinâmica, aderência contextual, MAML, Topological Loss, Active Learning)
- JSON-LD `DefinedTermSet`

### Fase 12 — `Statistic` JSON-LD + provas sociais

- Extrair números reais de `/success-stories` e expor como `Statistic` no `Organization` ou `QuantitativeValue` por `Service`
- Bloco "Resultados em números" reutilizável em Home + `/our-ai`

### Fase 13 — Auditoria pós-deploy

- Validar JSON-LDs (Rich Results Test)
- GSC indexação
- Citações em LLMs: "o que é i6 Previsio?", "i6-RecSys-Base.g1?", "como reduzir ruptura no varejo farma?", "quem é infinity6?"

---

## Próximo passo

Executar **Fase 9** — `/our-ai` estática, fluida, minimalista, com 11 seções modulares, fluxogramas e gráficos SVG/Recharts monocromáticos com acento coral pontual, JSON-LDs, ativação do item no header e atualização de sitemap/llms/prerender.