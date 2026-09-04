# Detalhes técnicos

## Arquivos alterados

1. `public/images/comunidade/mural-whiteboard.jpg`
   - Copiar a foto anexa (`seedream-5.0-pro_Raw_unedited_phone_photo_a_person_at_a_glass_whiteboard_with_handwritten_math_no-0_1.jpg`) para essa pasta.
   - A foto mostra uma pessoa ao lado de um quadro branco de vidro com anotações matemáticas; combina com o tema de modelagem/decisão da comunidade.

2. `src/data/comunidade/placeholders.ts`
   - Alterar apenas `MURAL_IMAGES[3].src` de `PLACEHOLDER` para `getPublicAssetUrl('/images/comunidade/mural-whiteboard.jpg')`.
   - Manter `tilt: 3`, `ratio: 'tall'`, `offset: 'down'` e `id: 'm4'`.
   - O componente `CommunityMural.tsx` aplica o recorte (`h-40 w-full rounded-[1.75rem] object-cover`) e a rotação embutida; nenhuma mudança de layout.

## O que NÃO muda

- `CommunityMural.tsx` — recorte, posicionamento, rotação e responsividade intactos.
- Demais imagens de `MURAL_IMAGES`, `OPENING_IMAGES` e `OPENING_CODE_CARDS`.
- Textos, traduções e CTAs da página.

## Validação

- `bunx tsgo --noEmit -p tsconfig.app.json`
- `bun run build`
- Verificação visual via Playwright em `/pt/comunidade`, `/en/comunidade`, `/es/comunidade`, desktop e mobile.
- Confirmar que a nova imagem carrega sem overflow e sem erros de console.