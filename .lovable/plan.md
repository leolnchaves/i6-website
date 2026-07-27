## Escopo
Aplicar apenas nas duas demos já migradas para o novo padrão (modal 90%): **Campanhas por Propensão** e **Personalização + Descoberta Preditiva**. As demais (Price-to-Margin, Turnover, Forecast, Commercial Targets, Mix, Price-to-Conversion) permanecem inalteradas nesta iteração — quando forem migradas, seguirão o mesmo padrão unificado.

## Mudanças

### 1. `src/components/kiosk/SimulationLauncher.tsx`
Aceitar novos props opcionais: `resolve`, `entrega`, `impacto`, `labels` (rótulos RESOLVE/ENTREGA/IMPACTO).

Dentro do card externo (o mesmo que já mostra ícone + título + tagline), inserir entre o header e o botão as três linhas RESOLVE / ENTREGA / IMPACTO no mesmo estilo do `Card` interno atual do `SolutionDemoBlock` (destaque coral no Impacto). O botão "Clique aqui para simular a solução" continua no mesmo card, abaixo do IMPACTO.

### 2. `src/components/kiosk/SolutionDemoBlock.tsx`
Nos dois ramos que usam `SimulationLauncher` (`predictive-personalization` / `smart-discovery` e `predictive-campaign-targeting`), passar `resolve`, `entrega`, `impacto` e `labels` da solução. Os demais ramos ficam intactos.

### 3. `src/pages/Kiosk.tsx` (linhas 221–223)
Ocultar condicionalmente o parágrafo "Explore o exemplo de aplicação abaixo." / `tieSubtitle` quando a solução selecionada for uma das duas migradas (Campanhas ou Personalização/Descoberta). Para as demais, mantém-se o texto atual até que sejam migradas.

## Memória
Salvar como requisito no memory do projeto: sempre que uma demo do Kiosk for migrada para o padrão modal 90%, o card da solução (Resolve/Entrega/Impacto) e o launcher devem ser unificados em um único card, e o subtítulo "Explore o exemplo de aplicação abaixo." deve ser omitido para essa solução.

## Resultado visual (apenas para Campanhas e Personalização+Descoberta)
Um único quadro com borda coral:
- Ícone + Título + Tagline
- RESOLVE
- ENTREGA
- IMPACTO (destaque coral)
- Botão "Clique aqui para simular a solução"
Sem o texto intermediário.