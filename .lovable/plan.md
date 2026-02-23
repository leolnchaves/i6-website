

## Ajustar hero para que ondas fiquem perto do final da viewport

### Problema

As ondas estao posicionadas no meio da secao hero. O usuario quer que o hero ocupe a tela inteira (100vh) com as ondas proximas ao final da viewport, de modo que ao fazer scroll o usuario veja as ondas e logo abaixo as metricas.

### Mudanca

**Editar `src/components/solutions/SolutionsHero.tsx`**

- Mudar `min-h-[70vh]` para `min-h-screen` (100vh) -- hero ocupa a tela inteira
- Ajustar padding: manter `pt-24` (espaco do header), aumentar `pb-40` para algo como `pb-48` ou `pb-52`
- O texto fica centralizado no espaco acima das ondas, e as ondas ficam naturalmente perto do fundo da viewport

Nenhuma mudanca no `HorizontalWaves.tsx` -- o posicionamento `absolute bottom-0` ja coloca as ondas no final da section. Com a section ocupando 100vh, as ondas ficam no final da tela.

