

## Atualizar card Financeiro na secao de Resultados

### O que sera feito

Alterar os 3 metrics do card "Financeiro" (e "Finance" em ingles):

1. `-57% custo de CRM` -> `10 milhoes` (bold laranja) + `de comportamentos de clientes mapeados`
2. `12x mais conversao` -> `+1 bilhao` (bold laranja) + `de transacoes treinadas`
3. `ROI em 90 dias` -> Formato especial com dois pares bold+texto, similar ao card Varejo:
   - `-57%` (bold laranja, em cima) + `de custo de CRM` (texto abaixo)
   - `12x` (bold laranja, em cima) + `mais conversao na esteira de campanhas` (texto abaixo)
   - Tudo na mesma linha/bloco

### Solucao tecnica

Reutilizar o pattern `richLabel` ja existente no card Varejo. A terceira metrica do Financeiro tera `richLabel: true` e um tipo de renderizacao especifico (`richType: 'finance'`) para diferenciar do formato do Varejo.

### Detalhes tecnicos

**Arquivo: `src/components/hometeste/ResultadosSection.tsx`**

1. Atualizar dados PT do Financeiro (linhas 28-31):
   - Metric 1: `{ value: '10 milhoes', label: 'de comportamentos de clientes mapeados' }`
   - Metric 2: `{ value: '+1 bilhao', label: 'de transacoes treinadas' }`
   - Metric 3: `{ value: '', label: '', richLabel: true, richType: 'finance' }`

2. Atualizar dados EN do Finance (linhas 65-68):
   - Metric 1: `{ value: '10 million', label: 'mapped customer behaviors' }`
   - Metric 2: `{ value: '+1 billion', label: 'trained transactions' }`
   - Metric 3: `{ value: '', label: '', richLabel: true, richType: 'finance' }`

3. Na renderizacao (linhas 106-112), expandir a condicao `richLabel` para verificar `richType`:
   - Se `richType === 'finance'`: renderizar dois blocos lado a lado (usando flex), cada um com o valor bold laranja em cima e o texto descritivo embaixo:
     ```
     -57%              12x
     de custo de CRM   mais conversao na esteira de campanhas
     ```
   - Se nao tem `richType` (Varejo): manter o formato inline atual com `+36%` e `+23%`.

