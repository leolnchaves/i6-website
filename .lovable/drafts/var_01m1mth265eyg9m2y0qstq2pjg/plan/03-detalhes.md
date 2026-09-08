## O que muda no conteúdo

Nada é reescrito. Só há remanejamento:

- Título grande mantido: "Uma plataforma de decisão, não um conjunto de dashboards".
- O texto "Escolha a decisão que quer melhorar..." permanece na coluna de produtos.
- "Seis decisões críticas, uma suíte" continua como o título da coluna direita, preservando sua hierarquia sem competir com o título principal.
- O rótulo pequeno "Produtos" pode permanecer como eyebrow acima desse título.
- 3 pilares, 6 produtos, dores, capacidades e o fluxo Entrada → Decisão → Valor: idênticos.

## Detalhes técnicos

- `src/components/home-v3/product/SuiteIntro.tsx` e `ProductSuite.tsx` são fundidos em `DecisionSuiteSection.tsx`; os dois arquivos antigos são removidos.
- `src/pages/HomeTeste.tsx` passa a renderizar um componente só no lugar dos dois.
- A âncora `id="decision-suite"` permanece no wrapper único (as faixas da hero e outros links continuam funcionando).
- `suiteContent.ts` fica intacto (mesma estrutura `intro` + `products`), assim como as traduções PT/EN/ES.
- Em telas grandes, o wrapper usa uma grade assimétrica próxima de `minmax(0, 0.8fr) minmax(0, 1.2fr)`, com `gap` amplo. As colunas só ficam paralelas a partir de uma largura que comporte o painel confortavelmente.
- Os 3 pilares ficam empilhados na coluna esquerda, em vez de espremidos lado a lado. Na direita, os 6 seletores passam para uma grade compacta acima do painel; o painel conserva toda a informação atual.
- O alinhamento começa pelo topo, mas nenhuma altura é forçada: cada lado cresce conforme seu conteúdo, evitando cortes e compressão.
- A seção mantém espaçamento vertical generoso (`py-20 md:py-28`), 32–48 px entre os blocos internos e 64–80 px entre as colunas no desktop.
- Validação: typecheck, build e checagem visual PT/EN/ES em desktop (1440 e 1280) e mobile 390px, sem overflow. Sem publicação.
