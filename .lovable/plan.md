# Políticas em painel lateral (drawer)

As telas de Política de Privacidade e Política de Ética deixam de abrir como páginas separadas. Elas passam a abrir como um painel que desliza da direita, ocupando cerca de 40% da tela no computador e quase toda a largura no celular, com o restante da página escurecido atrás.

## Visual escolhido (opção "Sand side drawer")

- Fundo areia claro, texto em cinza-escuro, detalhes em coral.
- Cabeçalho fixo com o título e o botão de fechar (X) no canto.
- Corpo com rolagem própria: seções numeradas em círculos coral (01, 02, 03...), listas com marcadores coral e a tabela de classificação com cabeçalho coral, tudo legível na largura reduzida.
- Rodapé do painel com a data da última atualização.
- Entrada deslizando da direita; fecha no X, no clique fora e na tecla Esc.

## Comportamento

- Todos os lugares que hoje levam às políticas passam a abrir o painel: rodapé, aviso de cookies e os avisos de privacidade dos formulários.
- Os endereços `/privacy-policy` e `/ethics-policy` continuam funcionando: quem chegar por link direto ou buscador vê a página atual (mesmo conteúdo, já no novo visual) em vez de erro.
- O painel abre por cima da página em que a pessoa está, sem perder o lugar da leitura nem a rolagem.
- Textos em português, inglês e espanhol seguem os mesmos de hoje; nada de conteúdo legal é reescrito.

## Detalhes técnicos

- Novo `PolicyDrawer` baseado no `Sheet` (shadcn, `side="right"`, largura `w-[92%] md:w-[40%]`), com estilo areia/coral do protótipo aprovado.
- Extrair o conteúdo das políticas de `src/pages/PrivacyPolicy.tsx` e `src/pages/EthicsPolicy.tsx` para componentes de conteúdo reutilizáveis (`PrivacyPolicyContent`, `EthicsPolicyContent`), sem alterar os textos; ajustar tipografia/tabela para o tema claro e largura estreita.
- Contexto leve (`PolicyDrawerProvider` em `App.tsx`) expondo `openPolicy('privacy' | 'ethics')`, consumido por `FooterNovo.tsx`, `CookieBanner.tsx`, `LeadGateForm.tsx` e `ArticleCTAForm.tsx` — os `Link` viram botões que abrem o painel (com `href` preservado para acessibilidade/SEO).
- Rotas `/privacy-policy` e `/ethics-policy` mantidas, renderizando as mesmas páginas com os novos componentes de conteúdo e `SEOHead` intacto.
- Espanhol: hoje o conteúdo tem apenas PT/EN — manter o fallback atual (ES usa PT), sem mudança de escopo.
