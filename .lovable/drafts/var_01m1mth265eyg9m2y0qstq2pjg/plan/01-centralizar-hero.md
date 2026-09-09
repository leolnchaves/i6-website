# Centralização dinâmica da hero (entre header e faixas de soluções)

## Problema
A hero hoje usa margens/alturas fixas. Em telas grandes funciona, mas em viewports mais baixos (Mac 13", ~800px de altura) a faixa de soluções sobe e fica por cima dos cards animados — o espaço entre header e faixas não é respeitado dinamicamente.

## Correção — tornar a centralização dinâmica

Arquivos: `src/components/home-v3/HeroSuite.tsx` e, se necessário, `src/pages/HomeTeste.tsx` (apenas o wrapper da hero + faixas).

1. **A hero deixa de empurrar as faixas com altura fixa.** O conjunto hero + faixas passa a ser um flex column com `min-h-screen` (desktop): a hero ocupa o espaço flexível (`flex-1`) e as faixas ficam naturalmente ao final — nunca sobrepostas.
2. **Centralização real no espaço livre:** dentro da hero, o grid (coluna esquerda: badge + título + descrição; coluna direita: rótulo + cards animados) é centrado verticalmente com `justify-center` no espaço entre o header e as faixas — sem margens fixas de topo (`mt-10 lg:mt-12` saem).
3. **Respiro mínimo garantido:** padding inferior mínimo na hero (ex.: `pb-6`) para que, mesmo na altura mínima, os cards nunca colem nas faixas. Se o viewport for mais baixo que o conteúdo, a página rola naturalmente — em vez de sobrepor.
4. **Mobile inalterado:** empilhamento atual permanece.

## Fora de escopo
- Textos, animação dos cards, conteúdo e estilo das faixas de soluções, prova social.

## Verificação
- 1280×800 (Mac 13): faixas abaixo dos cards, sem sobreposição; bloco hero centrado no espaço disponível.
- 1440×900: mesmo comportamento já existente preservado.
- 390×844: mobile intacto.
- Typecheck/build.
