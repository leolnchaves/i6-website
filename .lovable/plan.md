## Ajustes na demo "Mix, Sortimento e Pedido Ideal" + passo de treinamento PDV

Escopo restrito a arquivos do kiosk. Nenhuma mudança em outros demos, config global ou i18n.

---

### 1. Simplificar filtros do Setup (tela inicial)
Em `src/components/kiosk/demos/MixAssortmentOrderDemo.tsx` e `src/data/kiosk/demos/mixAssortmentOrder.ts`:

- **Remover** os filtros: Próximo ciclo, PDV (linha secundária duplicada), Cluster e Categoria.
- **Manter** apenas **Loja/PDV** e **Região**.
- Adicionar entrada `all` como **"Todos"** em `pdvs` (default do filtro).
- O card "Contexto atual do PDV" (mix atual, estoque, vendas 30d, último pedido, não positivados, ruptura em curso) passa a **reagir aos dois filtros**, com variação leve e determinística por combinação PDV × Região (multiplicadores locais no arquivo de dados, sem backend).

### 2. Filtros persistentes na tela de resultado
- Reexibir a barra com **Loja/PDV** e **Região** no topo do painel esquerdo (acima do "Carrinho de pedido sugerido"), sem voltar ao Setup.
- Mexer em qualquer filtro re-filtra as linhas do carrinho e recalcula na hora:
  - KPIs (pedido incremental, ticket potencial, novos positivados, ruptura reduzida).
  - Resumo "Mix atual vs recomendado".
- **Reduzir a altura** do quadro "Carrinho de pedido sugerido" (menor `max-h` da lista rolável) para acomodar a barra de filtros sem estourar o card.
- Implementação: `useMemo` sobre `cart` filtrado + `recompute(filteredCart, filters)` para KPIs.

### 3. Simplificar o quadro "POR QUE este SKU"
- **Remover** a lista "Fatores considerados" (redundante).
- Reescrever `reason` de cada SKU em `mixAssortmentOrder.ts` **incorporando os valores numéricos** hoje presentes em `factors` (giro, cobertura, presença no cluster, potencial, margem, capital liberado, etc.) diretamente no texto.
- Remover render de `factors` no componente; manter o campo no tipo apenas se necessário para compat, senão remover.

### 4. Clique no card "Mix recomendado" desmarca SKU
- Tornar o card **"Mix recomendado"** (topo do painel direito) clicável: on click → `setSelectedSku(null)`, voltando o painel direito ao insight geral consolidado.
- Adicionar affordance sutil de hover (borda/bg) sem mudar o visual base.

---

### 5. Novo passo de treinamento "Aprendendo a performance do PDV"
Adicionar em **todo pipeline** de demo cujo contexto envolva PDV. Após varredura, aplica-se a dois demos:

**a. `src/data/kiosk/demos/mixAssortmentOrder.ts`** — inserir como 2º passo no array `pipeline` (logo após "Lendo vendas, estoque e mix atual do PDV"):
```
label: 'Aprendendo a performance do PDV'
micro: 'Giro, margem e ruptura sob comportamento contextual — clima, calendário, cluster e vizinhança.'
durationMs: ~850
```

**b. `src/data/kiosk/demos/demandForecast.ts`** — inserir entre "Tratando esparsidade…" e "Detectando tendência…":
```
labelPt: 'Aprendendo a performance do PDV'
labelEn: 'Learning point-of-sale performance'
microPt: 'Giro, margem e ruptura sob comportamento contextual da loja.'
microEn: 'Turnover, margin and stockout under store contextual behavior.'
durationMs: ~460
```

Demos NÃO afetados (não envolvem PDV como entidade): `predictivePersonalization` (usuário/sessão), `propensityCampaign` (cliente/CRM), `priceToMargin`/`price-to-conversion` (SKU), `commercialTargets` (hierarquia comercial).

---

### Arquivos tocados
- `src/components/kiosk/demos/MixAssortmentOrderDemo.tsx` — itens 1-4
- `src/data/kiosk/demos/mixAssortmentOrder.ts` — itens 1, 3, 5a
- `src/data/kiosk/demos/demandForecast.ts` — item 5b
