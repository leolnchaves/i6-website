## Detalhes técnicos

- `src/components/home-v3/product/suiteContent.ts`: nos três blocos de idioma,
  `name: 'Discovery'` → `'Relevance'` e `id: 'discovery'` → `'relevance'`
  (o id é apenas estado local do seletor; nenhuma âncora ou URL depende dele).
- `src/components/home-v3/HeroSuite.tsx`: `tag: 'Discovery'` → `'Relevance'`
  nas três listas de decisões (PT, EN, ES).
- `src/data/decisionSuiteProducts.ts` já usa o slug `relevance`, portanto fica
  coerente sem alteração.

## Verificação

- Busca final por `Discovery` confirmando que só restam ocorrências da lista
  "não muda".
- Playwright em PT/EN/ES, desktop e mobile: troca de produto na seção da suíte
  e rótulo correto no quadro animado.
- `bun run build`.
