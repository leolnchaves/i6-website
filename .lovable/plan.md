## Ajustes no painel conclusivo (Price-to-Margin)

Trocar a hierarquia visual entre KPIs e o bloco "POR QUE ESTE PREÇO" em `src/components/kiosk/demos/PriceToMarginDemo.tsx`.

### 1. Bloco "POR QUE ESTE PREÇO" — vira o destaque
- Fundo coral `bg-[#F4845F]/15` com borda `border-[#F4845F]/50` (o visual que hoje está nos KPIs).
- Eyebrow "POR QUE ESTE PREÇO" maior: `text-[1.5vmin]` (era 1.2vmin), mantendo tracking wide.
- Texto do insight maior: `text-[1.9vmin]` (era 1.5vmin), leading relaxado, cor `text-white/95`.
- Padding interno maior (`p-[2.2vmin]`) pra dar peso ao bloco.

### 2. MetricPills (Preço, Margem, Δ Receita, Latência) — recuam
- Estado `highlight` passa a usar fundo dark `bg-white/[0.03]` com borda `border-white/10` (mesmo dos pills neutros).
- Label do KPI muda de coral para manter coral (`text-[#F4845F]`) — já está.
- **Valor** do KPI passa a ser coral (`text-[#F4845F]`) em vez de branco, pra manter o toque de destaque na cor mas sem o fundo laranja.
- Hint da latência segue em `text-white/50`.

### Fora de escopo
- Sem mudanças no pipeline, produtos, latência gerada ou copy.
