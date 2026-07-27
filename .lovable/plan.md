## Problema
Os botões "Voltar" (Personalização — "← Voltar à vitrine" na linha 380–386 de `PredictivePersonalizationDemo.tsx`; PriceToMargin — "← Escolher outro produto" na linha 156–162 de `PriceToMarginDemo.tsx`) usam a mesma linguagem visual dos `MetricPill` (fundo escuro `bg-white/[0.04]`, borda clara `border-white/25`, cantos arredondados, tipografia sóbria). Como estão lado a lado com os KPIs, o usuário não distingue o que é ação e o que é informação.

## Correção — novo padrão visual do "Voltar"

Criar um design de botão claramente afordante, distinto dos pills de KPI. Aplicar em ambos os componentes:

- **Forma**: `rounded-full` (pill), altura fixa alinhada à altura dos KPIs para não desalinhar o grid.
- **Cor**: fundo sólido em tom neutro escuro elevado — `bg-white/10` com borda `border-white/20` — SEM o hover coral (o coral é a cor de destaque de dados/preço, então some da linguagem do botão para não confundir).
- **Estado hover**: `bg-white/20` (só clareia, mantém neutro).
- **Ícone**: substituir o "←" textual por `<ArrowLeft>` do lucide-react (12–14px) à esquerda, dando afordância clara de ação.
- **Tipografia**: `font-semibold`, `tracking-wide`, `uppercase` opcional — diferente do case natural dos labels de KPI, reforçando que é comando.
- **Peso visual**: sombra sutil `shadow-md` e leve `ring-1 ring-white/10` para elevá-lo levemente da superfície plana dos KPIs.
- **Interação**: manter `active:scale-[0.98]` para feedback tátil.

Arquivos:
1. `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx` — atualizar classe do botão da linha 380–386 e importar `ArrowLeft` do lucide-react; remover o "← " prefixado no label vindo dos dados (usar `t.backToCatalog.replace(/^←\s*/, '')`) para não duplicar seta.
2. `src/components/kiosk/demos/PriceToMarginDemo.tsx` — mesma atualização no botão da linha 156–162.
3. Sem alteração nos dados de tradução (`predictivePersonalization.ts`, `priceToMargin.ts`) — a limpeza da seta é feita em render, mantendo compatibilidade caso alguém volte ao estilo textual.

Escopo restrito: apenas o botão "Voltar" nessas duas demos. Nenhuma alteração nos MetricPills, layout do grid, animações ou lógica de reset.
