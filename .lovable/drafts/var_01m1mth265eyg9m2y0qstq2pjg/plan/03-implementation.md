## Detalhes técnicos

- `src/data/comunidade/placeholders.ts` — `OPENING_IMAGES` passa de 2 para 5 entradas, cada uma com `tilt`, `ratio` e `offset` próprios, mantendo o `src` de placeholder isolado para troca futura pelas fotos reais.
- `src/components/comunidade/CommunityOpening.tsx`
  - o `<h1>` e seu markup ficam byte-idêntico: nenhuma classe, quebra, grifo ou wrapper alterado;
  - o bloco decorativo `hidden md:block` passa a mapear as cinco imagens com posições absolutas fixas na metade direita e nas bordas superior/inferior, tamanhos distintos, `rotate-[…]` entre -6° e +7°, `opacity` entre 55% e 80%, `ring-1 ring-border` e `rounded-[1.25rem–2rem]`; todas com `pointer-events-none` e fora da caixa do texto;

  - entrada com `animate-sand-rise` e `animation-delay` escalonado por índice; nenhuma animação nova em CSS global;
  - remoção do `<span>` do badge (`copy.tag`) do bloco de CTAs; o botão continua como está;
  - faixa mobile passa a exibir três recortes com alturas alternadas, ainda `md:hidden`, sem overflow horizontal;
  - todas as imagens seguem decorativas (`aria-hidden`, `alt=""`, `loading="lazy"`).
- `src/data/comunidade/content.ts` — a chave `tag` deixa de ser usada; será removida dos três idiomas para não deixar texto morto.

Sem mudança em rota, SEO, formulário, cabeçalho/rodapé, demais seções ou pipeline. `prefers-reduced-motion` continua desligando as entradas pelas regras globais do tema.
