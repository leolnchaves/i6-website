# Auditoria de JSON-LD, SEO editorial e geração do llms.txt

## Escopo

Nenhum arquivo de produto será alterado. A execução apenas regenerará `dist/` localmente para inspeção e apresentará os resultados no chat, sem anexos.

## Etapas

1. Executar build, prerender e validações atuais, registrando somente a saída local.
2. Extrair e minificar os blocos JSON-LD solicitados de `/pt`, `/pt/docs/pesquisa` e `/pt/our-ai`.
3. Comparar Person e TechArticle em PT, EN e ES exclusivamente nos campos indicados.
4. Auditar todas as páginas geradas com JSON-LD: quantidade de blocos, `@id`, referências não resolvidas, valores vazios/problemáticos, imagens e `sameAs`.
5. Buscar nos HTMLs gerados todos os termos proibidos e explicar qualquer ocorrência legítima.
6. listar canonical e hreflang das páginas solicitadas, incluindo um artigo do blog.
7. Mapear fontes editoriais, idiomas, critérios de publicação, sincronização do i6 HUB e escritores atuais de `llms.txt` e `sitemap.xml`.
8. Propor, sem implementar, a geração automática do `llms.txt` por um único escritor e comparar os riscos das opções build versus sync do HUB.
9. Verificar se o sitemap cobre o mesmo universo de conteúdo publicado e identificar lacunas.

## Entrega

Resposta no chat em sete blocos titulados, com JSON minificado em blocos de código. Se ultrapassar aproximadamente 15 KB, a entrega será dividida em mensagens consecutivas.
