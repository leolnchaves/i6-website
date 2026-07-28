# Restaurar demo original do Preço Orientado à Conversão

## Diagnóstico
A refatoração que eu fiz na v2.2.13 apagou o demo original (o ecommerce com produtos e precificação dinâmica por zoom) e substituiu por um clone visual do Preço Orientado à Margem — o que não era o pedido. O pedido era **manter a jornada/navegação** igual às outras (launcher + gating + Signal/CTA depois do modal), **preservando o conteúdo/visual próprio** de cada solução.

A versão original ainda existe no histórico do arquivo, no commit `70f1fa66`:
- `src/components/kiosk/demos/PriceToMarginDemo.tsx` (439 linhas, com `DemoProduct`, grid de produtos, zoom e precificação dinâmica).
- `src/data/kiosk/demos/priceToMargin.ts` (274 linhas, com imports de imagens `product-1..4.jpg`, campos `image`, `cost`, `currentPrice`, `recommendedPrice`, `deltaConversionPct` etc.).

Além disso, o typecheck agora acusa `src/integrations/supabase/client.ts` porque a plataforma Lovable regerou os arquivos após eu ter removido a pasta na v2.2.12, e a dep `@supabase/supabase-js` já foi desinstalada — ficou um arquivo auto-gerado sem a lib.

## Mudança
1. **Restaurar o demo original** a partir do commit `70f1fa66`, sobrescrevendo os arquivos atuais:
   - `git show 70f1fa66:src/components/kiosk/demos/PriceToMarginDemo.tsx` → salvar no mesmo caminho.
   - `git show 70f1fa66:src/data/kiosk/demos/priceToMargin.ts` → salvar no mesmo caminho.
   - Confere que os assets `src/assets/kiosk/product-1..4.jpg` ainda existem (não foram tocados).

2. **Manter o wrapper** `SimulationLauncher` em `SolutionDemoBlock.tsx:24-40` (não mexer) — ele já dá o padrão de navegação: card unificado + botão "Clique aqui para simular", gating de Signal/CTA e scroll ao fechar. Também mantém `'price-to-conversion'` em `migratedIds` no `Kiosk.tsx`, que já foi feito.

3. **Ajustes mínimos no demo restaurado** para funcionar dentro do modal (padrão já usado em Margem/Giro):
   - Se o arquivo original tem um botão/header próprio de "voltar" (`ArrowLeft`), remover — o modal do launcher já tem o botão "Fechar simulação".
   - Se ele espera props `lang`/`onBack`, adaptar para funcionar sem elas (o `SolutionDemoBlock` chama `<PriceToMarginDemo />` sem props). Vou conferir no arquivo restaurado e ajustar assinatura + remover chamada a `onBack` se necessário.

4. **Corrigir o erro de build do Supabase** sem reintroduzir backend:
   - A pasta `src/integrations/supabase/` foi auto-regerada pela plataforma. Como a memória de segurança e a decisão do projeto proíbem reintroduzir Supabase, e como nenhum código do app importa esses arquivos, a correção é **reinstalar apenas a devDependency `@supabase/supabase-js`** para que o `client.ts` auto-gerado compile — sem que qualquer código do app a use. Isso resolve o typecheck sem violar "100% estático" (o arquivo continua morto no bundle porque não há import a partir do código do app).
   - Alternativa (se preferir): tentar deletar de novo `src/integrations/supabase/` — mas a plataforma vai regenerar no próximo turn e o erro volta. Por isso a rota preferida é reinstalar a lib e conviver com o arquivo órfão.

## Verificação
- Abrir `/kiosk`, cair em Preço Orientado à Conversão.
- Card unificado do launcher aparece (Resolve/Entrega/Impacto + botão de simular).
- Clicar em simular → modal abre com o **demo antigo** (grid de produtos com imagens, zoom, precificação dinâmica, Δ Conversão/Δ Receita como estavam).
- Fechar simulação → Signal + eBook CTA aparecem, scroll até o Signal.
- `tsgo` passa limpo.

## Release
Publicar **v2.2.15** após a alteração.

## Detalhes técnicos
- Não vou tocar em `SolutionDemoBlock.tsx` nem em `SimulationLauncher.tsx` — o wrapper está correto.
- Não vou tocar em `Kiosk.tsx` — a lista `migratedIds` já contém `'price-to-conversion'`.
- Vou apenas: (a) `git show 70f1fa66:<path>` e reescrever os 2 arquivos, (b) ajustar props/header do demo restaurado se necessário, (c) `bun add @supabase/supabase-js` para resolver o erro de tipos.
