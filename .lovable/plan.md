## Diagnóstico

O formulário de Contato grava porque envia campos simples que o `doPost` já espera: `name`, `email`, `company`, `message`, `subscription`, `token`.

O formulário de Insights também tenta enviar esses campos, mas hoje ele usa criação dinâmica de `form` + `iframe`, com `setSubmitted(true)` imediatamente após `form.submit()`. Como não há validação da resposta do Apps Script, a tela mostra sucesso mesmo quando o Apps Script não gravou.

## Plano de correção

1. **Ajustar o `LeadGateForm` para seguir o mesmo padrão do formulário de Contato**
   - Manter `name`, `email`, `company`, `message`, `subscription` e `token`
   - Enviar `subscription` com um valor explícito de origem, por exemplo `insight-lead`
   - Enviar `company` vazio, como hoje
   - Manter o `message` com título e URL do insight

2. **Garantir que o honeypot não bloqueie usuários reais**
   - Manter o campo `website_url` invisível
   - Se vier preenchido, ignorar localmente como já está
   - Não enviar `website_url` quando o usuário real submete nome e email

3. **Melhorar a confiabilidade do envio nos Insights**
   - Usar nomes únicos para `iframe` e `form` por submit, evitando conflito com submits anteriores
   - Só mostrar sucesso depois de disparar o submit corretamente
   - Manter a limpeza do `iframe/form` depois do envio

4. **Adicionar um modo de debug mínimo durante o desenvolvimento**
   - Logar no console apenas em caso de erro no envio do LeadGateForm
   - Não expor dados sensíveis

## Observação sobre o Apps Script

Seu `doPost` atual está compatível com os campos esperados. A correção deve ser no frontend dos Insights, sem mudar a planilha nem o endpoint.