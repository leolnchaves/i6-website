# Implementação

1. Em `BuilderModels.tsx`, dentro do `tabpanel` (quadro de detalhe à direita), adicionar uma faixa vertical absoluta na borda esquerda do card.
   - Largura de 2px, cor `hsl(var(--primary))`.
   - Altura proporcional ao conteúdo ou ao card, posicionada de forma que o centro da faixa coincida com a altura da linha horizontal (centro do item ativo).
   - Animação de fade/altura suave, respeitando `prefers-reduced-motion`.

2. Ajustar o padding interno do painel para que o conteúdo não sobreponha a faixa.

3. Manter a linha SVG horizontal e o círculo na extremidade como estão; a nova faixa é um elemento visual adicional no painel.

4. Garantir que a faixa seja recalculada/renderizada corretamente ao trocar de família ou idioma, aproveitando a chave `key={`${active}-${language}`}` já existente no conteúdo do painel.

## Validação
- Build e typecheck OK.
- Screenshots em PT, EN e ES confirmando a faixa vertical no painel direito.
- Verificar que a faixa não quebra em mobile (escondida abaixo de `md`, assim como a linha horizontal).
