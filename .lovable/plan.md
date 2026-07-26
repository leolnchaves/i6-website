# Demo interativa — Metas Comerciais Preditivas

Nova demo para a solução `predictive-commercial-targets`, seguindo o padrão das demos existentes (`PropensityCampaignDemo`, `DemandForecastDemo`): PT-only, 100% estática, com setup à esquerda, pipeline "como o modelo está pensando" e bloco de resultado com tabela hierárquica, alocação de investimento, KPIs e explicações.

## Objetivo exibido
`OBJETIVO: CRESCIMENTO E EFICIÊNCIA DE INVESTIMENTO COMERCIAL`

## Arquitetura de arquivos

- `src/data/kiosk/demos/commercialTargets.ts` — dataset + funções puras (base histórica, cálculo de meta preditiva, potencial, CAC e alocação regional). Determinístico via seed a partir dos argumentos.
- `src/components/kiosk/demos/CommercialTargetsDemo.tsx` — componente da demo (setup, thinking, resultado).
- `src/components/kiosk/SolutionDemoBlock.tsx` — registrar branch `solution.id === 'predictive-commercial-targets'`.

## Fluxo de tela

1. **Tela inicial (setup à esquerda)** — dashboard base fixo mostrando linhas por Região → Vendedor → Cliente/PDV → SKU com colunas: Volume vendido, Meta atual, Investimento comercial atual, CAC por unidade incremental.
   
   Argumentos que o usuário escolhe (chips/selects, seguindo o padrão de `PropensityCampaignDemo`):
   - Período da meta (Mês / Trimestre / Semestre)
   - Região ou território (Interior de SP / Minas Gerais / Sul / Todas)
   - Equipe ou vendedor (Todos / Carlos / Marina / Rafael)
   - Cliente ou carteira (Todos / Chave / Cauda longa)
   - SKU ou categoria (Todos / Categoria A / B / C)
   - Orçamento comercial disponível (slider em faixas: R$ 300 mil / R$ 500 mil / R$ 700 mil)
   
   Botão coral: **Calcular metas e investimento ideal**.

2. **Thinking pipeline** (6 passos, animação sequencial com ícone e barra, mesmo padrão do `PropensityCampaignDemo`):
   1. Lendo vendas e execução comercial
   2. Projetando o potencial de crescimento
   3. Identificando onde existe capacidade incremental
   4. Simulando esforço comercial e CAC
   5. Equilibrando crescimento e eficiência comercial
   6. Distribuindo metas granulares

3. **Resultado** (grid 2 colunas em desktop, empilhado em mobile):

   **A. Meta atual × Meta preditiva** — tabela navegável por dimensão (chips no topo: Região · Vendedor · Cliente · SKU). Colunas: Meta atual, Meta sugerida, Potencial, Δ vs. atual. Clique na linha abre um painel de composição (fatores + copy "Por que sugerimos esta meta / reduzir / aumentar").
   
   **B. Alocação recomendada de investimento comercial** — tabela por região: Crescimento potencial, Investimento atual, Investimento sugerido, CAC incremental, badge de ação (Aumentar / Reduzir / Redistribuir).
   
   **C. Cards de conclusão** (grid 4 colunas, mesma linha):
   - Volume incremental potencial
   - Meta total recomendada
   - Investimento comercial sugerido
   - CAC incremental projetado
   
   **D. Destaques secundários** (chips/pills abaixo dos cards):
   - Regiões com potencial subexplorado
   - Clientes com pressão excessiva
   - SKUs com maior oportunidade
   - Vendedores com capacidade adicional
   
   **E. Painel "Por que sugerimos"** — 4 blocos de copy fixa (com valores dinâmicos interpolados) conforme especificado: sugerir meta, aumentar investimento, reduzir meta, redistribuir investimento.

## Regras de dados (determinísticas)

- Catálogo base: 3 regiões × 2–3 vendedores × 3–4 clientes × 2 SKUs (~24 linhas) com volumes plausíveis (400–1.600 un.), meta atual próxima ao histórico e investimento por região.
- Meta preditiva = potencial × fator de captura (0,85–0,95) modulado pelo período e orçamento.
- Potencial > meta sugerida (folga estrutural).
- CAC incremental por região dentro da faixa R$ 10–25 (random determinístico via seed baseado nos argumentos, seguindo o helper `rand` já usado em `propensityCampaign.ts`).
- Alocação regional: quando a região tem crescimento potencial alto E CAC baixo → "Aumentar"; potencial baixo → "Reduzir"; potencial médio com CAC melhor que outra região → "Redistribuir".
- KPI "Meta total recomendada" e "Investimento sugerido" derivam da soma das linhas filtradas.

## Detalhes de UI

- Tokens visuais: mesma paleta dark navy + coral já utilizada; `bg-white/5`, `border-white/10`, coral `#F4845F` para destaques e ícones.
- Não exibir KPI de latência (segue diretriz aplicada em Campanhas).
- Sem i18n — copy 100% em PT (idem `PropensityCampaignDemo`).
- Reset volta ao estado de setup preservando os argumentos selecionados.

## Integração

- `SolutionDemoBlock.tsx`: adicionar `if (solution.id === 'predictive-commercial-targets') return <CommercialTargetsDemo />;` acima do fallback.
- Nenhuma alteração no `signalDemo` (as perguntas do i6 Signal para essa solução já apontam para os cenários `comercial` + `forecast`).

## Fora de escopo

- Alterações em outras demos.
- Exportação de dados / integração real com backend.
- Versão ENG (pode ser feita depois, mediante pedido).
