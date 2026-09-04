# Detalhes técnicos

## Proposta visual
- A faixa vertical terracota passa a fazer parte do próprio título do item destacado, posicionada à esquerda do texto "i6 Builder Summit" e alinhada verticalmente ao centro-x da altura da tipografia.
- Aumento de destaque sem peso: barra mais alta (h-10 ou h-12) e levemente mais grossa (w-[4px]), mantendo bordas arredondadas.
- A linha horizontal abaixo do título continua terracota, mas pode ganhar um leve `shadow-sm` na cor primária para reforçar o brilho sutil.
- O título permanece em `text-primary`; nenhuma caixa, badge ou fundo extra é adicionado.

## Implementação
- Em `CommunityEvents.tsx`, o `<span>` da barra vertical deixa de ser filho do `<li>` com posicionamento absoluto relativo ao item inteiro.
- Ele passa a envolver o título: um `flex items-center gap-3` envolve a barra e o `<span>` do nome, de modo que a barra fique exatamente ao lado do texto.
- A barra só aparece no item destacado (`isHighlight`) e continua oculta em mobile (`md:block`) para manter a escada limpa em telas pequenas.
- A animação de reveal e o comportamento de scroll permanecem os mesmos.

## Validação
- `bun run build`.
- Screenshots PT/EN/ES e mobile para confirmar alinhamento e destaque.
