

# Redesign da Secao Resultados - Ordem e Cards Modernos

## Mudancas

### 1. Reordenar em `src/pages/HomeTeste.tsx`

Mover `ResultadosSection` para antes de `ClientesSection`. A ordem ficara:

```text
HeroMovimento
TeseSection
SinaisSection
ResultadosSection   <-- movido para cima
ClientesSection
CTAFinal
```

### 2. Redesign completo dos cards em `src/components/hometeste/ResultadosSection.tsx`

Substituir os cards retangulares por cards com visual mais organico e dinamico:

- **Fundo da secao**: Manter dark `bg-[#0B1224]` para continuidade
- **Titulo**: Branco, centralizado
- **Cards com rotacoes sutis variadas**: Cada card tera uma rotacao CSS diferente (`-1.5deg`, `1deg`, `-0.5deg`, `1.5deg`) criando sensacao de "jogados sobre a mesa"
- **Hover**: No hover, card volta para `rotate(0)` com `scale(1.03)` e sombra alaranjada sutil
- **Bordas**: `rounded-3xl` com borda esquerda coral (`border-l-4 border-[#F4845F]`)
- **Fundo dos cards**: Gradiente sutil `from-[#0F172A] to-[#162038]`
- **Glow**: `shadow-[0_0_30px_rgba(244,132,95,0.06)]`
- **Segment badge**: Pill arredondado `bg-[#F4845F]/10 text-[#F4845F] rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]`
- **Metricas**: Numero/valor em `text-base font-bold text-[#F4845F]`, restante do texto em `text-white/60 text-sm` abaixo, separados por `border-b border-white/5`
- **Container**: `overflow-visible` com `items-start` para permitir rotacoes sem corte

### Detalhes tecnicos

Em `ResultadosSection.tsx`:
- Adicionar array de rotacoes `['-1.5deg', '1deg', '-0.5deg', '1.5deg']`
- Cada card usa `style={{ transform: rotate(...) }}` com `transition-all duration-300`
- Hover via group/hover com `hover:rotate-0 hover:scale-[1.03]`
- Grid `lg:grid-cols-4` com `gap-8` e `items-start`

## Arquivos alterados
- `src/pages/HomeTeste.tsx` - reordenar ResultadosSection antes de ClientesSection
- `src/components/hometeste/ResultadosSection.tsx` - redesign completo dos cards com rotacoes e visual moderno
