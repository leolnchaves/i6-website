## Objetivo

Eliminar o scroll horizontal em todas as respostas do i6 Signal dentro do Kiosk, sem quebrar a legibilidade das tabelas.

## Diagnóstico (verificado)

- `src/components/kiosk/KioskSignalIntelliboard.tsx` (linha 231): o card branco já usa `overflow-x-hidden` — ou seja, o container externo não rola.
- `src/components/signalDemo/visualizations.tsx`: os wrappers de tabela usam `overflow-x-auto` em ~20 locais (ex.: linhas 4, 77, 207, 238, 298, 428, 463, 578, 625, 687, 838, 956, 1012, 1058, 1103, 1143, 1218, 1254 …). Isso gera **scroll horizontal interno** quando as colunas somadas superam a largura útil.
- Reforçadores do estouro: `whitespace-nowrap` em células com texto longo (ex.: linha 259 na `BehaviorClustersTable`, linha 645 no scenario regional, linha 259 dos cluster names) prendem a largura mínima da coluna e impedem a quebra.

## Mudanças (apenas apresentação, sem lógica)

1) **Trocar `overflow-x-auto` por `overflow-hidden` em todos os wrappers de tabela** em `src/components/signalDemo/visualizations.tsx`. Assim as tabelas passam a se ajustar à largura do card em vez de rolar.

2) **Permitir quebra de linha nas células que hoje travam a largura mínima**:
   - Remover `whitespace-nowrap` das células de nome/cluster/região listadas acima (linhas 259, 645 e demais equivalentes que aparecerem na varredura).
   - Onde o texto precisar caber melhor, adicionar `break-words` / `leading-tight` para manter a leitura sem estourar.

3) **Forçar layout de tabela previsível**: adicionar `table-fixed` ao `<table>` nos casos em que ainda houver risco de estouro (ex.: `BehaviorClustersTable` segunda tabela com 3 colunas longas), e reduzir o padding lateral das células (`px-3` → `px-2`) apenas nessas tabelas quando necessário para manter todas as colunas visíveis.

4) **Validação visual**: após o ajuste, verificar no viewport do Kiosk (retrato 27") os cenários citados como problemáticos (Personalização — resposta 2 / Clusters Comportamentais) e um cenário por família (Forecast, Metas, Mix, Preço, Turnover) para confirmar que nenhuma tabela apresenta scroll horizontal.

## Arquivos afetados

- `src/components/signalDemo/visualizations.tsx` (único arquivo alterado — apenas classes utilitárias)

## Fora de escopo

- Nenhuma mudança em lógica, dados ou textos dos cenários.
- Nenhuma mudança em `KioskSignalIntelliboard.tsx` (o container externo já está correto).
