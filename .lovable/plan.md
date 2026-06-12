# Plano GEO — rodada atual e fila

## Esta rodada (executar agora)

### A) Ajuste SuccessStoriesHero — `src/data/staticData/successStoriesData.ts`
**PT**
- `subtitle`: "em varejo, indústria e farma" → **"em farma, indústria, financeiro e varejo"**
- `description`: "…com os engines proprietários da infinity6" → **"…com nossa IA proprietária"**

**EN**
- `subtitle`: "in retail, industry and pharma" → **"in pharma, industry, financial services and retail"**
- `description`: "…with infinity6's proprietary engines" → **"…with our proprietary AI"**

### B) Subheading do hub `/i6-intelligence` — `src/pages/Intelligence.tsx`
**PT**: "…em varejo, indústria e farma" → **"para os setores de varejo, indústria, financeiro e farma"**
**EN**: equivalente → **"across retail, industry, financial services and pharma"**

### C) Etapa 4.4 — Tornar o hub indexável e pronto para o i6HUB
Sem isso, peças geradas pelo i6HUB não vão pra Google/LLMs.

**C.1 — `sitemap.xml`**
- Adicionar `/<lang>/i6-intelligence` (PT + EN).
- Adicionar entradas dinâmicas por slug do hub (script lê `src/content/intelligence/*.md`).
- Inspecionar como o sitemap é gerado hoje (build script ou estático) antes de editar.

**C.2 — `public/llms.txt`**
- Nova seção `## i6 Intelligence` listando o hub e a peça-piloto (PT + EN) com URL absoluta e excerpt.
- Deixar comentário-marcador `<!-- i6hub:intelligence-list -->` para o i6HUB injetar novas peças automaticamente.

**C.3 — `prerender-seo-stubs.mjs` (ou equivalente)**
- Confirmar mecanismo de pré-render atual e estender para emitir HTML estático para o índice e para cada artigo do hub. Sem stub, GitHub Pages serve só SPA shell e o crawler não vê o conteúdo.

**C.4 — Convenção de frontmatter para o i6HUB**
- Documentar em `src/content/intelligence/README.md` (novo) o schema esperado: `id`, `title`, `slug`, `language`, `date`, `sector`, `theme`, `excerpt`, `read_time`, `featured`, `cover_image?`, com valores válidos para `sector` (farma, industria, financeiro, varejo, ecommerce, multissetor) e `theme` (demanda, margem, estoque, mix, propensao, cac).
- Documentar convenção `<slug>-pt.md` + `<slug>-en.md` (par obrigatório).
- Documentar bloco `## Perguntas frequentes` / `## FAQ` reconhecido automaticamente pelo schema FAQPage.
- Padrão de citation magnet no topo (`## Resposta direta` / `## Direct answer`).

**C.5 — Labels EN do filtro de tema**
- Verificar mapeamento atual em `Intelligence.tsx`. Garantir que tanto `theme: estoque` (PT) quanto `theme: inventory` (EN) renderizem o rótulo correto — assim o i6HUB pode usar termos PT ou EN sem quebrar o filtro.

---

## Fila (não executar agora)

| Etapa | O que é | Quando |
|---|---|---|
| **4.2 — Produzir 11 peças** | Geração de conteúdo via i6HUB usando o schema documentado em C.4 | i6HUB faz |
| **4.3 — Cross-links** | `/solutions` → 2 peças por card; `/success-stories` → peça do setor | depois que o hub tiver ≥ 6 peças |
| **1.5 — Frase canônica nos stats grandes + ajuste fino `knowsAbout` PT** | Refinamento da base GEO | fase final |
| **2.1 — Cards `/solutions` JTBD** (MD) | Reescrita dos 6 cards no idioma do problema | fase final |
| **2.2 — Frase canônica stats** | "Segundo levantamentos mapeados pela infinity6…" nos 3 stats | fase final |
| **2.4 — FAQ visível em `/solutions`** (MD) | Accordion com as 4 perguntas JTBD | fase final |
| **2.5 — Ímãs de citação topo `/solutions`** (MD) | Bloco com 3 stats canônicos | fase final |
| **3 — Página `/nossa-ia`** | Manifesto + engines + dados de mercado | fase final |
| **5 — Landings por setor** | Varejo, farma, indústria, financeiro, e-commerce | fase final |

---

## Status consolidado

| Etapa | Status |
|---|---|
| 1 — Base técnica GEO | ✅ feito |
| 2.3 — Heros (Home / Solutions / SuccessStories / Contact) | ✅ feito (incluindo A nesta rodada) |
| 4 — Hub `i6 Intelligence` (rota + índice + template + peça-piloto) | ✅ feito |
| 4.1 — Subheading do hub (B) | 🔵 esta rodada |
| 4.4 — Indexação + schema docs (C) | 🔵 esta rodada |
| 4.2 / 4.3 / 1.5 / 2.1 / 2.2 / 2.4 / 2.5 / 3 / 5 | 🟡 fila |

Após A+B+C, o site está pronto para o i6HUB despejar as 11 peças sem nenhuma intervenção de código. As demais etapas ficam congeladas para a fase final.
