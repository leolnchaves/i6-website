## Ajustes no pipeline de treinamento — Metas Comerciais Preditivas

Arquivo: `src/data/kiosk/demos/commercialTargets.ts` (array `pipeline`, linhas 57–88).

### Alterações

1. **Passo 1**: renomear `Lendo vendas e execução comercial` → **`Analisando performance do PDV`**
   - `micro`: atualizar para refletir leitura de giro, ruptura, positivação e execução no ponto de venda (mesma linha do passo equivalente em Mix/Forecast, para manter consistência).

2. **Novo passo 2**: inserir **`Projetando demanda futura`** logo após o passo 1
   - `micro`: descreve projeção de demanda por SKU / região / cliente considerando sazonalidade, calendário comercial e sinais contextuais.
   - `durationMs`: ~850ms (alinhado aos demais).

3. **Remover** o último passo `Distribuindo metas granulares`.

### Ordem final do pipeline (6 → 6 passos)

```text
1. Analisando performance do PDV
2. Projetando demanda futura
3. Projetando o potencial de crescimento
4. Identificando capacidade incremental
5. Simulando esforço comercial e CAC
6. Equilibrando crescimento e eficiência
```

### Escopo

- Somente o array `pipeline` em `commercialTargets.ts`.
- Nenhuma mudança em UI, dados, cálculos, ou i18n adicional (o demo é PT-only hoje).
