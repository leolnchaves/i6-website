## Contexto
Após unificar o card da solução com o launcher, o `SolutionsGrid` (topo) ficou redundante para as demos já migradas. Personalização Preditiva + Descoberta Preditiva **sempre** aparecem juntas (combo fixo), então o card unificado precisa mostrar as duas.

## Mudanças

### 1. `src/pages/Kiosk.tsx`
Ocultar o `SolutionsGrid` inteiro quando a seleção atual pertence às demos já migradas: `predictive-personalization`, `smart-discovery`, `predictive-campaign-targeting`. Para as demais soluções (ainda não migradas), o grid segue como hoje.

Também identificar a "companheira" quando a selecionada for Personalização/Descoberta: pegar a outra solução do par em `solutionsForResults` e passar como `companion` para `SolutionDemoBlock`.

### 2. `src/components/kiosk/SolutionDemoBlock.tsx`
Adicionar prop opcional `companion?: LeanSolution`.

No ramo `predictive-personalization || smart-discovery`, passar ao `SimulationLauncher` os dados da segunda solução via novas props (título + resolve/entrega/impacto).

### 3. `src/components/kiosk/SimulationLauncher.tsx`
Aceitar props opcionais de uma segunda solução: `secondaryTitle`, `secondaryResolve`, `secondaryEntrega`, `secondaryImpacto`.

Quando presentes, dentro do mesmo card, logo após o bloco principal RESOLVE/ENTREGA/IMPACTO, inserir:
- Um separador sutil.
- Subtítulo em coral com o nome da segunda solução (ex.: "Descoberta Preditiva").
- Os três SummaryRow (RESOLVE/ENTREGA/IMPACTO) da segunda solução, mesmo estilo (IMPACTO em destaque coral).

O botão "Clique aqui para simular a solução" continua único no final do card.

## Resultado visual
- **Campanhas por Propensão**: sem grid no topo; apenas o card unificado com Resolve/Entrega/Impacto + botão.
- **Personalização Preditiva + Descoberta Preditiva**: sem os dois cards do grid; card unificado mostra Título "Personalização Preditiva" com seu Resolve/Entrega/Impacto, seguido do bloco "Descoberta Preditiva" com seu Resolve/Entrega/Impacto, e o botão único de simular ao final.

## Memória
Atualizar `mem://features/kiosk/unified-solution-launcher.md`: quando a demo migrada é o combo Personalização + Descoberta (sempre juntas), o card unificado renderiza ambos os blocos R/E/I com o botão único; e o `SolutionsGrid` do topo é ocultado para todas as demos migradas.