

## Aumentar visibilidade das ondas verticais

### Mudanca unica em `src/components/solutions/VerticalWaves.tsx`

Aumentar a opacidade de todos os 8 paths e engrossar levemente os strokes:

| Layer | Opacidade atual | Nova opacidade | strokeWidth atual | Novo strokeWidth |
|-------|----------------|----------------|-------------------|------------------|
| 1 | 0.40 | 0.55 | 1.5 | 2.0 |
| 2 | 0.35 | 0.50 | 1.2 | 1.6 |
| 3 | 0.30 | 0.45 | 1.8 | 2.2 |
| 4 | 0.28 | 0.42 | 1.5 | 2.0 |
| 5 | 0.25 | 0.38 | 2.2 | 2.8 |
| 6 | 0.22 | 0.35 | 2.5 | 3.0 |
| 7 | 0.45 | 0.60 | 1.0 | 1.4 |
| 8 | 0.28 | 0.42 | 1.8 | 2.2 |

### Detalhes tecnicos

- Apenas o arquivo `VerticalWaves.tsx` sera editado
- O componente so e usado na pagina `/solutions`, entao nao afeta outras paginas
- Aumento medio de ~0.15 na opacidade e ~0.4px no strokeWidth
- Mantem a hierarquia visual entre layers (as compactas/rapidas mais fortes, as grandes/lentas mais sutis)

