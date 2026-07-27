
## Objetivo

Padronizar a exibição dos KPIs "após o cálculo do modelo" sempre no **lado esquerdo** da conclusão (abaixo do resultado), como já ocorre em Demand Forecast, Commercial Targets e Mix/Sortimento. Hoje as 3 telas de preços mostram esses KPIs na coluna direita (dentro do card "Como o modelo está pensando", acima do bloco "Por que…"). E a Personalização + Descoberta Preditiva não mostra KPIs — vamos adicionar.

Escopo: apenas UI/apresentação. Sem mudanças em dados, tracking, i18n de textos existentes ou lógica de cálculo. Sem mudanças no i6 Signal.

**Importante:** na coluna direita, **manter visíveis os passos do pipeline / treinamento do modelo** após o cálculo — eles não são escondidos. Só o bloco de KPIs sai da direita.

## 1) Preços — mover KPIs para o lado esquerdo

Arquivos:
- `src/components/kiosk/demos/PriceMarginDemo.tsx`
- `src/components/kiosk/demos/PriceTurnoverDemo.tsx`
- `src/components/kiosk/demos/PriceToMarginDemo.tsx` (Preço → Conversão)

Em cada um:

1. **Coluna esquerda (Result view)**: logo abaixo do resultado (tabela / gráfico / régua), inserir um bloco de KPIs no mesmo estilo dos demais demos, reusando o `MetricPill` já existente no próprio arquivo, com exatamente os mesmos valores hoje exibidos no card direito:
   - PriceMargin: Confiança · Impacto na margem · Impacto no volume (3 pills, `grid grid-cols-3`).
   - PriceTurnover: os 4 pills atuais do card direito (`grid grid-cols-4`).
   - PriceToMargin (conversão): os 2–4 pills atuais.
2. **Coluna direita (Conclusion card)**: remover **apenas** a grid de KPIs. Preservar:
   - Pipeline de passos do modelo (permanece visível depois do cálculo, como hoje).
   - Cabeçalho "{nome} · Recomendação pronta".
   - Insight "Por que…".
   - Botão "Nova simulação".
3. Nada muda em `derived`, `selected` ou nos cálculos — só realocação de renderização.

Layout depois:

```text
┌──────────── LEFT ────────────┐  ┌──── RIGHT ────┐
│ Resultado do modelo          │  │ Pipeline       │
│ (tabela / gráfico / régua)   │  │ ▸ passo 1 ✓    │
│                              │  │ ▸ passo 2 ✓    │
│ [KPI] [KPI] [KPI] [KPI]      │  │ ▸ passo 3 ✓    │
│                              │  │                │
└──────────────────────────────┘  │ Card conclusão │
                                  │  · nome        │
                                  │  · Por que…    │
                                  │  · Nova simul. │
                                  └────────────────┘
```

## 2) Personalização + Descoberta Preditiva — adicionar KPIs à esquerda

Arquivo: `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`

Ao final da fase `pdp` (após o "training"), inserir na coluna esquerda, abaixo do PDP/look recomendado, um bloco `grid grid-cols-3 gap-[1vmin]` usando o mesmo `MetricPill` das demais telas, com `animate-fade-in`. A coluna direita continua exibindo o pipeline de treinamento normalmente.

### KPIs sugeridos (3 fixos, cobrem logado/anônimo × fashion/products)

1. **Uplift de ticket médio** — aproveita o `mult` já presente no cenário (ex.: "+1,6×" ou "+62%"). Rótulo PT "Uplift no ticket" · EN "Ticket uplift". Destaque (`highlight`, `trend="up"`).
2. **Propensão de cross-sell** — probabilidade de completar o look / adicionar acessório-periférico. Ex.: 72% (logado) / 58% (anônimo). Rótulo PT "Propensão cross-sell" · EN "Cross-sell propensity".
3. **Confiança do modelo** — % (ex.: 92% logado / 78% anônimo, refletindo o modo). Rótulo PT "Confiança" · EN "Confidence".

Se preferir 4 pills, dá para incluir uma quarta: "Aderência ao perfil" (logado) / "Intenção de sessão" (anônimo). Recomendo ficar em 3 para manter respiro visual.

### Sobre os dados

Se algum campo ainda não existir no cenário (`ticketUpliftLabel`, `crossSellPct`, `confidencePct`), adicionamos aos 4 objetos de `scenarios` em `src/data/kiosk/demos/predictivePersonalization.ts` com valores plausíveis coerentes com o resto do demo — sem alterar a lógica de recomendação.

## Confirmações antes de fechar

1. Os 3 KPIs sugeridos para Personalização estão bons? Prefere trocar/adicionar algum (ex.: "Aderência ao perfil", "Cobertura do look")?
2. Confirmado: coluna direita das 3 telas de preços mantém o pipeline de treinamento visível; só a grid de KPIs sai.

## Detalhes técnicos

- Componentes `MetricPill` já existem em cada demo; reutilizar o do próprio arquivo (assinatura idêntica).
- Sem mudanças em `KioskSignalIntelliboard`, `src/data/signalDemo/*`, tracker ou analytics.
- Novos rótulos PT/EN de KPI em Personalização adicionados a `uiLabels`.
- Sem impacto em rota, SEO ou build de conteúdo.
