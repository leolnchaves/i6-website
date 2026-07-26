## Demo — Preço Orientado à Margem

Nova demo dedicada à solução `price-to-margin` (hoje sem demo em `SolutionDemoBlock`). O demo existente `PriceToMarginDemo.tsx` continua servindo o `price-to-conversion` (não muda).

Novos arquivos:
- `src/data/kiosk/demos/priceMargin.ts` — dataset PT-only + pipeline + labels.
- `src/components/kiosk/demos/PriceMarginDemo.tsx` — componente com fases `setup → running → result`.

Registro em `src/components/kiosk/SolutionDemoBlock.tsx`:
```tsx
if (solution.id === 'price-to-margin') return <PriceMarginDemo />;
```

### Tela SETUP (lado esquerdo — Central Estratégica de Pricing)

Header: título "Central Estratégica de Pricing · VivaShop B2B" + badge **OBJETIVO: MARGEM** (coral).

**Portfólio (tabela compacta)** — 5 SKUs com colunas: SKU · Margem · Volume · Elasticidade · Posição competitiva · Estoque · Preço atual. Cada linha selecionável.

**Gráfico "Elasticidade × Margem por SKU"** — dispersão SVG estática, eixo x = elasticidade, eixo y = margem %, cada SKU como bolha (raio = volume), SKU selecionado com halo coral.

**Filtros (TouchSelect)** em grid 3×2:
- Categoria · SKU · Região/Canal · Estratégia corporativa · Margem mínima · Banda competitiva

CTA touch: **"Calcular faixa ótima de preço"** (só habilita com SKU selecionado).

### Fase RUNNING (lado direito — 5 passos, mesmo estilo das outras demos)

1. Estimando a elasticidade de demanda do SKU · *micro:* volume e demanda vs. histórico de preço · 900ms
2. Projetando demanda para diferentes preços · *micro:* elasticidade × forecast × estoque × comportamento comercial · 900ms
3. Simulando cenários de preço, volume e margem · *micro:* milhares de combinações por SKU · 950ms
4. Aplicando restrições e governança corporativa · *micro:* margem mínima, estoque, banda, política, posicionamento · 850ms
5. Selecionando preço ótimo e alternativas válidas · *micro:* faixa recomendada, IC, cenários alternativos · 800ms

### Fase RESULT

**Esquerda — Gráfico "Preço × Margem projetada":** curva SVG côncava, com marcadores verticais (Preço atual, Preço ótimo, Limite inf., Limite sup., Concorrente) e faixa recomendada sombreada em coral.

**Cards KPI (2×2 acima do gráfico):**
- Preço atual · **R$ 89,90**
- Faixa recomendada · **R$ 93,40 – R$ 96,20**
- Preço ótimo · **R$ 94,80** (destaque coral)
- Confiança · **91%**

**Cards secundários:** Impacto esperado na margem (+X pp) · Impacto esperado no volume (–Y%).

**Tabela de alternativas** (3 linhas):

| Cenário | Preço | Margem | Volume |
|---|---|---|---|
| Conservador | R$ 93,40 | Maior | Queda mínima |
| Recomendado | R$ 94,80 | Ótima | Queda controlada |
| Agressivo | R$ 96,20 | Máxima | Maior risco de volume |

**Direita — quadro "POR QUE RECOMENDAMOS ESTE PREÇO"** (destacado, ícone Sparkles, borda coral pulsante — mesmo padrão dos outros demos), com o campo `argument` do SKU selecionado.

Botão **"Nova simulação"** no rodapé do painel direito (mesmo padrão/tamanho das demais demos).

### Arguments no padrão comportamental (por SKU) — para você validar

Cada SKU terá um objeto:

```ts
{
  id, category, name,
  volume, elasticity, competitivePosition, stock,
  currentPrice, recommendedRange: [min, max], optimalPrice, confidence,
  marginImpactPp, volumeImpactPct,
  argument: string,          // aparece no card "Por que"
  alternatives: [ ... ],
}
```

**5 SKUs propostos** (linguagem 100% de negócio, sem SHAP/XGBoost):

1. **Hidratante Facial 200ml** (Skincare · elasticidade baixa · estoque saudável)
   *"Nas últimas 8 semanas o SKU manteve giro estável mesmo após 3 reajustes de até +4%. Concorrentes diretos estão operando entre R$ 95 e R$ 99, e a base de clientes recorrentes (58% do volume) não migrou nos últimos ciclos. A faixa recomendada captura margem adicional sem sair da banda competitiva percebida no PDV."*

2. **Suplemento Vitamina D 60cps** (Nutrição · elasticidade média · estoque alto)
   *"O produto tem alta frequência de recompra (a cada 34 dias em média) e histórico consistente de conversão mesmo em bandas superiores. Apesar da oportunidade, preços acima de R$ 96,20 elevam significativamente o risco de perda de volume dentro do cluster fiel — o modelo recomenda R$ 94,80 como melhor equilíbrio entre margem capturada e demanda preservada."*

3. **Shampoo Reparador 400ml** (Haircare · elasticidade baixa · alta rotação)
   *"O SKU apresenta baixa sensibilidade dentro da faixa recomendada e está abaixo da banda observada para produtos comparáveis nos últimos 60 dias. O aumento proposto captura margem adicional com impacto controlado sobre o volume, respeitando margem mínima, posição competitiva e estratégia da categoria."*

4. **Protetor Solar FPS 60** (Sazonal · elasticidade alta · estoque limitado)
   *"Buscas cresceram 38% na semana e o estoque cobre apenas 22 dias no ritmo atual. Comparáveis sazonais praticaram média de R$ 97 em janelas equivalentes de calor. A faixa recomendada aproveita a janela de demanda antes que o competidor reaja, sem violar a banda máxima de posicionamento."*

5. **Kit Skincare Noturno** (Combo · elasticidade média · exclusivo)
   *"Combo exclusivo, sem paralelo direto no mercado local, com margem de contribuição 12 pp acima da categoria. O comportamento dos últimos 3 lançamentos similares mostra baixa reação a variações de até +6%. R$ 94,80 fica dentro da faixa em que 82% das sessões evoluem para carrinho."*

### Detalhes técnicos

- **Sem i18n adicional** — demo PT-only, alinhado ao padrão de `PropensityCampaign`, `CommercialTargets` e `MixAssortmentOrder`.
- **Latência simulada** por SKU no card "Latência do modelo" (22–48 ms, mesmo padrão das outras demos).
- **TouchSelect** já existente para todos os filtros (usabilidade touch).
- Gráficos são SVG estáticos gerados a partir dos dados do SKU selecionado — não requer libs.
- Reset ("Nova simulação") volta para setup mantendo filtros.

Se quiser ajustes nos arguments ou nos SKUs propostos, avisa antes que eu construa.
