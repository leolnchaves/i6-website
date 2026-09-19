# Roadmap

## CTA de segurança na seção Governança (concluído)

- [x] ourAIContent.ts: interface `security` + ctaQuestion/ctaLink em PT/EN/ES (textos ajustados pelo usuário)
- [x] contact/content.ts: CONTACT_INTENTS.security (subject 'other' + mensagem PT/EN/ES)
- [x] SecuritySection.tsx: CTA abaixo do subtítulo, estilo BuilderBridge (laranja + seta), layout original preservado
- [x] ContactForm.tsx: prop `prefill` via setValue no mount (reset pós-envio continua limpando)
- [x] ContactHeroSplit.tsx: `?intent=security` → prefill + extraFields { intent } (ausente sem atalho)
- [x] Build OK + 39 stubs + validate ✅ (9 páginas); sitemap/llms inalterados; canonical /pt/contact sem intent
- [x] Verificado ao vivo PT/EN/ES (Playwright) + payload capturado com intent=security, reason=Outro, source=i6-website
- [x] Diff completo + canonical + payload de exemplo entregues
