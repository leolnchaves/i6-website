# Ajuste de posicionamento do vídeo na Hero PT

## Contexto
A hero da página inicial em PT (`/pt`) exibe um vídeo de fundo neon com a arte central. A pedido do usuário, o vídeo deve ser descido levemente para ficar melhor encaixado entre o título superior e a descrição/CTA inferior, evitando que a arte central fique colada ao título ou pareça "flutuar no meio do nada".

## Escopo
Apenas ajuste visual do componente `src/components/hometeste/HeroDecisaoV4.tsx`. Não alterar conteúdo, copy, imagem, vídeo, outros breakpoints de língua (EN) ou qualquer lógica de negócio.

## Ajustes propostos

### Mobile (`md:hidden`)
Manter a faixa de vídeo em `object-contain`, mas descer um pouco para centralizar melhor entre o título e a descrição:
- Ajustar `top-[26svh]` para aproximadamente `top-[28svh]` ou `top-[30svh]`.
- Reduzir `h-[38svh]` para aproximadamente `h-[34svh]` ou `h-[32svh]` para dar mais respiro entre a arte e a descrição.
- Ajustar os gradientes de fade (`0%` / `10%` / `74%` / `90%`) para acompanhar a nova posição.

### Desktop (`md:` e acima)
Atualmente o vídeo ocupa `inset-0 object-cover` (tela cheia). A ideia é descer a composição visual levemente, aproximando a arte do centro geométrico entre título e CTA, sem perder o efeito de tela cheia:
- Manter `absolute inset-0` e `object-cover`, mas adicionar um leve deslocamento da imagem via `object-position` (ex: `object-center` para `object-[center_60%]` ou similar) para empurrar a arte para baixo.
- Alternativa, se a imagem ainda estiver muito alta, reduzir a opacidade do título? Não, apenas posicionamento.
- Revisar a distribuição vertical do fade do desktop para que o título e a descrição não fiquem cobertos pela parte mais brilhante da arte.

### Z-index e espaçamento
- Verificar se o título (`pt-[11vh]` etc.) e a descrição (`pb-[3vh]`) já estão adequados; se o vídeo descer, pode ser necessário ajustar o padding do título para dar mais espaço vertical entre texto e arte.
- Ajustar o `glow coral` radial para acompanhar a nova posição central.

## Critério de aceite
- Preview na rota `/pt` mostra o vídeo posicionado entre o título e a descrição/CTA, sem cortar a arte central e sem criar faixas vazias estranhas.
- Responsividade preservada em desktop e mobile.
- Sem regressão na versão EN (imagem estática).

## Implementação
1. Ajustar classes de posicionamento e gradientes no componente `HeroDecisaoV4.tsx`.
2. Verificar visualmente no preview `/pt`.
3. Se aprovado, publicar patch `v2.2.24` via GitHub release.
