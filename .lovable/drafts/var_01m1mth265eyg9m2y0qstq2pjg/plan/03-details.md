## Detalhes técnicos

Diagnóstico confirmado em execução (`/pt/docs`, 1425x902): a única
ancestral com overflow não visível é `DarkLayout` —
`div.min-h-screen.bg-[#0B1224].relative.overflow-x-hidden`, cujo
`overflow` computado é `hidden auto`. Isso a torna o contêiner de rolagem
das colunas, então `sticky top-28` não gruda: após `scrollY: 727`, o
`aside` e seu filho `sticky` ficaram em `top: -599`.

O `IntersectionObserver` do `DocsToc` já funciona: no mesmo teste o item
ativo era "Convenções" depois da rolagem. Não há bug de destaque a
corrigir, apenas a extensão para o fim da página.

Mudanças:

1. `src/components/DarkLayout.tsx` — trocar `overflow-x-hidden` por
   `overflow-x-clip` (`clip` corta o transbordo sem criar contêiner de
   rolagem, preservando `sticky`). Mantém o efeito atual de não permitir
   rolagem horizontal em nenhuma rota. Verificar visualmente home, `/pt`,
   `/pt/i6-builders`, `/pt/community` e `/pt/contact` para garantir que
   nenhuma seção passou a gerar barra horizontal.

2. `src/components/docs/DocsShell.tsx`
   - Manter a coluna do menu `sticky top-28` com
     `max-h-[calc(100vh-8rem)] overflow-y-auto` e `overscroll-contain`,
     para o menu ter rolagem própria sem arrastar a página.
   - Alinhar breakpoint da terceira coluna: hoje o grid só reserva a
     coluna do índice em `xl`, enquanto `DocsToc` aparece em `lg`. Passar
     as duas coisas para `xl` (grid `xl:grid-cols-[240px_minmax(0,1fr)_220px]`
     e `DocsToc` visível em `xl`), evitando o índice caindo abaixo do texto
     entre `lg` e `xl`.

3. `src/components/docs/DocsToc.tsx`
   - `sticky top-28` com `max-h-[calc(100vh-8rem)] overflow-y-auto` e
     `overscroll-contain`.
   - Manter o `IntersectionObserver` atual (`rootMargin
     '-120px 0px -65% 0px'`) e adicionar um caso de fim de página: quando
     a rolagem chega ao final do documento, ativar o último título, já que
     a faixa de detecção pode não alcançar seções curtas no rodapé.
   - Rolar o item ativo para dentro da vista da própria coluna
     (`scrollIntoView({ block: 'nearest' })`) quando o índice tiver
     rolagem interna, respeitando `prefers-reduced-motion`.
   - Clique no item continua usando `href="#id"`; `scroll-mt-28` já está
     nos títulos do `DocsMarkdown`, então a âncora não fica sob o header.

Fora de escopo: alterar o rodapé, o conteúdo das páginas de docs, a
renderização de Markdown, o mecanismo mobile (painel por botão) ou
qualquer outra rota além do ajuste de `overflow` em `DarkLayout`.

Alternativa considerada e descartada: transformar a área de docs em três
painéis de altura fixa de viewport com rolagem só no painel central. Isso
atende o pedido literal, mas empurra o rodapé do site para fora do
alcance na rota de documentação e exige recalcular a altura do header;
o resultado visual percebido é o mesmo do plano acima.

Validação: build, checagem de tipos e verificação em PT/EN/ES com rolagem
longa — confirmando laterais paradas, destaque acompanhando a leitura,
destaque na última seção e ausência de barra horizontal nas rotas
principais.
