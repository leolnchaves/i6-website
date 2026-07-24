Plano para corrigir a imagem PT maior que ENG:

1. Medir as imagens atuais
   - Comparar PT e ENG em desktop/tablet e mobile.
   - Verificar dimensões naturais, proporção e área visível real do PNG transparente.

2. Corrigir a causa sem deformar
   - Manter o mesmo container, posicionamento, `object-contain`, `clip-path` e limites de altura já aprovados na versão ENG.
   - Ajustar apenas os assets PT para que tenham a mesma escala visual da ENG, preservando resolução e transparência.
   - Se o problema for margem/canvas diferente, reprocessar o PNG PT para casar a área visível com a ENG em vez de reduzir via CSS global.

3. Atualizar referências
   - Substituir somente os assets PT usados por `HeroDecisaoV4.tsx`.
   - Não alterar a imagem ENG nem o layout geral da hero.

4. Validar visualmente
   - Conferir `/pt` e `/en` em desktop/tablet.
   - Conferir PT e ENG no mobile.
   - Garantir que o fundo continue integrado, sem faixa aparente, e que o CTA não volte para baixo da dobra.