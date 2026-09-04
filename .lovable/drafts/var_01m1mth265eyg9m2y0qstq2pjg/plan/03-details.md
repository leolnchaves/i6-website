## Detalhes técnicos

### Identificação do elemento
O elemento selecionado é a `<img>` do 5º bloco do mural (`src/components/comunidade/CommunityMural.tsx:45`), que corresponde ao arquétipo de índice 4 ("Pricing e revenue"). O lookup atual é `MURAL_IMAGES[i % MURAL_IMAGES.length]`; com 4 itens, o índice 4 resolve para `MURAL_IMAGES[0]` — a mesma foto do mural de forecasting.

### 1. Nova imagem
- Publicar a foto anexa em `public/images/comunidade/mural-team.jpg` (mesmo diretório e convenção das outras fotos do mural).

### 2. Suporte a enquadramento no tipo `MuralImage`
- Em `src/data/comunidade/placeholders.ts`, adicionar campo opcional `objectPosition?: string` à interface `MuralImage`.
- Adicionar a entrada `m5` com `src` da nova foto, `tilt` igual ao valor hoje aplicado nesse slot (`-2`, herdado de `m1`), e `objectPosition: 'center 22%'` para puxar o recorte para cima e manter os rostos inteiros.

### 3. Mapeamento explícito por slot
- Em `CommunityMural.tsx`, substituir `MURAL_IMAGES[i % MURAL_IMAGES.length]` por um mapa explícito índice → imagem que **preserva as atribuições atuais** e só troca o slot 4:
  - slot 1 → `m2` (mantido)
  - slot 4 → `m5` (novo)
  - slot 7 → `m4` (mantido)
- A imagem extra do slot 0 continua usando `MURAL_IMAGES[0]` sem alteração.
- Aplicar `style={{ objectPosition: img.objectPosition }}` junto do `transform` já existente, tanto na colagem `md+` quanto na pilha mobile.

### O que NÃO muda
- Classes de recorte (`h-40`, `w-full`, `rounded-[1.75rem]`, `object-cover`, `opacity-75`, `ring-1 ring-border`), rotação, offsets do grid, spans e ordem dos blocos.
- Nenhuma outra entrada de `MURAL_IMAGES`, nenhum texto, nenhuma outra seção.

### Validação
1. `bunx tsgo --noEmit -p tsconfig.app.json`
2. `bun run build`
3. Verificação visual em PT, EN e ES, desktop e mobile, confirmando que os rostos aparecem inteiros no recorte e que os demais blocos do mural estão idênticos.