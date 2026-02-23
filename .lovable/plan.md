
# Animar o indicador "Scroll through content"

O objetivo e tornar o indicador de scroll mais visivel e envolvente, com animacoes que chamem a atencao do usuario.

## Mudancas planejadas

### 1. Adicionar animacao pulsante ao container (I6SignalDemo.tsx)

Substituir a aparencia estatica do indicador por uma combinacao de animacoes:

- **Pulse/glow**: o container tera um efeito de brilho pulsante (shadow laranja que aumenta e diminui)
- **Scale breathing**: o botao vai crescer e diminuir levemente de forma continua
- **Bounce do icone**: manter o bounce no ChevronUp mas tornar mais pronunciado
- **Gradiente animado**: fundo com gradiente que se move

### 2. Novas animacoes CSS (index.css)

Adicionar keyframes:

- `scroll-hint-pulse`: escala de 1.0 a 1.06 com glow shadow laranja pulsante
- `scroll-hint-glow`: box-shadow laranja que aparece e desaparece

### Detalhes tecnicos

**I6SignalDemo.tsx** (linhas ~667-678):
- Trocar classes do container wrapper para incluir `animate-scroll-hint-pulse`
- Adicionar classe de glow ao div interno com borda
- Aumentar levemente o tamanho do texto e padding para maior visibilidade

**index.css**:
- Adicionar `@keyframes scroll-hint-pulse` com transform scale e box-shadow animados
- Adicionar classe `.animate-scroll-hint-pulse`
