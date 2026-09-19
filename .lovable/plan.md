# Gerar llms, sitemap e stubs de uma fonte única

## Implementação
- Criar `public/llms.base.txt` com todas as seções fixas atuais e remover os antigos marcadores manuais
- Criar um coletor compartilhado para insights, artigos, On Media/Social, eBooks, deep research, stories e pesquisa, validando frontmatter, publicação, idiomas e slugs duplicados
- Gerar `public/llms.txt` e `public/sitemap.xml` integralmente no build a partir da base e do coletor, com URLs absolutas e alternates somente para idiomas existentes
- Fazer o prerender consumir os mesmos itens elegíveis do coletor, preservando o conteúdo não indexável apenas no app
- Persistir `published: true` nos Markdown sincronizados de insights e research
- Reordenar workflow e `npm run build`: syncs externos no workflow, depois llms, sitemap, Vite, prerender e validação
- Ampliar a validação para garantir inclusão integral dos elegíveis e exclusão integral de drafts, não publicados, samples, hidden e `demo-*`
- Atualizar o README de Intelligence para remover instruções de manutenção manual
- Atualizar os títulos PT/EN/ES de `/our-ai` no HTML, Open Graph e TechArticle

## Verificação e entrega
- Antes das alterações, mostrar no chat o diff completo por arquivo, o inventário atual de stubs e a conferência dos nós Observation
- Rodar o pipeline completo sem executar sync remoto localmente quando as credenciais não estiverem disponíveis
- Confirmar build, prerender, JSON-LD, sitemap, llms e regras de exclusão
- Colar no chat o `llms.txt` final e todas as URLs geradas no sitemap
