## Cabeçalho e rodapé iguais ao resto do site

O topo e o rodapé já são os mesmos do site inteiro; o que muda é o comportamento. Hoje o topo só fica com fundo escuro fixo na página inicial, e nas outras entra transparente — nesta página, sobre um fundo claro, isso o deixa com aparência diferente.

- O topo passa a entrar já com o fundo escuro nesta página, exatamente como na inicial.
- O fim da página vira um bloco escuro que emenda no rodapé, eliminando o corte seco entre o claro e o escuro.

## Identidade visual

Mesma paleta e mesmas fontes da página inicial: areia, grafite quente, um único acento terracota por seção. Sem sombras fortes, sem gradientes novos, sem animação chamativa — só entradas suaves ao rolar e o deslizar do carrossel.

## Detalhes técnicos

- Reescrever os oito componentes em `src/components/i6-builders/` com a nova forma de cada seção; `src/data/i6Builders/content.ts` e `placeholders.ts` permanecem intactos, apenas ganhando os campos de texto que as novas formas exigirem (rótulos do percurso, trecho de código da abertura), sempre nos três idiomas.
- `HeaderNovo.tsx`: incluir a rota `i6-builders` na condição que aplica fundo sólido, com uma regra baseada em página de tema claro em vez de uma lista fixa de caminhos.
- `I6Builders.tsx`: envolver fecho e formulário numa faixa escura para a transição até o rodapé.
- Sem mudança de rota, SEO, formulário de captura ou envio de leads.
- Verificação: build, checagem de tipos e capturas de tela em `/pt`, `/en` e `/es`, além de largura de celular.
