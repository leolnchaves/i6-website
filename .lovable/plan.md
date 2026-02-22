
# Indicador de Scroll Moderno na Hero

## O que sera feito

Adicionar um indicador de scroll animado e minimalista no bottom da hero, com pill container alaranjado, dot animado e texto "scroll" pulsante.

## Mudancas

### 1. `src/components/hometeste/HeroMovimento.tsx`

Adicionar antes do fechamento da `</section>` (apos o `</div>` do conteudo central) um bloco de scroll indicator:

- Container `absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2`
- Glow sutil via `shadow-[0_0_15px_rgba(244,132,95,0.15)]`
- Pill: `w-7 h-12 rounded-full border border-[#F4845F]/40` com `pt-2 flex items-start justify-center`
- Dot interno: `w-1.5 h-1.5 rounded-full bg-[#F4845F]` com classe `animate-scroll-dot-move`
- Texto "scroll": `text-[#F4845F]/50 text-[10px] tracking-[0.3em] uppercase` com classe `animate-pulse-soft`

### 2. `src/index.css`

Adicionar dois keyframes apos o bloco `popup-cycle` existente (linha ~703):

```css
@keyframes scroll-dot-move {
  0% { transform: translateY(0); opacity: 1; }
  70% { transform: translateY(20px); opacity: 1; }
  80% { transform: translateY(20px); opacity: 0; }
  81% { transform: translateY(0); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.animate-scroll-dot-move {
  animation: scroll-dot-move 2s ease-in-out infinite;
}

.animate-pulse-soft {
  animation: pulse-soft 2.5s ease-in-out infinite;
}
```

## Arquivos alterados
- `src/components/hometeste/HeroMovimento.tsx` - adicionar elemento de scroll indicator
- `src/index.css` - adicionar keyframes scroll-dot-move e pulse-soft
