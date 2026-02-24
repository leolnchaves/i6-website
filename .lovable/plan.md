
# Adicionar fundo laranja suave no hero das paginas de Politica de Privacidade e Etica

## Objetivo
Destacar a area do titulo, subtitulo e data de ultima atualizacao com um fundo laranja suave, separando visualmente essa secao do restante do conteudo nas paginas de Politica de Privacidade e Politica de Etica.

## Mudancas

### 1. `src/pages/PrivacyPolicy.tsx` (linha 209)
Trocar o fundo da secao hero de `bg-[#0B1224]` para um gradiente laranja suave:

Antes:
```html
<section className="w-full flex items-center justify-center pt-28 pb-8 relative bg-[#0B1224]">
```

Depois:
```html
<section className="w-full flex items-center justify-center pt-28 pb-8 relative bg-gradient-to-b from-[#F4845F]/15 to-[#0B1224]">
```

Isso cria um fundo laranja sutil (15% de opacidade) que faz transicao suave para o fundo escuro padrao.

### 2. `src/pages/EthicsPolicy.tsx` (linha 277)
Mesma alteracao aplicada na secao hero:

Antes:
```html
<section className="w-full flex items-center justify-center pt-28 pb-8 relative bg-[#0B1224]">
```

Depois:
```html
<section className="w-full flex items-center justify-center pt-28 pb-8 relative bg-gradient-to-b from-[#F4845F]/15 to-[#0B1224]">
```

## Resultado
Ambas as paginas terao um destaque laranja suave na area do titulo que transiciona naturalmente para o fundo escuro do conteudo, mantendo a identidade visual do site.
