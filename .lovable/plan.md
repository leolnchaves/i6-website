## Ajustar Forecast Preditivo do i6 Signal para varejo/e-comm

No fluxo `/kiosk` → solução **Forecast Preditivo** (`demand-forecasting`), o `KioskSignalIntelliboard` mostra dois cenários: `forecast` (Q1 "Sazonalidade") e `supply` (Q2 "Ruptura"). Ambos hoje respondem com medicamentos (Paracetamol 750mg, Dipirona/Omeprazol/Losartana...). Vamos trocar por produtos de varejo/e-comm e adicionar linha de vendas projetadas no gráfico do Q1.

### 1. Q1 — Sazonalidade (cenário `forecast`)
Trocar "Paracetamol 750mg (ID 28822)" por um produto de e-comm com pico de dezembro (Black Friday + Natal) coerente com a narrativa atual (+34% em Dez, tendência +8,2%/trimestre):
- PT: **Smart TV 55'' 4K (SKU 28822)**
- EN: **55'' 4K Smart TV (SKU 28822)**

Atualizar `title`, `analysis` e `chartNote` para linguagem de varejo/e-comm (curva de fim de ano, categoria eletrônicos, expansão em marketplaces em vez de "farmácias independentes"). Ajustar `actions` e `questions` para o mesmo contexto (campanhas Black Friday, canais marketplace, categorias correlatas).

### 2. Gráfico do Q1 — adicionar linha de "Vendas Projetadas"
Em `src/data/signalDemo/content.ts`, estender `chartData` para incluir um terceiro campo `projected` em cada mês (Out/Nov/Dez), representando a venda projetada final (fusão de sazonalidade + tendência com ajuste do modelo). Valores propostos:
- Out: seasonality 12.400 / trend 11.800 / **projected 12.900**
- Nov: seasonality 14.200 / trend 12.600 / **projected 15.100**
- Dez: seasonality 18.900 / trend 13.400 / **projected 19.800**

Em `src/components/signalDemo/visualizations.tsx`, adicionar em `ForecastChart` uma terceira `<Line>` (verde `#10b981`, `strokeDasharray="5 5"`, dot) com nome **"Vendas projetadas" / "Projected sales"**, aparecendo na legenda ao lado de Sazonalidade e Tendência.

### 3. Q2 — Ruptura (cenário `supply`)
Trocar os 5 SKUs farmacêuticos por SKUs de varejo/e-comm de alta demanda no Q4, mantendo estrutura e probabilidades:
| SKU | PT | EN |
|---|---|---|
| 44210 | Fone Bluetooth Over-ear | Over-ear Bluetooth Headphones |
| 31087 | Air Fryer 5L Digital | 5L Digital Air Fryer |
| 28901 | Smartwatch Fitness GPS | Fitness GPS Smartwatch |
| 55432 | Cafeteira Espresso Automática | Automatic Espresso Machine |
| 19876 | Câmera de Segurança Wi-Fi | Wi-Fi Security Camera |

Atualizar `analysis` (produto líder de risco = Fone Bluetooth, sazonalidade de fim de ano, lead time de importação) e as `actions` (`Renegociar contratos`, `Ajustar forecast`, `Revisar estoque de segurança`) para referenciarem os novos SKUs. Manter os valores de probabilidade/estoque e o impacto de R$ 510.000 / trimestre inalterados.

### Detalhes técnicos
- Arquivos:
  - `src/data/signalDemo/content.ts` — blocos `pt.scenarios.forecast`, `pt.scenarios.supply`, `en.scenarios.forecast`, `en.scenarios.supply` (título, análise, tabela, chartData com `projected`, chartNote, actions, questions).
  - `src/components/signalDemo/visualizations.tsx` — `ForecastChart`: adicionar prop implícita `projected` no tipo do `data` e nova `<Line dataKey="projected" ...>` com rótulo bilíngue via prop `lang` já existente.
- Nenhum outro consumidor de `ForecastChart` fora do Intelliboard, então a nova série é aditiva e retrocompatível.
- Não altero a identidade global VIVARIS PHARMA nos demais cenários (`pricing`, `comercial`, `mix`, `pdv`, etc.) — o ajuste é escopado a **Forecast Preditivo**.

### Observação
A memória `mem://features/i6signal-demo/identity` diz que o demo age como VIVARIS PHARMA. Como este ajuste move o cenário Forecast Preditivo para varejo/e-comm, posso atualizar essa memória para refletir que o cenário `demand-forecasting` roda com narrativa de varejo enquanto os demais seguem pharma — me avise se preferir manter a memória como está.
