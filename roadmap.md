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

## Glossário: fonte única + indexação de /docs/glossario

- [x] Verificações C1/C2/C3 entregues (divergência só em i6-RecSys-Base.g1 nos .md; "Ruptura de gôndola" sem números; âncoras = slugifyHeading)
- [x] src/data/ourAIGlossary.json (6 termos × PT/EN/ES, definições copiadas da página)
- [x] ourAIContent.ts consome o JSON nos três idiomas
- [x] prerender: #seo-prerender + DefinedTermSet do JSON, inLanguage por HTML_LANG, slugs ES em espanhol
- [x] llms.base.txt: glossário com 6 termos (fora conversion-propensity e contextual-adherence)
- [x] INDEXABLE_DOC_SLUGS += glossario; ES_TRANSLATED_ROUTES += docs/glossario; staticRoutes + seo + stub com DefinedTermSet próprio
- [x] generate-llms: seção gerada "Documentation" (pesquisa + glossário)
- [x] validate: DefinedTerm exige âncora no HTML e contagem igual à do JSON em /our-ai
- [ ] Pendente de decisão do usuário: alinhar os .md do glossário (i6-RecSys-Base.g1 sem External Memory e com "20 bi de registros")
