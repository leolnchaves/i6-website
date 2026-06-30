## Problema

No `HeroSection` de `src/pages/TransformationLanding.tsx`, o container externo usa `max-w-5xl`, mas o `<h1>` e o bloco do `hero_sub` estão limitados a `max-w-3xl`. Por isso o subhero (kicker + título + sub + botão) aparece mais estreito que as seções do body (Dor, Problema, etc.), que ocupam toda a largura `max-w-5xl`.

## Correção

Em `src/pages/TransformationLanding.tsx`:

- Linha 52: remover `max-w-3xl` do `<h1>` para que o título acompanhe a largura do container.
- Linha 56: remover `max-w-3xl` do `<div>` do `hero_sub` (manter `prose prose-invert` + demais classes) para que o parágrafo do subhero ocupe a mesma largura das seções do body.

Nenhuma outra alteração — escopo restrito a alinhamento de largura do subhero das landings `/solutions/*`. Aplica-se igualmente às 4 landings (componente único parametrizado).