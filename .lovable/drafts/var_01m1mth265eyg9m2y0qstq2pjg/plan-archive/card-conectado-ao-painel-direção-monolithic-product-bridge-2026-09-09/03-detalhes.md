## Detalhes técnicos

Arquivo único alterado: `src/components/home-v3/product/DecisionSuiteSection.tsx`. Sem mudança em conteúdo (`suiteContent.ts`), rotas, âncora `#decision-suite` ou CTAs.

### Estrutura

- O grid do explorador (`lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]`) passa de `items-start` para `items-stretch` e de `gap-5` para `lg:gap-0`, com a respiração horizontal migrando para `lg:pl-6` no painel. Abaixo de `lg` mantém o `gap-5` atual e o empilhamento.
- A coluna esquerda vira `flex flex-col`: cabeçalho (eyebrow, título, descrição) acima e a lista de produtos em um wrapper `relative` que define a altura de referência.
- O painel recebe `lg:h-full` e continua `flex flex-col justify-between`, então topo e base coincidem com o primeiro e o último card. Como a lista tem 6 cards e o painel tem conteúdo fixo, a lista é a maior das duas e passa a governar a altura.

### A emenda (padrão do protótipo v3)

Somente em `lg` e acima:

- **Itens inativos** deixam de ser cards emoldurados: perdem borda e fundo, viram linhas da régua com `border-b border-foreground/5` (exceto o último) e `opacity-60`, recuperando opacidade total no hover.
- **Item ativo**: `bg-card` (branco), `rounded-l-[14px]` sem contorno à direita, barra terracota à esquerda (`border-l-4 border-primary`), nome em terracota e sombra suave projetada para a esquerda (`shadow-[-20px_10px_40px_-15px_rgba(74,68,63,0.1)]`). Dentro dele, um elemento mascarador absoluto (`absolute -right-px inset-y-0 w-4 bg-card z-30`) cobre a borda esquerda do painel, completando a emenda.
- **Painel**: mantém `bg-card rounded-3xl`, mas sai `sand-card` e passa a usar a sombra difusa do protótipo (`shadow-[20px_20px_60px_-10px_rgba(74,68,63,0.08)]`), sem borda visível no encontro.
- **Larguras**: lista com largura fixa `lg:w-[340px]` e `z-20` acima do painel (`z-10`), para a máscara do item ativo pintar sobre a borda do painel.
- Em `lg`, o grid passa a `gap-0`; a separação visual entre lista e painel deixa de existir — é justamente o que cria a peça única.

### Altura e transbordo

- A lista vira `flex flex-col` com os seis itens; o painel recebe `lg:h-full` dentro do grid com `items-stretch`, então topo e base coincidem com o primeiro e o último item. A lista (maior) governa a altura.
- O painel distribui o conteúdo com `justify-between`: capacidades e fluxo no topo, CTAs na base — sem esticar textos.
- Alvo: seção continuar caber em ~900 px de altura útil (Mac 13"), sem rolagem interna e sem overflow horizontal.

### Acessibilidade

- Botões seguem `type="button"` com `aria-pressed`, dentro do `role="group"` já existente, e ordem de Tab inalterada (lista antes do painel).
- A conexão é puramente visual (borda e fundo), sem elemento novo focável e sem `aria-hidden` sobre conteúdo real.
- `motion-safe:animate-sand-rise` no painel é preservado; nenhuma animação nova.

### Validação

- PT, EN e ES.
- 1280×800, 1440×900 e 390×844: emenda correta para produto no topo, no meio e na base; sem conexão no empilhado.
- Troca de produto sem salto de layout, sem overflow, `tsgo` e build limpos.
