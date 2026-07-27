Remover, em todas as demos do Kiosk, o pequeno quadrado coral com ícone `Sparkles` que fica no cabeçalho da seção de raciocínio (POR QUE / timeline).

## Arquivos
Remover o `<span>...<Sparkles/></span>` (quadrado coral) e ajustar o `flex` do cabeçalho para que o título continue alinhado corretamente:

- `src/components/kiosk/demos/PropensityCampaignDemo.tsx` (linhas 262–264)
- `src/components/kiosk/demos/PriceTurnoverDemo.tsx` (linha 220)
- `src/components/kiosk/demos/MixAssortmentOrderDemo.tsx` (linha 293)
- `src/components/kiosk/demos/PriceToMarginDemo.tsx` (linha 241)
- `src/components/kiosk/demos/DemandForecastDemo.tsx` (linha 262)
- `src/components/kiosk/demos/PriceMarginDemo.tsx` (linha 229)
- `src/components/kiosk/demos/CommercialTargetsDemo.tsx` (linha 282)
- `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx` (mesmo padrão perto da linha 381)

Escopo: apenas o quadrado coral no header da seção "raciocínio preditivo". Não mexo nos outros usos de `Sparkles` (ex.: o dentro do card "POR QUE" já foi removido em passos anteriores, mas se restar algum na mesma linha do label do POR QUE, também será removido para consistência).
