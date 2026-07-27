## Objetivo

Na tela de resultado da demo **Campanhas por Propensão**, exibir o produto/oferta selecionado acima da tabela de faixas de prioridade.

## Mudanças

**`src/components/kiosk/demos/PropensityCampaignDemo.tsx`** (dentro do bloco `phase === 'result'`, antes da tabela em ~linha 170):
- Adicionar um cabeçalho compacto com:
  - Label pequeno `"Produto"` (PT) / `"Product"` (EN) em coral, uppercase tracking.
  - Nome do produto (`product.name`) em texto branco bold ~`text-[1.9vmin]`.
  - Categoria em cinza claro (`text-white/60`).
- Adicionar chaves de label em `L.result` (`selectedProduct`) em `src/data/kiosk/demos/propensityCampaign.ts` (PT: "Produto selecionado"). Se o arquivo já for só PT (é), basta uma string.

Sem alteração na lógica de cálculo nem no restante do layout.
