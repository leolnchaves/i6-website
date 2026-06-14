## Diagnóstico

O carrossel funciona no preview Lovable, mas **todos os arquivos** de `public/content/logos/*.png` retornam **404 em infinity6.ai** (testei 11 nomes — todos 404, inclusive `EMS-COR.png` usado em success stories). O markdown `partners-logos.md` (mesmo diretório pai) é servido normalmente. Sitemap `lastmod: 2026-06-14` confirma que o deploy GH Pages está fresco — então o problema **não é cache nem deploy travado**: os arquivos saem do dist.

A causa está em `scripts/sync-content-from-i6hub.mjs` (rodado no workflow `.github/workflows/deploy-gh-pages.yml`, step "Sync stories from i6Hub CMS"):

```js
// linhas 366-381
async function cleanupOrphans(dir, keepSet, label) {
  const onDisk = await fs.readdir(dir).catch(() => []);
  for (const name of onDisk) {
    if (!/\.(jpe?g|png|webp|svg)$/i.test(name)) continue;
    if (keepSet.has(name)) continue;
    await fs.rm(path.join(dir, name), { force: true });
    ...
  }
}
...
const removedLogos = await cleanupOrphans(LOGO_DIR, keepLogo, 'logo');
```

`LOGO_DIR = 'public/content/logos'` e `keepLogo` só contém os arquivos materializados pelo feed de stories (nomeados `${slug}-logo.{ext}`). Logo:

- Todos os logos de parceiros (`ems-new.png`, `multi.png`, `biolab.png`, `bmg-new.png`, `unicred.png`, `germed-new.png`, `legrand-new.png`, `alpargatas-new.png`) e os logos clássicos (`EMS-COR.png`, `EMS.png`, `ACHE.png`, etc. — 29 arquivos versionados em git) são considerados "orphan" e **deletados a cada build** antes do `npm run build`.
- O markdown `partners-logos.md` aponta para esses arquivos → no site publicado, os `<img>` quebram (404).
- Localmente e no preview Lovable o script não roda, por isso o carrossel funciona lá.

## Correção

Limitar `cleanupOrphans` aos arquivos cujo nome segue o padrão produzido pelo próprio sync (`*-logo.{ext}`). Assim:

- Logos de stories continuam rotacionando corretamente (novos cases sobrescrevem, slugs removidos são limpos).
- Logos de parceiros e logos legados versionados em git ficam intactos.

### Mudança em `scripts/sync-content-from-i6hub.mjs`

Em `cleanupOrphans`, adicionar filtro por sufixo `-logo.` quando `label === 'logo'`:

```js
async function cleanupOrphans(dir, keepSet, label) {
  if (!dir) return 0;
  let removed = 0;
  const onDisk = await fs.readdir(dir).catch(() => []);
  for (const name of onDisk) {
    if (!/\.(jpe?g|png|webp|svg)$/i.test(name)) continue;
    // Só remover arquivos que o sync produziu (padrão `${slug}-logo.ext`).
    // Não tocar em logos de parceiros / legados versionados em git.
    if (label === 'logo' && !/-logo\.(jpe?g|png|webp|svg)$/i.test(name)) continue;
    if (keepSet.has(name)) continue;
    await fs.rm(path.join(dir, name), { force: true });
    removed++;
    console.log(`[cleanup ${label}] removed orphan ${name}`);
  }
  return removed;
}
```

Nenhum outro arquivo precisa mudar. Os PNGs dos parceiros já estão em git e voltarão ao dist no próximo deploy.

## Verificação após implementação

1. Após push no `main`, esperar o workflow "Deploy to GitHub Pages" concluir.
2. `curl -I https://infinity6.ai/content/logos/ems-new.png` deve retornar **200**.
3. Abrir `https://infinity6.ai/pt` e conferir o carrossel "Líderes que já dominam a Inteligência de Movimento".

## Fora do escopo

- Não vou mexer no `ClientesSection.tsx`, `usePartnersContent.ts` nem no markdown — eles estão corretos.
- Não vou mover logos para outro diretório nem renomear arquivos.
