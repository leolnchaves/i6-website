## Objetivo

Enriquecer o POST do `EbookCTA` (Kiosk) com campos extras — **apenas** quando a solução ativa for uma destas três:

- `predictive-personalization` (Personalização)
- `smart-discovery` (Descoberta Preditiva)
- `predictive-campaign-targeting` (Campanha por Propensão)

Para as demais soluções, o payload continua exatamente como hoje.

## Mudanças

Arquivo único: `src/components/kiosk/EbookCTA.tsx`

1. Definir a lista de solutionIds elegíveis:
   ```
   const EBOOK_CONSUMER_INTELLIGENCE_IDS = [
     'predictive-personalization',
     'smart-discovery',
     'predictive-campaign-targeting',
   ];
   ```
2. Dentro do `onSubmit`, verificar `EBOOK_CONSUMER_INTELLIGENCE_IDS.includes(solutionId)`.
3. Quando verdadeiro, **sobrescrever/adicionar** no `FormData`:
   - `subscription` = `insight:ebook-inteligencia-do-consumidor-orientada-a-decisao` (substitui o atual `i6-website`)
   - `reason` = `kiosk-demo`
   - `insight_id` = `03a13a3b-9b6b-4804-8c04-7418a04bd3c1`
   - `utm_source` = `kiosk`
   - `utm_medium` = `totem`
   - `utm_campaign` = `evento-forum-ecommerce-brasil-2026`
   - `user_agent` = `kiosk-app/1.0`

   Esses `append` devem acontecer **depois** do bloco `Object.entries(getLeadContextFields()).forEach(...)` para garantir que os UTMs fixos do evento sobrescrevam qualquer UTM detectado pelo tracker (usar `set`-equivalente: como `FormData` não tem "replace", faremos `append` depois — o Apps Script atual lê o último valor; confirmar isso é o único ponto de atenção).

## Ponto de confirmação

- **Subscription:** hoje é sempre `i6-website`. Para essas 3 soluções, você quer **substituir** por `insight:ebook-...` (não coexistir), certo? O plano assume que sim.
- Nada muda para as outras 6 soluções.

## Fora de escopo

- Nenhuma alteração em outros formulários (Contact, Insights gate, Article CTA).
- Nenhuma alteração no Apps Script — assumindo que ele já aceita os novos campos (`reason`, `insight_id`, UTMs, `user_agent`) como o restante do HUB.
