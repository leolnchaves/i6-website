## O que muda no conteúdo

Nada é reescrito. Só há remanejamento:

- Título grande mantido: "Uma plataforma de decisão, não um conjunto de dashboards".
- O texto "Escolha a decisão que quer melhorar..." deixa de abrir uma segunda seção e passa a introduzir o explorador de produtos.
- "Seis decisões críticas, uma suíte" continua visível, como subtítulo interno da mesma seção.
- O rótulo pequeno "Produtos" é absorvido pelo subtítulo interno para não repetir duas etiquetas.
- 3 pilares, 6 produtos, dores, capacidades e o fluxo Entrada → Decisão → Valor: idênticos.

## Detalhes técnicos

- `src/components/home-v3/product/SuiteIntro.tsx` e `ProductSuite.tsx` são fundidos em um único componente `DecisionSuiteSection.tsx` na mesma pasta; os dois arquivos antigos são removidos.
- `src/pages/HomeTeste.tsx` passa a renderizar um componente só no lugar dos dois.
- A âncora `id="decision-suite"` permanece no wrapper único (as faixas da hero e outros links continuam funcionando).
- `suiteContent.ts` fica intacto (mesma estrutura `intro` + `products`), assim como as traduções PT/EN/ES.
- Espaçamento: seção com `pt-20 md:pt-28` / `pb-20 md:pb-28`, pilares a `mt-12`, separador + subtítulo a `mt-16 md:mt-20`, explorador a `mt-10`, CTAs a `mt-12` — mais alto que hoje, sem aperto.
- Validação: typecheck, build e checagem visual PT/EN/ES em desktop (1440 e 1280) e mobile 390px, sem overflow. Sem publicação.
