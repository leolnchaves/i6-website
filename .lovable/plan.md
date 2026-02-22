
# Ajustes no GIF, Popups e Texto Descritivo do i6Signal

## Mudancas em `src/components/hometeste/SinaisSection.tsx`

### 1. Aumentar o GIF
- Remover `max-w-xl` do GIF e deixar `w-full` para que ocupe toda a coluna direita, quase encostando nos textos das capabilities na esquerda
- Manter `rounded-xl shadow-2xl border border-white/10`

### 2. Recalcular posicoes dos popups
- Com o GIF maior, as posicoes relativas dos popups precisam ser recalculadas para ficarem contidas dentro do GIF
- Manter as posicoes usando `top/bottom/left/right` com valores percentuais que caibam dentro do container
- Posicoes ajustadas para o GIF maior:
  - `{ top: '5%', right: '3%' }`
  - `{ top: '20%', left: '3%' }`
  - `{ top: '38%', right: '5%' }`
  - `{ top: '55%', left: '5%' }`
  - `{ top: '72%', right: '3%' }`
  - `{ bottom: '10%', left: '10%' }`
  - `{ bottom: '5%', right: '8%' }`

### 3. Deixar popups mais lentos
- Aumentar o ciclo da animacao de `20s` para `30s`
- Aumentar o delay entre popups de `i * 2.5s` para `i * 4s`
- Isso da mais tempo para leitura de cada popup

### 4. Adicionar texto descritivo abaixo do GIF
- Abaixo da `<img>` do GIF, adicionar um `<p>` com o texto:
  - PT: "Interface conversacional preditiva que transforma, em tempo real, sinais de IA aplicada em decisoes acionaveis."
  - EN: "Predictive conversational interface that transforms, in real time, applied AI signals into actionable decisions."
- Estilo: `text-white/40 text-xs md:text-sm text-center mt-4 max-w-md mx-auto italic`
- Posicionado com `relative z-10` para ficar acima do glow

## Arquivos alterados
- `src/components/hometeste/SinaisSection.tsx`
