# Documentação: colunas fixas + páginas de vídeo, download e copiar código

Duas frentes independentes, aplicadas na mesma rodada.

## Frente A — Menu e índice acompanham a rolagem

Hoje as duas colunas laterais deveriam ficar paradas na tela, mas sobem
junto com o texto e desaparecem. A causa está confirmada: o contêiner
geral do site corta o transbordo horizontal de um modo que anula o
comportamento de "grudar no topo".

Depois da mudança:

- Menu (esquerda) e índice (direita) ficam parados; só o conteúdo do meio
  rola.
- Cada coluna lateral ganha rolagem própria quando ficar mais longa que a
  tela.
- O destaque da seção atual no índice continua acompanhando a leitura e
  passa a destacar corretamente a última seção quando a pessoa chega ao
  fim da página; o item destacado também rola para dentro da vista do
  próprio índice.
- O índice passa a aparecer no mesmo tamanho de tela em que já existe
  espaço reservado para ele, acabando com o caso em que ele caía embaixo
  do texto.
- No celular nada muda: menu por botão, índice oculto.

## Frente B — Páginas de vídeo, de download e botão de copiar

- Cada página de documentação pode declarar um tipo: artigo (o padrão de
  hoje, sem qualquer mudança no conteúdo já publicado), vídeo ou download.
- Vídeo: aparece a miniatura com um botão de play. O player externo só
  é carregado depois do clique — nada de terceiros carrega antes disso.
- Download: um cartão em destaque acima do texto, com o nome do material e
  link direto para baixar o arquivo.
- Todo bloco de código nas páginas de documentação ganha um botão de
  copiar, com confirmação visual de "copiado". Só nas páginas de
  documentação; o resto do site fica intocado.
- Duas páginas de exemplo (uma de vídeo, uma de download) nos três
  idiomas, já marcadas com o aviso de conteúdo de exemplo, que desaparece
  sozinho quando o conteúdo real for publicado.
