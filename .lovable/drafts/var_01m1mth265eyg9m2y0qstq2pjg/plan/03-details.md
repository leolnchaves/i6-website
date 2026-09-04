## Detalhes técnicos

**Idioma como tipo**
- `src/types/language.ts`: `Language = 'en' | 'pt' | 'es'`.
- `src/utils/localizedPath.ts`: `SUPPORTED_LANGS` ganha `es`, `isLang` aceita `es`, `stripLangPrefix` passa a casar `/(en|pt|es)`, e `detectPreferredLang` reconhece locales `es-*`.
- `src/contexts/LanguageContext.tsx`: `document.documentElement.lang` mapeia `es → es`.
- `src/App.tsx` não muda — as rotas usam `:lang` validado por `isLang`.

**Dicionário**
- Novo `src/data/translations/es.ts` com as mesmas chaves de `pt.ts`/`en.ts`, traduzidas.
- `src/data/translations/index.ts`: registra `es` e o acesso passa por um helper com cadeia de fallback `es → pt`, para chave ausente ou vazia.

**Cópias por idioma nos componentes**
Os blocos da home guardam objetos `{ pt, en }` (`HeroSuite.tsx`, `WhyInfinity6.tsx`, `HowItWorks.tsx`, `ClientProof.tsx`, `ProofAndVoices.tsx`, `FinalCTA.tsx`, `InsightsRow.tsx`, `product/suiteContent.ts`, `product/SuiteIntro.tsx`, `product/ProductSuite.tsx`). Em cada um:
- acrescenta a chave `es` com o texto traduzido (inclusive os 13 cartões de decisão do hero);
- a seleção deixa de ser `language === 'pt' ? 'pt' : 'en'` e passa por um util novo `pickLang(language, copy)` que devolve `copy[language] ?? copy.pt`.
- `FooterNovo.tsx` e `HeaderNovo.tsx` usam `t()`, então só dependem do dicionário.

**Seletor**
- Novo `src/components/hometeste/LanguageMenu.tsx`: botão com ícone `Globe` (lucide) + rótulo curto, menu absoluto com as três opções (nome completo, `Check` no ativo), fechamento por clique fora / `Escape`, `aria-expanded`, `role="menu"`, navegação por teclado. Visual alinhado ao cabeçalho: borda `border-white/15`, fundo `#0B1224`, hover coral `#F4845F`.
- `HeaderNovo.tsx`: substitui o bloco de pílulas desktop (linhas ~221-233) pelo `LanguageMenu`; no menu mobile (linhas ~344-356) mantém as pílulas, agora com os três idiomas.
- `src/components/LanguageSelectorSimple.tsx` (usado pelo header/footer antigos) ganha a terceira opção sem bandeira, para não divergir.

**Fora de escopo nesta etapa**
- Conteúdo Markdown (`public/content/*-pt.md`, `src/content/**`) e conteúdo do i6 HUB: os hooks (`useMarkdownContent`, `useInsights`, `useLandings`, `useSuccessStoriesMarkdown`, `useTestimonialsMarkdown`, `useSolutionsMarkdown`) passam a pedir `es` e, se o arquivo não existir, carregam a versão `pt`.
- O modo `/demo` (kiosk) continua apenas PT/EN.
- SEO: `SEOHead` ganha `hreflang` para `es` apontando à mesma rota.

**Verificação**
Typecheck, build e checagem no navegador em `/pt`, `/en` e `/es` (console limpo, seletor abrindo, troca de idioma preservando a rota).
