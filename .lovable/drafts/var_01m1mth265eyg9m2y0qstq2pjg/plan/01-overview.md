# Área de documentação com menu lateral

Criar uma área de documentação nova em `/pt/docs`, `/en/docs` e `/es/docs` (slug não traduzido, mesmo padrão de `/i6-builders` e `/comunidade`), com três colunas: menu de navegação à esquerda, o texto no centro e o índice da própria página à direita.

O conteúdo vem dos mesmos arquivos publicados pelo i6 HUB, num novo tipo `docs`, então publicar documentação passa a ser só publicar no HUB — sem mexer em nada do que já existe hoje.

## O que o usuário vê

- `/pt/docs` abre a primeira página de documentação, com o menu lateral já aberto.
- O menu agrupa as páginas por seção (ex.: Introdução, SDK, API, Guias), destaca onde você está e pode ser recolhido; no celular ele vira um painel que abre por um botão.
- Um campo de busca no topo do menu filtra as páginas por título enquanto se digita.
- À direita, o índice da página lista os títulos do texto e acompanha a rolagem; clicar leva à seção. Em telas menores esse índice simplesmente não aparece — a navegação secundária fica sendo só o menu lateral que abre por botão, sem nenhum terceiro mecanismo.
- No fim de cada página, links "anterior / próxima" seguindo a ordem do menu.
- Cabeçalho e rodapé idênticos ao resto do site, no tema claro (mesma regra já usada em `/i6-builders` e `/comunidade`).
- Enquanto o HUB não publicar a documentação real, cada página de exemplo mostra um aviso no topo do conteúdo, nos 3 idiomas ("Conteúdo de exemplo — estrutura final, referência técnica real em preparação"). O aviso vem de uma marca no próprio arquivo de exemplo, então desaparece sozinho quando a página real do HUB substituir aquele arquivo.
- Sem números, nomes ou empresas inventados nos exemplos.

