
# Redesign da Secao Sinais - Layout Bold com GIF e Popups

## O que muda

A secao atual tem 6 cards em grid + uma linha de texto "infra" ao final. Sera transformada em um layout inspirado na referencia, mantendo o fundo escuro (`bg-[#0F172A]`) e as cores atuais.

## Novo layout

```text
Desktop:
+--------------------------------------------------------------+
|  [SINAIS badge coral]                                        |
|                                                              |
|  Titulo bold grande (alinhado esquerda)                      |
|  Subtitulo descritivo                                        |
|                                                              |
|  +-- Capabilities --+      +--- GIF i6Signal ---+            |
|  | [icon] Motores IA |      |                   | [popup]    |
|  | [icon] Base multi |      |   video-i6signal  | [popup]    |
|  | [icon] i6Signal   |      |   -baixa.gif      |            |
|  | [icon] APIs       |      +-------------------+ [popup]    |
|  +-------------------+                             [popup]   |
|                                                              |
|      [popup]  [popup]  [popup]  [popup] (linha inferior)     |
+--------------------------------------------------------------+

Mobile: empilhado verticalmente
```

## Detalhes tecnicos

### 1. Copiar o GIF para o projeto
- Copiar `user-uploads://video-i6signal-baixa.gif` para `public/images/i6signal-demo.gif`
- Usar via `getPublicAssetUrl` ou path direto, ja que GIFs animados perdem animacao quando importados via ES modules em alguns bundlers

### 2. Reescrever `SinaisSection.tsx`

**Estrutura:**
- Badge "SINAIS" com fundo `bg-[#F4845F]/20 text-[#F4845F]`
- Titulo bold: "Somos especialistas em aplicar IA para transformar dados em decisoes que geram resultado." (PT) / equivalente EN
- Subtitulo: "Detectamos sinais que orientam decisoes comerciais, de supply e de pricing."
- Layout 2 colunas em desktop (`lg:grid-cols-2`)

**Coluna esquerda - 4 capabilities:**
- Cada item com icone (Cog, Database, BarChart3, Boxes do lucide-react) e texto
- Separados por borda sutil `border-b border-white/10`
- Textos: "Motores de IA proprietarios com fine-tuning.", "Base fundacional multi-segmentada.", "i6Signal, interface conversacional preditiva.", "APIs de ativacao imediata."

**Coluna direita - GIF + popups animados:**
- GIF com `rounded-xl shadow-2xl` e borda sutil
- Container relativo para posicionar popups em absolute
- ~10 popups posicionados ao redor do GIF (direita e abaixo)

**Popups animados (React state-based):**
- Cada popup e um `div` com posicao absoluta, borda coral arredondada, fundo escuro semi-transparente, texto branco
- Animacao via CSS: cada popup tem `animation: popup-cycle Xs infinite` com delay diferente
- Ciclo: fade-in (10%) -> visivel (60%) -> fade-out (80%) -> invisivel (100%)
- Duracao total do ciclo por popup: ~8s, com delays escalonados de ~1.5s entre eles
- Textos dos popups (PT): "Previsao de sell-out superior a cobertura atual de estoque", "Aumento de volume recomendado sem impacto negativo em giro", "Mudanca de sazonalidade antecipada para esta regiao", "SKU critico com alta probabilidade de ruptura", "PDVs similares operam com mix mais eficiente", "Mix atual nao acompanha o padrao de compra do PDV", "SKU com alta demanda prevista ausente no mix atual", "Oportunidade de pedido adicional com alto potencial de giro", "Aceleracao de demanda detectada", "Substituicao de SKUs sugerida para otimizar giro e margem"

### 3. Adicionar keyframes em `index.css`
```css
@keyframes popup-cycle {
  0%, 100% { opacity: 0; transform: translateY(8px); }
  10%, 70% { opacity: 1; transform: translateY(0); }
  85% { opacity: 0; transform: translateY(-4px); }
}
```

### 4. Manter os 6 cards atuais
Os 6 cards de "sinais" (antecipe ruptura, detecte intencao, etc.) serao mantidos abaixo do novo bloco de capabilities + GIF, preservando o conteudo atual da secao.

## Arquivos alterados
- `public/images/i6signal-demo.gif` - novo (copia do GIF)
- `src/components/hometeste/SinaisSection.tsx` - reescrito com novo layout
- `src/index.css` - keyframes para popup-cycle
