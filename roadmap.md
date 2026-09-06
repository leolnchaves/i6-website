# Roadmap

## Em andamento
- [x] Remover código morto de success-stories: excluir `src/components/success-stories/optimized/LazyComponents.tsx` e a pasta `optimized/` se ficar vazia; validar typecheck, build e /pt/success-stories.

---

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
- [x] /contact redesenhado: hero com formulário ao lado, triagem, FAQ em acordeão (13 itens), mapa em SVG próprio, e-mail decida@infinity6.ai, tema claro no header
- [x] Formulários de contato por variante + textos ES da página de contato
- [x] Typewriter em /i6-builders

- [x] Bloco "Suporte à implementação" no fim das páginas /docs (PT/EN/ES)
