# Alinhar cards animados ao título + descrição (hero)

## Problema
Na hero da home, a coluna esquerda (título + descrição) está centralizada verticalmente — posição correta. A coluna direita (rótulo "Próxima melhor decisão" + pilha de cards animados) começa no topo do grid, ficando alta demais em relação ao bloco de texto.

## Correção (1 arquivo)
`src/components/home-v3/HeroSuite.tsx`, grid da hero (~linha 168):

- Trocar o alinhamento do grid de `items-start` para `lg:items-center` (mobile mantém o comportamento atual).

Resultado: as duas colunas se centralizam verticalmente uma em relação à outra. A posição do título + descrição não se move (é a referência correta); os cards + rótulo descem até alinhar.

Nada mais muda: animação dos cards, textos, faixas de solução, prova social e mobile permanecem intactos.

## Verificação
- Screenshot desktop (1280×800 e 1440×900): rótulo "Próxima melhor decisão" alinhado visualmente ao topo do título.
- Mobile (390×844): ordem e espaçamentos inalterados.
- Typecheck/build.
