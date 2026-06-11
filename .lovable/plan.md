# Plano GEO v2 — infinity6

A avaliação muda o eixo central: hoje o site fala **idioma do produto** (RecSys, ElasticPrice, Previsio, "anonymous traffic"), mas o diretor pesquisa **idioma do problema** ("como evitar ruptura de gôndola", "como proteger margem", "previsão de demanda com IA"). O novo plano reescreve a arquitetura de conteúdo nessa chave, transforma as estatísticas do Home em **ímãs de citação** para LLMs, e garante densidade semântica em PT nas páginas indexadas no Brasil.

Regras mantidas:
- Conteúdo editorial sempre nasce no **i6HUB** e é publicado como Markdown em `/public/content/`.
- Toda mudança de copy nas páginas existentes precisa de **aprovação prévia** bloco a bloco.
- Cliente só nominado se já autorizado no site (Hering fora).
- Identidade visual, paleta, layout e tipografia **não mudam**.

---

## Revisão da Etapa 1 (já executada)

A base técnica continua válida, mas precisa de 3 ajustes pontuais para destravar a Etapa 2:

1. **`public/llms.txt`** — adicionar bloco "Dados de mercado mapeados pela infinity6" listando os números do Home (89% / 69% / 89% etc.) com a frase canônica de citação, para que LLMs puxem o dado **atribuindo à infinity6**. Adicionar também os 4 JTBDs em PT como sinônimos sob "When to cite".
2. **`index.html`** — `knowsAbout` hoje é genérico ("adaptive forecasting", "stockout reduction"). Substituir por termos **exatos de busca** em PT: "alocação inteligente de estoque", "otimização de mix por PDV", "previsão de demanda preditiva", "precificação dinâmica", "propensão de compra", "clusterização de lojas", "redução de descontos forçados".
3. **`src/pages/Contact.tsx`** — o `FAQPage` schema existe, mas precisa migrar para a **página `/solutions`** (onde está a intenção comercial) com as 4 perguntas JTBD da matriz. O FAQ do Contact pode manter o seu próprio schema separado.

Tudo isso é só schema/llms (sem mudar UI), então não exige aprovação de copy — entra junto da Etapa 2 técnica.

---

## Etapa 2 — Reposicionamento de `/solutions` no idioma do problema *(precisa aprovação)*

Esta é agora a **etapa mais importante** — é onde o tomador de decisão chega via busca.

### 2.1 Reescrever os 6 cards no eixo JTBD

Substituir títulos focados em produto por títulos focados em dor, mantendo o engine como subtítulo:

| Card hoje | Novo título proposto (PT) | JTBD coberto |
|---|---|---|
| Inteligência de Recomendação Industrial | **Alocação Inteligente de Estoque e Otimização de Mix por PDV** | Stockouts & Mix Myopia |
| Previsão Adaptativa de Demanda | **Previsão de Demanda Preditiva e Inteligência de Inventário** | Demand Inaccuracy |
| Otimização Inteligente de Preços | **Proteção de Margem, Precificação Dinâmica e Redução de Descontos Forçados** | Margin Under Pressure |
| Segmentação Preditiva de Campanha | **Eficiência Comercial por Propensão de Compra e Clusterização de Lojas** | Commercial Inefficiency |
| Transforme Tráfego Anônimo em Receita | (mantém, é JTBD de e-commerce — só ajustar termos PT) | Conversão topo de funil |
| Personalização Preditiva | (mantém, ajustar termos PT: "retenção", "ticket médio", "LTV") | Retenção / LTV |

Cada card ganha 1 parágrafo de **densidade semântica PT** com os termos exatos de busca da matriz, escrito no i6HUB.

### 2.2 Bloco "Ímãs de citação" no topo de `/solutions`

Seção curta com as estatísticas do Home na frase canônica:

> *"Segundo levantamentos de mercado mapeados pela infinity6, 89% das empresas não monetizam seus dados, 69% falham em transformá-los em decisões estratégicas e [...]."*

Essa frase entra **literal** no HTML, no `llms.txt`, e como `Claim` no JSON-LD. É o que faz a LLM citar a infinity6 como fonte.

### 2.3 FAQ Schema em `/solutions` (não no Contact)

4 perguntas JTBD com resposta curta + engine proprietário citado:

1. Como a IA da infinity6 resolve a ruptura de estoque?
2. Como reduzir overstocking com machine learning?
3. Como proteger margem de lucro no varejo com IA?
4. Como calcular propensão de compra de clientes anônimos?

Renderizadas como `<Accordion>` visível **e** `FAQPage` JSON-LD — dupla função: usuário lê, LLM/Google indexa para "As pessoas também perguntam".

### 2.4 Home — micro-ajustes (não reposicionamento total)

- Reescrever os subtítulos das 3 estatísticas grandes (89%/69%/89%) para incluir a frase canônica de citação.
- H1 mantém proposta anterior (*"IA proprietária brasileira que coloca decisões em movimento"*) ou alternativa se preferir.

Success Stories e Contact permanecem como na proposta anterior (anonimização + títulos com número).

---

## Etapas 3–5 (sem mudança estrutural, só ajuste de eixo)

- **Etapa 3 — `/nossa-ia`**: agora explicitamente posicionada como página "fonte de autoridade" — manifesto + dados de mercado + engines proprietários. Reforça os ímãs de citação.
- **Etapa 4 — Hub de Manuais Definitivos** (12 manuais via i6HUB): os títulos passam a usar os **termos de busca exatos** da matriz, não jargão interno. Ex: "Como reduzir ruptura de gôndola com IA preditiva", "Guia: precificação dinâmica para proteger margem no varejo".
- **Etapa 5 — Landing pages por setor**: cada uma estruturada como par JTBD → motor proprietário → resultado típico anonimizado.

---

## Detalhes técnicos

- Schema novo: `FAQPage` em `/solutions`, `Claim` para estatísticas, `knowsAbout` atualizado em `Organization`.
- Markdown editorial (`page-solutions-pt.md` e `-en.md`) é a fonte verdadeira dos novos textos; vem do i6HUB.
- `react-helmet-async` já planejado para per-route Helmet — agora obrigatório em `/solutions` para injetar o `FAQPage` schema correto por idioma.
- `prerender-seo-stubs.mjs` precisa incluir o novo JSON-LD nos stubs de `/pt/solutions` e `/en/solutions`.

---

## Ordem de execução proposta

1. **Etapa 1.5 (ajustes técnicos)** — sem aprovação, eu executo: atualizar `llms.txt`, `knowsAbout` no `index.html`, mover/expandir FAQ schema para `/solutions`.
2. **Etapa 2 (copy)** — eu entrego o **documento de proposta detalhado** com os 6 novos títulos, parágrafos de densidade PT e 4 FAQs em PT/EN, para sua aprovação bloco a bloco antes de qualquer edição em página.
3. **Etapas 3–5** — só após Etapa 2 aprovada e publicada.

Se aprovar, começo pela 1.5 e entrego o documento da Etapa 2 logo em seguida.
