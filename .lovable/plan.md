## Ajustes no vídeo Remotion (`remotion/src/`)

### 1. Faixa laranja mal posicionada — `scenes/HowItWorks.tsx`
A "faixa" é a linha de progresso (`position: absolute; top: 34`) desenhada atrás dos 4 cards: como os cards têm `borderTop: 3px solid CORAL`, a linha cruza os cards na altura errada e vaza pelas laterais.
- Remover essa linha absoluta. A leitura de sequência já é dada pela numeração 01–04 e pelo topo coral de cada card, que aparecem em cascata.

### 2. Espaçamento na cena i6 Signal — `scenes/Signal.tsx`
Hoje: header em `top: 30`, subtítulo com `marginTop: 8`, conteúdo com `paddingTop: 190` e `gap: 18` entre a barra de chips e o Intelliboard.
- Subtítulo: `marginTop` 8 → 20.
- Header: `top` 30 → 44.
- Conteúdo: `paddingTop` 190 → 240.
- `gap` entre barra de chips e Intelliboard: 18 → 36.
- Barra de chips: `padding` 6 → 8 e `gap` 6 → 10; chips com `padding: '12px 28px'`.

### 3. Ênfase no XAI com argumentos de e-commerce/varejo — `scenes/Engines.tsx`
Transformar o rodapé "XAI for Business" (hoje uma faixa fina de uma linha) em um bloco de destaque:
- Selo **XAI for Business** maior, em coral, com moldura mais forte e leve pulso coral (frame-based).
- Frase principal em destaque: explicabilidade que vira argumento de venda.
- Três exemplos curtos de argumento, em chips/colunas, com foco em e-commerce e varejo, no espírito de:
  - "Recomendado porque o cliente comprou X há 21 dias e a recompra média é 25 dias"
  - "Preço sugerido porque a elasticidade da categoria caiu 12% na região"
  - "Reposição antecipada porque o giro do SKU no PDV subiu 3 semanas seguidas"
- Para caber em 1080p: reduzir `minHeight` dos 3 cards de motores de 320 → ~270 e ajustar `marginTop`.
- Estender a cena de 420 → 500 frames para dar tempo de leitura dos argumentos.

### 4. Transição para o slide final e animação da logo — `scenes/Closing.tsx` + `MainVideo.tsx`
Causa da sobreposição: o crossfade `fade()` entre Results e Closing renderiza a logo do Closing por cima do grid de cases (visível no anexo 4).
- Trocar a transição Results → Closing por `slide({ direction: 'from-bottom' })`, que não sobrepõe conteúdos translúcidos.
- Adicionalmente, atrasar a entrada da logo no Closing (spring começando após o fim da transição) para nunca aparecer sobre a cena anterior.
- Animação da logo (visibilidade em TV acima do stand): entrada com spring e, em seguida, crescimento contínuo da largura de ~520px até ~900px ao longo da cena, com brilho coral suave por trás. Demais elementos (frase, URL, e-mail) reposicionados/reduzidos levemente para acomodar a logo maior.
- Aumentar o Closing de 270 → 360 frames para a animação de crescimento respirar.

### Técnico
- Atualizar o comentário e a constante `TOTAL_FRAMES` em `MainVideo.tsx` (novos totais: 210+330+390+420+700+500+450+360 = 3360 − 7×24 = **3192 frames**, ~106s).
- Conferência por stills (`bunx remotion still`) nos frames-chave: HowItWorks, Signal (header/chips), Engines (bloco XAI), transição Results→Closing e logo final ampliada.
- Re-renderizar para `/mnt/documents/infinity6-institucional.mp4` via `node scripts/render-remotion.mjs`.
