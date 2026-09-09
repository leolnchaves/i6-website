## Detalhes técnicos

### Arquivo alterado

`src/components/home-v3/product/DecisionSuiteSection.tsx`

#### Bloco de CTAs (linhas ~165-180)

Substituir o container e os botões atuais por uma versão que espelhe as proporções dos CTAs da Builder Section:

- Container: manter `mt-5 flex flex-wrap items-center justify-start gap-3` (igual Builder).
- Botão primário (externo):
  - `rounded-2xl` (em vez de `rounded-full`)
  - `px-7 py-3.5` (em vez de `px-5 py-2`)
  - `font-bold` (em vez de `font-semibold`)
  - `ArrowUpRight size={16}` (em vez de 14)
  - Manter `bg-primary text-primary-foreground`
  - Manter transição existente (`hover:brightness-110`) — não afeta cor base.
- Botão secundário (interno `/contact`):
  - `rounded-2xl`
  - `px-7 py-3.5`
  - Manter `font-semibold`
  - Manter `border border-foreground text-foreground`
  - Manter hover existente.

### Não será alterado

- Textos em `ctaCopyByLang` (`Conhecer a i6 Decision Suite`, `Falar com especialista`, etc.).
- Links/destinos (`SUITE_URL`, `/contact`).
- Seletor de produtos, painel, fluxo, pilares ou qualquer outra parte da seção.
- Outras páginas ou componentes.

### Validação

1. `bun run build` ou `npx tsgo --noEmit` para garantir que não há erros de tipo/build.
2. Visualização rápida no preview de `/pt` para confirmar que os botões da seção Decision Suite ficam alinhados em tamanho e shape com o botão "Construir com o i6 Builder".
3. Checar os três idiomas (PT/EN/ES) e o breakpoint mobile para garantir que o `flex-wrap` continua funcionando.

### Não será feito

- Nenhuma publicação/tag/release.
- Nenhuma alteração de conteúdo ou copy.
- Nenhuma mudança de cor, animação ou hover além do necessário para padronizar tamanho/shape.
