## Ajuste do slogan no AttractScreen do /kiosk

Aproximar o slogan da logo até quase sobrepor, alinhando-o horizontalmente ao espaço entre o símbolo do infinito (esquerda) e o "y6" (direita).

### Mudanças

**src/components/kiosk/AttractScreen.tsx**
- Envolver logo + slogan em um wrapper `relative inline-block` para que a largura do slogan seja calculada a partir da largura da logo.
- Aplicar margem negativa vertical maior no slogan (`-mt-[3vmin]` ou similar) para encostar/sobrepor levemente a base da logo.
- Restringir a largura do slogan para ~62% da largura da logo (aproximadamente a distância entre o final do símbolo do infinito e o início do "y"), centralizado, com `mx-auto` e `w-[62%]`.
- Ajustar `text-align: center` e tamanho de fonte se necessário para caber na faixa.

### Notas técnicas
- Valor exato de largura (`~60–65%`) será calibrado visualmente; a logo tem símbolo à esquerda e o "y6" mais à direita, então o vão útil embaixo fica aproximadamente centralizado deslocado ligeiramente à direita — usar `ml-[8%]` no slogan se o alinhamento ótico precisar corrigir.
- Nenhuma outra parte da tela é afetada (rings, headline, CTA).