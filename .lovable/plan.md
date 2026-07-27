## Problema

Os SVGs dos gráficos do modal de Forecast usam `viewBox` + `className="w-full h-auto"` + `maxHeight`. Como o `preserveAspectRatio` padrão é `xMidYMid meet`, quando o `maxHeight` limita a altura o SVG também encolhe a largura para manter o aspect ratio — resultado: gráfico centralizado com espaço vazio nas laterais.

## Solução

Fazer o SVG esticar horizontalmente para preencher todo o container, mantendo a altura atual.

Em `src/components/kiosk/demos/DemandForecastDemo.tsx`, nos dois `<svg>`:

- **Gráfico principal (linha 471)** — altura atual 164px
- **Gráfico de composição (linha 615)** — altura atual 116px

Alterar em cada um:
- `className="w-full h-auto block"` → `className="w-full block"`
- Trocar `style={{ maxHeight: N }}` por `style={{ width: '100%', height: N }}`
- Adicionar `preserveAspectRatio="none"` no `<svg>`

Isso força o SVG a ocupar 100% da largura do container mantendo exatamente a altura já definida. Elementos internos posicionados via coordenadas do `viewBox` continuam funcionando; o texto (labels de eixo, legendas) fica com leve alongamento horizontal apenas se o container ficar muito mais largo que o `viewBox` — dentro do modal do Kiosk (retrato 27") a diferença é pequena e aceitável.

Nenhuma outra alteração — a altura permanece a mesma que ficou após as reduções recentes.