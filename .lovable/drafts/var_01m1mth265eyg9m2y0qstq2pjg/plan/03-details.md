## O que a página traz

Nove termos, cada um com definição completa e, quando faz sentido, uma frase de contexto de uso:

- MAML
- Active Learning
- Topological Loss
- i6-RecSys-Base.g1
- Predição comportamental
- Elasticidade dinâmica
- Propensão de conversão (recuperado)
- Aderência contextual (recuperado)
- Ruptura de gôndola (recuperado)

Ordem alfabética por termo dentro de cada idioma, para funcionar como referência de consulta.

## Detalhes técnicos

### Arquivos novos
`src/content/docs/glossario-pt.md`, `glossario-en.md`, `glossario-es.md`

Frontmatter seguindo o padrão da pasta:
- `slug: glossario` (mesmo slug nos três idiomas, como nas demais páginas)
- `section: glossary`, `section_label`: "Glossário" / "Glossary" / "Glosario"
- `order: 50` (depois de Recursos, que usa 40/41)
- `description` própria por idioma
- **sem** `sample: true` — é conteúdo real, não exemplo, então não exibe o aviso de conteúdo de exemplo
- `content_type` ausente → `article` por padrão

Corpo: um `##` por termo (gera âncora via `slugifyHeading`, alimenta o índice lateral e a busca full-text já existente), com 1–2 parágrafos de definição.

### Arquivo alterado
`src/components/our-ai/GlossaryCondensed.tsx` — o CTA passa de `localized('/docs')` para `localized('/docs/glossario')`. Nenhuma outra mudança visual.

### O que não muda
- `ourAIContent.ts` continua com os 6 termos condensados e o JSON-LD `DefinedTermSet` de /our-ai permanece igual.
- `useDocs.ts`, `DocsSidebar.tsx`, `Docs.tsx` e o sync do i6 HUB não são tocados — a nova seção aparece sozinha pelo frontmatter.
- `ScienceHighlights.tsx` segue linkando só para /i6-intelligence.

### Observação sobre o sync
`scripts/sync-content-from-i6hub.mjs --type=docs` apaga os `.md` da pasta antes de gravar. Se a documentação real for publicada pelo HUB, esta página de glossário precisará existir lá também — vale registrar isso.

### Validação
- checagem de tipos e build
- `/pt/docs/glossario`, `/en/docs/glossario`, `/es/docs/glossario` abrindo com índice lateral, busca encontrando "Topological Loss" e "Ruptura", e o link de /our-ai chegando direto na página
