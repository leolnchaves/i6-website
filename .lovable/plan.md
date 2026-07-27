# Corrigir estouro horizontal no i6 Signal (Kiosk)

## Problema
Em várias respostas do demo do i6 Signal dentro do `/kiosk` (formato retrato 27"), o conteúdo estoura a largura disponível e força um scroll horizontal na página inteira. As tabelas e gráficos internos até têm `overflow-x-auto`, mas o contêiner pai não está sendo forçado a respeitar a largura da coluna — quando um filho tem largura mínima maior que o pai (chart com `min-width`, tabela com muitas colunas `whitespace-nowrap`), ele empurra a coluna para fora.

## Causa
Em `src/components/kiosk/KioskSignalIntelliboard.tsx`:
- O wrapper do painel (`rounded-[2vmin] ... overflow-hidden`) não tem `min-w-0` nem largura explícita.
- O "chat surface" (`bg-white p-[3vmin] min-h-[35vmin] max-h-[80vmin] overflow-y-auto`) não trava `overflow-x`, e o wrapper interno da resposta (`animate-fade-in`) também não tem `min-w-0`.
- Dentro do Flexbox em `src/pages/Kiosk.tsx` (`flex flex-col gap-[4vmin]`), colunas flex sem `min-w-0` aceitam crescer além do pai.

## Mudanças

1. `src/components/kiosk/KioskSignalIntelliboard.tsx`
   - Painel externo (linha ~206): acrescentar `w-full min-w-0`.
   - "Chat surface" (linha ~231): acrescentar `overflow-x-hidden min-w-0 w-full`.
   - Div da resposta com `ref={responseRef}` (linha ~253): acrescentar `min-w-0 w-full`.

2. `src/pages/Kiosk.tsx`
   - Contêiner `#kiosk-solution-demo` (linha 240): acrescentar `min-w-0 w-full` para impedir que filhos flex escapem da coluna.

3. `src/components/signalDemo/visualizations.tsx`
   - Em cada wrapper que hoje tem apenas `overflow-x-auto`, acrescentar `w-full min-w-0` para garantir que o próprio wrapper não expanda o pai (o scroll passa a ser puramente interno da tabela/gráfico, como já é esperado).
   - Onde há `ResponsiveContainer`/charts sem `width="100%"` explícito ou dentro de blocos com largura mínima, envolver em `<div className="w-full min-w-0 overflow-x-auto">`.

## Verificação
- Abrir `/kiosk`, percorrer todas as 8 soluções e as 2 perguntas de cada uma no i6 Signal em viewport retrato (ex.: 2160×3840 simulado).
- Confirmar que a barra de scroll horizontal da página nunca aparece; scroll horizontal, quando necessário, fica dentro da tabela/gráfico específico.
- Rodar Playwright headless em viewport `{width: 1080, height: 1920}` capturando `document.documentElement.scrollWidth === clientWidth` após clicar cada pergunta.

## Fora do escopo
- Redesenho de tabelas/gráficos (colunas, tipografia).
- Ajuste de largura mínima interna dos charts (mantidos como estão; passam a ter scroll interno apenas quando realmente não couberem).
