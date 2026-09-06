# Docs com abas de método e mídia embutida

Cinco novas páginas na seção "Começar" ganham três blocos de conteúdo — API, SDK e
Servidor a servidor — alternados por abas dentro do mesmo arquivo Markdown, sem
navegação nem recarga. Cada bloco pode, de forma independente, ter vídeo, cartão de
PDF e texto normal.

Nada muda para as páginas atuais: sem marcação de aba no corpo, tudo renderiza
exatamente como hoje.

## Marcação dentro do Markdown

Delimitador de aba — linha própria, prefixo reservado, processável por regex:

```text
:::tab api Chamada direta à API
...conteúdo markdown normal...

:::tab sdk SDK oficial
...conteúdo...

:::tab server Servidor a servidor
...conteúdo...
```

Regras: a primeira linha `:::tab` abre o modo abas; todo texto antes dela é
"introdução" e aparece acima das abas em qualquer aba selecionada. Cada bloco
termina no próximo `:::tab` ou no fim do arquivo. A chave (`api`, `sdk`, `server`)
é o identificador; o resto da linha é o rótulo visível, já traduzido no próprio
arquivo de idioma.

Mídia inline — também linha própria, um marcador por linha:

```text
@video youtube aqz-KE-bpKQ | Configurando o token na prática
@download src/assets/docs-exemplo.pdf.asset.json | Guia de autenticação (PDF)
```

O marcador pode aparecer em qualquer posição dentro de um bloco de aba (ou fora
das abas), quantas vezes for necessário, e é renderizado no lugar exato onde
aparece. `@download` aceita o mesmo ponteiro `.asset.json` ou uma URL, resolvido
pela função `resolveAssetUrl` que já existe.

Por que essa sintaxe: linhas isoladas com prefixo fixo são reconhecíveis por uma
expressão regular simples, não colidem com sintaxe Markdown válida, sobrevivem ao
sync do i6 HUB como texto puro e não exigem compilador MDX.
