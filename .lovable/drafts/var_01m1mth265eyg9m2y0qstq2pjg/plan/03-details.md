## Detalhes técnicos

- `src/components/contact/ContactForm.tsx`: nova prop `variant: 'default' | 'community' | 'builders'` (padrão `default`).
  - `community` e `builders`: campo de assunto renderizado como campo oculto, com valor fixo `Interesse — Comunidade` / `Interesse — i6 Builders` (não traduzido), enviado normalmente em `subscription`.
  - `community`: rótulo de e-mail PT "E-mail" / EN "Email" / ES "Correo electrónico", sem exigência de e-mail corporativo; mensagem obrigatória com placeholder específico.
  - `builders`: `company` com `required`; mensagem obrigatória com placeholder específico.
  - `default`: campos, validações e textos idênticos aos atuais.
- Bloco `content` do componente ganha a chave `es` completa (o fallback `?? content.pt` deixa de ser acionado); textos por variante vivem nesse mesmo bloco, por idioma.
- `src/pages/Comunidade.tsx` e `src/pages/I6Builders.tsx`: passam `variant`. Também alinho a etiqueta de origem da comunidade para `i6-community`, como você aprovou antes (`src/lib/leadFormConfig.ts`).
- Sem alteração de endpoint, honeypot, `lead_uid`, normalização de payload ou aviso de sucesso.

## Verificação

Compilação, checagem de tipos e conferência visual em PT/EN/ES nas três páginas, sem enviar lead de teste.

## Publicação

Release/deploy só quando você pedir o incremento de versão.
