## 3 variações do novo Hero com o diagrama "Decisão" (apenas PT)

Cada variação ganha rota própria pra você comparar lado a lado sem tocar na home atual. Todas usam **exatamente o mesmo copy e CTA** do hero atual em PT — muda só a forma como o diagrama entra em cena.

### Rotas
- `/pt/home-v1` — Split lateral
- `/pt/home-v2` — Diagrama ambiente ao fundo
- `/pt/home-v3` — Diagrama como "assinatura" abaixo do copy

Cada rota renderiza uma página que clona `HomeTeste.tsx` trocando **só** o `<HeroMovimento />` pela variação correspondente. Header, footer e demais seções ficam idênticos.

### Asset (compartilhado pelas 3)
- Upload de `/mnt/user-uploads/image-224.png` via `lovable-assets` → `src/assets/hero-decisao.png.asset.json`.
- Imagem usada como está (fundo já é navy, casa com `#0B1224`). Sem edição AI, sem recolorir.

### Variação 1 — Split lateral (`HeroDecisaoV1.tsx`)
```text
┌───────────────────────────────────┐
│ [copy + CTA]     [diagrama]       │
│  esquerda        direita ~50%     │
└───────────────────────────────────┘
```
- Grid `lg:grid-cols-[1fr_1fr]`, gap grande.
- Copy alinhado à esquerda no desktop, centralizado no mobile.
- Diagrama: `object-contain`, `max-h-[75vh]`, `opacity: 0.92`, máscara radial suave nas bordas pra dissolver no navy.
- Mobile: diagrama vira faixa abaixo do copy, altura reduzida (`max-h-[40vh]`).

### Variação 2 — Diagrama ambiente ao fundo (`HeroDecisaoV2.tsx`)
```text
┌───────────────────────────────────┐
│      [diagrama full-bleed]        │
│       [copy centralizado]         │
│            [CTA]                  │
└───────────────────────────────────┘
```
- Diagrama `absolute inset-0`, `object-cover`, `opacity: 0.28`, máscara radial pra reforçar o centro escuro.
- Overlay adicional `bg-[#0B1224]/40` só atrás do bloco de texto (via `radial-gradient` central) pra garantir contraste sem "caixa".
- Copy centralizado (mesmo layout do hero atual, mas sem as ondas coral).
- Sensação: o diagrama envolve, o copy fica no ponto focal.

### Variação 3 — Assinatura abaixo do copy (`HeroDecisaoV3.tsx`)
```text
┌───────────────────────────────────┐
│         [copy centralizado]       │
│              [CTA]                │
│                                   │
│   [diagrama em faixa horizontal]  │
└───────────────────────────────────┘
```
- Copy + CTA no topo (mesma composição do hero atual), centralizado.
- Diagrama entra como **faixa horizontal** ocupando ~35–40% da altura da tela, ancorado no bottom.
- `object-contain`, `max-h-[38vh]`, `opacity: 0.85`, máscara linear que dissolve as laterais e a parte de cima no navy — parece "assinatura visual" que fecha o hero.
- Scroll indicator do hero atual removido nessa variação (o próprio diagrama guia o olho pra baixo).

### Regras comuns às 3
- Fundo `#0B1224` preservado, sem `mix-blend-mode`.
- Copy PT idêntico ao hero atual: título "Decida antes do mercado" (com "antes" coral), sub coral "The Platform for Decision Advantage" (glow em "Decision Advantage"), descrição atual, CTA "Antecipe sua próxima decisão. Agora."
- Sem `MotionVerticalRain` e sem as ondas coral do hero atual — o diagrama é o único elemento gráfico.
- Sem animação nas linhas do diagrama (imagem estática); só fade-in sutil ao carregar.
- SEO (`<SEOHead page="home" />`) mantido.

### Arquivos
- Novos: `src/pages/HomeV1.tsx`, `src/pages/HomeV2.tsx`, `src/pages/HomeV3.tsx`, `src/components/hometeste/HeroDecisaoV1.tsx`, `HeroDecisaoV2.tsx`, `HeroDecisaoV3.tsx`, `src/assets/hero-decisao.png.asset.json`.
- Editar `src/App.tsx` para registrar as 3 rotas em PT.

### Fora de escopo
- Nada em EN.
- `HeroMovimento.tsx` e as rotas atuais (`/`, `/pt`, `/en`) intocadas.
- Sem release/publicação — decisão da variação vencedora fica pra depois da sua análise.
