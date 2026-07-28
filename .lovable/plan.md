## Objetivo

Três ajustes no vídeo institucional (`remotion/`), com novo render do MP4.

## 1. Remover textos de rodapé

Hoje `SceneFrame` (em `remotion/src/components/Type.tsx`) desenha um rótulo fixo no canto inferior esquerdo de cada cena ("Como funcionamos", "Nossa IA", "i6 Signal", etc.).

- Remover esse bloco de rodapé do `SceneFrame`, mantendo apenas o conteúdo central.
- Limpar a prop `label` das chamadas nas cenas (Thesis, HowItWorks, Territories, Signal, Engines, Results).

## 2. Tratamento do "infinity6.ai"

- `Thesis.tsx`: existe um texto solto "Home · infinity6.ai" — remover.
- `Closing.tsx`: o "infinity6.ai" hoje é texto neutro cinza. Trocar por **www.infinity6.ai** com destaque: tipografia display, corpo maior, "infinity6" em coral, letter-spacing controlado e régua coral animada abaixo (motivo já usado na peça). O chip com `performance@infinity6.ai` permanece.

## 3. Nova cena i6 Signal — mesmo design de /solutions

Substituir a cena atual (só título + lista de perguntas) por uma réplica **visualmente fiel** do demo i6 Intelliboard de `/solutions` (`src/components/solutions/I6SignalDemo.tsx`), animada quadro a quadro.

```text
       i6 Signal — título + subtítulo centralizados (como na página)
              [ chips de cenário em barra arredondada ]
┌───────────────────────────────────────────────────────┐
│ i6 Intelliboard          VIVARIS · Leonardo · avatar  │ header gradiente navy→azul
├────────┬───┬──────────────────────────────────────────┤
│ ÂNGULO │ ♡ │   ● bolha do usuário (pergunta)          │
│ menu   │ ✦ │   ● resposta i6: texto + tabela/gráfico  │
│ branco │   │                                          │
│ footer │   │   [ input + botão enviar coral ]         │
└────────┴───┴──────────────────────────────────────────┘
```

Fidelidade ao design da página, item a item:
- Cabeçalho da seção: título + subtítulo centralizados em branco/branco-60.
- Barra de cenários: pílula translúcida `bg-white/5` com borda, item ativo em laranja com sombra.
- Container do demo: cantos arredondados, borda branca 10%, sombra forte.
- Header do Intelliboard: gradiente `#0F1F36 → #1E4A94 → #0F1F36`, "i6" coral + "Intelliboard" branco, bloco VIVARIS/Leonardo e avatar circular com anel.
- Sidebar clara (branca, 208px) com dropdown ÂNGULO/Forecast, itens de menu com ícone e item ativo em degradê laranja→azul com barra lateral coral; rodapé com Billing Analytics / Analytics / Settings.
- Barra de favoritos estreita com ícones wizard e corações coral.
- Área de chat branca: bolha do usuário em degradê laranja/azul à direita, resposta com texto cinza-escuro, cartões de visualização (tabela/gráfico de barras) no mesmo estilo do site.
- Campo de input inferior com placeholder e botão de envio coral.

Coreografia (cena longa, ~22–25s no lugar dos 14s atuais):
1. Interface monta (header → sidebar → chat).
2. Chip do cenário ativo acende.
3. Pergunta é digitada caractere a caractere no input; botão enviar pulsa.
4. Pergunta sobe como bolha do usuário; três pontinhos de "pensando".
5. Resposta revela em blocos escalonados: leitura do cenário + visualização (tabela/gráfico) + recomendação prescritiva.
6. Corte interno para um segundo cenário (mesma mecânica, mais rápida) mostrando amplitude.

Conteúdo (perguntas, respostas, dados de tabelas/gráficos) vem de `src/data/signalDemo/content.ts` — os mesmos cenários do site, em PT.

## Detalhes técnicos

- O componente do site não pode ser importado no Remotion (depende de LanguageContext, Tailwind do app e animações CSS do lucide). A UI será reconstruída em `remotion/src/scenes/Signal.tsx` + `remotion/src/components/signal/*` com estilos inline equivalentes (mesmas cores, raios, sombras e tamanhos) e toda a animação convertida para `interpolate()`/`spring()`.
- Ícones recriados como SVG inline simples, sem dependência de lucide no bundle do vídeo.
- Avatar: copiar `src/assets/images/avatar-ricardo.jpg` para `remotion/public/images/`.
- Duração: cena Signal passa de 420 para ~700 frames; atualizar `TOTAL_FRAMES` e o `durationInFrames` da composição.
- Conferência por frames (`bunx remotion still`) nos pontos-chave antes do render final.
- Render final para `/mnt/documents/infinity6-institucional.mp4` (1920×1080, 30fps, mudo).
