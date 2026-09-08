# Detalhes técnicos

Arquivo único: `src/components/home-v3/product/DecisionSuiteSection.tsx`.

- Remover o grid externo `xl:grid-cols-[0.8fr_1.2fr]`. A seção passa a ser vertical: abertura → pilares → explorador → CTAs.
- Abertura: logo + `h2` com `copy.intro.title` + `copy.intro.description` limitados a `max-w-3xl`.
- Pilares: `grid gap-8 md:grid-cols-3`, sem `sand-card` — apenas `border-t border-border pt-5` em cada um, título `text-sm font-semibold` e corpo `text-sm text-muted-foreground`.
- Rótulo do explorador: `copy.products.eyebrow` como eyebrow terracota e `copy.products.title` reduzido a `text-xl font-semibold` (deixa de ser um segundo `h2` grande); `copy.products.description` em `text-sm`, `max-w-2xl`.
- Explorador: `grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] items-start`.
  - Lista: `role="group"` com `aria-label={copy.products.selectorLabel}` mantido; botões em coluna, largura total, `aria-pressed`, ativo com `bg-card`, barra `bg-primary` de 2px à esquerda e nome em `text-primary`; `claim` visível apenas no item ativo para não pesar a lista.
  - Painel: mantém `key={active.id}` e `motion-safe:animate-sand-rise`; fluxo em `grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]` com os chevrons como elementos separados `aria-hidden`.
- Em telas menores que `lg`, a lista fica acima do painel; abaixo de `sm` a lista pode voltar a duas colunas para não alongar demais.
- CTAs: `flex flex-wrap justify-center gap-3` no fim da seção, mesmos destinos (`SUITE_URL` com `ArrowUpRight`, `localized('/contact')`).
- Sem mudança em `suiteContent.ts`, `HomeTeste.tsx`, hooks ou conteúdo. Ao final: typecheck, build e verificação visual PT/EN/ES em desktop e mobile. Sem publicação.
