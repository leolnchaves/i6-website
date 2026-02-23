

## Tornar as ondas realmente fluidas com animacao de morfismo

### Problema

Atualmente as ondas usam `translateX` com timing `linear`, o que cria um efeito de "desenho deslizando" -- nao parece onda real. Para parecer ondas organicas e fluidas, precisamos que os proprios paths se deformem e ondulam no lugar.

### Solucao

Usar **SVG SMIL animation** (`<animate>` no atributo `d`) para interpolar entre diferentes formas de onda. Cada path tera 3-4 variantes de forma que se misturam continuamente, criando o efeito de onda real que sobe e desce organicamente. Combinar com leve `translateY` via CSS para adicionar respiracao vertical.

### Mudancas

**1. Editar `src/components/solutions/HorizontalWaves.tsx`**

- Remover `w-[200%]` do SVG (nao precisa mais de largura dobrada pois nao vai deslizar)
- Mudar para `w-full`
- Remover classes `animate-[wave-slide-N]` de todos os paths
- Adicionar elemento `<animate>` dentro de cada `<path>` com:
  - `attributeName="d"` -- anima a forma do path
  - `values` com 3-4 variantes do path (mesma estrutura, pontos de controle diferentes)
  - `dur` variando entre 4s e 10s por layer (velocidades diferentes)
  - `repeatCount="indefinite"`
- Adicionar CSS classes com `translateY` sutil para respiracao vertical em alguns layers

**2. Editar `src/index.css`**

- Adicionar 2-3 keyframes de "respiracao" vertical:
  - `wave-breathe-1`: translateY oscilando entre -8px e 8px (6s)
  - `wave-breathe-2`: translateY oscilando entre -5px e 5px (8s)
  - `wave-breathe-3`: translateY oscilando entre -12px e 12px (10s)

### Exemplo de um path animado

```xml
<path fill="none" stroke="rgba(244,132,95,0.20)" strokeWidth="1.5">
  <animate
    attributeName="d"
    dur="6s"
    repeatCount="indefinite"
    values="
      M0,250 C120,235 280,265 450,240 C620,230 750,268 950,245 ...;
      M0,250 C120,260 280,238 450,265 C620,270 750,232 950,258 ...;
      M0,250 C120,242 280,255 450,248 C620,245 750,260 950,240 ...;
      M0,250 C120,235 280,265 450,240 C620,230 750,268 950,245 ...
    "
  />
</path>
```

Cada variante inverte suavemente picos e vales -- quando um ponto sobe, na variante seguinte ele desce, criando ondulacao real.

### Distribuicao das 8 layers

Manter a mesma estrutura de amplitudes (pequenas, medias, grandes) e opacidades. Apenas trocar o tipo de animacao:

- **Layers 1-2 (pequenas)**: morfismo rapido (4-5s) + respiracao leve
- **Layers 3-4 (medias)**: morfismo medio (6-7s) + respiracao media
- **Layers 5-6 (grandes)**: morfismo lento (8-10s) + respiracao ampla
- **Layer 7 (compacta forte)**: morfismo rapido (5s)
- **Layer 8 (media sutil)**: morfismo lento (9s) + respiracao leve

### Resultado visual

Em vez de um desenho deslizando horizontalmente, as ondas vao pulsar e ondular no lugar -- picos subindo e descendo, vales se formando e desaparecendo, como ondas reais de agua ou sinais de radio vivos.

