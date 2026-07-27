## Objetivo

Reescrever os textos dos steps (label + descrição abaixo) da timeline de raciocínio da demo **Personalização + Descoberta Preditiva** no Kiosk, seguindo o padrão narrativo/de negócio da demo **Campanhas por Propensão** — sem tocar nada em Campanhas.

## Referência do padrão (Campanhas — não mudar)

Em Campanhas, cada step tem:
- **label**: frase de ação em linguagem de negócio ("Lendo comportamento e histórico dos clientes")
- **micro**: sub-frase explicativa em português corrido ("Compras, interações, recência, frequência e resposta a campanhas.")

Hoje em Personalização os steps estão em formato curto/técnico:
- label: "Histórico de sessões"
- micro: "312 eventos · janela 30d"

Vou usar os valores atuais (mostrados no anexo) como matéria-prima e reescrever ambos no estilo Campanhas.

## O que vai mudar

Arquivo único: `src/data/kiosk/demos/predictivePersonalization.ts` — apenas os campos `label` e `microMetric` (PT+EN) de cada `feature` dentro dos 4 cenários. Nenhum outro campo (`durationMs`, `scenarioIntro`, `categoryReading`, `recsRationale`, catálogos, imagens) muda.

Cenários e mapeamento proposto (PT — EN análogo):

### 1) `logged-products` (Cross-sell)
1. **Lendo o histórico de navegação e compra do cliente** — Sessões, cliques e transações dos últimos 30 dias no perfil identificado.
2. **Identificando as categorias de maior afinidade** — Áudio e periféricos concentram o interesse recente deste cliente.
3. **Mapeando produtos que costumam ser vistos e comprados juntos** — Grafo de co-visualização e co-compra a 2 níveis a partir do item âncora.
4. **Aplicando contexto de estoque, preço e sazonalidade** — Só entram no ranking itens disponíveis, com preço competitivo e coerentes com o momento.
5. **Ranqueando as melhores recomendações de cross-sell** — Modelo i6RecSys prioriza combinações com maior probabilidade de compra conjunta.

### 2) `logged-fashion` (Cross-sell · Look)
1. **Lendo o histórico de estilo e navegação do cliente** — Peças visualizadas e compradas nos últimos 30 dias no perfil identificado.
2. **Inferindo estilo e paleta preferidos** — Cluster de estilo urban-minimal, com preferência por tons neutros e caimento reto.
3. **Buscando peças que combinam com a âncora escolhida** — Grafo de co-look identifica bottoms, calçados e sobreposições que fecham a composição.
4. **Ajustando o look ao contexto de estação, região e estoque** — Só permanecem peças coerentes com clima/geo e disponíveis para retirada rápida.
5. **Compondo o look final priorizando ticket médio** — Outfit composer i6RecSys prioriza combinações que elevam o valor do carrinho sem quebrar o estilo.

### 3) `anon-products` (Descoberta)
1. **Lendo os sinais desta sessão anônima** — Região, horário, canal de entrada e tipo de dispositivo para dar contexto ao modelo.
2. **Encontrando clientes com comportamento parecido** — Embeddings de sessão aproximam esta visita a clusters de compradores similares.
3. **Filtrando por catálogo disponível e tendências do momento** — Só entram itens em estoque, com preço saudável e com tração recente.
4. **Rankeando descobertas com maior chance de engajar** — Modelo i6RecSys aprende em tempo real quais produtos convertem melhor neste tipo de sessão.

### 4) `anon-fashion` (Descoberta · Look)
1. **Lendo os sinais desta visita anônima** — Clima, região, horário e canal de entrada guiam a leitura da intenção.
2. **Encontrando visitas parecidas para inferir preferências** — Embeddings de sessão aproximam esta visita de perfis de estilo similares.
3. **Inferindo o estilo e a paleta prováveis desta sessão** — Estilo inferido com confiança moderada, base para compor peças que combinam entre si.
4. **Compondo um look coerente com o contexto atual** — Outfit composer i6RecSys prioriza uma combinação alinhada ao clima, ao momento e ao item explorado.

Cada um recebe também a tradução equivalente em `en`.

## Componente / render

`src/components/kiosk/demos/PredictivePersonalizationDemo.tsx` **não muda** — ele já renderiza `step.label[lang]` e `step.microMetric[lang]` na timeline horizontal (mesmo layout de Campanhas). Só os textos-fonte é que ficam mais descritivos, então visualmente o step passa a comunicar valor de negócio como em Campanhas.

## Fora de escopo

- Campanhas por Propensão (não mexer)
- Layout, animação, durações, catálogos, imagens, `scenarioIntro`, `categoryReading`, `recsRationale`
- Publicação (release/tag) — só quando você pedir