# Linhas de conexão na abertura de /our-ai

Hoje as três faixas da abertura ficam dentro de uma moldura única, separadas apenas por uma linha fina de borda. A mudança troca essa separação por duas linhas desenhadas, mostrando que cada faixa de cima se apoia na faixa da inteligência, embaixo.

O que muda visualmente:

- As duas faixas de cima (i6 Decision Suite e i6 Builder Platform) passam a ser cartões próprios, com um vão real entre elas e a faixa de baixo.
- Duas linhas finas em terracota, totalmente independentes: cada uma desce reto do meio da base do seu cartão até tocar o topo da faixa "A inteligência", exatamente no ponto abaixo daquele cartão. Nunca se cruzam, não compartilham nenhum trecho, não há ponto de encontro nem marcador de junção.
- A faixa "A inteligência" ganha uma sombra interna suave no topo, dando a sensação de peso apoiado sobre ela.
- Ao entrar na tela, as linhas se desenham uma vez, em meio segundo. Com movimento reduzido ativado no sistema, já aparecem prontas.
- No celular, onde as faixas empilham, as linhas não aparecem.

## Geometria exata das duas linhas

Todas as coordenadas são relativas ao canto superior esquerdo do container da abertura (o wrapper que recebe o overlay), calculadas do próprio DOM.

- Linha A (i6 Decision Suite): parte de x = centro horizontal do cartão Decision Suite, y = borda inferior desse cartão. Chega em x = o MESMO valor de x da partida, y = borda superior da faixa "A inteligência". Ou seja, x1 = x2 — segmento perfeitamente vertical.
- Linha B (i6 Builder Platform): parte de x = centro horizontal do cartão Builder Platform, y = borda inferior desse cartão. Chega em x = o MESMO valor de x da partida, y = borda superior da faixa "A inteligência". Também x1 = x2, vertical.

As duas linhas têm o mesmo y de partida e o mesmo y de chegada, mas x diferentes e constantes dentro de cada linha. Não existe segmento horizontal, não existe coordenada compartilhada em x, não existe círculo ou nó em nenhum dos quatro pontos.

Escopo: apenas a abertura de /our-ai. Nenhuma outra seção da página é tocada.
