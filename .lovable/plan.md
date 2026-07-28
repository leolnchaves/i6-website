## Ajuste do fluxo — Preço Orientado a Margem (Kiosk)

Arquivo: `src/components/kiosk/demos/PriceMarginDemo.tsx`

### Mudanças

1. **Subtítulo do card do topo** (linha ~161)
   - De: "Selecione um SKU e ajuste restrições para simular a faixa ótima de preço."
   - Para: "Selecione os filtros e ajuste restrições para simular a faixa ótima de preço por SKU."

2. **Habilitar o botão de cálculo sem exigir SKU**
   - `canCalculate` passa a exigir apenas `filtered.length > 0` (existir SKU na seleção de filtros), em vez de `!!selected`.
   - Texto do botão desabilitado ajustado para o caso "sem SKUs na seleção" (ex.: "Ajuste os filtros para simular"). Quando houver SKUs, exibe "Calcular faixa ótima de preço".

3. **Bloquear seleção de SKU antes do cálculo**
   - Nas linhas da tabela de portfólio (setup), os `<button>` de linha ficam `disabled` enquanto `phase !== 'result'`, com `cursor-default` e sem hover em laranja. Continuam exibindo os dados normalmente (Preço atual, Elast., Posição, Cobertura, Preço concorrente), com "Ação sugerida" em "—".
   - Após o cálculo (`phase === 'result'`), as linhas voltam a ser clicáveis e o destaque laranja do SKU ativo reaparece.

4. **Auto-selecionar o primeiro SKU após o cálculo**
   - No `useEffect` que dispara o pipeline, quando `phase` muda para `'result'` (via `setTimeout` final), setar `setSelectedId(filtered[0]?.id ?? null)` caso `selectedId` ainda esteja vazio.
   - Se o usuário depois trocar filtros e o SKU selecionado sair da lista, o efeito existente já limpa o `selectedId` — combinar com um reset para `setup` (ou re-selecionar automaticamente o primeiro) para manter consistência: **manter o comportamento atual** de apenas limpar `selectedId`; o painel de resultado deixa de aparecer até novo cálculo.

5. **Reset**
   - `reset()` (usado ao mudar filtros/estratégia) continua voltando para `setup` e limpando `selectedId`, garantindo que o usuário refaça o cálculo se mudar restrições.

### Fora do escopo
- Nenhuma mudança em `priceMargin.ts` (dados/labels).
- Nenhuma mudança no card "Explicabilidade" — ele já exibe o insight geral quando não há SKU selecionado e o argumento do SKU quando há.
