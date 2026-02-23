

## Expandir ondas para cobrir toda a secao hero + metricas

### O que muda

As ondas atualmente ficam confinadas numa faixa de ~220px na fronteira entre hero e metricas. A ideia e expandi-las verticalmente para que ocupem praticamente toda a altura do hero (invadindo titulo e subtitulo) e tambem desçam ate a secao de metricas -- tudo com opacidade baixa para nao competir com o texto.

### Abordagem

**1. Editar `src/components/solutions/HorizontalWaves.tsx`**

- Aumentar a altura do container de `h-[180px] md:h-[220px]` para `h-[500px] md:h-[600px]`
- Ajustar o posicionamento: em vez de `bottom-0 translate-y-1/2`, usar algo como `bottom-0 translate-y-[30%]` para que as ondas subam ate a area do titulo e desçam ate as metricas
- Expandir o viewBox vertical: de `0 0 2800 200` para `0 0 2800 500`
- Redistribuir os 5 paths existentes ao longo de toda a altura (y entre ~50 e ~450)
- Adicionar 2-3 paths extras na parte superior (zona do titulo) com opacidade muito baixa (0.04 a 0.08) -- essas sao as que "invadem" o titulo
- Adicionar 1-2 paths extras na parte inferior (zona das metricas) com opacidade baixa (0.06 a 0.10)
- Total: ~8 paths, distribuidos verticalmente
- Manter `stroke` (sem fill), manter as animacoes de `wave-slide-N`

**2. Nenhuma mudanca nos outros arquivos**

O `SolutionsHero.tsx` e o `SolutionsMetricsSection.tsx` ja estao configurados corretamente (sem overflow-hidden, bg-transparent nas metricas). So o componente de ondas precisa crescer.

### Distribuicao vertical dos paths

```text
y~80   ---- onda muito sutil (0.04) ---- invade titulo
y~130  ---- onda sutil (0.06) ---------- invade titulo  
y~180  ---- onda leve (0.08) ----------- entre titulo e centro
y~230  ---- onda media (0.14) ---------- centro (foco principal)
y~280  ---- onda media-forte (0.22) ---- centro
y~330  ---- onda forte (0.30) ---------- centro-baixo
y~380  ---- onda mais forte (0.35) ----- invade metricas
y~430  ---- onda sutil (0.10) ---------- invade metricas
```

As ondas no centro mantem opacidade mais alta (foco visual). As que invadem titulo e metricas sao bem sutis para nao atrapalhar a leitura.

### Detalhes tecnicos

- Cada path usa curvas Bezier irregulares (mantendo o estilo organico atual)
- Os paths superiores tem `strokeWidth` menor (1.5) e os centrais mantem (2.5-3)
- Reutilizar os mesmos keyframes `wave-slide-1` a `wave-slide-5`, alternando entre os paths
- Sem mudancas no CSS
