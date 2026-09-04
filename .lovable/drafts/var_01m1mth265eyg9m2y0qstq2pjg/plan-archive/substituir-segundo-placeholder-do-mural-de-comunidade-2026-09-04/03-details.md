## Detalhes técnicos

### Arquivos alterados
1. `src/data/comunidade/placeholders.ts`
   - `MURAL_IMAGES[1].src` passa de `PLACEHOLDER` para `getPublicAssetUrl('/images/comunidade/mural-recommendation.jpg')`.
   - Mantidos: `tilt: 2`, `ratio: 'wide'`, `offset: 'down'`.

2. `public/images/comunidade/mural-recommendation.jpg`
   - Foto anexa copiada para a pasta pública, seguindo o mesmo padrão das outras imagens da página.

### O que NÃO muda
- `src/components/comunidade/CommunityMural.tsx`: recorte (`h-40 w-full`), rotação inline, opacidade 0.75, bordas arredondadas e comportamento mobile permanecem iguais.
- Demais imagens de `MURAL_IMAGES` e todos os outros componentes da página.

### Validação
- `bunx tsgo --noEmit -p tsconfig.app.json`
- `bun run build`
- Verificação visual em PT, EN, ES, desktop e mobile na seção "Um mural de gente que constrói".
