
# Alinhar bullets e GIF no topo e na base (desktop)

## Problema
Atualmente o grid usa `items-end`, fazendo com que os bullets e o GIF se alinhem apenas pela base. O usuario quer que ambas as colunas comecem alinhadas no topo e terminem alinhadas na base.

## Solucao

No arquivo `src/components/hometeste/SinaisSection.tsx`, linha 139:

1. **Trocar `items-end` por `items-stretch`** no grid container -- isso faz ambas as colunas ocuparem a mesma altura.
2. **Adicionar `justify-between`** na coluna dos bullets (`space-y-0` -> remover e usar `flex flex-col justify-between h-full`) para distribuir os 6 bullets uniformemente ao longo da altura, alinhando o primeiro bullet com o topo do GIF e o ultimo com a base.
3. **Na coluna do GIF**, garantir que o container tambem preencha a altura com `h-full` e use `justify-center` ou `justify-start` para o GIF ficar alinhado ao topo.

### Alteracoes especificas

| Linha | Atual | Novo |
|-------|-------|------|
| 139 | `items-end` | `items-stretch` |
| 141 | `space-y-0 order-2 lg:order-1` | `flex flex-col justify-between order-2 lg:order-1` |
| 157 | `relative flex flex-col items-center overflow-hidden lg:overflow-visible order-1 lg:order-2` | `relative flex flex-col items-center justify-start overflow-hidden lg:overflow-visible order-1 lg:order-2` |

Isso fara com que os bullets se distribuam verticalmente para ocupar a mesma altura do GIF, alinhando topo com topo e base com base.
