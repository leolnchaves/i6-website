# Plano GEO v7 — infinity6 (consolidado)

Recalibragem da `desc` do Hero da Home cobrindo as 4 dores reais que os engines resolvem:

- **Previsio** → forecast de demanda → distribuição, metas, política de estoque (anti-ruptura e anti-overstock)
- **ElasticPrice** → precificação dinâmica → proteção e escala de margem
- **RecSys (produto)** → recomendação de produto, oferta, mix e sortimento — PF e PJ — com aderência contextual
- **RecSys (campanha)** → propensão e sinais de intenção → maximiza conversão, minimiza CAC

Identidade não muda: `title` "Inteligência de Movimento", linha "Data moves. **You Grow.**", `cta` "Colocar Dados em Movimento". Só `desc` muda.

---

## 1) Hero da Home — `HeroMovimento.tsx` (novas opções de `desc`)

A `desc` fica logo abaixo da tagline laranja, em texto pequeno, max 2 linhas no desktop. Aceita até ~180–220 caracteres antes de virar 3 linhas. Por isso ofereço **versões em camadas de densidade**.

### Camada concisa (1 frase, ~140c) — recomendada


| #        | PT                                                                                                                                                      | EN                                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **A1** ⭐ | IA preditiva que orquestra demanda, preço, sortimento e propensão, entregando eficiência de distribuição, proteção de margem e conversão com menor CAC. | Predictive AI that orchestrates demand, price, assortment and propensity — to distribute smarter, protect margin and convert at lower CAC. |
| **A2**   | IA preditiva que conecta previsão de demanda, precificação dinâmica, recomendação e propensão em uma só decisão de receita.                             | Predictive AI connecting demand forecasting, dynamic pricing, recommendation and propensity into a single revenue decision.                |
| **A3**   | Quatro engines proprietários, uma decisão: prever demanda, proteger margem, recomendar a oferta certa e antecipar o sinal de compra.                    | Four proprietary engines, one decision: forecast demand, protect margin, recommend the right offer and anticipate the buying signal.       |


### Camada densa (2 frases, ~220c) — se quiser cobrir tudo explicitamente


| #      | PT                                                                                                                                                                                         | EN                                                                                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **B1** | IA preditiva para previsão de demanda, precificação dinâmica, recomendação de mix e propensão de compra. Decisões que reduzem ruptura, protegem margem e aumentam conversão com menor CAC. | Predictive AI for demand forecasting, dynamic pricing, mix recommendation and purchase propensity. Decisions that reduce stockouts, protect margin and boost conversion at lower CAC.   |
| **B2** | Quatro engines proprietários — Previsio, ElasticPrice, RecSys e propensão — atuando juntos em distribuição, estoque, preço, oferta e campanhas para varejo, indústria e farma.             | Four proprietary engines — Previsio, ElasticPrice, RecSys and propensity — working together across distribution, inventory, price, offer and campaigns for retail, industry and pharma. |


**Recomendo A1**: cabe em 2 linhas, cobre as 4 dores em verbos JTBD (distribuir, proteger margem, converter, CAC), mantém ritmo da marca. Demais dores (ruptura, overstock, PF/PJ, mix, sortimento) ficam **expandidas nas seções abaixo** (TeseSection, SinaisSection, ResultadosSection) e nos cards de `/solutions`, onde há espaço editorial.

> **Decisão**: A1 / A2 / A3 / B1 / B2 / variante sua.

---

## 2) Demais heros (sem mudança vs v6 — aguardando aprovação)

### 2.1 SolutionsHero — `src/data/staticData/solutionsHeroData.ts`


| Campo                           | Proposta PT                                                                                                       | Proposta EN                                                                                              |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `mainTitle`                     | IA preditiva que                                                                                                  | Predictive AI that                                                                                       |
| `mainSubtitle` (destaque coral) | antecipa                                                                                                          | anticipates                                                                                              |
| `mainSuffix`                    | demanda, margem e estoque                                                                                         | demand, margin and inventory                                                                             |
| `description`                   | Engines proprietários para previsão de demanda, precificação dinâmica, recomendação de mix e propensão de compra. | Proprietary engines for demand forecasting, dynamic pricing, mix recommendation and purchase propensity. |


### 2.2 SuccessStoriesHero — `successStories.hero.*`


| Chave         | PT                                                                                                                           | EN                                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `title`       | Resultados reais de IA preditiva                                                                                             | Real results from predictive AI                                                                                          |
| `subtitle`    | em varejo, indústria e farma                                                                                                 | in retail, industry and pharma                                                                                           |
| `description` | Como empresas líderes reduziram ruptura, protegeram margem e aumentaram conversão com os engines proprietários da infinity6. | How leading companies reduced stockouts, protected margin and increased conversion with infinity6's proprietary engines. |


### 2.3 ContactHero — `contact.hero.*`


| Chave         | PT                                                                                           | EN                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `title`       | Coloque seus dados                                                                           | Put your data                                                                                |
| `subtitle`    | em movimento                                                                                 | in motion                                                                                    |
| `description` | Fale com nosso time sobre previsão de demanda, proteção de margem, recomendação e propensão. | Talk to our team about demand forecasting, margin protection, recommendation and propensity. |


### 2.4 TeseSection (opcional)

Trocar `narrativeBold` PT: "Dados parados são o lucro da concorrência" → **"Dados parados são margem que vai para o concorrente"**. Aprove ou ignore.

---

## 3) Hub editorial — Etapa 4

- **Nome**: `i6Intelligence` (sub-marca própria estilo Bloomberg Intelligence / BCG Henderson). Conecta com `i6Signal`, escalável em sub-formatos *Reports*, *Briefings*, *Signals*, *Outlook*. Funciona idêntico PT/EN. 
- **Arquitetura (Opção B — confirmada por você)**: hub próprio.
  - Rotas: `/i6-intelligence` (uniforme)
  - Item novo no menu `HeaderNovo`, entre Solutions e Success Stories.
  - Index estilo Gartner Research: filtros por setor (varejo, farma, indústria, e-commerce) + tema (demanda, margem, estoque, mix/sortimento, propensão).
  - Template por peça: H1 = pergunta de busca → resposta 2–3 frases (citation magnet) → dado de mercado infinity6 → problema → engine proprietário → resultado anonimizado → FAQ → CTA.
  - Conteúdo 100% MD: `public/content/intelligence/<slug>-[pt|en].md`, gerado no i6HUB.
  - Schema: `Article` + `FAQPage` + `BreadcrumbList` por peça.
  - Cross-link: cards `/solutions` → 2 peças; `/success-stories` → peça do setor; landing de setor → peças do setor.
  - 12 peças iniciais alinhadas à matriz JTBD (ruptura, overstock, precificação dinâmica, mix por PDV, sortimento PF/PJ, propensão e CAC, etc.).

---

## Roadmap consolidado (status real)


| Etapa                                       | Status               | Escopo                                                                                                               | Onde                                   |
| ------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **1 — Base técnica**                        | ✅ feita              | `llms.txt` (citation magnets + JTBD PT), `knowsAbout` em `index.html`, `FAQPage` schema em `/solutions` e `/contact` | código                                 |
| **1.5 — Ajuste fino base**                  | 🟡 aguarda go        | Frase canônica para stats e termos PT exatos em `knowsAbout`                                                         | código                                 |
| **2.1 — Cards `/solutions` JTBD**           | 🟡 aguarda aprovação | Reescrita dos 6 cards no idioma do problema (alocação, demanda, margem, mix PF/PJ, propensão, CAC)                   | **MD** `page-solutions-[pt/en].md`     |
| **2.2 — Frase canônica nos stats**          | 🟡 aguarda aprovação | "Segundo levantamentos mapeados pela infinity6…" nos 3 stats grandes                                                 | código                                 |
| **2.3 — Heros (4 telas)**                   | 🟡 aguarda aprovação | HeroMovimento (`desc`) + SolutionsHero + SuccessStoriesHero + ContactHero                                            | código (componentes + translations)    |
| **2.4 — FAQ visível `/solutions**`          | 🟡 aguarda aprovação | Accordion com 4 perguntas JTBD (schema já existe)                                                                    | **MD** `faq-solutions-[pt/en].md`      |
| **2.5 — Ímãs de citação topo `/solutions**` | 🟡 aguarda aprovação | Bloco curto com 3 stats em frase canônica                                                                            | **MD**                                 |
| **3 — `/nossa-ia**`                         | depois               | Página manifesto + engines + dados de mercado                                                                        | **MD** + nova rota                     |
| **4 — Hub `i6 Intelligence**`               | depois               | Hub próprio (rota + index + template), 12 peças iniciais                                                             | **MD** + nova rota/template/lista/menu |
| **5 — Landings por setor**                  | depois               | Varejo, farma, indústria, e-commerce — JTBD → engine → resultado                                                     | **MD** + rota dinâmica                 |


---

## Decisões para destravar execução

1. **Hero Home `desc**`: A1 / A2 / A3 / B1 / B2 / variante.
2. **TeseSection PT**: aplicar ajuste opcional? sim / não.
3. **SolutionsHero / SuccessStoriesHero / ContactHero**: aprovar bloco / pedir variantes.
4. **Nome do hub Etapa 4**: `i6 Intelligence` confirmado? ou outro?
5. **Rotas do hub**: `/inteligencia` + `/intelligence` (nativo) **ou** `/i6-intelligence` (uniforme)?

Com as 5 respostas, executo na ordem 1.5 → 2.1 → 2.2 → 2.3 → 2.4 → 2.5, e em seguida abro a fundação da Etapa 4 com 1 peça-piloto.