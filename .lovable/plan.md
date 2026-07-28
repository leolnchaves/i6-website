## Objetivo

Adicionar um segundo grupo de soluções ao `EbookCTA` (Kiosk) que envia campos extras no POST, análogo ao grupo Consumer Intelligence já existente.

Grupo Pricing (novo):
- `price-to-margin`
- `price-to-conversion`
- `price-to-turnover`

## Mudanças

Arquivo único: `src/components/kiosk/EbookCTA.tsx`

1. Adicionar constantes ao lado das existentes:
   ```
   const EBOOK_PRICING_IDS = [
     'price-to-margin',
     'price-to-conversion',
     'price-to-turnover',
   ];
   const EBOOK_PRICING_SUBSCRIPTION = 'insight:ebook-pricing-orientado-a-resultados';
   const EBOOK_PRICING_INSIGHT_ID = 'a4012048-aa04-465b-b89a-7c7104d6fc18';
   ```

2. No `onSubmit`, após o bloco `EBOOK_CONSUMER_INTELLIGENCE_IDS`, adicionar bloco simétrico:
   ```
   if (EBOOK_PRICING_IDS.includes(solutionId)) {
     formData.set('subscription', EBOOK_PRICING_SUBSCRIPTION);
     formData.set('reason', 'kiosk-demo');
     formData.set('insight_id', EBOOK_PRICING_INSIGHT_ID);
     formData.set('utm_source', 'kiosk');
     formData.set('utm_medium', 'totem');
     formData.set('utm_campaign', 'evento-forum-ecommerce-brasil-2026');
     formData.set('user_agent', 'kiosk-app/1.0');
   }
   ```

Os UTMs de evento são fixos e iguais aos do grupo Consumer Intelligence — apenas `subscription` e `insight_id` diferem.

## Fora de escopo

- Nenhuma mudança em outros formulários.
- Nenhuma alteração no Apps Script.
- Demais soluções (forecast, metas comerciais, mix/sortimento) continuam com o payload padrão.

## Confirmação

Os 3 solutionIds acima (`price-to-margin`, `price-to-conversion`, `price-to-turnover`) são os corretos para "Preço Orientado à Margem / Conversão / Giro"? Se sim, sigo com a implementação após aprovar.
