
## Ondas verticais na lateral esquerda da pagina inteira

### Conceito

Mover as ondas da posicao horizontal no hero para a posicao **vertical na lateral esquerda**, cobrindo toda a altura da pagina de Solutions. As ondas ficam como um background fixo/absoluto colado na borda esquerda. As secoes (hero, metricas, grid, process flow, CTA) ficam por cima com seus proprios backgrounds, mas nos espacos entre secoes ou em areas com fundo transparente, as ondas continuam visiveis.

### Mudancas

**1. Criar `src/components/solutions/VerticalWaves.tsx`**

Novo componente que substitui o HorizontalWaves:
- Container: `fixed left-0 top-0 h-full pointer-events-none z-[1]` com largura de ~200-250px
- SVG com `viewBox="0 0 500 2000"` (estreito e alto, invertido do horizontal)
- Rotacionar a logica dos paths: o eixo principal agora e vertical (Y vai de 0 a 2000), e as ondulacoes acontecem no eixo X (oscilando em torno de x~250)
- Manter as mesmas 8 layers com mesmas amplitudes e opacidades, mas agora na horizontal:
  - Layers pequenas: oscilam entre x~230 e x~270
  - Layers medias: oscilam entre x~150 e x~350
  - Layers grandes: oscilam entre x~50 e x~420
- Manter animacoes SMIL (`<animate>` no atributo `d`) com mesmas duracoes
- Manter respiracao CSS, agora usando `translateX` em vez de `translateY`

**2. Editar `src/pages/Solutions.tsx`**

- Adicionar `relative` ao container principal
- Importar e renderizar `VerticalWaves` como filho direto do container principal (fora de qualquer secao), com `position: fixed` para que acompanhe o scroll
- Garantir que as secoes tenham `position: relative` e `z-index` maior para ficarem por cima

**3. Editar `src/components/solutions/SolutionsHero.tsx`**

- Remover o import e uso do `HorizontalWaves` (as ondas agora vem do nivel da pagina)

**4. Editar `src/index.css`**

- Adicionar keyframes de respiracao horizontal:
  - `wave-breathe-x-1`: translateX oscilando entre -8px e 8px
  - `wave-breathe-x-2`: translateX oscilando entre -5px e 5px
  - `wave-breathe-x-3`: translateX oscilando entre -12px e 12px

### Estrutura dos paths verticais

Cada path agora segue o eixo Y de cima para baixo. Exemplo de um path pequeno:

```text
M250,0 C235,100 265,250 240,400 C230,550 268,700 245,850 ...continuando ate Y=2000
```

Os pontos de controle oscilam no eixo X em torno do centro (250), criando ondulacoes laterais conforme descem pela pagina.

### Resultado visual

- Faixa de ondas animadas na lateral esquerda da tela inteira
- As ondas acompanham o scroll (position fixed)
- As secoes da pagina cobrem as ondas com seus backgrounds
- Nos gaps e areas com background transparente/semitransparente, as ondas aparecem como identidade visual continua
- Efeito de "sinal vivo" percorrendo toda a pagina
