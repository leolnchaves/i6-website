# Nova listagem do blog (/i6-blog)

A página sai do fundo escuro único e passa a ter o mesmo ritmo editorial do resto do site novo: base areia clara, uma faixa grafite no meio e tipografia grande usada como elemento gráfico. O conteúdo continua vindo exatamente da mesma fonte de hoje (frontmatter do i6 HUB), com os mesmos filtros de tema e tag funcionando igual.

## Conceito de composição

1. **Abertura tipográfica assimétrica** (fundo areia)
   Título grande em duas linhas ocupando ~7 colunas de 12, com um bloco de apoio deslocado à direita e mais abaixo: subtítulo curto + contagem real de artigos. Sem imagem nessa faixa — a tipografia é o gráfico.

2. **Destaque editorial** (ainda em areia, colado à abertura)
   O post em destaque (`is_default`, senão o mais recente) ganha tratamento grande e assimétrico: imagem de capa alta à direita sangrando até a borda da tela, título gigante à esquerda sobrepondo levemente a imagem, e um **cartão flutuante branco** ancorado no canto inferior da imagem com metadados reais do post: tema, data e tempo de leitura. Nada inventado — se um campo não existir no frontmatter, ele simplesmente não aparece.

3. **Quebra de seção não retangular**
   Entre o destaque e a listagem, uma borda diagonal suave (clip-path leve, ~3–4% de inclinação) faz a transição de areia para a faixa grafite. Mesma linguagem já usada em /i6-builders, sem degradê pesado.

4. **Faixa grafite: recentes em régua horizontal**
   Os 5 mais recentes (excluindo o destaque) aparecem como uma régua numerada — número grande em terracota, título, tema e data — em linhas separadas por filete fino. Sem cartões, sem imagens: contraste proposital com o destaque acima.

5. **Volta ao areia: filtro + grade**
   O filtro é redesenhado como barra: temas como abas de sublinhado terracota (não pílulas) e tags como chips discretos numa segunda linha, com contagem de resultados. Abaixo, grade de cartões assimétrica: a cada bloco de cinco, o primeiro cartão ocupa duas colunas com imagem maior, os outros quatro ficam em formato compacto. Agrupamento por tema é preservado, com o nome do tema como cabeçalho tipográfico grande e discreto.

6. **Fecho**: estado vazio tratado no mesmo tom, e nenhuma alteração de rodapé/cabeçalho além de registrar /i6-blog como rota de tema claro no cabeçalho.
