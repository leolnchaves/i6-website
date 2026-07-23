# Destacar o card "Por que este preço" no /kiosk

O bloco final do `PriceToMarginDemo` (linhas 271–276 de `src/components/kiosk/demos/PriceToMarginDemo.tsx`) hoje é apenas uma caixa coral estática. Como o totem é passivo (touch + tempo curto de atenção), precisamos forçar o olhar para essa conclusão sem tornar a UI cansativa.

## Estratégia visual em 3 camadas

1. **Entrada com atraso deliberado** — o card aparece ~600 ms depois dos KPIs, com `scale 0.94 → 1` + `translateY(12px) → 0` + fade, sinalizando que é a "revelação" final da análise.
2. **Ring pulsante contínuo (breathing glow)** — animação infinita de 2.4s no `box-shadow` coral (`rgba(244,132,95, .35 → .75 → .35)`) + leve pulsação da borda (`border-color` opacidade `.5 → 1 → .5`). Suave o suficiente para não distrair, forte o suficiente para puxar o olhar em qualquer distância.
3. **Badge "INSIGHT" com ícone Sparkles animado** — pequeno chip coral no canto superior direito do card com ícone `Sparkles` (lucide-react) girando/piscando devagar. Reforça hierarquia sem competir com o texto.

Bônus opcional (aprovar/rejeitar na hora): um `scrollIntoView({ block: 'center' })` do card 400 ms após montar, para garantir que ele fique 100% visível mesmo se o usuário estiver com o dedo na parte de baixo do totem.

## Onde muda

- `src/components/kiosk/demos/PriceToMarginDemo.tsx` — envolver o bloco do insight (linhas 271–276) em wrapper com as classes/estilos da animação; adicionar ícone `Sparkles` e badge "INSIGHT" (com `content.rationaleLabel` reaproveitado como texto principal). Injetar `@keyframes kiosk-insight-glow` e `kiosk-insight-in` no bloco `<style>` já existente (linhas 283–288).
- Nenhum arquivo de i18n muda — o texto continua vindo de `content.rationaleLabel` e `selected.insight`.

## Detalhes técnicos

```css
@keyframes kiosk-insight-in {
  0%   { opacity: 0; transform: translateY(12px) scale(.94); }
  100% { opacity: 1; transform: translateY(0)    scale(1);   }
}
@keyframes kiosk-insight-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244,132,95,.35), 0 0 24px rgba(244,132,95,.25); }
  50%      { box-shadow: 0 0 0 6px rgba(244,132,95,.10), 0 0 40px rgba(244,132,95,.55); }
}
```

Card recebe:
- `animation: kiosk-insight-in .5s ease-out .6s both, kiosk-insight-glow 2.4s ease-in-out .6s infinite`
- Borda coral aumentada de `border` para `border-2`
- Badge absoluto no topo direito com `Sparkles` + label ("INSIGHT" / "INSIGHT")

Sem impacto em desktop `/solutions` — a mudança é isolada no componente do kiosk.

## Perguntas antes de implementar

1. Incluir o `scrollIntoView` automático (garante visibilidade em telas menores do totem em portrait)?
2. Manter o glow **infinito** ou parar após ~6 s (3 pulsos) para não competir depois que o usuário já leu?
