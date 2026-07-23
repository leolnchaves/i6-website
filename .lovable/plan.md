Adicionar Camil, MDS Group e Skyfit ao carrossel de logos da Home (`ClientesSection`).

## Contexto
- Componente: `src/components/hometeste/ClientesSection.tsx` renderiza um marquee com `h-8 sm:h-10 max-w-[120px] object-contain`.
- Fonte de dados: `public/content/partners-logos.md`, com PNGs em `public/content/logos/`.
- Logos existentes já vêm recortadas próximo do conteúdo, para que o `object-contain` produza tamanho visual consistente.

## Problema das 3 uploads
- `camil-logo.png`: horizontal, aspect ~3.4:1 — encaixa bem, apenas trim de margens.
- `logo_mds_group_vertical_t_cores.png`: quase quadrado com muito espaço branco em volta; sem trim ficaria minúsculo dentro do `max-w-[120px]`.
- `skyfit-logo-wordmark.png`: quadrado 1:1 (shield + wordmark); com `h-10` ficaria com ~40px de largura visual (ok), mas ainda tem padding branco a aparar.

## Passos

1. Copiar os 3 uploads do mount `/mnt/user-uploads/` para `/tmp/` e usar Python (Pillow) para:
   - Aparar (trim) o fundo branco em volta de cada logo.
   - Salvar como PNG otimizado em `public/content/logos/`:
     - `camil.png`
     - `mds-group.png`
     - `skyfit.png`
   - Meta de altura interna consistente (~200px de conteúdo) para casar com o peso visual das logos existentes.

2. Atualizar `public/content/partners-logos.md` adicionando 3 novos blocos ao final:
   ```
   ## CAMIL
   **Logo:** /content/logos/camil.png
   **Name:** Camil

   ## MDS GROUP
   **Logo:** /content/logos/mds-group.png
   **Name:** MDS Group

   ## SKYFIT
   **Logo:** /content/logos/skyfit.png
   **Name:** Skyfit
   ```

3. Nenhuma alteração em `ClientesSection.tsx` — o marquee já duplica automaticamente e as classes `h-10 max-w-[120px] object-contain` cuidam do enquadramento após o trim.

## Verificação
- Playwright em `/en` (viewport desktop), screenshot da seção "Leaders who turn anticipation into advantage" confirmando que Camil, MDS Group e Skyfit aparecem no marquee com peso visual semelhante às demais.
