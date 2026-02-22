

# Redesign da Secao "Sinais" - Layout Bold com GIF e Popups Animados

## Visao geral

Transformar a secao atual (grid de 6 cards + linha de texto infra) em um layout inspirado na referencia: titulo bold a esquerda, lista de capabilities com icones, GIF do i6Signal ao centro, e popups de insights animados que aparecem e desaparecem ao redor.

## Estrutura do novo layout

```text
+----------------------------------------------------------+
| SINAIS (badge)                                           |
|                                                          |
| Titulo bold grande                  [popup]    [popup]   |
| Subtitulo descritivo                                     |
|                                                          |
|  [icon] Motores de IA com fine-tuning    +----------+    |
|  [icon] Base multi-segmentada            | GIF do   |    |
|  [icon] i6Signal conversacional          | i6Signal |    |
|  [icon] APIs de ativacao imediata        +----------+    |
|                                     [popup]    [popup]   |
|                                                          |
|     [popup]   [popup]   [popup]   [popup]                |
+----------------------------------------------------------+
```

## Mudancas detalhadas

### 1. Copiar o GIF para o projeto
- Copiar `user-uploads://image-17.png` para `src/assets/images/i6signal-demo.png` (e a imagem do GIF do signal precisa ser referenciada - o usuario mencionou que o anexo e um GIF animado, mas o arquivo e PNG; usaremos como imagem estatica da plataforma)

### 2. Reescrever `SinaisSection.tsx` completamente

**Titulo e subtitulo** (alinhados a esquerda em desktop):
- Badge "SINAIS" com fundo coral
- Titulo grande e bold
- Subtitulo descritivo

**Lista de capabilities** (lado esquerdo):
- 4 itens com icones (Cog, Database, BarChart3, Boxes) e textos curtos
- Separados por linha sutil
- Substituem a linha infra atual

**GIF/Imagem central** (lado direito):
- Imagem do i6Signal com borda arredondada e sombra
- Botao de play overlay (opcional, como na referencia)

**Popups animados** (ao redor do GIF):
- ~10 popups com insights de negocio (textos curtos como "SKU critico com alta probabilidade de ruptura", "Aceleracao de demanda detectada", etc.)
- Cada popup aparece com fade-in, fica visivel por ~3-4s, depois fade-out
- Posicionados em posicoes absolutas ao redor do GIF (direita e abaixo)
- Staggered timing: cada popup tem delay diferente, ciclo total ~15-20s
- Borda coral arredondada, fundo branco, texto escuro
- CSS animations com keyframes para o ciclo appear/stay/disappear
- `prefers-reduced-motion` respeitado

**Layout responsivo**:
- Desktop: 2 colunas (texto+capabilities | GIF+popups)
- Mobile: empilhado verticalmente, popups simplificados

### 3. Adicionar keyframes em `index.css`
- `popup-cycle`: 0% opacity:0 -> 10% opacity:1 -> 70% opacity:1 -> 80% opacity:0 -> 100% opacity:0
- Cada popup usa animation-delay diferente para criar o efeito sequencial

### 4. Fundo da secao
- Mudar de `bg-[#0F172A]` (escuro) para `bg-white` ou `bg-gray-50` (claro, como na referencia)
- Textos passam a ser escuros

## Conteudo dos popups (PT/EN)

**PT:**
- Previsao de sell-out superior a cobertura atual de estoque
- Aumento de volume recomendado sem impacto negativo em giro
- Mudanca de sazonalidade antecipada para esta regiao
- SKU critico com alta probabilidade de ruptura
- PDVs similares operam com mix mais eficiente
- Mix atual nao acompanha o padrao de compra do PDV
- SKU com alta demanda prevista ausente no mix atual
- Oportunidade de pedido adicional com alto potencial de giro
- Aceleracao de demanda detectada
- Substituicao de SKUs sugerida para otimizar giro e margem

**EN:**
- Sell-out forecast exceeds current stock coverage
- Volume increase recommended without negative turnover impact
- Seasonality shift anticipated for this region
- Critical SKU with high stockout probability
- Similar stores operate with more efficient mix
- Current mix doesn't match store purchase pattern
- High-demand SKU missing from current mix
- Additional order opportunity with high turnover potential
- Demand acceleration detected
- SKU substitution suggested to optimize turnover and margin

## Conteudo das capabilities (PT/EN)

**PT:**
- Motores de IA proprietarios com fine-tuning.
- Base fundacional multi-segmentada.
- i6Signal, interface conversacional preditiva.
- APIs de ativacao imediata.

**EN:**
- Proprietary AI engines with fine-tuning.
- Multi-segmented foundational base.
- i6Signal, predictive conversational interface.
- Instant activation APIs.

## Arquivos alterados
- `src/assets/images/i6signal-demo.png` - novo (copia do upload)
- `src/components/hometeste/SinaisSection.tsx` - reescrito com novo layout
- `src/index.css` - keyframes para animacao dos popups

