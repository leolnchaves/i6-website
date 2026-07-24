## Diagnóstico

O parser do site já separa por `;` (mudança anterior). Mas o **script de sync do i6 HUB** (`scripts/sync-content-from-i6hub.mjs`) continua gerando o array com vírgulas ao materializar os MDs em `src/content/stories/`:

```js
const yamlList = (arr) => `[${arr.map((v) => JSON.stringify(v)).join(', ')}]`;
...
: it.solutions.split(',').map(...)   // fallback quando vem string
```

Resultado no MD gerado pelo deploy (site em produção):

```yaml
solutions: ["Personalização Preditiva|growth", "Preço Orientado ao Giro|pricing"]
```

O parser do site (`useSuccessStoriesMarkdown.ts`) agora só quebra em `;`, então trata tudo depois do primeiro item como um único chip — exatamente o que aparece no print: `, "Preço Orientado ao Giro`.

O HUB está mandando certo (array com slugs). O bug está no **serializador do sync**.

## Mudança

### `scripts/sync-content-from-i6hub.mjs`
1. No `fmStories`, serializar `solutions` com `;` como separador — não usar o `yamlList` global (que serve os demais tipos e usa `,`).
   - Substituir a linha `` `solutions: ${yamlList(solutions)}` `` por uma serialização local:
     ```js
     `solutions: [${solutions.map((v) => JSON.stringify(v)).join('; ')}]`
     ```
2. Ajustar o fallback de string para também aceitar `;` (defensivo, caso o HUB algum dia mande string):
   ```js
   it.solutions.split(/[;,]/).map((s) => s.trim()).filter(Boolean)
   ```

## Fora de escopo
- Não altero o `yamlList` global (outros tipos continuam com vírgula, que é YAML padrão).
- Não mexo no parser do frontend — já está correto.
- Não altero os MDs atuais em `src/content/stories/` (todos já usam `;` desde a migração anterior). O próximo `sync` do HUB vai regenerá-los no formato correto automaticamente.
