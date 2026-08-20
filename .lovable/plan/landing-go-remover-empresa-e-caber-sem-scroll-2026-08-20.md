# Landing /go: remover Empresa e caber sem scroll

## Objetivo
Na landing `/go/:token`, remover o campo **Empresa** e fazer com que o formulário completo, incluindo o botão **Enviar Mensagem**, caiba na tela sem scroll (nem da página, nem interno no campo de mensagem).

## O que muda

1. **Campo Empresa**
   - `ContactForm` ganha duas props opcionais: `hideCompany` e `compact` (padrão desligadas, então `/contact` fica igual ao que é hoje).
   - Com `hideCompany`, o bloco Empresa não é renderizado e o payload envia `company` vazio (o Apps Script e o HUB já aceitam vazio).

2. **Layout compacto (só na /go)**
   - Espaçamentos verticais menores (`space-y-6` → `space-y-4`) e padding do card `p-8` → `p-6`.
   - Nome e Email continuam lado a lado; Assunto e Mensagem em altura reduzida (`min-h-[120px]` → cerca de 96px) para o botão ficar visível sem rolar.
   - O textarea segue com rolagem interna apenas quando o texto digitado passa da altura — isso é comportamento normal de digitação, não layout.

3. **Hero da /go**
   - Reduzir o espaçamento superior/inferior da seção do título (`pt-28 pb-10` e `pb-20` mais enxutos) para liberar altura ao formulário em telas de notebook (~900px de altura).

## Detalhes técnicos
- Arquivos: `src/components/contact/ContactForm.tsx` (props `hideCompany`, `compact`), `src/pages/GoLanding.tsx` (passa as duas props e ajusta espaçamentos).
- Nenhuma alteração em lógica de envio, `lead_uid`, `outreach_send_id` ou integração com o HUB.
- Validação visual em 1366x902 e mobile via preview após a implementação.
