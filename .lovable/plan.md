## Ajuste

Alinhar o card **POR QUE** do `PriceToMarginDemo` ao comportamento das demais telas: só renderiza quando a timeline completa (`done`), sem mensagem genérica durante o running.

## Mudança

Em `src/components/kiosk/demos/PriceToMarginDemo.tsx`:

- Trocar a condição do wrapper de `{selected && (...)}` para `{done && selected && (...)}`.
- Remover o branch `else` com `ui.defaultWhy` e a chave `defaultWhy` do mapa `uiCopy` (PT/EN) — não é mais usada.

Durante a seleção, o usuário vê apenas o produto ampliado + spinner "Analisando..." (top card) e a timeline avançando (bottom card). Quando termina, o POR QUE aparece com `selected.insight` e o preço recomendado.
