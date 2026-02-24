
# Uniformizar altura dos quadros de KPIs nos cards de cases

## Problema
Os dois quadros de metricas (KPIs) dentro de cada card de caso de sucesso tem alturas diferentes dependendo do tamanho do texto do label. Cards com labels curtos ficam menores que cards com labels longos, causando desalinhamento visual.

## Solucao
Adicionar uma altura minima fixa (`min-h-[100px]`) nos containers dos KPIs dentro do `StoryCard.tsx`, garantindo que todos os quadros tenham o mesmo tamanho independente do conteudo.

## Mudanca

### `src/components/success-stories/story-components/StoryCard.tsx`
- Nas duas `div` de metricas (linhas 71-78), adicionar `min-h-[100px]` e `flex flex-col justify-center` para que o conteudo fique centralizado verticalmente dentro de um box de tamanho uniforme.

Antes:
```
<div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
```

Depois:
```
<div className="text-center p-3 bg-white/5 rounded-lg border border-white/10 min-h-[100px] flex flex-col justify-center">
```

Aplicado em ambos os quadros de metricas (metric1 e metric2).
