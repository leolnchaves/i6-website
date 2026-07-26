## Problema

No demo **Personalização + Descoberta** (`/kiosk`), os SKUs usam **emoji** como imagem do produto (🎧 👖 🧥 …). Fica genérico demais e destoa do demo de **Pricing** (mesma tela), onde produtos são renderizados com fotos reais sem marca (`src/assets/kiosk/product-1..4.jpg`).

## Objetivo

Substituir todos os emojis por **fotos genéricas (sem marca)** dos produtos, no mesmo estilo do pricing:
- fundo bege/claro neutro
- produto centralizado
- iluminação suave
- sem logo/label reconhecível.

Válido em **todos os pontos** onde produtos aparecem no demo:
- Vitrine (grid inicial de 8 eletrônicos / 9 moda)
- Card do produto selecionado no topo do PDP
- Grid de recomendações "Também gostam" (produtos)
- Grid do "Look completo" (fashion)

## Assets a gerar

17 imagens novas, salvas em `src/assets/kiosk/predictive/`, 1024×1024, estilo idêntico ao pricing (`premium moisturner` / `pill bottle` como referência):

**Products (8):**
| id | arquivo | descrição do prompt |
|---|---|---|
| p-headphones | `headphones.jpg` | fone over-ear preto fosco |
| p-earbuds | `earbuds.jpg` | earbuds true-wireless brancos com case |
| p-speaker | `speaker.jpg` | speaker portátil cilíndrico cinza |
| p-mouse | `mouse.jpg` | mouse ergonômico preto |
| p-keyboard | `keyboard.jpg` | teclado mecânico compacto |
| p-monitor | `monitor.jpg` | monitor ultrawide curvo |
| p-cable | `cable.jpg` | cabo USB-C trançado enrolado |
| p-case | `case.jpg` | case rígido cinza para acessórios |

**Fashion (9):**
| id | arquivo | descrição do prompt |
|---|---|---|
| f-shirt | `shirt.jpg` | camisa linho oversize bege dobrada |
| f-tee | `tee.jpg` | t-shirt básica branca dobrada |
| f-jacket | `jacket.jpg` | jaqueta bomber preta |
| f-pants | `pants.jpg` | calça alfaiataria bege dobrada |
| f-jeans | `jeans.jpg` | jeans slim azul dobrado |
| f-sneakers | `sneakers.jpg` | tênis runner branco/cinza |
| f-boots | `boots.jpg` | bota casual marrom |
| f-cap | `cap.jpg` | boné trucker preto |
| f-backpack | `backpack.jpg` | mochila urbana preta minimalista |

Todas geradas com `imagegen--generate_image` (tier `fast`) com prompts que enfatizam:
> "generic {produto}, no brand, no logos, no readable text, centered on soft neutral off-white/beige studio background, soft light, product photography, clean, minimal"

## Mudanças no código

1. `src/data/kiosk/demos/predictivePersonalization.ts`
   - Adicionar `image: string` em `Sku`.
   - Importar as 17 imagens no topo do arquivo.
   - Preencher `image:` em cada SKU (products + fashion).
   - Manter `emoji` por enquanto como fallback opcional? **Não** — remover para forçar o uso da foto e evitar dead code. (Se decidir manter, comento; a princípio removo.)

2. `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`
   - `SkuTile`: trocar `<span>{sku.emoji}</span>` por `<img src={sku.image} alt="" className="w-full h-full object-cover" />` dentro do mesmo container (mantém `aspect-square`, cantos, gradiente atual de fundo aparece só nas bordas).
   - Card do produto selecionado (linha ~350): substituir o bloco emoji por um `<img>` no mesmo container `w-[9vmin] h-[9vmin]`.

3. Nada muda em layout, animações, linha conectora, fases, i18n, tracking.

## Fora do escopo

- Não substituo as imagens do pricing (`product-1..4.jpg`) — servem de referência de estilo.
- Não gero variações por idioma — imagens são neutras.
- Não uso `lovable-assets` CLI; deixo os JPGs em `src/assets/kiosk/predictive/` como o pricing faz hoje (importados por Vite). Só migro para CDN se você pedir.

## Validação

Após a build, abrir `/kiosk` → escolher qualquer cenário do demo de Personalização + Descoberta e conferir:
- vitrine com fotos reais sem marca;
- clique num produto → card do topo mostra a foto correspondente;
- treinamento → PDP → recomendações/look também com fotos.
