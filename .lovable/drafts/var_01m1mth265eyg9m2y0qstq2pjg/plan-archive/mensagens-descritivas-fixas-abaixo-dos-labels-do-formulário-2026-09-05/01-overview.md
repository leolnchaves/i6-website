# Mensagens descritivas fixas abaixo dos labels do formulário

## O que vamos fazer

Trocar as mensagens descritivas longas que hoje vivem como `placeholder` dentro dos campos de formulário por textos fixos posicionados abaixo do título/label do campo. Assim o usuário mantém a referência do que escrever mesmo depois de começar a digitar.

## Escopo

- Formulário principal: `src/components/contact/ContactForm.tsx` (usado em `/contact`, `/community` e `/i6-builders`).
- Foco no campo **Mensagem**, especialmente nas variantes `community` e `builders`, onde o placeholder é longo e instrucional (imagens anexas).
- Componente legado `src/components/contact/form/ContactFormFields.tsx` será atualizado com o mesmo padrão visual, já que compartilha as mesmas chaves de tradução.
- Três idiomas: PT, EN, ES.

## Fora de escopo

- Não alterar lógica de envio, validação, honeypot ou tracking.
- Não mudar cores, fontes ou espaçamento do design system além do necessário para encaixar a descrição.
- Não publicar release.
