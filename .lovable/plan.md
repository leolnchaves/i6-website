## Objetivo

Adicionar dois novos cenários ao i6 Signal para a solução **Personalização Preditiva + Descoberta Inteligente**, seguindo o mesmo padrão dos cenários já implementados (mix, margem, giro, metas, forecast).

## Cenários

### P1 — `personalizationBehavior`
"Quais produtos ou looks devem ser priorizados para cada perfil de navegação, e quais comportamentos explicam essa recomendação?"

**Visuais**
- `PersonalizationBehaviorMatrix` — tabela: Perfil comportamental / Intenção prevista / Produto ou look recomendado / Aderência (badge tonal) / Objetivo (chip colorido: Cross-sell, Discovery, Look recommendation, Conversão).
- `PersonalizationSignalsTable` — sinais preditivos com efeito Alto/Médio/Baixo (badges tonais).
- Quadro de "Argumentação preditiva" + bloco "Ações recomendadas".

### P2 — `personalizationRepurchase`
"Quais clientes estão entrando em janela de recompra, o que tendem a comprar novamente e qual é o melhor momento para ativá-los?"

**Visuais**
- `RepurchaseCurveChart` — curva temporal (recharts LineChart) com:
  - eixo X: dias desde a última compra
  - eixo Y: probabilidade prevista
  - ReferenceArea para janela de oportunidade
  - ReferenceDot para pico
  - anotação de queda pós-pico
  - legenda explicativa dos 5 elementos
- `RepurchaseBehaviorTable` — Comportamento previsto / Clientes / Janela / Propensão (badge) / Próxima melhor recomendação.
- `RepurchaseCorrelationsTable` — sinal preditivo × efeito sobre recompra.
- Quadro de "Argumentação preditiva" (2 blocos: cliente típico + cliente com migração) + "Ações recomendadas".

## Arquivos afetados

- `src/data/signalDemo/content.ts` — adicionar `personalizationBehavior` e `personalizationRepurchase` em PT e EN, com os textos, tabelas, sinais, argumentação e ações fornecidos pelo usuário.
- `src/data/kiosk/config.ts` — mapear a solução `personalization-discovery` (ou slug atual) para os 2 novos cenários como P1/P2.
- `src/components/signalDemo/visualizations.tsx` — implementar os 5 componentes acima, reutilizando estilos tonais (aderência/propensão) já usados em margem/giro.
- `src/components/kiosk/KioskSignalIntelliboard.tsx` — renderizar os novos visuais e o quadro de "Argumentação preditiva" para os dois cenários.

## Regras de estilo (mantidas)

- Tabelas padronizadas (memória: i6Signal Visualization Style).
- Sem emoji; badges tonais consistentes com os outros cenários.
- Textos EN espelham a estrutura PT.
- Nenhuma mudança em outros cenários.

## Release

Após validação visual sua, publico um patch (v2.2.x) via GitHub API conforme o release flow.
