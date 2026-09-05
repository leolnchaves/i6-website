# Roadmap — Documentação (/docs)

## Frente A — Menu e índice fixos
- [x] `DarkLayout`: `overflow-x-hidden` → `overflow-x-clip`
- [x] `DocsShell`: menu sticky com scroll próprio; grid reserva índice em `xl`
- [x] `DocsToc`: sticky com scroll próprio; estado único de destaque (fim de documento com prioridade, sem flicker); `scrollIntoView({block:'nearest'})` com reduced-motion
- [x] Sem barra horizontal em home, i6-builders, community, contact e docs (PT/EN/ES)

## Frente B — Vídeo, download e copiar código
- [x] `content_type: 'article' | 'video' | 'download'` em `useDocs` + `fmDocs` no sync
- [x] `DocsVideo`: thumbnail + play, iframe youtube-nocookie só após clique
- [x] `DocsDownload`: cartão de destaque com `file_url`/`file_label`
- [x] `DocsCodeBlock`: botão copiar (Copy→Check) + `aria-live="polite"` nos 3 idiomas
- [x] Exemplos `video-tour` e `download-guide` nos 3 idiomas com `sample: true`
- [x] Build, checagem de tipos e verificação visual

---

# Concluído
- [x] Formulários de contato por variante + textos ES da página de contato
- [x] Typewriter em /i6-builders

- [x] Bloco "Suporte à implementação" no fim das páginas /docs (PT/EN/ES)
