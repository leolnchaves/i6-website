## Próximo passo: confirmar antes de mexer

1. Abrir a planilha de contato e conferir o cabeçalho: existe coluna para `source` e para `reason`? Se não existir, está confirmado que o identificador é descartado na gravação.
2. Conferir uma linha recente vinda da /community para ver quais colunas foram preenchidas.

## Três caminhos de correção (escolher um)

- **A — Acrescentar coluna na planilha (recomendado):** adicionar `source` como última coluna e mapear no Apps Script. O HUB passa a encontrar `i6-community` exatamente como já procura, sem mudar nada no site nem no HUB. É o único que resolve na raiz e serve para todas as origens (builders, kiosk, go, etc.).
- **B — Ajustar a verificação do HUB:** aceitar também o texto da assinatura. Frágil: o texto é traduzido (PT/EN/ES) e pode mudar por decisão de conteúdo.
- **C — Mudar o texto enviado pelo site:** colocar um identificador estável dentro da assinatura (por exemplo `i6-community | Interesse — Comunidade`). Resolve rápido, mas mistura identificador com texto de interface e polui o que aparece na planilha.

Nada é alterado no site enquanto você não escolher. Se for o caminho A, eu preparo o trecho exato para colar no Apps Script e o nome da coluna; o site continua enviando como está hoje.
