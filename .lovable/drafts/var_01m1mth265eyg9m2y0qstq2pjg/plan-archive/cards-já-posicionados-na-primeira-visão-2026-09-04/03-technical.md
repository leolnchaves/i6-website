## Detalhes técnicos

`src/components/home-v3/HeroSuite.tsx`

- Causa: os slots são posicionados por `transform: translateY(pos * (ROW + GAP))` inline, mas no primeiro render recebem a classe `animate-sand-rise`, cujos keyframes também animam `transform` — a animação sobrescreve o transform inline e todos os cards renderizam em `translateY(0)` (topo) até ela terminar.
- Trocar a classe de entrada: no primeiro render (`cursor === 0`) usar `animate-decision-fade` (só `opacity`) com o mesmo stagger via `animationDelay: 0.4 + i * 0.14s`, em vez de `animate-sand-rise`.
- Manter o `transform` inline como única fonte de posição.

`src/index.css`

- Nenhuma mudança necessária: `decision-fade` já anima apenas `opacity`.

Validação: typecheck, build e captura no navegador em `/pt` logo após o carregamento, confirmando os três cards já separados nas suas linhas.
