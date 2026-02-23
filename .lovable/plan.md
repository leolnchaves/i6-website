
## Ondas horizontais fluidas no hero de /solutions

### Conceito ajustado

As ondas horizontais nao sao um separador -- elas ficam como um elemento decorativo de fundo na parte inferior do hero, fluindo organicamente. O titulo, subtitulo (descrição) e tudo ficam **acima** das ondas, que aparecem como uma faixa decorativa na base da secao, integrada ao fundo escuro sem quebra visual.

### Mudancas

**1. Criar `src/components/solutions/HorizontalWaves.tsx`**

Componente SVG com ondas senoidais horizontais de alta frequencia:
- SVG posicionado com `absolute bottom-0 left-0 w-full` (parte inferior do hero)
- Altura de ~120px, ocupando toda a largura
- 5-6 paths com curvas bezier horizontais (frequencias maiores que as da Home)
- Paleta coral com opacidades variadas (`rgba(244,132,95, 0.15)` a `0.40`)
- Animacoes de "respiracao" vertical suave (translateY)
- Sem borda, sem linha divisoria -- as ondas se dissolvem no fundo escuro

**2. Atualizar `src/components/solutions/SolutionsHero.tsx`**

- Remover import de `WaveBackground` (identidade da Home)
- Importar `HorizontalWaves`
- Posicionar `HorizontalWaves` como elemento absoluto no fundo da secao (nao entre titulo e subtitulo)
- Titulo + subtitulo + descricao ficam todos juntos acima, como estao hoje
- O conteudo textual nao muda de posicao

**3. Adicionar keyframes em `src/index.css`**

4 keyframes novos para a ondulacao vertical suave:
- `wave-horizontal-1`: translateY entre -4px e 4px em 7s
- `wave-horizontal-2`: translateY entre -3px e 5px em 9s
- `wave-horizontal-3`: translateY entre -5px e 3px em 11s
- `wave-horizontal-4`: translateY entre -2px e 6px em 8s

### Estrutura visual

```text
+-----------------------------------------------+
|              HeaderNovo                        |
+-----------------------------------------------+
|                                                |
|         Solucoes que antecipam                  |
|              o mercado.                         |
|                                                |
|     IA que transforma sinais em decisoes...     |
|                                                |
|  ~~~~ ondas coral fluindo na base ~~~~~~~~~~~~ |
|   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~ |
+-----------------------------------------------+
|         proxima secao (metricas)               |
```

As ondas ficam na base do hero, como parte do fundo, sem separar nada. A transicao para a proxima secao e fluida.

### Detalhes tecnicos

**Novo arquivo:** `src/components/solutions/HorizontalWaves.tsx`
- SVG com `viewBox="0 0 1400 120"`, `preserveAspectRatio="none"`
- Posicionamento: `absolute bottom-0 left-0 w-full h-[100px] md:h-[120px]`
- 5 paths senoidais tipo: `M0,60 C70,20 140,100 210,60 C280,20 350,100 420,60...` (alta frequencia)
- Cada path com opacidade, espessura e animacao diferentes
- `pointer-events-none`

**Editar:** `src/components/solutions/SolutionsHero.tsx`
- Trocar `WaveBackground` por `HorizontalWaves` posicionado no bottom da section
- Manter todo o conteudo textual junto (titulo + descricao), sem mudanca de layout

**Editar:** `src/index.css`
- Adicionar 4 keyframes `wave-horizontal-N` com translateY suave
