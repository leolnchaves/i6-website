## Mudança em `PropensityCampaignDemo.tsx`

**Lado esquerdo (linhas 251-266)**: Remover o grid de 2 colunas com os botões. Manter apenas o botão "Ver detalhe do cliente" (drillCta), ocupando a largura total do painel esquerdo, com `min-h-[6vmin]`, alinhado ao final via `mt-auto`.

**Lado direito (após linha 355, dentro do bloco `phase === 'result'`)**: Adicionar o botão "Nova simulação" logo abaixo do quadro POR QUE (Insight), com o mesmo estilo/altura (`min-h-[6vmin]`, `text-[1.55vmin]`, `rounded-full`, largura total do painel direito).

Ambos ficam com o mesmo tamanho (`min-h-[6vmin]` + `w-full`) e mesmo tipo/tipografia, apenas com variação de cor: o CTA primário (drill) permanece coral, e o "Nova simulação" fica com borda branca sutil.
