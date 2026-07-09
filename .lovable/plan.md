## Contexto
Na página `/pt/solutions-v2`, os cards de solução (`LeanSolutionCard`) exibem um quadro interno com as três linhas **RESOLVE**, **ENTREGA** e **IMPACTO**. Como os textos superiores (título + tagline) e os textos internos têm tamanhos diferentes, os quadros ficam com alturas distintas e desalinhados entre os cards da mesma linha, conforme screenshot.

## Objetivo
Fazer com que os quadros internos tenham **sempre a mesma altura** e estejam **visualmente alinhados** entre si em cada linha do grid, sem quebrar a leitura do conteúdo.

## Arquivos envolvidos
- `src/components/solutions-v2/LeanSolutionCard.tsx` — componente do card.
- `src/components/solutions-v2/TerritorySection.tsx` — grid que renderiza os cards.
- `src/data/solutionsV2/content.ts` — dados dos cards (apenas leitura para validar textos).

## Estratégia de implementação

1. **Fazer o card ocupar toda a altura da linha do grid**
   - Adicionar `h-full` e `flex flex-col` no `<article>`.
   - O grid do `TerritorySection` já usa `items-stretch` por padrão, então os cards de uma mesma linha terão a mesma altura total.

2. **Padronizar a altura do bloco superior (título + tagline + descrição opcional)**
   - Aplicar `line-clamp-1` no título.
   - Aplicar `line-clamp-2` na tagline.
   - Aplicar `line-clamp-2` na descrição opcional, quando existir.
   - Isso garante que o espaço acima do quadro interno seja consistente em todos os cards da mesma linha, independentemente da variação de texto.

3. **Fazer o quadro interno crescer e ocupar o espaço restante de forma igualitária**
   - Adicionar `flex-grow` no container do quadro interno (`rounded-lg bg-white/5 ...`).
   - Assim, como todos os cards da linha têm a mesma altura total e o bloco superior tem a mesma altura padronizada, o quadro interno terá **altura idêntica** em todos os cards da linha.

4. **Manter a leitura dos textos internos**
   - As três linhas (RESOLVE, ENTREGA, IMPACTO) continuam com seu conteúdo completo, sem truncamento.
   - O espaço extra, quando houver, ficará na parte inferior do quadro, mantendo a hierarquia visual.

## Validação
- Abrir `/pt/solutions-v2` no preview.
- Verificar as três seções de alavanca (Growth, Planning, Pricing).
- Confirmar que os quadros internos de cada linha de 3 cards estão com a mesma altura e alinhados na base/superior.
- Verificar que nenhum texto foi cortado ou ficou ilegível.

## Escopo fora deste plano
- Não alterar o conteúdo/copy dos cards.
- Não modificar a paleta, bordas ou estilos visuais dos quadros.
- Não mexer em outros componentes da página (hero, signal, implementação, etc.).