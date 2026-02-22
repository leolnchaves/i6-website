

# Ajustes na Hero - Centralizar texto e clarear curvas

## Mudancas

### 1. Centralizar texto e CTA (`HeroMovimento.tsx`)
- Remover `FlowingParticles` (import e uso)
- Remover `lg:text-left`, `lg:ml-[40%]`, `lg:mr-12` do container de texto
- Manter `text-center` e `mx-auto` para centralizar em todas as telas
- Adicionar `lg:mx-auto` para garantir centralizacao em desktop tambem

### 2. Clarear curvas com tom sobre tom (`WaveBackground.tsx`)
Aumentar opacidades das curvas mantendo variacao entre elas:
- Curvas coral: subir de 0.07-0.22 para 0.18-0.40 (tons variados de laranja)
- Curvas brancas: subir de 0.05-0.15 para 0.12-0.25 (tons claros, peach/salmon)
- Manter cada curva com intensidade diferente para efeito tom sobre tom

Mapa de cores atualizado:
- Curva 1: `rgba(244,132,95, 0.25)` - coral medio
- Curva 2: `rgba(255,180,140, 0.18)` - peach claro
- Curva 3: `rgba(244,132,95, 0.35)` - coral forte
- Curva 4: `rgba(255,160,110, 0.14)` - salmon claro
- Curva 5: `rgba(232,118,74, 0.20)` - laranja escuro
- Curva 6: `rgba(255,200,170, 0.22)` - peach bem claro
- Curva 7: `rgba(244,132,95, 0.15)` - coral suave
- Curva 8: `rgba(255,170,130, 0.18)` - salmon medio
- Curva 9: `rgba(244,132,95, 0.40)` - coral mais forte
- Curva 10: `rgba(255,190,155, 0.12)` - peach sutil

## Arquivos alterados
- `src/components/hometeste/HeroMovimento.tsx` - centralizar + remover particulas
- `src/components/hometeste/WaveBackground.tsx` - clarear cores das curvas

