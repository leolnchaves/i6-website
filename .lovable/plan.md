
# Centralizar logo verticalmente no modal de case

## Problema
A logo da empresa no header do modal de detalhes do case esta alinhada ao topo do espaco, em vez de ficar centralizada verticalmente.

## Mudanca

### `src/components/success-stories/story-components/StoryModal.tsx`
- Na div que envolve a logo (linha 96), adicionar `self-center` para centralizar verticalmente dentro do flex container.

Antes:
```html
<div className="flex-shrink-0 mr-8">
```

Depois:
```html
<div className="flex-shrink-0 mr-8 self-center">
```

Apenas uma classe CSS adicionada, sem outras alteracoes.
