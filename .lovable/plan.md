## Objetivo

Tornar a tela de confirmação do `LeadGateForm` (após o usuário enviar nome/email para receber um insight) mais amigável, avisando sobre a pasta de SPAM e oferecendo um link para `/contact` em caso de problemas.

## Arquivo afetado

- `src/components/insights/LeadGateForm.tsx` — apenas o bloco `if (submitted) { ... }` e os textos `successTitle` / `successMsg` no objeto `t` (PT e EN).

## Novos textos

Sem ponto final em títulos (regra do projeto). Sem emojis de bandeira. Mantenho um emoji discreto opcional — caso prefira sem emoji, basta dizer.

**PT**

- Título: "Tudo certo!"
- Mensagem: "Obrigado! Já estamos enviando o material para o seu email. Ele deve chegar em alguns minutos — se não aparecer na caixa de entrada, dá uma olhadinha na pasta de **SPAM**."
- Linha extra com link: "Qualquer problema, [entre em contato](/pt/contact) que respondemos o mais rápido possível."

**EN**

- Title: "All set!"
- Message: "Thanks! We're sending the material to your inbox right now. It should arrive in a few minutes — if you don't see it, please check your **Spam** folder."
- Linha extra com link: "Any issues, [get in touch](/en/contact) and we'll reply as soon as possible."

## Implementação técnica

1. Adicionar no objeto `t` (PT e EN):
  - `successMsg` reescrita conforme acima (texto puro, com `**SPAM**`/`**Spam**` renderizado como `<strong>` no JSX).
  - `successHelp` (novo): primeira parte da frase ("Qualquer problema," / "Any issues,").
  - `successHelpLink` (novo): texto do link ("entre em contato" / "get in touch").
  - `successHelpTail` (novo): final da frase (" que respondemos o mais rápido possível." / " and we'll reply as soon as possible.").
2. No bloco `if (submitted)`:
  - Renderizar o `successMsg` com `<strong>` para "SPAM/Promoções".
  - Adicionar um parágrafo abaixo com `<Link to={localized('/contact')}>` (reusa `useLocalizedPath` já importado) usando a cor de destaque coral `text-[#F4845F] hover:underline`, padrão dos demais links do componente (igual ao link da política de privacidade).
3. Nenhuma mudança em lógica, tracking, validação ou estilos do card de sucesso (mantém o ícone `CheckCircle2`, gradiente coral e layout centralizado).

## Fora de escopo

- Não altera o formulário em si, validações, envio ao Apps Script, eventos de tracking, nem o `ContactForm`.