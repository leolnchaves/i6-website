## Ajustar animação de chuva para lateral esquerda do hero

### Problema
A animação `MotionVerticalRain` ocupa toda a largura do hero via `inset-0` e usa apenas uma máscara de gradiente para suavizar a transição. As linhas caem em posições até 38% da largura, invadindo o espaço do título centralizado "Inteligência de Movimento".

### Solução
1. **Limitar a largura do container da animação** — Substituir `inset-0` por uma largura fixa de ~25–30% da tela, posicionada à esquerda, removendo a `maskImage`/`WebkitMaskImage` que apenas suaviza mas não contém.
2. **Reagrupar as linhas (`LINES`)** — Redistribuir as 7 linhas para caírem dentro da faixa estreita (ex: 3% a 22% da largura total do hero), mantendo o efeito denso mas sem cruzar a área do título central.
3. **Ajustar `HeroMovimento`** — Garantir que o container de texto (`max-w-4xl mx-auto`) tenha `z-10` sobreposto e que a animação não interfira no layout ou clicabilidade do conteúdo central.
4. **Responsividade** — Verificar que em telas menores (mobile) a animação continua contida à esquerda sem comprometer a legibilidade do título.

### Arquivos envolvidos
- `src/components/hometeste/MotionVerticalRain.tsx` — ajuste de posicionamento e linhas
- `src/components/hometeste/HeroMovimento.tsx` — confirmação de z-index e layout

### Critério de aceitação
A chuva vertical deve estar visível apenas na faixa esquerda do hero, deixando a área central (onde o título, subtítulo e CTA estão) completamente livre de animação, como indicado na anotação.