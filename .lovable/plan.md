## Plano

1. **Alinhar o Insights exatamente ao padrão que já funciona no Contato**
   - Trocar o submit atual do `LeadGateForm` para usar o mesmo fluxo simples do `ContactForm`: iframe fixo, form oculto, `form.submit()`, cleanup por timeout.
   - Manter os mesmos nomes de campos esperados pelo Apps Script: `name`, `email`, `company`, `message`, `subscription`, `token`.

2. **Evitar campos que possam acionar bloqueio no Apps Script**
   - Não enviar `website_url` no POST real.
   - Manter o honeypot apenas para validação local no navegador.

3. **Tornar o lead de Insights identificável na planilha**
   - Enviar `subscription` como um valor simples e curto, por exemplo `insights`.
   - Enviar no `message` o título e a URL do insight para diferenciar a origem.

4. **Não alterar o Apps Script**
   - Como o formulário de Contato grava normalmente, a correção deve ficar no front-end para replicar o caminho que já está validado.