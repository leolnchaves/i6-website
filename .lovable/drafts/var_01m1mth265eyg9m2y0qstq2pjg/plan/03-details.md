# Detalhes técnicos

Arquivo único: `src/components/home-v3/product/DecisionSuiteSection.tsx`.

- Seção: `py-20 md:py-28` → `py-12 md:py-14`.
- Abertura: `max-w-3xl` mantido; logo + `h2` + descrição; remover a faixa atual de pilares em 3 colunas.
- Pilares: faixa subordinada `mt-8 border-y border-border py-3 flex flex-wrap gap-x-8 gap-y-2`; cada item `flex items-center gap-2` com marcador `h-1.5 w-1.5 rounded-full bg-primary`, número `01/02/03` e título curto em `text-xs font-semibold uppercase tracking-wider text-muted-foreground`. Textos: títulos dos pilares atuais, sem corpo (o corpo longo é removido da faixa — o significado permanece nos títulos).
- Explorador: `mt-8 grid gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]`; coluna da lista com eyebrow + título `text-xl` (descrição da suíte removida do cabeçalho do explorador para economizar altura — o texto é preservado se couber, senão omitido) + botões em coluna.
- Botões de produto: `p-3`, nome `text-sm font-semibold` e `product.claim` sempre visível em `text-xs leading-snug text-muted-foreground line-clamp-1` (não só no ativo). Ativo: `border-primary/40 bg-card` + nome `text-primary`.
- Painel: `sand-card p-6 md:p-7 flex flex-col`; topo em `grid lg:grid-cols-[1fr_minmax(0,240px)] gap-6`: headline + corpo à esquerda, dor como cartão lateral (`bg-secondary/60 rounded p-4`, rótulo pequeno em `text-primary`). Capacidades em `text-xs` com marcadores. Fluxo em `mt-auto pt-5 grid sm:grid-cols-[1fr_auto_1fr_auto_1fr]` com chevrons `aria-hidden`. Mantém `key={active.id}` e `motion-safe:animate-sand-rise`.
- CTAs: `mt-8 flex flex-wrap justify-center gap-3`, mesmos destinos (`SUITE_URL` com `ArrowUpRight`, `localized('/contact')`).
- Mobile: tudo empilha naturalmente; lista pode ir a 2 colunas abaixo de `lg` se necessário para não alongar.
- Ao final: typecheck, build e verificação visual PT/EN/ES em 1280×800, 1440×900 e 390×844 — seção inteira sem scroll no desktop, sem overflow no mobile. Sem publicação.
