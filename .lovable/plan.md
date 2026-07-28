# Ativar gating de Preço Orientado à Conversão no Kiosk

## Diagnóstico
A migração em si (v2.2.13) foi construída:
- `src/components/kiosk/demos/PriceToMarginDemo.tsx` já está no padrão empilhado (filtros → tabela SKUs → gráfico de curva de conversão + KPIs → cenários alternativos → card POR QUE → timeline horizontal), com estado pré-cálculo em `—` e seleção automática do 1º SKU pós-simulação.
- `src/data/kiosk/demos/priceToMargin.ts` já é o dataset focado em conversão (sessões, elasticidade, Δ Conversão, Δ Receita, cenários alternativos, argumentos POR QUE por SKU).
- `src/components/kiosk/SolutionDemoBlock.tsx:24-40` já embrulha em `SimulationLauncher` com ícone `Target` e propaga `onSimulationClosed`.

O que faltou foi **uma linha** em `src/pages/Kiosk.tsx:222`: o id `'price-to-conversion'` não está na lista `migratedIds`. Sem isso:
- `SolutionsGrid` antigo continua sendo renderizado acima do launcher.
- O subtítulo "Explore o exemplo de aplicação abaixo" continua visível.
- O gating de `KioskSignalIntelliboard` + `EbookCTA` (só aparecem após fechar o modal) não é aplicado.
- O scroll automático até o Signal ao fechar a simulação não dispara.

## Mudança
1. `src/pages/Kiosk.tsx` (linha 222): adicionar `'price-to-conversion'` ao array `migratedIds`.

Isso replica automaticamente, para essa solução, tudo o que já valia em Giro/Margem e demais migradas:
- Oculta o `SolutionsGrid` e o subtítulo antigos.
- Mantém somente o card unificado do `SimulationLauncher` (Resolve/Entrega/Impacto + botão "Clique aqui para simular a solução").
- Signal + CTA de eBook só entram em cena após o `onSimulationClosed`.
- Ao fechar o modal, faz scroll suave até `#kiosk-signal-intelliboard`.

## Verificação
- Abrir `/kiosk`, responder o quiz até cair em Preço Orientado à Conversão.
- Confirmar que só aparece o card unificado (sem o grid antigo, sem o texto "Explore o exemplo…").
- Clicar em "Clique aqui para simular a solução" → abrir modal, rodar simulação, "Fechar simulação".
- Confirmar que Signal + eBook CTA aparecem só depois e a página rola até o Signal.

## Release
Publicar **v2.2.14** após a alteração (dispara deploy automático em ~2 min).
