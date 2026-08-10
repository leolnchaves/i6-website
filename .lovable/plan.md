# Hero PT: arte sem moldura, fundida ao navy

O resultado atual ainda mostra um retângulo nítido: a máscara está fraca demais e o `mix-blend-mode: screen` clareia o preto da arte, criando um bloco mais claro que o fundo da página. Corrigir para que a arte não tenha bordas perceptíveis.

## O que fazer

1. **Deixar de tratar a arte como "figura" e tratá-la como fundo do hero**
   - A imagem passa a ser uma camada `absolute inset-0` atrás do conteúdo do hero (título, descrição, CTA), com `object-cover` centrado e largura total da seção — sem container, sem limite de 92%, sem cantos.
   - O conteúdo do hero fica em `z-10` acima dela.

2. **Feather real nas quatro bordas (o ponto que falhou)**
   - Máscara composta: gradiente radial elíptico amplo + gradientes lineares nas quatro direções, com transição longa (últimos 25–35% totalmente transparentes), de modo que não exista nenhuma linha reta visível.
   - Sem `clip-path`.

3. **Igualar o preto da arte ao navy da página**
   - Remover `mix-blend-mode: screen` (é ele que cria o bloco claro).
   - Usar leve `opacity` (≈0.85) e, se necessário, um overlay navy `#0B1224` em gradiente por cima das bordas, para o fundo da arte coincidir exatamente com o fundo da seção.

4. **Legibilidade e escala**
   - Deslocar/escalar a arte para que o núcleo "Decisão Antecipada" fique no espaço livre entre o título e a descrição.
   - No mobile, aumentar o zoom e centralizar no núcleo, com o mesmo feather.

5. **Movimento sutil**
   - Fade-in na entrada e um `translateY` muito lento (parallax leve) para a arte parecer ambiente, não colada.

## Técnico
- Apenas `src/components/hometeste/HeroDecisaoV4.tsx` (camada de fundo + máscara + overlay). Asset `hero-decisao-neon-pt-v1` já publicado.
- EN permanece com os assets atuais.
- Verificação por screenshot no preview PT antes de entregar; sem release/deploy nesta etapa.
