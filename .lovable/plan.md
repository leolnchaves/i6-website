## Objetivo
No `/pt/home-v4`, trocar o conteúdo do título principal com o do subtítulo, preservando o design de cada posição (tamanho, peso, cor, glow).

## Mudança em `src/components/hometeste/HeroDecisaoV4.tsx`

Bloco de título superior (mantém estilos atuais, apenas troca o texto):

- **H1 (posição de cima — grande, branco, negrito)**: passa a exibir "The Platform for **Decision Advantage**" com "Decision Advantage" em coral (`#F4845F`) — herda o destaque que hoje está no subtítulo.
- **Subtítulo (posição de baixo — coral, leve, tracking wide)**: passa a exibir "Decida *antes* do mercado" com "antes" mantendo o coral/ênfase — herda o tratamento tipográfico menor.

Nenhuma outra alteração: diagrama, halo, CTA e descrição do bottom permanecem iguais. Apenas PT (v4).

## Fora do escopo
- Home oficial (`HeroMovimento.tsx`) e demais variações (v1/v2/v3) permanecem intactas.
- Sem mudanças em EN.
