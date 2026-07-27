## Ajuste no rótulo de latência (Personalização + Descoberta Preditiva)

Arquivo: `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`

1. Renomear `latencyMs` → `latencySec`: dividir o valor por 1000 e formatar com 2 casas decimais. Faixa exibida passa a ser ~`0.02`–`0.04` s (percepção de velocidade para leigos).
2. No `<span>` da linha 427:
   - Trocar `{latencyMs} ms` por `{latencySec} s`.
   - Adicionar `whitespace-nowrap` para impedir quebra em duas linhas.

Sem outras mudanças (tamanhos, cores e labels i18n permanecem).
