# Fase 5 — Etapa 2.1 + 2.2 (decisões fechadas)

## Decisões aprovadas
1. Conteúdo invisível usa **`<section class="sr-only">`** (lido por crawlers/screen-readers, oculto visualmente)
2. **2.2.c (link p/ hub filtrado) postergado** para Fase 6
3. **Autonomia no texto** dos MDs — i6HUB revisará depois

---

## Etapa 2.1.a — Revisar MDs Solutions

Editar `public/content/page-solutions-pt.md` e `page-solutions-en.md`:

**1. Adicionar frontmatter no topo:**
```yaml
---
title: Soluções de IA preditiva da infinity6
slug: solutions
language: pt | en
last_updated: 2026-06-12
---
```

**2. Adicionar bloco inicial "Resposta direta"** (citation magnet para LLMs) listando os 4 produtos (i6Signal, i6Previsio, i6RecSys, i6ElasticPrice) e os valores que entregam.

**3. Adicionar bloco novo "i6Signal"** (não existe hoje) — camada conversacional sobre os 3 motores.

**4. Em cada um dos 6 blocos existentes**, adicionar par **Pergunta direta / Resposta direta** entre `Overview` e `Key Features`.

Mantém toda a estrutura atual intacta. Tom: conciso, JTBD, sem floreio.

## Etapa 2.1.b — Plugar no `prerender-seo-stubs.mjs`

1. Adicionar função `loadSolutionsContent(lang)` análoga à `parseStories`
2. Converter markdown → HTML simples (headings + listas + parágrafos)
3. Injetar no `<body>` da rota `/solutions` (PT + EN) dentro de `<section class="sr-only" data-prerender="solutions">…</section>`
4. Adicionar JSON-LD `ItemList` com os 4 produtos como `Product` (brand: infinity6, category: AI software)

> A classe `sr-only` já existe (padrão Tailwind). Crawlers e LLMs leem normalmente; usuário humano não vê.

## Etapa 2.2.a — Microdata Product nos cards

No `StaticSolutionsGrid.tsx`, anotar cada card com:
```tsx
<article
  itemScope
  itemType="https://schema.org/Product"
  id="<anchor>"
  aria-label="..."
>
  <meta itemProp="brand" content="infinity6" />
  ...
</article>
```

Sem mudança visual.

## Etapa 2.2.b — Âncoras de deep-link

IDs por produto: `#i6signal`, `#i6previsio`, `#i6recsys`, `#i6elasticprice`.

Validar mapeamento card → produto (alguns cards do grid hoje são por **valor** — propensão, campanha — não por motor). Estratégia: âncora no card cujo motor principal corresponde, e cards de "valor" recebem ID secundário (`#propensao`, `#pricing-dinamico`).

Sem mudança visual.

## 🟡 Postergado
- **2.2.c** (link "Ver análises" no card → hub filtrado por tema) → Fase 6

## Ordem de execução
1. 2.1.a — revisar MDs (PT + EN)
2. 2.1.b — estender prerender
3. 2.2.a — microdata Product
4. 2.2.b — âncoras
5. Verificar build do prerender, confirmar HTML estático contém o conteúdo