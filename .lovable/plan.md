## Diagnóstico

O código da tela (`SuccessStoryArticle.tsx`) e o loader (`useSuccessStoriesMarkdown.ts`) já lêem `what_to_anticipate` e `prediction` e renderizam condicionalmente as seções "O QUE PRECISAVA SER ANTECIPADO" e "A PREDIÇÃO". Só aparecem se o campo vier preenchido no frontmatter.

Verifiquei os 12 MDs em `src/content/stories/` — nenhum contém esses campos. A causa está no script de sync com o i6HUB:

`scripts/sync-content-from-i6hub.mjs`, função `fmStories` (linha 377) — monta o frontmatter escrevendo `challenge` e `solution`, mas **não escreve** `what_to_anticipate` nem `prediction`. Mesmo que o HUB envie esses campos no JSON do feed, eles são descartados na geração do `.md`.

## Correção

Em `scripts/sync-content-from-i6hub.mjs`, dentro de `fmStories`, inserir logo após `challenge` (linha 394) e antes de `solution`:

```js
`what_to_anticipate: ${yaml(it.what_to_anticipate ?? '')}`,
`prediction: ${yaml(it.prediction ?? '')}`,
```

Isso passa os campos do feed do HUB para o frontmatter. Se o HUB mandar string vazia, o campo fica `""` e a seção continua oculta (o `SuccessStoryArticle.tsx` já testa `story.whatToAnticipate && ...`).

## Após o merge

O sync roda no GitHub Actions no próximo deploy. Se algum case já estiver com os campos preenchidos no HUB, aparecerá automaticamente. Se o HUB ainda não expõe esses campos no feed JSON, será preciso ajustar o HUB — mas primeiro publicamos esta correção para validar.

## Fora do escopo

- Não altero `SuccessStoryArticle.tsx`, o hook, nem MDs individuais.
- Sem release nesta etapa — publico patch depois que você confirmar.
