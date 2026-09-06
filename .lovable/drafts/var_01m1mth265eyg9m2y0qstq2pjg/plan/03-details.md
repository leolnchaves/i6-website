## Os nove termos

Ordem alfabética dentro de cada idioma, com definição completa e, quando faz sentido, uma frase de contexto de uso:

Active Learning · Aderência contextual · Elasticidade dinâmica · i6-RecSys-Base.g1 · MAML · Predição comportamental · Propensão de conversão · Ruptura de gôndola · Topological Loss

## Detalhes técnicos

### Proteção no sync
`scripts/sync-content-from-i6hub.mjs`, bloco "Cleanup .md" (linhas 180–186): hoje remove todo `.md` exceto `README.md`, para qualquer `--type`. Passa a ler o frontmatter de cada arquivo candidato e pular quando houver `site_managed: true`. Leitura simples do bloco `---` inicial com regex, sem dependência nova. Nenhuma outra parte do wipe/regravação muda — arquivos do HUB (sem o campo) continuam sendo apagados e regravados igual.

### Arquivos novos
`src/content/docs/glossario-pt.md`, `glossario-en.md`, `glossario-es.md`

Frontmatter:
- `slug: glossario` (mesmo slug nos três idiomas, padrão da pasta)
- `section: glossary`; `section_label`: "Glossário" / "Glossary" / "Glosario"
- `order: 50` (após Recursos, que usa 40/41)
- `description` própria por idioma
- `site_managed: true`
- sem `sample`, sem `content_type` (default `article`)

Corpo: um `##` por termo → âncora via `slugifyHeading`, índice lateral e busca full-text já existentes funcionam sem alteração. Campo `site_managed` é ignorado por `useDocs.ts` (parser só lê o que conhece), então não afeta a renderização.

### Arquivo alterado
`src/components/our-ai/GlossaryCondensed.tsx` — CTA de `localized('/docs')` para `localized('/docs/glossario')`. Nenhuma outra mudança.

### Não tocar
`ourAIContent.ts`, o JSON-LD `DefinedTermSet` de /our-ai, `useDocs.ts`, `DocsSidebar.tsx`, `Docs.tsx`, `ScienceHighlights.tsx`.

### Validação
- Simulação da decisão de apagar/manter (só a lógica, sem rodar o sync) contra os arquivos reais da pasta: confirmar que os três `glossario-*.md` são mantidos e que os demais seriam apagados como antes — resultado incluído no relatório.
- Checagem de tipos e build.
- `/pt/docs/glossario`, `/en/docs/glossario`, `/es/docs/glossario` com índice lateral; busca encontrando "Topological Loss" e "Ruptura"; link de /our-ai chegando direto na página.
