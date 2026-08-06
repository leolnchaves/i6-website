# Investigar: lead chegou ao HUB com nome errado e sem linha em `_dispatch_log`

Dois sintomas na mesma execução, sem erro no log de execuções:

1. O nome que chegou ao HUB é diferente do digitado em **Full name** na tela.
2. Não há linha correspondente em `_dispatch_log`.

Os dois apontam para o mesmo tipo de causa: **o payload enviado ao HUB não é montado com as variáveis do request, e o log não é gravado no caminho que rodou**. Nada disso está confirmado ainda — o site enviou os campos corretos (o `appendRow` gravou certo na planilha), então a divergência nasce dentro do Apps Script.

Nenhuma alteração no site nesta etapa.

## Hipóteses a verificar (em ordem)

- **Payload lendo a planilha em vez do request.** Se o `dispatchToHub_` (ou quem monta o payload) buscar valores por linha/coluna da planilha — em vez de usar as variáveis já extraídas no `doPost` — um deslocamento de índice depois da criação da coluna `lead_uid` explicaria pegar o valor de outra célula/linha (nome de um lead anterior).
- **Ordem dos argumentos.** Se o payload é montado por posição (ex.: `dispatchToHub_(name, email, company, ...)`), um argumento fora de ordem manda `company`/`subscription` no lugar de `name`.
- **`logDispatch_` não chamado nesse caminho.** Se o log só é gravado em um dos ramos (sucesso ou erro), ou se ele grava em aba/índice que mudou, a ausência de linha é consequência — não prova de que o dispatch não rodou. Como o lead chegou ao HUB, o dispatch **rodou**; então o problema é especificamente no log.

## Correções previstas (cirúrgicas, sem reescrever o `doPost`)

- Montar o payload do HUB **exclusivamente** a partir das variáveis já extraídas do request (`name`, `email`, `company`, `subscription`, `message`, `lead_uid`, UTMs), nunca por leitura de célula.
- Garantir `logDispatch_` em `try/finally`, gravando **sempre** uma linha (status HTTP, corpo da resposta, `lead_uid`), tanto em sucesso quanto em erro.
- Se o log for gravado por posição de coluna, passar a localizar as colunas pelo cabeçalho de `_dispatch_log`, para ficar imune a novas colunas.

## Validação

Após implantar **Nova versão** (mesma implantação, mesma URL): enviar 1 contato pelo site e confirmar, na mesma ordem — linha em `ContactForm` com `lead_uid`, linha em `_dispatch_log` com status 200, e no HUB o nome idêntico ao digitado.

## O que eu preciso de você

Cole aqui os trechos atuais de:

- `dispatchToHub_` (completo, incluindo a montagem do `payload`)
- `logDispatch_` (completo)
- a chamada do `doPost` para essas duas funções

Com isso eu identifico a hipótese correta e te devolvo o trecho exato para colar.
