## Os cinco ajustes

1. Os três cartões de pilares saem da seção.
2. Dentro do painel, cada etapa do fluxo passa a carregar o pilar
   correspondente como rótulo fino acima de Entrada / Decisão / Valor —
   assim o pilar aparece aplicado ao produto escolhido, não solto na página.
3. Os botões saem do painel e vão para a base da seção, os dois na mesma linha,
   alinhados à esquerda, com o mesmo desenho de hoje.
4. O rótulo "Produtos" e o título "Seis decisões críticas, uma suíte" saem.
5. A frase "Escolha a decisão que quer melhorar…" fica acima da régua e do
   painel, no mesmo tamanho e cor de fonte atuais, agora completa (sem corte).
6. Sem textos acima da régua, o primeiro card alinha com o topo do painel e o
   último com a base; a régua se distribui na altura do painel.

## Detalhes técnicos

Somente `src/components/home-v3/product/DecisionSuiteSection.tsx`:

- Remover o bloco de pilares (grid de `copy.intro.pillars`) e usar
  `copy.intro.pillars[i].title` como rótulo dos três passos de `flowSteps`.
- Remover eyebrow/título/descrição da coluna esquerda; renderizar
  `copy.products.description` num parágrafo acima do grid, sem `line-clamp`.
- Grid segue `lg:grid-cols-[340px_minmax(0,1fr)]` com `lg:items-stretch`; a
  coluna de botões `role="group"` recebe `lg:h-full` e cada botão `lg:flex-1`
  para casar topo e base com o painel.
- Painel deixa de ser `justify-between` (sem CTAs internos); os dois CTAs vão
  para uma `div` no fim da seção com `flex flex-wrap gap-2.5` e sem `flex-1`,
  para ficarem justificados à esquerda.
- `suiteContent.ts` não muda: `products.eyebrow`/`products.title` apenas param
  de ser usados.

## Verificação

- Playwright em 1280×800, 1440×900 e 390×844, em PT/EN/ES: seção sem rolagem
  interna em desktop, troca de produto funcionando, régua alinhada ao painel,
  CTAs na base e empilhamento correto no mobile.
- `bun run build`.
