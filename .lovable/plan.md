## Objetivo
Adicionar um terceiro grupo de eBook no CTA do Kiosk, para as soluções de planejamento preditivo.

## Alteração (src/components/kiosk/EbookCTA.tsx)
1. Novas constantes, no mesmo padrão dos grupos existentes:
```
EBOOK_PLANNING_IDS = ['demand-forecasting', 'predictive-commercial-targets', 'mix-assortment-order']
EBOOK_PLANNING_SUBSCRIPTION = 'insight:ebook-planejamento-preditivo-decisao'
EBOOK_PLANNING_INSIGHT_ID = 'b098418a-7472-4d58-be7e-9c8e9e31dec8'
```
2. No `onSubmit`, após os dois blocos atuais, incluir bloco equivalente que define quando `solutionId` estiver na lista:
   - `subscription`, `reason: 'kiosk-demo'`, `insight_id`, `utm_source: 'kiosk'`, `utm_medium: 'totem'`, `utm_campaign: 'evento-forum-ecommerce-brasil-2026'`, `user_agent: 'kiosk-app/1.0'`.

Os demais campos já enviados (name, email, company, message, token, contexto do lead) permanecem inalterados. Nenhuma mudança visual.

## Confirmação necessária
Os IDs das soluções usados no Kiosk para essas três demos são `demand-forecasting`, `predictive-commercial-targets` e `mix-assortment-order` (conforme `SolutionDemoBlock.tsx`) — é esse o conjunto "Forecast Preditivo, Metas Preditivas, Mix/Sortimento e Pedido Ideal".