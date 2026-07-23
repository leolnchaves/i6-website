# Remover fallback do excerpt para `quote` nos metadados do case

Hoje, quando `description` do MD está vazio, `SuccessStoryArticle.tsx` usa `story.quote` como fallback em vários metadados. Vamos remover esse fallback: se `description` estiver vazio, o campo simplesmente **não é emitido**.

## Mudanças em `src/pages/SuccessStoryArticle.tsx`

- `<meta name="description">`: renderizar somente se `story.description` existir.
- `<meta property="og:description">`: idem.
- `Article` JSON-LD (`description`): incluir a chave apenas quando `story.description` existir (spread condicional, mesmo padrão já usado para `image`).
- Parágrafo visível do excerpt na hero (linhas 127–131): já é condicional a `story.description` — permanece.

## Fora de escopo

- Card e demais telas não usam `description`; nada a alterar.
- `quote` continua sendo exibido no bloco de citação da página de detalhe.
