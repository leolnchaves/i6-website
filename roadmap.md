# Roadmap

## CTA de segurança na seção Governança (aprovado)

- [ ] ourAIContent.ts: interface `security` + ctaQuestion/ctaLink em PT (238-248), EN (434-444), ES (630-640) — textos ajustados pelo usuário
- [ ] contact/content.ts: CONTACT_INTENTS.security (subject 'other' + mensagem PT/EN/ES)
- [ ] SecuritySection.tsx: CTA abaixo do subtítulo, mesmo estilo do BuilderBridge (laranja + seta)
- [ ] ContactForm.tsx: prop `prefill` aplicada com setValue ao montar (reset pós-envio continua limpando)
- [ ] ContactHeroSplit.tsx: ler `?intent=security`, passar prefill + extraFields { intent } (ausente nos demais casos)
- [ ] Build completo + prerender + validate
- [ ] Entregar: (a) diff completo, (b) canonical do stub /pt/contact sem intent, (c) payload de exemplo com intent
