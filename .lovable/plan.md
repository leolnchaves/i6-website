## Contexto

Hoje o parser YAML minimalista em `src/hooks/useSuccessStoriesMarkdown.ts` divide o array inline `solutions: [...]` por vírgula. Isso quebra quando o rótulo da alavanca contém vírgula (ex.: `"Crescimento, Personalização|growth"`).

## Mudanças

### 1. `src/hooks/useSuccessStoriesMarkdown.ts`
Ajustar o parser de array inline para separar por `;` ao invés de `,`:
- Trocar o regex `/("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|[^,]+)/g` por versão baseada em `;`.
- Manter suporte a strings entre aspas e trim dos itens.

Formato aceito no frontmatter passa a ser:

```yaml
solutions: ["Descoberta, Recomendação e Personalização|growth"; "Previsão de Demanda|planning"]
```

Observação: fica um YAML "não-padrão" (arrays YAML são separados por vírgula), mas como usamos parser próprio, funciona. Arquivos existentes sem vírgula no rótulo continuam funcionando desde que sejam migrados para `;` — precisamos atualizar os 6 MDs de stories.

### 2. Migrar arquivos existentes
Atualizar os arrays `solutions:` nos 6 arquivos em `src/content/stories/*.md` trocando `,` por `;` entre itens (só onde houver múltiplos itens).

### 3. `src/content/stories/README.md`
Atualizar a documentação (exemplo e descrição do campo `solutions`) para o time do i6 HUB indicando que o separador é `;`.

## Fora de escopo
- Não altero outros campos nem o parser de escalares.
- Não mexo no i6 HUB — só documento o novo contrato aqui.
