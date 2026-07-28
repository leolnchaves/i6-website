## Ajuste

No `PriceToMarginDemo`, esconder o card **POR QUE** enquanto nenhum produto estiver selecionado — igual às demais telas, onde o insight só aparece durante/depois da simulação.

## Mudança

Em `src/components/kiosk/demos/PriceToMarginDemo.tsx`, envolver o bloco `.kiosk-insight-card` com uma condição `selected && (...)`. Assim:

- **Sem produto selecionado**: card POR QUE não renderiza. A timeline horizontal (bottom card) continua visível em estado `idle`, junto com o título "Explicabilidade e raciocínio do modelo".
- **Produto selecionado, running**: card POR QUE aparece com o texto genérico (`ui.defaultWhy`).
- **Produto selecionado, done**: card POR QUE mostra `selected.insight` + preço recomendado (comportamento atual).

Nenhuma outra alteração — dados, estados, timeline e KPIs permanecem intactos.
