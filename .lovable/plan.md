

# Hero com Movimento - Curvas Fluidas Inspiradas no Deck

---

## O que muda

A hero atual tem apenas ondas sutis no fundo e particulas pequenas - pouco impacto visual. As referencias mostram **curvas organicas fluidas e entrelaçadas** no lado esquerdo, como fios de dados em movimento. Vamos recriar isso com SVG animado.

---

## Novo componente: FlowingCurves

Substituir o `WaveBackground` atual por um novo componente com curvas SVG inspiradas nas referencias:

- **8-12 linhas curvas** (paths SVG) posicionadas no lado esquerdo da hero, fluindo verticalmente com ondulacoes organicas
- Cada linha com stroke branco/coral semi-transparente (opacidade entre 0.08 e 0.25)
- Diferentes espessuras (stroke-width de 0.5 a 2)
- **Animacao**: cada curva ondula suavemente com keyframes distintos (translateX oscilante + morphing sutil do path), velocidades entre 8s e 20s, criando efeito de "fios de dados fluindo"
- Posicionamento: ocupa ~35% do lado esquerdo, crescendo de baixo pra cima com curvatura em S
- `prefers-reduced-motion` respeitado

## Ajustes no HeroMovimento

- Mover o conteudo textual levemente para a direita (em telas grandes) para criar assimetria, como nas referencias onde o texto fica no centro-direita
- Manter o layout centralizado em mobile

## Arquivos alterados

1. **`src/components/hometeste/WaveBackground.tsx`** - Reescrito com as curvas fluidas SVG animadas (multiplos paths com strokes finos ondulando)
2. **`src/components/hometeste/HeroMovimento.tsx`** - Layout ajustado: texto deslocado para direita em desktop, mantendo centralizado em mobile
3. **`src/index.css`** - Adicionar keyframes para as curvas (`curve-flow-1` ate `curve-flow-4` com translateX e scaleY oscilantes)

## Detalhe tecnico das curvas

- SVG viewBox cobrindo toda a hero (0 0 800 900)
- Paths desenhados como curvas Bezier em S vertical, similar ao deck
- Cada path com `stroke` branco ou coral, sem `fill`
- Animacao via CSS: `transform-origin` no centro de cada curva, `translateX` oscilando +/- 15-30px com `ease-in-out infinite`
- Diferentes `animation-delay` para cada curva criar efeito de onda organica
- `stroke-dasharray` e `stroke-dashoffset` opcionais para efeito de "desenho" inicial

