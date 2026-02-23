
# Alinhar bullets com GIF e conectar linha vertical

## Problemas identificados
1. Os bullets da esquerda e o GIF da direita nao estao alinhados no topo e na base -- o primeiro bullet comeca acima do GIF e o ultimo termina antes da base do GIF.
2. A linha vertical conectora entre o destaque i6Signal e o GIF esta deslocada -- usa `pr-[30%]` que nao corresponde a posicao real da coluna direita do grid.

## Solucao

### 1. Mover a linha vertical para dentro do grid (conectar ao GIF)
Remover o div separado da linha vertical e colocar a linha dentro da coluna direita do grid, no topo do GIF, para que ela se conecte visualmente ao destaque i6Signal acima.

### 2. Remover gap entre i6Signal e o grid
Remover o `mb-0` redundante e garantir que nao ha espaco extra entre o destaque e o grid.

### 3. Alinhar bullets com GIF
Manter `items-stretch` e `justify-between` na coluna dos bullets. Adicionar `pt-10` na coluna dos bullets para compensar a linha vertical no topo do GIF, garantindo que o primeiro bullet alinhe com o topo do GIF e o ultimo com a base.

### Alteracoes no arquivo `src/components/hometeste/SinaisSection.tsx`

| Elemento | Atual | Novo |
|----------|-------|------|
| Div da linha vertical (linhas 133-136) | Div separado com `pr-[30%]` | Removido -- linha movida para dentro da coluna do GIF |
| Coluna do GIF (linha 157) | Sem linha vertical interna | Adicionar div da linha vertical no topo (antes do GIF), com `w-px h-10 mx-auto` |
| Coluna dos bullets (linha 141) | `flex flex-col justify-between` | Adicionar `pt-10` para compensar a linha vertical e alinhar com o GIF |
| Grid container margin | `gap-12 lg:gap-10` com espaco acima | Sem margem extra entre i6Signal e grid |

Isso fara a linha vertical sair do destaque i6Signal e entrar diretamente no topo do GIF, e os bullets se alinharao verticalmente com o conteudo do GIF.
