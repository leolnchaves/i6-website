## Detalhes técnicos

Arquivo único alterado: `src/components/home-v3/product/DecisionSuiteSection.tsx`. Sem mudança em conteúdo (`suiteContent.ts`), rotas, âncora `#decision-suite` ou CTAs.

### Estrutura

- O grid do explorador (`lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]`) passa de `items-start` para `items-stretch` e de `gap-5` para `lg:gap-0`, com a respiração horizontal migrando para `lg:pl-6` no painel. Abaixo de `lg` mantém o `gap-5` atual e o empilhamento.
- A coluna esquerda vira `flex flex-col`: cabeçalho (eyebrow, título, descrição) acima e a lista de produtos em um wrapper `relative` que define a altura de referência.
- O painel recebe `lg:h-full` e continua `flex flex-col justify-between`, então topo e base coincidem com o primeiro e o último card. Como a lista tem 6 cards e o painel tem conteúdo fixo, a lista é a maior das duas e passa a governar a altura.

### A emenda

Somente em `lg` e acima:

- Painel: `lg:rounded-l-none` seria plano demais — mantém `rounded-3xl`, com `border` e fundo `--card`.
- Card ativo: `lg:rounded-r-none`, `lg:border-r-0`, `lg:-mr-px` e `lg:z-10`. O `-mr-px` faz o card sobrepor exatamente a borda esquerda do painel; como os dois usam o mesmo fundo (`--card`), o traço desaparece só naquele trecho e o desenho vira uma peça contínua.
- Para o "pescoço" dos exemplos, o card ativo ganha `lg:pr-5` extra e a lista recebe `lg:pr-6`, de modo que o card avança sobre a faixa que separa as colunas.
- Cards inativos seguem `rounded-xl` com borda completa, fundo `bg-secondary/40`.
- A barrinha terracota à esquerda do card ativo é mantida como marcador de seleção.

### Altura e transbordo

- A lista continua `grid` de uma coluna em `lg`, com `gap-2`; nada é comprimido.
- O painel, com `h-full`, distribui o conteúdo com `justify-between`, então o bloco de capacidades/fluxo fica no topo e os CTAs colam na base — sem esticar textos.
- Alvo: seção continuar caber em ~900 px de altura útil (Mac 13"), sem rolagem interna e sem overflow horizontal.

### Acessibilidade

- Botões seguem `type="button"` com `aria-pressed`, dentro do `role="group"` já existente, e ordem de Tab inalterada (lista antes do painel).
- A conexão é puramente visual (borda e fundo), sem elemento novo focável e sem `aria-hidden` sobre conteúdo real.
- `motion-safe:animate-sand-rise` no painel é preservado; nenhuma animação nova.

### Validação

- PT, EN e ES.
- 1280×800, 1440×900 e 390×844: emenda correta para produto no topo, no meio e na base; sem conexão no empilhado.
- Troca de produto sem salto de layout, sem overflow, `tsgo` e build limpos.
