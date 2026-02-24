
# Redesign dos Botoes CTA da Home

## Objetivo
Substituir os botoes CTA atuais (estilo pill simples) por um design glassmorphico, moderno e fluido, inspirado na referencia enviada -- botoes com sombra suave, backdrop blur, bordas translucidas e micro-animacoes elegantes.

## Botoes afetados (apenas Home)

1. **Hero CTA** (`HeroMovimento.tsx`) -- "Colocar Dados em Movimento"
2. **CTA Final** (`CTAFinal.tsx`) -- "Pronto para transformar dados em lucro?"

## Novo estilo visual

- Fundo: glassmorphism (bg semi-translucido com backdrop-blur)
- Borda: sutil, branca translucida (border-white/20)
- Sombra: multi-camada suave com glow coral sutil
- Texto: peso semibold, tamanho confortavel
- Hover: escala sutil (1.03), glow mais intenso, borda coral
- Formato: pill (rounded-full) mantido, mas com profundidade visual
- Transicao: suave (duration-500, ease-out)
- Icone: seta animada no hover (desliza para direita)

### Hero CTA (fundo escuro)
- Fundo: gradiente coral (`from-[#F4845F] to-[#E8764A]`) com overlay glassmorphico
- Sombra glow coral ao redor
- Hover: intensifica glow + leve elevacao
- Seta com animacao `group-hover:translate-x-1`

### CTA Final (fundo gradiente coral)
- Fundo: branco com leve transparencia (bg-white/95 backdrop-blur)
- Texto: navy (#0B1224)
- Sombra suave branca
- Hover: bg-white total, glow branco, escala 1.03
- Seta com animacao `group-hover:translate-x-1`

## Detalhes tecnicos

### Arquivo 1: `src/components/hometeste/HeroMovimento.tsx`
- Trocar o `<Link>` CTA por um com classes glassmorphicas
- Adicionar `ArrowRight` do lucide-react como icone
- Adicionar classe `group` no link para animar a seta no hover
- Novo estilo:
  ```
  className="group inline-flex items-center gap-2 mt-10 px-8 py-4
    bg-gradient-to-r from-[#F4845F] to-[#E8764A]
    text-white font-semibold rounded-full
    shadow-[0_0_20px_rgba(244,132,95,0.3),0_4px_15px_rgba(0,0,0,0.2)]
    border border-white/20
    backdrop-blur-sm
    transition-all duration-500 ease-out
    hover:shadow-[0_0_35px_rgba(244,132,95,0.5),0_8px_25px_rgba(0,0,0,0.3)]
    hover:scale-[1.03] hover:border-white/40"
  ```

### Arquivo 2: `src/components/hometeste/CTAFinal.tsx`
- Trocar o `<Link>` CTA por um com classes glassmorphicas
- Adicionar `ArrowRight` do lucide-react como icone
- Adicionar classe `group` no link para animar a seta no hover
- Novo estilo:
  ```
  className="group inline-flex items-center gap-2 mt-10 px-8 py-4
    bg-white/90 backdrop-blur-md
    text-[#0B1224] font-semibold rounded-full
    shadow-[0_0_20px_rgba(255,255,255,0.15),0_4px_15px_rgba(0,0,0,0.1)]
    border border-white/40
    transition-all duration-500 ease-out
    hover:bg-white hover:scale-[1.03]
    hover:shadow-[0_0_35px_rgba(255,255,255,0.25),0_8px_25px_rgba(0,0,0,0.15)]
    hover:border-white/60"
  ```

Nenhum outro arquivo sera alterado. As demais paginas manterao seus CTAs atuais.
