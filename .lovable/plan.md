## Plano: Ajustar nomes PT das soluções nos cards

### Escopo
Atualizar os nomes em português das soluções exibidas nos cards da página `/solutions-v2` (arquivo `src/data/solutionsV2/content.ts`) conforme a tabela anexada. Os nomes em inglês serão tratados posteriormente.

### Mapeamento a aplicar
- **Predictive Personalization** → **Personalização Preditiva**
- **Smart Discovery** → **Descoberta Preditiva**
- **Predictive Campaign Targeting** → **Campanhas por Propensão**
- **Demand Forecasting** → **Forecast Preditivo de Demanda**
- **Price-to-Margin** → **Preço Orientado à Margem**
- **Price-to-Turnover** → **Preço Orientado ao Giro**
- **Price-to-Conversion** → **Preço Orientado à Conversão**
- **Metas Comerciais Preditivas** e **Mix, Sortimento e Pedido Ideal** permanecem iguais (já alinhados à tabela).

### Ações
1. Localizar em `src/data/solutionsV2/content.ts` os arrays `chips` e os campos `title` que contêm os nomes acima.
2. Substituir os valores pelos nomes PT recomendados, mantendo o restante do texto, estrutura e links inalterados.
3. Verificar se há referências idênticas em outros arquivos (traduções, FAQ, success stories) que precisem de ajuste para manter consistência, mas limitar as alterações aos cards conforme solicitado.
4. Rodar build para garantir que não haja erros.
5. Apresentar o resultado e perguntar se deseja publicar a patch no GitHub.