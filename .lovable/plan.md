## Harmonizar os 4 cards do "Como Funciona"

Os títulos têm tamanhos diferentes (1 ou 2 linhas) e as descrições começam em alturas distintas, deixando os cards desalinhados. Em `src/components/hometeste/ComoFuncionamosSection.tsx`:

1. **Grid dos cards (linha 303):** trocar `grid-cols-4 gap-4` por `grid-cols-4 gap-4 items-stretch` para que todos os cards ocupem a mesma altura.
2. **Card (linha 310):** adicionar `h-full flex flex-col` ao className para o conteúdo se organizar verticalmente.
3. **Título (linha 315):** adicionar `min-h-[3.25rem]` para reservar espaço de duas linhas em todos os títulos, alinhando o início das descrições no mesmo eixo Y.

Nada de conteúdo muda — só o layout dos cards fica homogêneo.
