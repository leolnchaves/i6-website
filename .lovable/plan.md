# Corrigir falha do deploy disparado pelo i6Hub

## O que aconteceu

O run "Deploy to GitHub Pages" (evento `repository_dispatch`, 28/08 19:29 UTC) falhou no passo **Sync insights from i6Hub CMS**. O site continua na versão anterior (v2.4.4).

Erro real do log:

```text
Error: ENOENT: no such file or directory, open
'src/content/insights/pt-/blog/sinais-de-intencao-ia-preditiva.md'
```

Causa: o insight publicado no i6Hub tem o slug gravado como **`/blog/sinais-de-intencao-ia-preditiva`** (com barra inicial e caminho embutido) em vez de apenas `sinais-de-intencao-ia-preditiva`. O script monta o nome do arquivo como `${language}-${slug}.md`, o que virou um caminho com subpastas inexistentes e quebrou a escrita — abortando o job inteiro (build e deploy foram pulados).

## Correção proposta

1. **Validar o slug no início do sync** (`scripts/sync-content-from-i6hub.mjs`), para todos os tipos (insights, research, landings, stories): se o slug tiver barra, espaço ou caracteres inválidos para nome de arquivo, **abortar o job imediatamente** (exit 1) com mensagem explícita, por exemplo:

   ```text
   [insights] SLUG INVÁLIDO: "/blog/sinais-de-intencao-ia-preditiva" (pt)
   Slug deve conter apenas letras minúsculas, números e hífens.
   Corrija no i6Hub e salve novamente para redisparar o deploy.
   ```

   O deploy continua falhando de forma ruidosa (nada de saneamento silencioso), mas o erro passa a apontar o artigo e a ação necessária em vez de um `ENOENT` de caminho.
2. **Ajuste no i6Hub (do seu lado)**: corrigir o slug do artigo para `sinais-de-intencao-ia-preditiva` — o slug não deve conter o caminho da rota, só o identificador.


## Verificação

- Rodar o script de sync localmente contra o feed: com o slug atual deve abortar com a mensagem clara; após a correção no i6Hub deve gerar `.md` e imagens sem erro.
- Depois disso, salvar o artigo novamente no i6Hub (dispara `repository_dispatch`) ou reexecutar o workflow, e confirmar o run verde.

## Notas técnicas

- Nada muda nos gatilhos do workflow (`tags v*` + `repository_dispatch`).
- A validação roda antes de qualquer escrita/download, então um item inválido não deixa arquivos parciais.
- As imagens já baixadas em `public/content/insights/blog-sinais-de-intencao-ia-preditiva/pt/` serão substituídas pelo diretório correto no próximo sync, e o cleanup de órfãos remove o antigo.

