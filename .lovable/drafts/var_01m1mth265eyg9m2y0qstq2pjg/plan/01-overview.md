# Menu e índice fixos na documentação

Hoje, na página de documentação, o menu da esquerda e o índice da direita
deveriam acompanhar a rolagem, mas não acompanham: eles sobem junto com o
texto e desaparecem da tela.

A causa é real e já verificada na página em execução: o contêiner geral do
site (o mesmo usado por todas as páginas) corta o transbordo horizontal de
uma forma que anula o comportamento "grudar no topo" das colunas laterais.
Também confirmei que o destaque da seção atual no índice da direita já
funciona — ele estava atualizando corretamente durante a rolagem, só não
ficava visível porque a coluna saía da tela.

O que vai mudar:

- O menu da esquerda e o índice da direita passam a ficar parados na tela
  enquanto só o conteúdo do meio rola.
- Cada coluna lateral ganha rolagem própria, para o caso de o menu ou o
  índice ficarem mais longos que a altura da tela.
- O destaque no índice da direita continua acompanhando a seção que a
  pessoa está lendo, incluindo agora um destaque correto quando ela chega
  ao final da página (última seção).
- O índice da direita aparece a partir de telas grandes, junto com o
  espaço reservado para ele — hoje há um desencontro que faz o índice cair
  embaixo do texto em telas intermediárias.
- No celular nada muda: o menu continua sendo aberto por botão e o índice
  segue oculto, como já foi definido.
