# Desativar o acesso à /demo sem apagar nada

Relatório do que existe hoje (nada foi alterado).

## 1. Rotas declaradas

Em `src/App.tsx` (linhas 156-159), três entradas:

| Caminho | O que renderiza |
| --- | --- |
| `/:lang/demo` | `Kiosk` (página do totem) |
| `/demo` | `RootLangRedirect` (manda para `/pt/demo` ou `/en/demo`) |
| `/demo-metrics/:token` | `KioskMetrics` (painel de métricas) |

`src/pages/Kiosk.tsx` também se auto-normaliza: se o idioma na URL for inválido ou mudar, ele navega para `/pt/demo` ou `/<idioma>/demo`.

## 2. Ficam fora da estrutura de idioma?

Sim. As três são declaradas no nível raiz, antes da rota genérica `/:lang/*`, portanto não passam pelo fluxo do site localizado nem pelo layout com cabeçalho/rodapé.

## 3. `/demo-metrics/...` é parte do mesmo fluxo?

Sim, mesmo fluxo. É o painel que lê os eventos gravados pela própria demo (mesma biblioteca de eventos e de leads pendentes do totem), protegido por um token fixo na URL. Hoje ele inclusive avisa que "a coleta de métricas está temporariamente desativada no /demo". Não é algo independente: se a demo sai do ar, o painel perde a função.

## 4. Links visíveis no site

Nenhum. Não existe item de menu, rodapé, botão ou CTA apontando para `/demo` ou `/demo-metrics` em nenhuma página. As únicas referências são internas à própria demo (a normalização de idioma dentro dela) e o script de publicação, que gera arquivos estáticos para `demo`, `pt/demo`, `en/demo` e `demo-metrics/<token>` para o aparelho do totem não ver erro 404.

Ou seja: desativar não quebra nenhum link público. Quem acessa hoje é o totem físico (URL fixa no aparelho) ou alguém com o endereço salvo.

## 5. Forma mais simples de desativar (proposta)

Trocar apenas o `element` das três rotas em `src/App.tsx` para o mesmo redirecionamento já usado pelas páginas descontinuadas (`HomeRedirect`, que leva à Home no idioma preferido preservando parâmetros da URL). Os arquivos e componentes da demo continuam intactos no repositório e os imports permanecem.

Isso é suficiente para todas as sub-rotas, porque:

- `/:lang/demo` e `/demo-metrics/:token` cobrem qualquer idioma e qualquer token;
- não existe nenhuma sub-rota mais profunda de `/demo`; qualquer coisa como `/pt/demo/algo` já cai no fluxo normal de rota inexistente;
- `Kiosk` deixa de ser montado, então a normalização interna de idioma nunca roda.

Um ponto a decidir junto: os arquivos estáticos gerados no publish para `demo`, `pt/demo`, `en/demo` e `demo-metrics/<token>`. Mantê-los é inofensivo (o endereço carrega o site e o visitante é levado à Home), mas eu recomendo mantê-los por enquanto para o totem não exibir tela de erro.

## Fora de escopo

Nenhum arquivo ou componente da demo é apagado, renomeado ou alterado; nada de release/deploy sem você pedir.
