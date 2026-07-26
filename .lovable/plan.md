## Objetivo
Na conclusão de Personalização + Descoberta Preditiva, alterar a apresentação do resultado APENAS quando o vertical é `fashion` (logado ou anônimo), tratando os 3 itens recomendados como um look completo (não produtos separados).

## Mudanças (somente em `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`, ramo fashion)

1. **Layout do PDP** — quando `vertical === 'fashion'` e `phase === 'pdp'`:
   - Trocar o layout atual (produto selecionado empilhado em cima + grid de recomendados abaixo) por um layout lado a lado:
     - Coluna esquerda: quadro do produto clicado (peça-âncora), com largura reduzida e altura maior — imagem maior/vertical, mantendo categoria, nome e preço.
     - Coluna direita: um único quadro "Look complementar" contendo os 3 produtos recomendados dispostos em linha (grid 3 col dentro do mesmo card, com borda coral única englobando os três, ao invés de 3 cards separados).
   - O rodapé com "Total do look" continua abaixo dos dois quadros.

2. **Clique em recomendado**:
   - Cada um dos 3 itens da linha continua clicável (chama `pickProduct(id)`), mas sem borda/card individual — apenas hover sutil no item dentro do card unificado.

3. **Escopo preservado**:
   - Ramo `products` (varejo genérico logado/anônimo) permanece inalterado — continua com grid 4 col de recomendados abaixo do hero.
   - Fase `list`, `training`, pipeline de raciocínio à direita, argumento, header e tabs permanecem inalterados.
   - Dados (`predictivePersonalization.ts`) não mudam.

## Detalhes técnicos
- Substituir, dentro do bloco `phase === 'pdp'` + `vertical === 'fashion'`, o wrapper único por um `grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]` (aprox.) posicionado logo após o botão "voltar ao catálogo". O card do produto-âncora vira mais estreito e alto (ex.: `aspect-[3/4]` ou `h-full` com imagem `aspect-[3/4]`).
- O card do look no lado direito: um único `rounded-2xl border-2 border-[#F4845F]/40` com título "LOOK COMPLEMENTAR" e, dentro, `grid grid-cols-3 gap-[1vmin]` de itens simplificados (imagem + nome + preço, sem borda própria; botão apenas com `hover:bg-white/[0.04]`).
- O bloco de "Total do look" permanece como faixa abaixo, ocupando a largura total dos dois quadros.
- O produto-âncora deixa de ser o hero horizontal atual (com imagem à esquerda e texto à direita) e passa a ser vertical para casar em altura com o card de look.

## Não muda
- Ramo `products` (logado e anônimo).
- Lógica de treinamento, argumento, latência, cenários e i18n.
- Dados em `src/data/kiosk/demos/predictivePersonalization.ts`.
