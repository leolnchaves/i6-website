

## Redesign das ondas horizontais - composicao organica e fluida

### Problema atual

As ondas atuais usam paths SVG preenchidos (`fill`) com curvas uniformes e repetitivas, criando um efeito de "grafico de area" artificial. Alem disso, o hero e a secao de metricas sao tratados como blocos separados, com mini-ondas desconectadas na secao de metricas.

### Solucao

Redesenhar as ondas como uma composicao organica inspirada na imagem de referencia: camadas de "dunas" com amplitudes variadas e irregulares, que fluem da base do hero ate cobrir a secao de metricas. Uma unica composicao visual que abrange ambas as secoes.

### Diferencas chave vs. implementacao atual

| Aspecto | Atual (ruim) | Novo |
|---|---|---|
| Forma das ondas | Seno uniforme e repetitiva | Curvas irregulares com amplitudes variadas (tipo terreno/dunas) |
| Composicao | Hero e metricas separados | Uma unica composicao fluida que abrange as duas secoes |
| Animacao | translateY simples | translateX lento (ondas deslizam horizontalmente) |
| Altura | 120px no hero, 60px nas metricas | ~200px, posicionada na fronteira entre hero e metricas |

### Mudancas

**1. Reescrever `src/components/solutions/HorizontalWaves.tsx`**

- SVG com `viewBox="0 0 2800 200"` (largura dupla para permitir animacao horizontal suave)
- 5 paths com curvas organicas e irregulares (nao senoidais uniformes)
  - Cada path com picos e vales de alturas DIFERENTES (nao repetitivos)
  - Tipo terreno montanhoso: um pico alto, depois um baixo, depois medio, etc.
- Opacidades: de 0.08 (camada mais distante) a 0.40 (mais proxima)
- Animacao: translateX lento (as ondas deslizam horizontalmente, criando movimento sutil)
- Altura maior: `h-[180px] md:h-[220px]`
- Posicionamento: `absolute bottom-0` mas com `translate-y-1/2` para que metade fique no hero e metade "invada" a secao de metricas

**2. Atualizar `src/components/solutions/SolutionsHero.tsx`**

- Remover `overflow-hidden` da section (para as ondas "vazarem" para baixo)
- Manter `HorizontalWaves` como filho da section, mas posicionado para transbordar
- Adicionar `z-index` adequado para as ondas ficarem atras do conteudo de metricas

**3. Atualizar `src/components/solutions/SolutionsMetricsSection.tsx`**

- Remover completamente as mini-ondas SVG que estao no topo (aquelas que parecem graficos)
- A secao fica transparente e limpa, deixando as ondas do hero fluir por baixo
- O conteudo textual das metricas fica acima das ondas com z-index adequado

**4. Atualizar keyframes em `src/index.css`**

- Substituir os 4 keyframes `wave-horizontal-N` por animacoes de translateX (deslizamento horizontal lento)
- Velocidades variadas: 15s a 25s para cada camada
- Movimento sutil: translateX entre 0 e -50% (metade do viewBox, criando loop seamless)

### Estrutura visual resultante

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
|  ~~ ondas organicas comecam aqui ~~~~~~~~~~    |
|  ~~~~~~~~ com picos irregulares ~~~~~~~~~~~    |
+= = = = = = fronteira invisivel = = = = = = = =+
|  ~~~~~~~~ ondas continuam fluindo ~~~~~~~~~~   |
|                                                |
|          "IA aplicada" (metrica)               |
|                                                |
+-----------------------------------------------+
```

As ondas nao respeitam a divisao entre secoes -- elas fluem organicamente de uma para outra.

### Detalhes tecnicos dos paths SVG

Em vez de curvas senoidais uniformes como:
```text
C50,40 100,90 150,60 C200,30 250,85 300,55 (repetitivo)
```

Usar curvas organicas com variacoes reais:
```text
C100,30 200,95 350,50 C450,15 550,80 700,65 C850,20 950,90 1100,35 (irregular)
```

Cada path tera uma "personalidade" diferente: um com picos altos e vales rasos, outro com ondulacao suave, outro com transicoes abruptas.

