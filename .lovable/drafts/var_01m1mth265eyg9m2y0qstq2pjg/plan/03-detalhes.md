## Aba ativa vive na URL

A aba selecionada vira `?tab=sdk` (via `replace`, sem empilhar histórico). Assim
alguém consegue mandar o link direto de "Configure a autenticação, aba SDK", e a
seleção sobrevive a recarga e a compartilhamento. Valor ausente ou desconhecido cai
na primeira aba do arquivo (API). Como o parâmetro é a fonte da verdade,
`DocsMarkdown` e `DocsToc` leem a mesma informação sem precisar de estado
compartilhado — por isso `DocsShell` não muda.

## Índice lateral

`DocsToc` recebe o conteúdo bruto como hoje. Quando detecta abas, ele extrai os
headings apenas do bloco correspondente à aba ativa (introdução + bloco), e
recalcula ao trocar de aba porque o parâmetro da URL entra nas dependências. Os
observadores de rolagem são refeitos no mesmo efeito que já existe, agora
disparado também pela troca de aba. Sem abas, comportamento idêntico ao atual.

Colisão de ancoragem: os ids são gerados por bloco de aba visível, então dois
blocos com o mesmo título não competem — só um está no DOM por vez.

## Busca

Indexar as três abas — decisão fechada. A busca de /docs é o único caminho de
descoberta transversal, e alguém que procura "chave privada" precisa achar a página
mesmo que o termo só exista na aba Servidor a servidor. O resultado continua
apontando para a página, com o `?tab=` do bloco onde o termo foi encontrado, então o
visitante cai já na aba certa. Custo: o texto pesquisável por página cresce ~3x nas
5 páginas novas — irrelevante nesta escala (busca em memória sobre poucas dezenas
de arquivos).


## Mudanças técnicas

- `useDocs.ts`: acrescenta ao `DocPage` os campos `intro: string` e
  `tabs: DocTab[]` (`{ key, label, content }`), preenchidos por um parser de linhas
  `:::tab`. `tabs` vazio para todo arquivo atual. Nenhum campo existente muda de
  tipo ou de sentido.
- `DocsMarkdown.tsx`: passa a reconhecer as linhas `@video` e `@download` e a
  renderizar `DocsVideo` / `DocsDownload` no lugar — os mesmos componentes já usados
  em `content_type=video` e `content_type=download`, reaproveitados sem alteração.
- Novo componente irmão `DocsTabs.tsx`: barra de abas acessível (`role="tablist"`,
  setas do teclado) que renderiza introdução + `DocsMarkdown` do bloco ativo. É
  chamado de dentro de `DocsMarkdown` quando há abas, o que mantém `DocsShell`
  intocado.
- `DocsToc.tsx`: recorte de headings por aba ativa.
- `DocsSidebar.tsx`: indexação incluindo os três blocos de aba e `?tab=` no link do
  resultado, conforme a decisão fechada da seção "Busca".

- Intocados: `DocsShell`, `DocsPager`, `DocsSupport`, `DocsRelated`,
  `DocsSampleNotice`, `DocsCodeBlock`, `scripts/sync-content-from-i6hub.mjs`.

## Arquivos de conteúdo

Nova seção `getting-started` ("Começar"), `order` 10–14, em `src/content/docs/`,
nos três idiomas, todos com `sample: true`:

```text
escolha-o-metodo-{pt,en,es}.md          ordem 10   estrutura mínima
configure-a-autenticacao-{pt,en,es}.md  ordem 11   3 abas completas + vídeo + PDF
implemente-a-chamada-{pt,en,es}.md      ordem 12   3 abas com conteúdo realista
trate-a-resposta-{pt,en,es}.md          ordem 13   estrutura mínima
valide-a-implementacao-{pt,en,es}.md    ordem 14   estrutura mínima
```

"Configure a autenticação" traz um `@video` (mesmo id de exemplo já usado no tour)
na aba API e um `@download` apontando para o ponteiro de PDF de exemplo já existente
na aba Servidor a servidor. Nada de stepper, progresso ou navegação entre abas —
isso é do produto.

## Verificação ao final da implementação

Checagem de tipos e build; as páginas antigas (Glossário, Pesquisa, Tour em vídeo,
Guia em PDF) renderizando sem alteração; troca de aba sem recarga com índice
recalculado; link direto com `?tab=sdk` abrindo na aba certa nos três idiomas; e
aba com vídeo carregando o iframe só após o clique.

Dois casos-limite obrigatórios antes de considerar concluído:

1. Link com `?tab=sdk#algum-heading` carregado do zero: a aba SDK aparece **e** a
   rolagem chega ao heading correto — a âncora é reprocessada depois de o bloco da
   aba estar no DOM, não apenas no primeiro paint.
2. Trocar de aba com a página rolada perto do fim: o destaque do índice não fica
   preso a uma seção que não existe na aba nova. Ao trocar de aba, o estado de
   "fim do documento" e o destaque são reiniciados antes de os observadores serem
   religados, então não há competição com o IntersectionObserver.
