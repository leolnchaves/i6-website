## Objetivo
Animar as linhas laranjas da seção "Como funcionamos" com pequenas bolinhas de energia percorrendo o caminho: dos bancos/fontes (esquerda) até o card **01**, e do card **04** até as ferramentas (direita).

## Escopo
Somente `src/components/hometeste/ComoFuncionamosSection.tsx`, apenas no bloco SVG desktop. **Nada de alteração de layout, spacing, cores dos cards, tamanhos dos chips, paths existentes ou responsividade.** Apenas adição dos elementos de animação dentro do `<svg>` já existente.

## Implementação (aditiva, sem tocar no layout)
1. Adicionar `id="path-l-${i}"` / `id="path-r-${i}"` nos `<path>` já renderizados (atributo novo, não altera visual).
2. Dentro do mesmo `<svg>`, adicionar após os círculos existentes um `<circle r="2.2" fill="#F4845F">` para cada path, contendo `<animateMotion dur="2.6s" repeatCount="indefinite" begin="${i * 0.25}s"><mpath href="#path-l-${i}" /></animateMotion>`.
3. Sentido:
   - Esquerda: path já é fonte → card 01, animação segue naturalmente. ✅
   - Direita: path já é card 04 → ferramenta, animação segue naturalmente. ✅
4. `<defs>`: adicionar um `<filter id="pGlow">` com `feGaussianBlur stdDeviation="1.2"` aplicado ao circle animado (glow sutil) — nenhuma mudança nos gradientes/paths atuais.
5. Manter todos os círculos estáticos (`leftEnds`/`rightEnds`) e paths intactos.

## Garantias
- Zero mudança em grid, chips, cards, textos, cores base ou responsividade.
- Sem novas dependências — SMIL nativo (`animateMotion` + `mpath`).
- Mobile inalterado (o SVG só existe no desktop).