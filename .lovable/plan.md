

## Atualizar card Varejo na secao de Resultados

### O que sera feito

Alterar os 3 metrics do card "Varejo" (e "Retail" em ingles):

1. `+36% positivacao` -> `1400` (bold laranja) + `SKUs otimizados`
2. `+23% ticket medio` -> `50 mil` (bold laranja) + `comportamentos de PDVs mapeados`
3. `Receita incremental comprovada` -> Uma unica linha com dois pares bold+texto: `+36%` positivacao de produtos `+23%` ticket medio por PDV.

### Desafio tecnico

O terceiro metric precisa de um formato especial: dois valores bold laranja intercalados com texto normal, tudo na mesma linha. A estrutura atual (`value` + `label`) nao suporta isso.

### Solucao

Adicionar um campo opcional `richLabel` (tipo JSX/ReactNode) ao tipo dos metrics. Quando `richLabel` estiver presente, renderizar ele no lugar do par `value`/`label` padrao.

### Detalhes tecnicos

**Arquivo: `src/components/hometeste/ResultadosSection.tsx`**

1. Atualizar dados PT do Varejo (linhas 20-24):
   - Metric 1: `{ value: '1.400', label: 'SKUs otimizados' }`
   - Metric 2: `{ value: '50 mil', label: 'comportamentos de PDVs mapeados' }`
   - Metric 3: `{ value: '', label: '', richLabel: true }` (flag para renderizacao especial)

2. Atualizar dados EN do Retail (linhas 57-61):
   - Metric 1: `{ value: '1,400', label: 'optimized SKUs' }`
   - Metric 2: `{ value: '50K', label: 'mapped POS behaviors' }`
   - Metric 3: `{ value: '', label: '', richLabel: true }`

3. Criar constantes para o conteudo rich do terceiro metric (PT e EN) e renderizar com JSX inline no componente:
   - PT: `<span bold>+36%</span> positivacao de produtos <span bold>+23%</span> ticket medio por PDV.`
   - EN: `<span bold>+36%</span> product activation <span bold>+23%</span> average ticket per POS.`

4. Na renderizacao (linha 100-110), adicionar condicao: se o metric tiver `richLabel`, renderizar o JSX especial em vez do par `value`/`label` padrao.

