## Objetivo
Garantir que qualquer insight marcado como `gated: true` leve o usuário para a página interna com o formulário de nome + email, mesmo quando o insight também tiver `type` externo e `external_url`.

## Diagnóstico
O detalhe do insight já foi corrigido para mostrar o `LeadGateForm` quando `gated === true`. Porém ainda existem cards/listagens que decidem o destino assim:

- se `type !== 'article'` e existe `external_url`, o card vira um link externo direto
- isso ignora `gated: true`
- resultado: o usuário clica no card e sai do site sem passar pelo formulário

Arquivos afetados:
- `src/pages/Insights.tsx`
- `src/components/hometeste/InsightsSection.tsx`

## Plano de implementação
1. Ajustar a regra `isExternal` nos cards de insights para considerar gate:
   - antes: `type !== 'article' && external_url`
   - depois: `!gated && type !== 'article' && external_url`

2. Manter o comportamento atual para insights não-gated:
   - press/linkedin/podcast/video com `external_url` continuam abrindo fora

3. Para insights gated:
   - o card passa a apontar para `/insights/:slug`
   - a página interna mostra o formulário de nome + email
   - após envio, mantém a confirmação de que o material será enviado por email

4. Validar por inspeção/código que não há outro card de insight usando a regra antiga de link externo sem checar `gated`

## Fora de escopo
- Não alterar markdown/frontmatter
- Não alterar CRM/Apps Script
- Não mexer no fluxo de confirmação já implementado