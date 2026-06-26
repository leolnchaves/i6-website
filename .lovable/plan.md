## Problema

Nas landings de `/solutions/<slug>`, o título de cada seção (Pain, Problem, Solution, Application, Results, FAQ) é renderizado direto do texto do H2 do Markdown (`pain.title`, `problem.title`, etc.). Quando o MD da edição PT tem o H2 em inglês (ou foi sincronizado/editado fora do padrão), o título aparece em inglês mesmo no idioma PT — exatamente o caso da screenshot: eyebrow "A DOR REAL" em PT, mas título "Pain" em inglês.

## Solução

Desacoplar o título visível do texto do H2. Renderizar título **e** eyebrow a partir de um mapa localizado fixo, indexado pelo `section.id` (que já é normalizado para `pain | problem | solution | application | results | faq` independentemente da língua do heading).

### Mapa de títulos (PT / EN)

| section.id   | PT (title)     | EN (title)     |
|--------------|----------------|----------------|
| pain         | Dor            | Pain           |
| problem      | Problema       | Problem        |
| solution     | Solução        | Solution       |
| application  | Aplicação      | Application    |
| results      | Resultados     | Results        |
| faq          | Perguntas frequentes | FAQ      |

Eyebrows (já localizados no código) continuam como estão.

### Alteração

Em `src/pages/TransformationLanding.tsx`, trocar `title={pain.title}` (e os demais) por `title={SECTION_TITLES[language].pain}`, etc. Mesma coisa para o título da seção FAQ (`FAQList`) e Results.

Sem mudanças em conteúdo Markdown, sem mudanças em rotas, parser, ou SEO. Apenas presentation.

## Arquivos afetados

- `src/pages/TransformationLanding.tsx` — adicionar `SECTION_TITLES` constante e usar nos 5 `SectionShell` + no `FAQList`.
