
# Redesign Radical dos CTAs da Home

## Problema
Os botoes atuais sao pills solidos com gradiente -- visualmente comuns e nao combinam com o estilo ultra-moderno do restante do site (waves, glassmorphism, glow effects).

## Nova Proposta: Botao "Outline Glow" com efeito de preenchimento animado

Inspirado na referencia enviada e no DNA visual do site, o novo design sera:

### Hero CTA ("Set Data in Motion")
- **Estado normal**: botao outline (borda coral fina, fundo transparente, texto branco)
- **Borda animada**: glow coral pulsante sutil ao redor (box-shadow animado)
- **Hover**: fundo preenche com gradiente coral (da esquerda para direita via `bg-size` transition), texto fica branco, glow intensifica
- **Seta**: aparece com slide da esquerda no hover (opacity + translate)
- **Formato**: rounded-xl (nao full pill -- mais moderno, como na referencia)

### CTA Final ("Pronto para transformar dados em lucro?")
- **Estado normal**: outline branco fino, fundo transparente, texto branco
- **Glow branco pulsante sutil**
- **Hover**: preenche com branco, texto muda para navy, glow intensifica
- **Seta**: mesma animacao de aparecimento

## Animacao CSS adicional
Adicionar um keyframe `glow-pulse` no `index.css` para o efeito de brilho pulsante nas bordas dos botoes.

## Detalhes tecnicos

### Arquivo 1: `src/index.css`
- Adicionar keyframe `glow-pulse-coral` (pulsacao de box-shadow coral)
- Adicionar keyframe `glow-pulse-white` (pulsacao de box-shadow branco)
- Adicionar classes `.animate-glow-coral` e `.animate-glow-white`

### Arquivo 2: `src/components/hometeste/HeroMovimento.tsx`
- Novo estilo do botao:
  - `rounded-xl` em vez de `rounded-full`
  - Fundo transparente com borda coral (`border-[#F4845F]/60`)
  - Texto branco
  - Glow pulsante coral via classe customizada
  - No hover: `hover:bg-[#F4845F] hover:border-[#F4845F]` (preenchimento solido)
  - Transicao suave de 500ms
  - Seta com `opacity-0 group-hover:opacity-100 group-hover:translate-x-1`

### Arquivo 3: `src/components/hometeste/CTAFinal.tsx`
- Novo estilo do botao:
  - `rounded-xl`
  - Fundo transparente com borda branca (`border-white/50`)
  - Texto branco
  - Glow pulsante branco
  - No hover: `hover:bg-white hover:text-[#0B1224]` (preenchimento solido)
  - Seta com mesma animacao de aparecimento

### Resumo visual

```text
Estado normal (Hero):
+-----------------------------+
|   Set Data in Motion        |  <- texto branco, borda coral, fundo transparente
+-----------------------------+     glow coral pulsante

Hover (Hero):
+=============================+
|   Set Data in Motion   ->   |  <- fundo coral solido, seta aparece
+=============================+     glow intenso

Estado normal (CTA Final):
+-----------------------------+
|   Ready to turn data...     |  <- texto branco, borda branca, fundo transparente
+-----------------------------+     glow branco pulsante

Hover (CTA Final):
+=============================+
|   Ready to turn data... ->  |  <- fundo branco, texto navy, seta aparece
+=============================+     glow intenso
```

### Arquivos modificados
1. `src/index.css` -- adicionar 2 keyframes + 2 classes de animacao
2. `src/components/hometeste/HeroMovimento.tsx` -- redesign completo do botao CTA
3. `src/components/hometeste/CTAFinal.tsx` -- redesign completo do botao CTA
