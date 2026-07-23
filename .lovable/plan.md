## Alinhar imagens ao container de QUEM SOMOS

A seção "QUEM SOMOS" (`SinaisSection.tsx`) usa `container mx-auto px-6 max-w-6xl` (1152px). Vamos alinhar duas imagens a essa mesma largura, sem tocar em designs ou animações.

### Alterações

**1) `src/components/hometeste/HeroDecisaoV4.tsx`** — wrapper interno da imagem do hero:

```tsx
<div className="container mx-auto px-6 max-w-6xl h-full flex items-center justify-center">
```

**2) `src/components/hometeste/ComoFuncionamosSection.tsx`** (linha 220) — bloco da animação desktop dos 4 passos:

```tsx
<div className="hidden lg:block container mx-auto px-6 max-w-6xl">
```

Apenas a largura muda; o SVG, cards, partículas e toda a animação permanecem exatamente como estão.
