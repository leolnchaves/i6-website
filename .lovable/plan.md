Ajustar a largura do subtítulo do hero na landing page para que se estenda até a borda direita do container, alinhado aos demais blocos de texto.

**Mudança:**
- Em `src/pages/TransformationLanding.tsx`, linha 54: remover `max-w-2xl` da classe do parágrafo `piece.hero_sub`.

**Resultado:** o parágrafo passa a ocupar a largura total do container (`max-w-5xl`), igual aos textos das seções de conteúdo abaixo.