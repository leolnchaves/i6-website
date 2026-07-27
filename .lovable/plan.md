Diferenciar visualmente as duas faixas de seleção (MODA vs BENS DE CONSUMO) na demo de Personalização + Descoberta Preditiva, para eliminar a confusão entre elas.

## Alterações em `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx` (linhas 190–222)

- Remover o wrapper único cinza (`bg-white/[0.02]` com todas as rows dentro) e renderizar cada faixa como um bloco independente com identidade própria:
  - **MODA** (fashion): faixa com fundo `bg-[#F4845F]/[0.06]`, borda esquerda de destaque `border-l-4 border-l-[#F4845F]` e borda geral `border border-[#F4845F]/25`.
  - **BENS DE CONSUMO** (products): faixa com fundo `bg-sky-400/[0.05]`, borda esquerda `border-l-4 border-l-sky-400/70` e borda geral `border border-sky-400/20`. O rótulo à esquerda passa a usar `text-sky-300` (em vez de coral) para reforçar a diferença.
- Aumentar levemente o espaçamento vertical entre as duas faixas (`gap-[1vmin]`) para separá-las com clareza.
- Os botões (Usuário anônimo / Usuário logado) mantêm o mesmo estilo e o realce coral quando ativos — apenas o "trilho" da faixa muda de cor.

Sem outras mudanças estruturais ou de conteúdo.
