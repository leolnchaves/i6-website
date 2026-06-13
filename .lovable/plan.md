## Problema

Os 4 arquivos `*-pt.md` em `src/content/landings/` estão com os títulos das seções (`## Pain`, `## Problem`, `## Solution`, `## Application`, `## Results`, `## FAQ`) em inglês. Como o `TransformationLanding.tsx` renderiza o `section.title` exatamente como está no Markdown, as versões em português exibem os títulos em inglês.

O parser em `useLandings.ts` já mapeia tanto PT quanto EN para os mesmos `section.id` (`pain`, `problem`, `solution`, `application`, `results`, `faq`), então mudar apenas o título visível não quebra nenhuma lógica.

## Mudanças

Substituir os cabeçalhos H2 nos 4 arquivos PT:

| EN (atual) | PT (novo) |
|---|---|
| `## Pain` | `## Dor` |
| `## Problem` | `## Problema` |
| `## Solution` | `## Solução` |
| `## Application` | `## Aplicação` |
| `## Results` | `## Resultados` |
| `## FAQ` | `## Perguntas frequentes` |

Arquivos afetados:
- `src/content/landings/demand-supply-efficiency-pt.md`
- `src/content/landings/data-monetization-pt.md`
- `src/content/landings/predictive-operations-pt.md`
- `src/content/landings/behavior-conversion-pt.md`

Os arquivos `-en.md` ficam intactos. Nenhuma alteração de código/componente é necessária.
