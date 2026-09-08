# Remover sincronização de landings do i6 HUB

## Contexto
A página `/solutions` e as 4 landings de transformação foram descontinuadas e removidas do site. A pasta `src/content/landings/` e seu leitor (`useLandings.ts`) já foram excluídos. A única referência restante é a opção `--type=landings` em `scripts/sync-content-from-i6hub.mjs`, que, se executada, recriaria arquivos órfãos sem página para exibi-los.

## Objetivo
Remover completamente a opção de sincronização `landings` do script de sync, sem alterar nenhuma outra opção (`insights`, `research`, `stories`, `docs`).

## Escopo de mudança
Arquivo único: `scripts/sync-content-from-i6hub.mjs`.

Alterações:
1. Remover `landings` do array de tipos válidos na validação de CLI.
2. Atualizar a mensagem de uso de `--type=insights|research|landings|stories|docs` para `--type=insights|research|stories|docs`.
3. Remover o bloco de configuração `landings: { ... }` do objeto `CONFIG`.
4. Remover o exemplo `node scripts/sync-content-from-i6hub.mjs --type=landings` do comentário de uso no topo do arquivo.
5. Remover a função `fmLandings(it)`.

## Validação
Após a edição, executar:
- `bunx tsc --noEmit` (ou equivalente do projeto) para confirmar que nenhum código TypeScript referencia `landings`.
- `bun run build` para confirmar que a build não quebra.

Não haverá release nem deploy.
