

# Ajustes na Secao Sinais - Reordenacao e Popups

## Mudancas

### 1. Reordenar layout em `SinaisSection.tsx`

Mover os 6 cards de sinais para logo abaixo do titulo e subtitulo, antes do bloco de capabilities + GIF. A ordem final sera:
- Badge
- Titulo + Subtitulo
- 6 cards em grid (2 colunas desktop, 1 mobile)
- Capabilities (esquerda) + GIF com popups (direita)

### 2. GIF maior

Remover `max-w-md` do GIF e usar `max-w-lg` ou `max-w-xl` para que o conteudo seja legivel.

### 3. Corrigir popups

- Remover `whitespace-nowrap` para que o texto quebre dentro da borda
- Aumentar `maxWidth` dos popups para `240px`-`280px`
- Reposicionar popups para ficarem mais sobre o GIF (valores de right/left menos extremos, contidos dentro do container)
- Usar `right: 0` ou valores positivos pequenos ao inves de negativos grandes, para nao ultrapassar a tela
- Aumentar o ciclo da animacao de `10s` para `20s` com delays maiores (`i * 2.5s`) para dar tempo de leitura
- Adicionar rotacoes sutis variadas (`rotate(-2deg)`, `rotate(1deg)`) para parecerem "pensamentos soltos"
- Reduzir para ~6-7 popups visiveis por vez (menos sobreposicao)
- Aumentar `padding` e `font-size` dos popups (`px-4 py-2.5`, `text-xs`)

### 4. Posicoes dos popups (contidas)

Novas posicoes relativas ao container do GIF, todas contidas dentro ou nas bordas:
- Posicoes na parte superior, meio e inferior do GIF
- Valores de `right` e `left` entre `-15%` e `80%` (nunca ultrapassando o container pai)
- Usar `overflow-visible` no container mas garantir que o container pai tem `overflow-hidden` ou que os popups ficam dentro dos limites

## Arquivos alterados
- `src/components/hometeste/SinaisSection.tsx` - reordenar cards, aumentar GIF, corrigir popups
