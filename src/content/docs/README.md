# Documentação (/docs)

Arquivos `.md` desta pasta alimentam a área `/:lang/docs`.

- Nomes: `<slug>-<lang>.md` (`pt`, `en`, `es`).
- Frontmatter: `title`, `slug`, `language`, `section`, `section_label`, `order`,
  `description`, `updated_at`, `sample` (opcional), `hidden` (opcional).
- `sample: true` exibe o aviso de conteúdo de exemplo no topo da página.
  O sync do i6 HUB (`scripts/sync-content-from-i6hub.mjs --type=docs`) nunca
  escreve esse campo e remove os `.md` existentes antes de gravar, portanto o
  aviso desaparece sozinho quando a documentação real for publicada.
- Este README é preservado pelo sync.
