# 📁 Estrutura de Assets - Infinity6 Website

## 🎯 Estrutura Atual

### `src/assets/` - Assets Processados pelo Vite
Assets que passam pelo pipeline de build do Vite e são otimizados automaticamente.

```
src/assets/
├── images/          # Imagens processadas pelo Vite
│   ├── company-logo.png
│   ├── logo-header.png
│   ├── logo-footer.png
│   ├── hero-bg.jpg
│   ├── world-map.png
│   ├── solution-icon.png
│   ├── client-*.png (logos de clientes)
│   └── success-story-*.png
├── icons/           # SVGs e ícones (para futuro uso)
└── gifs/           # GIFs pequenos processados
    ├── solution-Anonymous-Visitors.gif
    ├── solucao-Identified-Users.gif
    ├── solucao-Industrial-Intelligence.gif
    ├── solucao-Predictive-Campaign.gif
    ├── solucao-Smart-Price.gif
    └── solucao-Adaptive-Demand.gif
```

### `public/` - Assets Servidos Diretamente
Assets servidos diretamente pelo servidor sem processamento.

```
public/
├── content/
│   └── logos/       # Logos para uso em Markdown/fetch
│       ├── ACHE.png
│       ├── ANIMA.png
│       ├── BMG.png
│       └── ... (outros logos)
├── lovable-uploads/ # Uploads do editor Lovable
└── *.gif           # GIFs grandes servidos diretamente
```

## ⚙️ Como Usar

### 1. Em Componentes React (ES6 Imports)
```tsx
import { PROCESSED_ASSETS } from '@/utils/assetUtils';

// Uso direto das constantes
<img src={PROCESSED_ASSETS.LOGO_HEADER} alt="Logo" />
<img src={PROCESSED_ASSETS.CLIENTS.HERING} alt="Cliente Hering" />
<img src={PROCESSED_ASSETS.SUCCESS_STORIES.STORY_1} alt="Case" />
```

### 2. Para Assets Públicos (URLs diretos)
```tsx
import { getPublicAssetPath, getLogoPath } from '@/utils/assetUtils';

// Logos em public/content/logos/
const logoUrl = getLogoPath('ACHE');
// Result: "/i6-website/content/logos/ACHE.png" (com base path para GitHub Pages)

// Qualquer asset público
const assetUrl = getPublicAssetPath('content/logos/HERING.png');
```

### 3. Em Arquivos Markdown
```markdown
![Logo ACHE](/i6-website/content/logos/ACHE.png)
![Outro Asset](/i6-website/any-public-asset.jpg)
```

## ✅ Vantagens desta Estrutura

### Assets Processados (`src/assets/`)
- ✅ **Otimização automática** pelo Vite (compressão, cache busting)
- ✅ **Tree shaking** - apenas assets usados são incluídos no bundle
- ✅ **Imports tipados** via TypeScript
- ✅ **Cache busting** automático (hashes nos nomes dos arquivos)

### Assets Públicos (`public/`)
- ✅ **URLs estáveis** para referência em Markdown/fetch
- ✅ **Compatibilidade com GitHub Pages** via `BASE_URL`
- ✅ **Carregamento sob demanda** (não incluídos no bundle inicial)
- ✅ **Fácil organização** por categorias

## 🔧 Utilitário Centralizado

O arquivo `src/utils/assetUtils.ts` centraliza todo o gerenciamento de assets:

```typescript
// Constantes tipadas para todos os assets processados
export const PROCESSED_ASSETS = {
  COMPANY_LOGO: companyLogo,
  CLIENTS: { HERING: clientHering, ... },
  SOLUTION_GIFS: [gif1, gif2, ...],
  // ...
};

// Funções utilitárias para assets públicos
export const getPublicAssetPath = (path: string) => `${BASE_URL}${path}`;
export const getLogoPath = (name: LogoName) => getPublicAssetPath(LOGOS[name]);
```

## 🚀 Deploy e Compatibilidade

### GitHub Pages
- ✅ **BASE_URL configurado** em `vite.config.ts` para `/i6-website/`
- ✅ **Paths automáticos** via `import.meta.env.BASE_URL`
- ✅ **Assets copiados** corretamente para `dist/`

### Build Process
```bash
npm run build
# Assets de src/assets/ → dist/assets/ (com hash)
# Assets de public/ → dist/ (caminhos preservados)
```

## 📋 Diretrizes

### ✅ Use Assets Processados Para:
- Imagens que fazem parte da UI (logos, ícones, backgrounds)
- Assets que precisam de otimização
- GIFs pequenos/médios
- Imagens de componentes React

### ✅ Use Assets Públicos Para:
- Imagens referenciadas em Markdown
- Assets carregados via fetch/URL
- GIFs grandes que não precisam de otimização
- Assets que precisam de URLs estáveis

### ❌ Evite:
- Caminhos relativos quebrados (`../../assets/`)
- Assets fora de `src/` ou `public/`
- Hardcoding de URLs sem `BASE_URL`
- Imports diretos quando há utilitário centralizado