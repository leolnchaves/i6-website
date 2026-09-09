# Detalhes técnicos

Arquivo único: `src/components/home-v3/product/DecisionSuiteSection.tsx`.

- Seção: padding vertical reduzido (`py-12 md:py-14`); container mantém `#decision-suite`.
- Abertura: logo, `h2` e parágrafo mantêm exatamente classes de tipografia/cor atuais (grafite, sem `text-primary` em parte do título); só o `mb` diminui.
- Pilares: `mt-8 grid gap-4 md:grid-cols-3`; cada pilar é um cartão `rounded-2xl border border-border bg-secondary/50 p-4` com `h3 text-sm font-semibold` e a **descrição completa** em `text-xs leading-relaxed text-muted-foreground` (nada truncado).
- Explorador: `mt-8 grid gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]`; eyebrow PRODUTOS + título mantidos.
- Itens de produto: `rounded-xl p-3 text-left border-l-4 border-transparent`, nome `text-sm font-semibold`, `product.claim` sempre visível em `text-xs text-muted-foreground`. Ativo: `border-l-primary bg-secondary` + leve sombra.
- Painel: `rounded-3xl border border-border bg-card p-6 md:p-8 flex flex-col justify-between`; título, corpo, capacidades em `grid grid-cols-2 gap-y-2` com marcador terracota, fluxo Entrada/Decisão/Valor em faixa `rounded-2xl bg-secondary p-4` com setas `aria-hidden`. Mantém `key={active.id}` e a animação atual.
- CTAs no rodapé do painel: `rounded-full`, mesmos destinos (`SUITE_URL` com `ArrowUpRight`, `localized('/contact')`).
- Mobile: pilares empilham, lista vira 2 colunas se necessário, painel abaixo.
- Ao final: typecheck, build e verificação visual PT/EN/ES em 1280×800, 1440×900 e 390×844 — seção completa sem scroll no desktop e sem overflow no mobile. Sem publicação.
