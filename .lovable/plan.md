## Objetivo

Nas soluções que já usam o `SimulationLauncher` (Personalização + Descoberta Preditiva e Campanhas por Propensão), forçar o fluxo pelo botão "Simular": enquanto o usuário não abrir e fechar o modal, o `KioskSignalIntelliboard` e o `EbookCTA` ficam ocultos. Ao fechar o modal, ambos aparecem e a tela rola até o i6 Signal.

## Mudanças

### 1) `SimulationLauncher` expõe evento de "simulação concluída"
`src/components/kiosk/SimulationLauncher.tsx`
- Adicionar prop opcional `onSimulationClosed?: () => void`.
- Chamar `onSimulationClosed()` dentro de `close()` (tanto pelo botão inferior "Fechar Simulação" quanto pela tecla Esc).
- Remover o botão X do canto superior direito do modal (bloco `<button ... aria-label={t.closeSimulation}> <X/> </button>`). O fechamento passa a ser exclusivamente pelo botão inferior (e Esc, mantido).

### 2) `SolutionDemoBlock` repassa o callback
`src/components/kiosk/SolutionDemoBlock.tsx`
- Adicionar prop `onSimulationClosed?: () => void` na interface `Props`.
- Repassá-la ao `SimulationLauncher` nos ramos `predictive-personalization` / `smart-discovery` e `predictive-campaign-targeting`.

### 3) `Kiosk.tsx` controla a visibilidade condicional
`src/pages/Kiosk.tsx`
- Novo estado `simulationCompleted: Record<string, boolean>` (chave = `solutionId`), resetado em `reset()` e ao trocar de solução selecionada não é resetado (mantém progresso por solução dentro da mesma sessão).
- Identificar soluções migradas (já existe a lista local `migratedIds`).
- Renderização dentro do bloco `#kiosk-solution-demo`:
  - `SolutionDemoBlock` sempre visível.
  - Se `isMigrated` e `!simulationCompleted[selectedSolution.id]`: **ocultar** `KioskSignalIntelliboard` e `EbookCTA`.
  - Se não migrada, comportamento atual permanece (sempre visíveis).
- Passar `onSimulationClosed` ao `SolutionDemoBlock` apenas para migradas:
  ```ts
  () => {
    setSimulationCompleted((s) => ({ ...s, [selectedSolution.id]: true }));
    requestAnimationFrame(() => {
      document.getElementById('kiosk-signal-intelliboard')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  ```

### 4) Âncora de scroll no Signal
`src/components/kiosk/KioskSignalIntelliboard.tsx`
- Adicionar `id="kiosk-signal-intelliboard"` no elemento raiz (container externo) para o scroll suave após fechar o modal.

## Fora de escopo

- Demos que ainda não usam `SimulationLauncher` (Price*, Demand, Commercial Targets, Mix) permanecem inalteradas.
- Sem mudanças de conteúdo, textos ou tracking.

## Verificação

- Fluxo Kiosk → resultado com Personalização (ou Campanhas): apenas o card da solução com botão "Simular" aparece; Signal e CTA não visíveis.
- Abrir modal: apenas botão inferior "Fechar Simulação" (sem X no topo).
- Fechar modal: Signal e CTA aparecem e a tela rola até o Signal.
- Demais soluções (não migradas) continuam mostrando Signal e CTA imediatamente.
