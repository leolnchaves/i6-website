# Áreas de toque no /kiosk

Ajustar o botão "← Escolher outro produto" e demais interações do kiosk para atingir o alvo mínimo de toque com dedo em tela capacitiva (mínimo 44px, alvo 72px conforme boas práticas de totem).

## Alvos a ajustar

1. **`PriceToMarginDemo.tsx` — Botão "Escolher outro produto"**
   - Hoje: texto pequeno (`text-[1.4vmin]`), sem padding, sem hit-area.
   - Alvo: botão em pill com `min-h-[8vmin]`, padding `px-[3vmin] py-[2vmin]`, texto `text-[1.8vmin]`, borda `border border-white/20`, `rounded-full`, ícone de seta maior.

2. **`PriceToMarginDemo.tsx` — Cards de produto do catálogo**
   - Garantir `min-h-[18vmin]` e `p-[2vmin]` (verificar se já cumpre) para toque confortável em qualquer parte do card.

3. **`I6SignalDemo` — Chips de perguntas pré-definidas**
   - Aumentar padding e altura mínima dos chips para `min-h-[8vmin]`, `px-[3vmin]`.

4. **`SolutionsGrid` do Kiosk (grid pós-quiz)**
   - Garantir `min-h-[10vmin]` nos cards de solução.

5. **`QuizScreen` — Botões de resposta**
   - Auditar `min-h-[10vmin]` e espaçamento entre opções ≥ `2vmin` para evitar toque acidental.

6. **`EbookCTA` — Inputs e botão de envio**
   - Inputs `min-h-[8vmin]`, botão CTA `min-h-[9vmin]` com padding generoso.

7. **`AttractScreen`**
   - Área inteira já é tap-to-start; sem mudanças.

## Escopo

- Apenas ajustes visuais/dimensionais (Tailwind classes) nos componentes do `/kiosk`.
- Sem mudanças de lógica, texto ou fluxo.
- Sem impacto em outras rotas do site.

## Validação

- Abrir `/kiosk` no preview, percorrer os passos (attract → quiz → results → demo Price-to-Margin → i6Signal → CTA eBook) e confirmar que todos os elementos clicáveis têm no mínimo ~72px de altura efetiva.
