

# Fix: Centralizar a seção de testemunhos no desktop

## Problema
O carrossel de testemunhos aparece deslocado para a esquerda no desktop. Isso ocorre por dois motivos:
1. O container externo do carrossel tem padding horizontal muito grande (`lg:px-24`)
2. Os itens do carrossel usam `basis-[30%]`, que somados (90%) nao preenchem toda a largura, e a combinacao com o padding assimetrico desloca tudo para a esquerda

## Solucao

**Arquivo:** `src/components/success-stories/TestimonialsSection.tsx`

1. Remover o padding horizontal excessivo do wrapper do carrossel (trocar `px-4 sm:px-8 md:px-16 lg:px-24` por apenas `px-4`)
2. Ajustar o `basis` dos itens do carrossel de `lg:basis-[30%]` para `lg:basis-1/3` para que 3 cards preencham 100% da largura disponivel

Essas duas mudancas garantem que o carrossel fique centralizado horizontalmente na pagina.

