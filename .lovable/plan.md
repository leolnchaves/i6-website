# Corrigir a integração do vídeo no hero

## Objetivo
Eliminar o retângulo escuro perceptível ao redor do vídeo na home em português, mantendo a arte nítida e recuperando o véu sutil que reduz a intensidade das cores.

## Implementação
- Ajustar a composição do vídeo com o navy do hero para que os pixels quase pretos do arquivo sejam absorvidos pelo fundo, em vez de formarem uma área retangular.
- Refinar a máscara de borda para dissolver gradualmente os quatro lados sem apagar o conteúdo principal da animação.
- Restaurar uma camada navy fina, sem `blur`, limitada à mesma máscara do vídeo para reduzir brilho e saturação sem prejudicar a leitura dos textos.
- Preservar o tamanho e o posicionamento mais compactos já definidos para evitar sobreposição em telas menores.

## Validação
- Conferir a home em português no viewport atual e em uma altura menor.
- Verificar visualmente que não há bordas retas ou mudança de tom entre vídeo e fundo.
- Confirmar que o vídeo continua visível, com cores moderadas, textos nítidos e sem invasão do título ou da descrição.

## Detalhes técnicos
A correção ficará isolada em `HeroDecisaoV4.tsx`, usando máscara gradual, composição de cor e overlay plano sem desfoque. A versão em inglês não será alterada.