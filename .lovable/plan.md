# Investigar lead que gravou na planilha mas não chegou ao HUB

O lead entrou na aba `ContactForm`, mas não há linha em `_dispatch_log`. Ausência de log significa que o `dispatchToHub_` provavelmente **não foi chamado** (ou lançou exceção antes de logar). Isso não é diagnosticado ainda — o site enviou os campos corretamente, então a causa está no Apps Script implantado.

Nada muda no site nesta etapa.

## Passo 1 — Ler o log de execuções do Apps Script

No editor do Apps Script: **Execuções** (ícone de relógio) → localizar a execução `doPost` do horário do teste.

Três cenários possíveis, cada um com correção diferente:

- **Execução com erro (Failed)** → a mensagem aponta a linha exata; provável exceção depois do `appendRow` (ex.: bloco novo do `lead_uid`, ou `dispatchToHub_` quebrando antes de gravar o log).
- **Execução "Completed" sem log no `_dispatch_log`** → o `doPost` retornou antes de chamar o `dispatchToHub_`. Candidatos: o bloco de dedupe encontrando o `lead_uid` e saindo com `duplicate:true`, ou um `if` que só dispara para leads com `insight_id`.
- **Nenhuma execução `doPost` no horário** → o site postou para uma URL de implantação antiga (versão não atualizada) e outra cópia do script gravou a linha.

## Passo 2 — Confirmar qual versão está no ar

Em **Gerenciar implantações**, verificar se a implantação ativa aponta para a versão mais recente (a que inclui dedupe + `lead_uid` + truncamento de `source`). Se estiver em versão antiga, criar **Nova versão** na mesma implantação (mantém a URL).

## Passo 3 — Confirmar a hipótese com um teste controlado

Rodar a função utilitária `reenviarUltimoLead()` pelo editor. Ela chama o `dispatchToHub_` direto:

- Se o HUB responder **200** e aparecer linha em `_dispatch_log` → o dispatch funciona; o problema é o caminho dentro do `doPost` (dedupe/condicional) → corrigir o `doPost`.
- Se responder **erro** → o problema é o payload ou o token → corrigir a montagem do payload.

## Passo 4 — Aplicar a correção pontual

Conforme o resultado, um destes ajustes cirúrgicos (sem reescrever o `doPost`):

- Dedupe disparando errado: retornar `duplicate` **somente** quando o `lead_uid` já existir em linha anterior (ignorando a linha que o próprio request acabou de gravar) — hoje a ordem de gravação pode fazer o próprio lead ser visto como duplicado.
- Chamada ao HUB condicionada a `insight_id`: remover a condição para que leads de contato/parceria também sejam despachados.
- Exceção no `dispatchToHub_`: envolver em `try/catch` e sempre gravar em `_dispatch_log` (inclusive erro), para nunca mais ficar sem rastro.

## O que eu preciso de você

Cole aqui o conteúdo da execução `doPost` em **Execuções** (mensagem completa) — com isso eu identifico o cenário e te passo o trecho exato para colar.
