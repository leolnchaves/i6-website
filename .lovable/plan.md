# Tela de atração do /kiosk — minimalismo puro

## Objetivo
Remover completamente a decoração visual do rodapé (SVG de ondas atual) e deixar a tela com o mesmo fundo escuro do resto do totem — apenas headline, botão pulsante e assinatura (logo + slogan). Foco total no conteúdo, estética Apple-like.

## Mudanças

### `src/components/kiosk/AttractScreen.tsx`
- Remover todo o bloco `<svg>` de ondas coral (defs, gradientes e paths) que ocupa o rodapé.
- Remover o import não utilizado do asset `kiosk-waves-coral-v3.png.asset.json` (já foi retirado na iteração anterior, apenas confirmar).
- Manter intacta a estrutura em três blocos (`justify-between`): headline no topo, botão pulsante ao centro, logo + slogan "The Platform for / Decision Advantage" no rodapé.
- Manter os anéis pulsantes coral ao redor do botão — essa é a única energia visual da tela, e ela vem do CTA, não do fundo.

### Assets órfãos
- O arquivo `src/assets/kiosk-waves-coral-v3.png.asset.json` fica órfão. Podemos deletá-lo com `lovable-assets delete` para não deixar lixo no projeto.

## Resultado esperado
Fundo dark uniforme (mesmo do restante do totem), sem gradientes, sem linhas, sem ondas. A composição respira: headline no topo, CTA respirando no centro com os anéis coral, assinatura discreta em baixo. Nada compete com o botão.

## Detalhes técnicos
Nenhuma lógica alterada — mudança puramente visual/JSX em um único componente. Sem impacto em rotas, dados, i18n ou responsividade.
