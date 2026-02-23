
# Ajustar cenario Supply: horizonte de 3 meses e remover coluna "Acao Sugerida"

## Mudancas

### Arquivo: `src/components/solutions/I6SignalDemo.tsx`

**1. Dados PT (linhas 32-54)**

- Pergunta: "Quais SKUs estao em risco de ruptura nos proximos 3 meses?"
- Titulo: "Analise de Risco de Ruptura -- Proximo Trimestre (Mar-Mai/2026)"
- Analise: reescrita para horizonte trimestral, com linguagem de planejamento em vez de emergencia
- Tabela: remover coluna "Acao Sugerida" (headers e cada row passam de 5 para 4 colunas)
- Acoes recomendadas: ajustadas para horizonte trimestral

**2. Dados EN (linhas 184-206)**

- Mesmas mudancas em ingles

**3. Componente SupplyTable (linhas 328-355)**

- Remover a renderizacao da 5a coluna (`row[4]`) com cor laranja
- Manter todas as cores de texto como preto/cinza escuro (remover `text-red-500`, `text-amber-500`, `text-green-500` da coluna de probabilidade)

---

### Detalhes tecnicos

**PT - Novos dados:**
```
question: 'Quais SKUs estao em risco de ruptura nos proximos 3 meses?'
title: 'Analise de Risco de Ruptura -- Proximo Trimestre (Mar-Mai/2026)'
analysis: 'A projecao de demanda vs capacidade de reposicao para os proximos 90 dias indica 5 SKUs com probabilidade elevada de ruptura. O SKU 44210 (Dipirona 500mg) lidera o risco (94%) devido a sazonalidade de outono e lead time de 22 dias do fornecedor principal. O impacto acumulado estimado e de R$ 510.000 em receita no trimestre caso nenhuma acao preventiva seja tomada.'
headers: ['SKU', 'Produto', 'Prob. Ruptura', 'Estoque (dias)']
rows sem a 5a coluna, com valores de estoque ajustados para horizonte trimestral:
  ['44210', 'Dipirona 500mg 20cp', '94%', '18']
  ['31087', 'Omeprazol 20mg 28cp', '87%', '24']
  ['28901', 'Losartana 50mg 30cp', '72%', '38']
  ['55432', 'Amoxicilina 500mg 21cp', '61%', '45']
  ['19876', 'Metformina 850mg 30cp', '48%', '62']
```

Acoes ajustadas para planejamento trimestral (ex: renegociar contratos, ajustar forecast, revisar politica de estoque de seguranca).

**EN - Mesma estrutura traduzida.**

**SupplyTable - cores sempre pretas:**
- Headers: `text-gray-700` (em vez de `text-gray-500`)
- Todas as colunas de dados: `text-gray-800` (remover probColor condicional e cor laranja da ultima coluna)
- Renderizar apenas 4 colunas (indices 0-3)
