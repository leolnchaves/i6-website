## Causa

O body das seções (Dor, Problema, Solução, Aplicação) funciona porque o conteúdo do `.md` que vem **depois do frontmatter** chega ao `MarkdownBody` com newlines reais — então o `ReactMarkdown` + `remarkGfm` cria parágrafos e renderiza `**negrito**` corretamente.

O `hero_sub` mora **dentro do frontmatter** como string entre aspas. O parser caseiro em `src/hooks/useLandings.ts` (linhas 39-59) não decodifica escape sequences, então `"...inteligentes.\n\n**Monetizar...**"` chega ao Hero com os caracteres `\` e `n` literais, sem newline. Sem newline duplo, o `remarkGfm` não quebra parágrafo, e isso atrapalha o reconhecimento do `**...**` ao redor.

O `HeroSection` em `src/pages/TransformationLanding.tsx` (linhas 55-59) **já está igual ao `MarkdownBody`**: usa `ReactMarkdown` + `remarkGfm` dentro de `prose prose-invert`. Não precisa mexer no JSX. Basta entregar ao componente uma string com newlines reais — exatamente como o body já recebe.

## Solução

Ajustar **apenas** `parseFrontmatter` em `src/hooks/useLandings.ts` para decodificar escape sequences quando o valor estiver entre aspas duplas. Uma única adição, ~4 linhas, logo após o trecho que remove as aspas (linhas 50-52):

```ts
if (value.startsWith('"') && rawWasDoubleQuoted) {
  value = value
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}
```

Com isso, **todas as 8 landings** (4 slugs × pt/en) passam a renderizar `hero_sub` com parágrafos e negrito automaticamente, sem tocar em nenhum `.md` e sem alterar nenhum componente React. O comportamento fica idêntico ao do body.

## Por que isso cobre tudo

- `TransformationLanding.tsx` é o único arquivo de página que consome `hero_sub` (já validado por `rg`).
- O fix é no parser compartilhado por todas as landings — qualquer `hero_sub` que use `\n\n` e `**...**` passa a funcionar.
- Strings entre aspas simples ou sem aspas seguem literais (preserva semântica YAML).
- Não afeta o body (que nunca passou por essa função para a parte de conteúdo) nem outros campos (`description`, `hero_kicker`, etc., que não usam escapes hoje).

## Validação

Abrir no preview as 8 rotas e confirmar negrito + parágrafos no subhero, sem `\n` visível:

- `/pt/solutions/data-monetization` e `/en/...`
- `/pt/solutions/behavior-conversion` e `/en/...`
- `/pt/solutions/demand-supply-efficiency` e `/en/...`
- `/pt/solutions/predictive-operations` e `/en/...`

E confirmar que o body das mesmas páginas continua renderizando idêntico ao atual (não-regressão).

## Arquivos alterados

- `src/hooks/useLandings.ts` — apenas dentro da função `parseFrontmatter`.
