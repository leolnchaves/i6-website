# Roadmap

## Em andamento
- [x] Home: diversificar a hero entre i6 Decision Suite e i6 Builder Platform, manter contato e logos na primeira tela, adicionar “Saiba mais” e quadro comparativo após os logos; validar PT/EN/ES e desktop/mobile.
- [x] Remover código morto de success-stories: excluir `src/components/success-stories/optimized/LazyComponents.tsx` e a pasta `optimized/` se ficar vazia; validar typecheck, build e /pt/success-stories.
- [x] Home (destaques): "Varejo farma" → "Indústria farmacêutica" em PT/EN/ES; traduzir para espanhol todas as etiquetas de origem e os textos ainda em português (ticket médio por PDV, positivação de produtos); validar PT/EN/ES e mobile/desktop.
- [x] Home (CTA final): incluir "Construa com o i6 Builder" apontando para /i6-builders, na ordem i6 Decision Suite → i6 Builder → Falar com especialista; validar PT/EN/ES e mobile/desktop.
- [x] Home (insights): exibir o destaque mais recente de cada categoria e mover os links específicos para abaixo dos cards; omitir categorias sem destaque.
- [x] Home (CTA final): "Teste o i6 Decision Suite grátis por 30 dias" como destaque laranja na linha de cima (com seta de link externo); Builder e Falar com especialista na linha de baixo, no estilo outlined; validar PT/EN/ES e mobile/desktop.

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

- [x] Home: remover a linha de nota do card final de CTA (PT/EN/ES)


- [x] Rodapé: ícones de Instagram, TikTok e Hugging Face (só Hugging Face com link)
- [x] Rodapé: seta de link externo no link "i6 Decision Suite" (e demais links externos)

- [x] Rodapé: link "Fale Conosco" acima do e-mail, apontando para /contact
- [x] Políticas (privacidade/ética) em painel lateral direito com tema areia; páginas /privacy-policy e /ethics-policy mantidas
- [x] Cabeçalho sempre navy (padrão) em todas as páginas — removida a lista de páginas claras e o vigia de rolagem

---

# Roadmap — Dados estruturados (JSON-LD)

- [x] `src/data/research.json` + `research.ts` e `founders.json` + `founders.ts` como fonte única
- [x] Grafo global: `@id` na Organization/WebSite, `founder` por referência, 2 Person no grafo (Henrique intocado)
- [x] Persons localizados por rota (pt/en/es) no gerador estático
- [x] `/our-ai`: 3 itens visíveis com os mesmos `@id`; `/docs/pesquisa`: 4 artigos + 9 palestras
- [x] Stubs e hreflang em espanhol para as rotas reais do router
- [x] Bloco B: rótulo "InfoQ Brasil · <evento>" em pesquisa-{pt,en,es}.md (origem i6 HUB precisa da mesma correção)
- [x] `scripts/validate-jsonld.mjs` roda no deploy e falha o build
- [ ] PLACEHOLDERs abertos: Scholar/ORCID e prêmios do Everton, volume/páginas do artigo LNCS 2010, fotos em `public/team/`, decisão sobre Henrique
- [ ] Consolidação de um nó por produto com `@id` (prompt separado)
