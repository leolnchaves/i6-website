## Detalhes técnicos

### Arquivo alterado
1. `src/components/comunidade/CommunityOpening.tsx`
   - Remover o `<span>` decorativo com `aria-hidden` que renderiza a linha/bola arredondada laranja abaixo do `titleAccent` (linhas 69–72 atuais).
   - Manter o `relative inline-block` no wrapper se ainda for necessário para outras razões; se não houver mais nenhum filho absoluto, o `relative` pode ser removido junto.

### O que NÃO muda
- Textos do título (`titleTop`, `titleAccent`, `titleBottom`) em nenhum idioma.
- Tipografia, tamanho, cor e posicionamento do título.
- Colagem de imagens e cartões de código ao redor.
- CTAs, eyebrow e scroll hint.

### Validação
- `bunx tsgo --noEmit -p tsconfig.app.json`
- `bun run build`
- Verificação visual em PT, EN, ES, desktop e mobile para confirmar que a marca desapareceu e o título continua alinhado.
