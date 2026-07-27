## Objetivo

Destacar mais o card "Por que estes itens" / "Por que recomendamos esta audiência" nas demos de **Personalização + Descoberta Preditiva** e **Campanhas por Propensão**, aumentando o tamanho do texto (label + argumentação) para ficar mais visível no formato retrato do totem.

## Mudanças

**`src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`** (linhas 421–432)
- Label `rationaleLabel`: `text-[1.25vmin]` → `text-[1.7vmin]`
- Paragrafo `argumentText`: `text-[1.5vmin] leading-snug` → `text-[2vmin] leading-relaxed`
- Ícone Sparkles: `w-[1.6vmin] h-[1.6vmin]` → `w-[2.2vmin] h-[2.2vmin]`
- Padding do card: `px-[1.6vmin] py-[1.2vmin]` → `px-[2vmin] py-[1.8vmin]`

**`src/components/kiosk/demos/PropensityCampaignDemo.tsx`** (linhas 262–273)
- Mesmos ajustes de tamanho (label, parágrafo, ícone e padding) para manter consistência visual entre as duas demos migradas.

Latência à direita permanece no tamanho atual (é secundária). Nenhuma alteração em textos ou lógica.
