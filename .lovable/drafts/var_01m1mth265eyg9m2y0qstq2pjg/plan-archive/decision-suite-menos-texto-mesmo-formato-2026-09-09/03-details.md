# Detalhes técnicos

Arquivo único: `src/components/home-v3/product/DecisionSuiteSection.tsx`.

## Ajustes de conteúdo (no componente, não no arquivo de conteúdo)

Os textos longos vêm de `suiteContent.ts`. Para não mexer no contrato de conteúdo, o componente passa a usar versões **truncadas/resumidas** dos campos existentes, mantendo o mesmo objeto de origem:

- **Pilares**: `pillar.body` é renderizado com `line-clamp-2` (máx. 2 linhas) ou com texto curto fixo derivado do conteúdo existente.
- **Claims dos produtos**: `product.claim` com `line-clamp-1` e `max-w-full`.
- **Painel ativo**:
  - Remove o parágrafo `active.body` e o bloco `active.pain`.
  - Mantém `active.headline`.
  - `capabilities` limitado a 4 primeiros itens (`slice(0, 4)`), ainda em 2 colunas.
  - Fluxo com rótulos em `text-[10px]` e valores em `text-xs line-clamp-1`.

## Ajustes de layout

- Seção: `py-10 md:py-12` (ou menor, conforme validação visual).
- Abertura: margem inferior reduzida (`mb-4 md:mb-5`).
- Pilares: `mt-5 md:mt-6`, cartões `p-3`, `rounded-2xl`, corpo em `text-xs line-clamp-2`.
- Explorador: `mt-8 md:mt-10`, grid mantido `lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]`.
- Itens de produto: `py-2.5` em vez de `py-3`, claim `text-[11px] line-clamp-1`.
- Painel: `p-5 md:p-6` em vez de `p-5 md:p-8`, `rounded-3xl` mantido.
- Capabilities: `mt-4`, `pt-3`, até 4 itens, bullets e texto `text-xs`.
- Fluxo: `mt-4`, `p-3`, `rounded-2xl`, valores `line-clamp-1`.
- CTAs: `mt-5`, botões `py-2.5` com `rounded-full` mantido.

## Mobile

- Pilares empilham, mantendo resumo de 2 linhas.
- Lista de produtos continua com 2 colunas abaixo de `sm` se necessário, claims ocultos abaixo de `xs` para evitar compressão.
- Painel abaixo da lista, sem overflow horizontal.

## Validação

- Typecheck e build.
- Verificação visual PT/EN/ES em 1280×800, 1440×900 e 390×844.
- Confirmar que a seção cabe em ~900px de altura no desktop sem scroll interno e sem perder CTAs.
- Sem release/deploy.
