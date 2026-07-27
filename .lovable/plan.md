## Problema
No card do produto selecionado (PDP) da demo de Personalização, o texto (nome do produto, categoria e preço) está quebrando porque hoje o layout é horizontal: imagem 14vmin × 14vmin à esquerda e texto espremido à direita.

## Correção
Arquivo: `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx` (linhas 280–300).

- Trocar o container interno de `flex gap-[1.5vmin] items-center` (row) para `flex flex-col gap-[1vmin] items-center text-center`.
- Imagem em cima ocupando toda a largura do card (`w-full aspect-square` ou `w-full h-[14vmin]`), com `rounded-xl overflow-hidden`.
- Textos abaixo (categoria • nome • preço) centralizados, mantendo os tamanhos atuais (`text-[1.2vmin]`, `text-[1.7vmin]`, `text-[2.2vmin]`) e removendo o `truncate`/`min-w-0` — sem risco de quebra feia porque a largura agora é a do card inteiro.
- Ajustar o wrapper (linha 280) removendo `flex items-center` e passando `flex flex-col` para acomodar o novo empilhamento.

Escopo restrito: só afeta o card esquerdo do PDP no cenário fashion; a matriz de seleção, o card do "Look" e a lista inicial de SKUs permanecem inalterados.
