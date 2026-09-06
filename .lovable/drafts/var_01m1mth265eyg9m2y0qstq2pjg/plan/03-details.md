## Conteúdo das duas páginas

**Glossário** — ordem alfabética dentro de cada idioma, definição completa e frase de contexto de uso onde faz sentido: Active Learning · Aderência contextual · Elasticidade dinâmica · i6-RecSys-Base.g1 · MAML · Predição comportamental · Propensão de conversão · Ruptura de gôndola · Topological Loss.

**Pesquisa** — nota de abertura apontando para /i6-intelligence (publicações formais revisadas por pares), depois dois blocos:
- Palestras técnicas (9 itens, todas InfoQ Brasil · QCon), título como link real e veículo como texto de apoio.
- Artigos (2 itens no Academia.edu), com a observação de que não passaram por revisão por pares. Os três artigos formais que já estão em /i6-intelligence não são duplicados aqui.

## Detalhes técnicos

### 1. Proteção no sync
`scripts/sync-content-from-i6hub.mjs`, bloco "Cleanup .md" (linhas 180–186): hoje remove todo `.md` exceto `README.md`, para qualquer `--type`. Passa a ler o frontmatter de cada candidato (regex simples no bloco `---` inicial) e pular quando houver `site_managed: true` — não apaga, não sobrescreve. Sem dependência nova. Nenhuma outra parte do wipe/regravação muda.

### 2. Arquivos novos
`src/content/docs/glossario-{pt,en,es}.md`
- `slug: glossario`, `section: glossary`, `section_label` "Glossário"/"Glossary"/"Glosario", `order: 50`
- `description` própria por idioma, `site_managed: true`, sem `sample`, sem `content_type`

`src/content/docs/pesquisa-{pt,en,es}.md`
- `slug: pesquisa`, `section: research`, `section_label` "Pesquisa"/"Research"/"Investigación", `order: 60`
- mesmos critérios de frontmatter

Corpo: um `##` por termo (glossário) e um `##` por bloco (pesquisa) → âncoras via `slugifyHeading`; índice lateral e busca full-text existentes funcionam sem alteração. `site_managed` é ignorado pelo parser de leitura, então não afeta a renderização.

### 3. Arquivo alterado
`src/components/our-ai/GlossaryCondensed.tsx` — CTA de `localized('/docs')` para `localized('/docs/glossario')`. Nenhuma outra mudança.

### Não tocar
`ourAIContent.ts`, o JSON-LD `DefinedTermSet` de /our-ai, `useDocs.ts`, `DocsSidebar.tsx`, `Docs.tsx`, `ScienceHighlights.tsx`. Nenhum link de /our-ai para a página de Pesquisa.

### Validação
- Simulação da decisão de apagar/manter (só a lógica, sem rodar o sync) contra os arquivos reais da pasta: confirmar que os 3 `glossario-*.md` e os 3 `pesquisa-*.md` são mantidos e que os demais seriam apagados como antes — resultado no relatório.
- Checagem de tipos e build.
- `/pt|en|es/docs/glossario` com índice lateral; busca encontrando "Topological Loss" e "Ruptura".
- `/pt|en|es/docs/pesquisa` com índice lateral (Palestras técnicas, Artigos); busca encontrando "iFood" e "Weka".
- Link de /our-ai chegando em `/docs/glossario`, não em `/docs/pesquisa`.
