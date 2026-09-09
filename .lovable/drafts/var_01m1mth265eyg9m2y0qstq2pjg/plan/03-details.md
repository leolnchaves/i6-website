# Detalhes técnicos

Arquivo único: `src/components/home-v3/product/DecisionSuiteSection.tsx`.

- Seção: reduzir `py-20 md:py-28` para ~`py-12 md:py-14`.
- Abertura: `grid gap-8 lg:grid-cols-12 items-end border-b border-border pb-6`; coluna esquerda `lg:col-span-7` com logo, `h2` e descrição (`max-w-xl`); coluna direita `lg:col-span-5` com os três pilares em `grid grid-cols-3 gap-4`, textos compactos (`text-[11px]`), sem `border-t` individual. Em mobile, pilares empilham.
- Explorador: `mt-8 grid gap-6 lg:grid-cols-12`; coluna da lista `lg:col-span-3` contendo eyebrow + título (`text-xl`) + descrição curta + os seis botões em coluna (`gap-1`, `p-3`, `text-xs`), ativo com borda `border-primary`, fundo `bg-card` e nome em `text-primary`. Coluna do painel `lg:col-span-9`.
- Painel: `sand-card p-6 md:p-8 flex flex-col`; corpo e dor em citação no topo; capacidades em linha (`text-[10px]`) com separadores; fluxo em `mt-auto pt-6 grid sm:grid-cols-[1fr_auto_1fr_auto_1fr]` com chevrons `aria-hidden`. Mantém `key={active.id}` e `motion-safe:animate-sand-rise`.
- CTAs: `mt-8 flex flex-wrap justify-center gap-3`, mesmos destinos.
- Tokens de tema apenas (sem hex fixo); tipografia e pesos atuais preservados; trilinguismo intacto via `suiteContent.ts`.
- Ao final: typecheck, build e verificação visual PT/EN/ES em 1280×800, 1440×900 e 390×844 — seção inteira visível sem scroll no desktop e sem overflow horizontal no mobile. Sem publicação.
