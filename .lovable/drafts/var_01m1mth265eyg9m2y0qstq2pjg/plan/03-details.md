## Arquivos a criar

- `src/pages/I6Builders.tsx` — página, envolta em `theme-sand` como a home, com `SEOHead`.
- `src/components/i6-builders/BuilderHero.tsx` — seção 1.
- `src/components/i6-builders/BuilderWhat.tsx` — seção 2.
- `src/components/i6-builders/BuilderHowItWorks.tsx` — seção 3 (SDKs / APIs / Toolkits, cada bloco com link "Ver documentação completa" → `/documentacao`).
- `src/components/i6-builders/BuilderModels.tsx` — seção 4 (3 cards de capacidade).
- `src/components/i6-builders/BuilderAccelerators.tsx` — seção 5 (consome o array de exemplo).
- `src/components/i6-builders/BuilderPersona.tsx` — seção 6 (Tech Builder → Embedded (OEM) e Novo Produto).
- `src/components/i6-builders/BuilderCases.tsx` — seção 7 (consome o array de exemplo).
- `src/components/i6-builders/BuilderFinalCTA.tsx` — seção 8.
- `src/data/i6Builders/content.ts` — textos institucionais PT/EN/ES no padrão `copyByLang` já usado em `home-v3`.
- `src/data/i6Builders/placeholders.ts` — **único** arquivo com os dados fictícios: `DOMAIN_ACCELERATORS` e `PARTNER_CASES`, cada um precedido do comentário exigido (`// PLACEHOLDER: vertical fictícia, substituir depois` / `// PLACEHOLDER: case fictício para validação de layout, substituir por dados reais`). Logos dos cases usam `public/placeholder.svg` via `getPublicAssetUrl()`.

## Arquivo a alterar

- `src/App.tsx` — uma linha: `<Route path="i6-builders" element={<I6Builders />} />` dentro de `DarkLayout`, que já traz header e footer.

## Contato

O CTA "Fale com o time" nas seções 1 e 8 aponta para o formulário existente: `src/components/contact/ContactForm.tsx`, renderizado dentro da própria página em um bloco com âncora `#fale-com-o-time` (os dois CTAs rolam até ele). Uso de `leadSource` — o tipo `LeadSource` em `src/lib/leadFormConfig.ts` precisa de um valor novo `'i6-builders'` (adição de um item na união, sem mexer no envio nem no destino). Se preferir zero alteração nesse arquivo, uso `'contact-form'`; diga qual.

## Convenções mantidas

- Sem menção a i6 Decision Suite, sem "Solution Partners", sem nomes de produtos comerciais na seção 4, sem jargão de varejo.
- Sem ponto final em títulos e descrições de métricas; marca sempre em minúsculas.
- Nada de banco de dados; nada no fluxo do i6 HUB nem no pipeline de publicação.
- Nenhum item novo no menu (o item "i6 Builder Platform" hoje está marcado como em breve) — se quiser já ligar o menu a esta rota, é um ajuste extra.
