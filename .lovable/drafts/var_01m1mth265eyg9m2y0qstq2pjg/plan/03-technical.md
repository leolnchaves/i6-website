## Detalhes técnicos

`src/components/home-v3/HeroSuite.tsx`

- Remover o slot extra `role: 'out'` e a lógica de `max-height`. A janela passa a ter sempre 3 slots (`cursor + 0..2`).
- Envolver a lista num container com altura fixa: `position: relative` + `h-[...]` medido pelo conteúdo (ou grid de 3 linhas iguais com `grid-rows-3` e `gap-3`), garantindo que a caixa não reflua.
- Cada slot renderiza o card com `key` baseado no índice absoluto; a transição é apenas de opacidade/translate curto dentro do próprio slot, sem alterar altura.
- Implementação: manter os 3 slots posicionados por linha do grid e aplicar `animate-decision-fade` no card cuja posição mudou; o slot 0 recebe fade-out do item anterior sobreposto (absolute) para não empurrar layout.
- Manter timer de 4200ms, pause no hover e a animação inicial `animate-sand-rise` no primeiro render.

`src/index.css`

- Substituir `decision-out`/`decision-in` (que animam `max-height`) por keyframes que só usam `opacity` e um `translateY` de poucos px, sem afetar o fluxo.

Sem mudanças de conteúdo, cópia PT/EN ou estilos de card. Validação: typecheck, build e captura no navegador em `/pt` comparando a altura do quadro em três instantes da rotação.
