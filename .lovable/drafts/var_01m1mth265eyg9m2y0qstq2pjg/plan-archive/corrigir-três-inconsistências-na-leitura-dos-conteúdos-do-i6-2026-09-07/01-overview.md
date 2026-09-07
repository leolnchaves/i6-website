# Corrigir três inconsistências na leitura dos conteúdos do i6 HUB

A leitura e a renderização estão corretas no geral. Encontrei três pontos que hoje não causam erro visível porque nenhum conteúdo real cai neles, mas que vão gerar defeito assim que o HUB começar a publicar eBooks e research com mais liberdade.

**1. Peça duplicada no i6 Deep Research**
Um item marcado como `i6 eBook` que seja gravado na pasta de research entra na página por dois caminhos diferentes e aparece **duas vezes** na grade, com o mesmo título. Correção: remover repetição por slug + idioma ao montar a lista.

**2. Rótulo de tipo errado no cartão**
Qualquer peça vinda da pasta de research é rotulada no cartão como "i6 Research", mesmo quando o `type` diz `i6 eBook`. Isso também quebra o filtro por tipo para essas peças. Correção: exibir o tipo real declarado no arquivo.

**3. Regra antiga de adivinhação de tipo**
Ainda existe um trecho que, quando um arquivo de research não declara `type`, **inventa** um valor (`i6 eBook` se tiver anexo, senão `i6 Article`) — o que pode empurrar uma peça de research para dentro do blog. A regra vigente é a estrita: sem `type` válido, o item é ignorado. Correção: remover a adivinhação.

Nada muda no visual das três páginas, no conteúdo publicado, nem no sync com o i6 HUB.
