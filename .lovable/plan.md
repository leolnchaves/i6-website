## Problema

No mini card de "Cases relacionados", quando `clientAnon = true`, a logo da infinity6 aparece quebrada (ícone de imagem partida).

**Causa raiz:** `src/assets/images/i6-symbol-white.png` (importado por `RelatedStoryMiniCard.tsx`) tem **0 bytes** — o arquivo foi criado vazio em algum momento, então o `<img>` renderiza quebrado.

## Correção

Trocar a fonte da logo da infinity6 para um asset que já existe e é usado em outras partes do site:
`public/content/logos/infinity6_CMYK_color_symbol_72dpi.png`

### Mudanças em `src/components/landings/RelatedStoryMiniCard.tsx`

1. Remover o import quebrado:
   ```ts
   import i6Logo from '@/assets/images/i6-symbol-white.png';
   ```
2. Usar o helper já existente do projeto:
   ```ts
   import { getPublicAssetUrl } from '@/utils/assetUtils';
   const i6Logo = getPublicAssetUrl('content/logos/infinity6_CMYK_color_symbol_72dpi.png');
   ```
3. Manter o `alt="infinity6"` e o tamanho atual (`max-h-10 max-w-[120px] object-contain`). A logo CMYK colorida renderiza bem sobre o fundo escuro do card.

### Limpeza

Remover o arquivo vazio `src/assets/images/i6-symbol-white.png` (0 bytes, sem nenhuma outra referência no código).

## Verificação

- `tsc --noEmit` para garantir que o import novo compila.
- Recarregar `/pt/solutions/demand-supply-efficiency` e confirmar que a logo da infinity6 aparece corretamente nos mini cards anônimos.
