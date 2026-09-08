# Recuperar a mensagem da Comunidade e trocar o texto de exemplo do campo

O texto que explicava o que escrever no campo de mensagem da página da Comunidade continua escrito nos três idiomas, mas hoje não é exibido: a variante da comunidade está marcada para não mostrar descrição nenhuma. Além disso, o texto de exemplo dentro do campo fala de "negócio", o que não faz sentido para quem quer entrar na comunidade.

## O que muda

1. **Mostrar a mensagem de novo** — abaixo do título "Mensagem", igual às páginas de Builders e Contato: "Conte um pouco do seu histórico, por que você quer fazer parte da comunidade e o que espera encontrar aqui." (com as versões em inglês e espanhol já existentes).
2. **Texto de exemplo dentro do campo** — na Comunidade deixa de ser "Descreva como podemos ajudar seu negócio..." e passa a ser um convite neutro, do tipo "Conte um pouco sobre você...", nos três idiomas. As outras páginas mantêm o texto atual.

Nada além disso muda: mesmo formulário, mesmo layout, mesmo envio.

## Detalhe técnico

- `src/components/contact/ContactForm.tsx`: na escolha de `messageDescription`, a variante `community` passa a usar `text.messageDescriptionCommunity` (já existe em pt/en/es) em vez de `undefined` — a descrição já é renderizada como parágrafo fixo com `aria-describedby="message-description"`.
- No mesmo arquivo, adicionar `messagePlaceholderCommunity` nos três blocos de idioma e selecionar o placeholder por variante.
- Ao final: typecheck e build. Sem release nem deploy.
