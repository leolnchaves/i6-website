## Objetivo

Nos detalhes de Success Story, cada "chip" da seção **ALAVANCAS DE VALOR / VALUE LEVERS** deve virar um link clicável para a respectiva landing em `/{lang}/solutions/<slug>`, mantendo compatibilidade retro com cases que ainda mandam só o texto.

## Contrato com o i6 HUB (frontmatter MD)

Hoje `solutions:` é uma lista de strings. Vamos aceitar **dois formatos** no mesmo campo, para o HUB migrar gradualmente:

1. **Texto puro** (comportamento atual, sem link):
   ```yaml
   solutions:
     - "Inteligência de Recomendação Industrial"
   ```

2. **Texto + slug de landing** usando `|` como separador (o HUB imprime o rótulo como quiser e anexa o slug depois da barra):
   ```yaml
   solutions:
     - "Descoberta Inteligente para Visitantes Anônimos|behavior-conversion"
     - "Personalização Preditiva para Usuários Identificados|behavior-conversion"
     - "Previsão de Demanda|demand-supply-efficiency"
   ```

Slugs válidos hoje (as 4 landings ativas):
`behavior-conversion`, `data-monetization`, `demand-supply-efficiency`, `predictive-operations`.

Regras de renderização:
- Sem `|` ou slug inválido → renderiza o chip como hoje (texto, não clicável).
- Com slug válido → chip vira `<Link>` para `/{lang}/solutions/<slug>` com hover coral (borda + leve preenchimento), mantendo o mesmo desenho de pill.
- O texto exibido é **exatamente** o que o HUB mandou antes do `|` — nada de derivar do slug.

Alternativa considerada e descartada: aceitar objetos `{label, slug}` no YAML. Piora a serialização no HUB e quebra os MDs existentes. O separador `|` é mais simples e 100% retrocompatível.

## Mudanças de código

1. `src/hooks/useSuccessStoriesMarkdown.ts`
   - Trocar o tipo `solutions: string[]` por `solutions: { label: string; slug?: string }[]`.
   - No parse do frontmatter, dividir cada item por `|`; validar o slug contra a whitelist das 4 landings ativas (`isLandingSlug` já existe em `useLandings.ts`); se inválido, cair para `label` only.

2. `src/pages/SuccessStoryArticle.tsx`
   - Na seção `story.solutions.map(...)`, renderizar `<Link>` (com `useLocalizedPath`) quando `slug` existir, senão um `<span>` idêntico ao atual. Estilo do link: mesma pill, hover borda `#F4845F` mais forte + `bg-[#F4845F]/20`.

3. `src/content/stories/README.md`
   - Documentar o novo formato `Label|slug` no bloco de frontmatter e listar os slugs de landing válidos, para o time do HUB seguir.

4. `scripts/sync-content-from-i6hub.mjs`
   - Passar `solutions` adiante sem transformação (já é uma lista de strings; o novo formato viaja como string com `|`). Só confirmar que não há sanitização que remova o `|`.

Sem mudanças em `ModernStoriesGrid.tsx` — cards da grid não exibem `solutions`.

## Verificação

- Case atual (sem `|`) continua igual: chips não clicáveis.
- Case editado no HUB com `Label|behavior-conversion` vira link para `/pt/solutions/behavior-conversion` (e `/en/...`).
- Slug inválido não quebra a página: cai para texto.
