# Redesign do hero do Research

Substituir o layout atual por um **hero compacto onde a imagem de capa serve de fundo apenas para o título e subtítulo** — kicker e back-link ficam fora do bloco com imagem.

## Escopo

Apenas `src/pages/IntelligenceArticle.tsx`. Sem mudanças em markdown, hooks, outras páginas, ou no fluxo gated/PDF.

## Novo hero

```text
┌─────────── container max-w-5xl ───────────┐
│  ← Back to i6 Research                    │  ← link
│  INFINITY6 · RESEARCH         (coral)     │  ← kicker, sem imagem
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │ [imagem cover de fundo, opaca ~35%]   │  │
│  │ + gradiente navy + vinheta            │  │
│  │                                        │  │
│  │  Título grande (4xl→6xl, bold)        │  │
│  │  Subtítulo (lg→xl, white/85)          │  │
│  │  June 12, 2026 · 8 min   (white/60)   │  │
│  └──────────────────────────────────────┘  │
│         ↑ rounded-2xl, min-h ~420-520px    │
│                                            │
│  [conteúdo markdown abaixo]                │
└────────────────────────────────────────────┘
```

- "← Back to i6 Research" no topo (como hoje, no flow normal).
- **Logo abaixo**, o kicker `INFINITY6 · RESEARCH` em coral (`text-[#F4845F]`, uppercase, tracking-[0.3em]) — **fora** do bloco com imagem.
- Bloco do hero: `relative rounded-2xl overflow-hidden`, `min-h-[420px] md:min-h-[520px]`, padding interno `p-8 md:p-12`, conteúdo `flex flex-col justify-end` (texto ancorado na base).
- Imagem: `absolute inset-0 object-cover opacity-35` + overlay `bg-gradient-to-t from-[#0B1224] via-[#0B1224]/70 to-[#0B1224]/40` para legibilidade.
- Dentro do bloco com imagem: apenas **título**, **subtítulo (excerpt)** e **meta (data · read time)**.

## Fallback sem cover

Se `piece.cover_image` for nulo (caso atual de `ruptura-gondola-ia-preditiva`), o bloco mantém a forma e altura, sem `<img>` — apenas navy + leve gradiente para não ficar vazio.

> Hoje esse research não tem `cover_image`, então entra no fallback. Posso adicionar um em paralelo se quiser ver o efeito com imagem.

## Corpo do artigo

- Remove a `<img>` que aparecia entre o meta e o markdown (a imagem agora só vive no hero).
- Markdown continua em `max-w-3xl`, abaixo do hero, com `pt-12`.
- LeadGateForm, botão de PDF, cross-links e CTA final permanecem idênticos.

## Detalhes técnicos

- Helmet e JSON-LD (Article, Breadcrumb, FAQPage) intactos.
- Mobile: bloco `min-h-[360px]`, título `text-3xl`, subtítulo `text-base`, padding `p-6`.
- Sem novas dependências.

## Fora de escopo

- `InsightArticle.tsx` (posso replicar depois se quiser).
- Listagem `/i6-intelligence`.
- Conteúdo do markdown.

Confirma que sigo? E quer que eu adicione um `cover_image` no MD do "ruptura-gondola" para validar com imagem real?
