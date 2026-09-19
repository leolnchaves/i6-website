# Roadmap

- [x] Coletor único de conteúdo (`scripts/lib/content-collector.mjs`)
- [x] Base manual `public/llms.base.txt` + gerador `scripts/generate-llms.mjs`
- [x] `scripts/generate-sitemap.mjs` gerando o sitemap inteiro pelo coletor, com lastmod preservados
- [x] Prerender consumindo o mesmo coletor (insights, deep research, cases)
- [x] Validação de paridade: todo item elegível em llms + sitemap + stub; nenhum excluído em nenhum
- [x] Sync do i6 HUB grava `published: true` em insights e research
- [x] Ordem do build: llms → sitemap → vite build → prerender → validate
- [x] Workflow corrigido (docs em vez do tipo inexistente landings)
- [x] README de i6 Intelligence sem instrução manual de llms/sitemap
- [x] Títulos PT/EN/ES de `/our-ai` (meta, og e headline do TechArticle)
