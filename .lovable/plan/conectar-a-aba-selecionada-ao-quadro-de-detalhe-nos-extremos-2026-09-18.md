# Conectar a aba selecionada ao quadro de detalhe nos extremos

## Objetivo

Quando o primeiro ou o último produto da aba está selecionado, a borda arredondada do quadro de detalhe deixa um pequeno vão onde o fundo da página aparece entre a aba e o quadro. Nos itens do meio isso não acontece.

Queremos fechar esse vão sem perder o arredondamento do quadro:

- Primeiro item selecionado → canto superior esquerdo do quadro fica reto
- Último item selecionado → canto inferior esquerdo do quadro fica reto
- Itens do meio → quadro continua totalmente arredondado, como hoje

O arredondamento dos outros três cantos e o visual no celular permanecem iguais.

## Diagnóstico confirmado na prévia

Medido no desktop (1280px), na seção da i6 Decision Suite:

- A aba selecionada encosta exatamente na borda esquerda do quadro (separação 0).
- A aba do topo começa na mesma altura do topo do quadro; a aba de baixo termina na mesma altura da base do quadro.
- O quadro tem arredondamento de 24px nos quatro cantos.

Ou seja: nos extremos, a curva de 24px do canto esquerdo do quadro se afasta da borda da aba, e o fundo da página aparece nesse triângulo de poucos pixels. No meio, a aba encosta na parte reta da lateral do quadro, por isso não há vão.

## O que será feito

Em `src/components/home-v3/product/DecisionSuiteSection.tsx`:

1. Descobrir a posição do produto selecionado na lista (primeiro, último ou do meio).
2. Aplicar no quadro de detalhe, apenas na versão desktop, o arredondamento condicional:
   - primeiro item → canto superior esquerdo reto
   - último item → canto inferior esquerdo reto
   - demais itens → nada muda
3. Manter o arredondamento completo em celular e tablet, onde a aba fica acima do quadro e não há conexão entre eles.

Nenhum texto muda. Nenhuma cor, sombra ou fonte muda. O componente e os arquivos de conteúdo continuam os mesmos.

### Como fica o critério

```text
índice 0 (Relevance)     -> canto superior esquerdo reto
índice 5 (Targeting)     -> canto inferior esquerdo reto
índices 1 a 4            -> quadro arredondado como hoje
```

O critério usa a posição real na lista, então continua correto se a ordem ou a quantidade de produtos mudar, e funciona igual em português, inglês e espanhol.

## Riscos e cuidado visual

O canto reto no topo/base é a solução pedida e é discreta. Se depois você achar o canto "duro" demais, o ajuste natural é trocar por um arredondamento bem pequeno nesse canto em vez de reto — mudança de uma linha, sem impacto no resto.

## Como vou validar

- Capturar a seção no desktop com o primeiro, um do meio e o último produto selecionados, conferindo que o vão sumiu e que os demais cantos seguem arredondados.
- Conferir nos três idiomas.
- Conferir no celular (390px) que o quadro continua arredondado por completo.
- Checar o log de build e o tipo do projeto para garantir que nada quebrou.
