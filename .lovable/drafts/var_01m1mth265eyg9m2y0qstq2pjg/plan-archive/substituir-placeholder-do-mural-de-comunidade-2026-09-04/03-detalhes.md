## Detalhes técnicos

- As cinco fotos sobem para o CDN via `lovable-assets create` a partir de `/mnt/user-uploads/`, gerando ponteiros `.asset.json` em `src/assets/comunidade/` — nenhum binário entra no repositório.
- Só `src/data/comunidade/placeholders.ts` muda: cada item de `OPENING_IMAGES` troca `src: PLACEHOLDER` pela URL do ponteiro correspondente e recebe um `alt` descritivo por foto. `tilt`, `place`, `ratio` e `opacity` ficam iguais, exceto a opacidade do item 5, que baixa um pouco para manter o papel de camada de fundo.
- `MURAL_IMAGES`, `EVENT_IMAGE` e `OPENING_CODE_CARDS` seguem intactos (mural e eventos continuam com imagem provisória).
- `CommunityOpening.tsx` já usa `object-cover`, então os recortes horizontais e quadrados enquadram as fotos verticais sem distorção; se o `alt` ainda não for lido do dado, adiciono o campo à interface `OpeningImage` e passo no `img`.
- Ao final: build, checagem de tipos e verificação visual em PT/EN/ES, desktop e celular.
