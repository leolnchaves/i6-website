

## Corrigir ondas: manter concentradas, aumentar amplitude de algumas

### Problema

As ondas foram espalhadas verticalmente (y de 80 a 440), cada uma numa faixa propria. O efeito correto e manter todas concentradas na mesma zona central (~250), mas algumas com amplitude de onda muito maior -- seus picos sobem ate a zona do titulo e seus vales descem ate as metricas.

### Conceito

Todas as 8 ondas compartilham a mesma linha base (centro em y~250). A diferenca entre elas e a **amplitude**:

- **Ondas pequenas** (maioria): oscilam entre y~220 e y~280 -- ficam compactas no centro
- **Ondas medias** (2-3): oscilam entre y~150 e y~350 -- se estendem um pouco mais
- **Ondas grandes** (2): oscilam entre y~50 e y~420 -- picos sobem ate o titulo, vales descem ate as metricas

Todas partem e retornam ao centro. O efeito visual e um "feixe" de linhas concentradas que ocasionalmente se expandem com picos dramaticos.

### Mudanca unica

**Editar `src/components/solutions/HorizontalWaves.tsx`**

Reescrever os 8 paths para que todos tenham centro em ~250 mas com amplitudes diferentes:

```text
Layer 1: centro 250, amplitude pequena (230-270)  -- onda sutil, base
Layer 2: centro 250, amplitude pequena (220-280)  -- onda sutil, base
Layer 3: centro 250, amplitude media (180-320)    -- se estende um pouco
Layer 4: centro 250, amplitude media (160-340)    -- se estende um pouco
Layer 5: centro 250, amplitude grande (80-400)    -- pico sobe ate titulo
Layer 6: centro 250, amplitude grande (50-420)    -- pico sobe ate titulo
Layer 7: centro 250, amplitude pequena (210-290)  -- onda compacta, forte
Layer 8: centro 250, amplitude media (150-350)    -- se estende, sutil
```

As ondas de amplitude grande tem opacidade baixa (0.06-0.10) para nao competir com o texto. As compactas no centro mantem opacidade mais alta (0.20-0.35).

Manter container, viewBox, animacoes e strokeWidth iguais -- so muda os paths `d="..."` e as opacidades.

