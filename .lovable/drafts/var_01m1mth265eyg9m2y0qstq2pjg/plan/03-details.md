## Detalhes técnicos

### Arquivo alterado
1. `src/components/comunidade/CommunityOpening.tsx`
   - Remover a linha vertical decorativa (`<span className="absolute left-[52%] top-[38%] h-24 w-px bg-primary/40" />`) que aparece à direita do título, dentro da colagem decorativa `lg+`.
   - Manter intacta a linha horizontal arredondada abaixo de `titleAccent` (span `text-primary`), pois ela não é o problema relatado.

### O que NÃO muda
- Textos do título (`titleTop`, `titleAccent`, `titleBottom`) em nenhum idioma.
- Tipografia, tamanho, cor e posicionamento do título.
- Colagem de imagens e cartões de código ao redor.
- CTAs, eyebrow e scroll hint.

### Validação
- `bunx tsgo --noEmit -p tsconfig.app.json`
- `bun run build`
- Verificação visual em PT, EN, ES, desktop e mobile para confirmar que a marca vertical desapareceu e o título continua alinhado.
