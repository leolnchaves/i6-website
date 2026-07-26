## Objetivo

Em **Metas Comerciais Preditivas** (`/kiosk`), exibir o mesmo seletor de dimensão **Região / Vendedor / Cliente / SKU** já **antes de calcular metas**, filtrando o conteúdo inicial da tabela pela dimensão escolhida (hoje é fixo em "Região" até o cálculo terminar).

## Diagnóstico

Em `src/components/kiosk/demos/CommercialTargetsDemo.tsx`:

- O botão do switcher de dimensões é renderizado só quando `showProjected` (fase `result`) — linhas 86–109.
- O cabeçalho da tabela força `'region'` antes do cálculo — linha 114 (`showProjected ? dim : 'region'`).
- As linhas iniciais usam `dimRows.region` fixo — linha 65 (`(dimRows.region ?? []).slice(0, 6)`).

Os dados agregados por todas as 4 dimensões já existem em `getDimRows(result)` (`dimRows.region | rep | client | sku`), então não é preciso mexer em `commercialTargets.ts` — só remover as travas de UI.

## Mudanças

Editar apenas `src/components/kiosk/demos/CommercialTargetsDemo.tsx`:

1. Remover a condição `showProjected` do switcher de dimensões: exibir sempre.
2. Cabeçalho da tabela: usar `dim` diretamente (sem `showProjected ? dim : 'region'`).
3. `rowsToShow`: usar `activeRows.slice(0, 6)` em qualquer fase, ficando as colunas de "Sugerido / Potencial / Δ" com dash (`—`) até o cálculo, como já é hoje.
4. Durante `phase === 'running'` manter o switcher visível porém desabilitado (mesmo padrão dos outros filtros do demo), para o usuário não trocar dimensão no meio do cálculo.

Sem alterações em dados, i18n, layout, cores ou pipeline. Nenhum outro demo é tocado.

## Validação

- Typecheck.
- No `/kiosk` → Metas Comerciais Preditivas, verificar que os 4 chips (Região / Vendedor / Cliente / SKU) já aparecem no setup e que a tabela inicial troca de linhas conforme a seleção, com as colunas projetadas mantendo `—` até o cálculo.