## Atualizar Hero (PT/EN) em `src/components/hometeste/HeroMovimento.tsx`

**Título (h1)** — mantém fonte/tamanho, destaca "antes"/"before" em coral (#F4845F) com glow suave (mesmo padrão do atual "You Grow"):

- PT: `Decida <span coral>antes</span> do mercado`
- EN: `Decide <span coral>before</span> the market`

**Subtítulo coral** — passa a slogan único (mesmo PT/EN), com glow apenas em "Decision Advantage":

- `The Platform for <span glow>Decision Advantage</span>`

**Descrição (parágrafo branco/60)** — nova cópia:

- PT: `Transformamos sinais de demanda, preço, estoque e comportamento em decisões que protegem margem, aceleram giro e aumentam conversão.`
- EN: `We turn demand, price, inventory and behavior signals into decisions that protect margin, accelerate turnover and increase conversion.`

**CTA** — PT: "Antecipe sua próxima decisão. Agora.".  
EN- EN: "Get ahead of your next decision. Now."

### Detalhes técnicos

- `dangerouslySetInnerHTML` no `<h1>` para injetar o `<span>` coral em "antes"/"before" com `textShadow` equivalente ao do "You Grow".
- Subtítulo vira string fixa com o `<span>` glow em "Decision Advantage".
- Alteração restrita ao componente `HeroMovimento.tsx`; troca do lema em outras seções fica para próximos passos.