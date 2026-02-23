
# Melhorar Layout dos Cards da Seção Resultados

## Problema
Os cards estao muito estreitos no grid de 4 colunas, causando quebras de linha excessivas nos textos (valores e labels). O padding interno tambem esta apertado.

## Solucao

Ajustes no arquivo `src/components/hometeste/ResultadosSection.tsx`:

1. **Ampliar container**: Mudar `max-w-6xl` para `max-w-7xl` para dar mais espaco horizontal aos cards
2. **Aumentar padding dos cards**: Mudar `p-6` para `p-7` ou `p-8` para mais respiro interno
3. **Reduzir gap entre cards**: Mudar `gap-8` para `gap-5` ou `gap-6` para redistribuir espaco aos cards
4. **Aumentar tamanho dos valores**: Mudar `text-base` para `text-lg` nos valores em coral para melhor destaque
5. **Ajustar espaçamento das metricas**: Aumentar `py-3` para `py-4` nos items da lista para mais respiro vertical
6. **Rich labels**: Ajustar `gap-4` para `gap-5` ou `gap-6` nas colunas lado a lado para evitar texto colado

Todos os textos (titulo, valores, labels) serao mantidos exatamente como estao.

## Detalhes Tecnicos

Alteracoes apenas em classes Tailwind no componente `ResultadosSection.tsx`:
- Linha 85: container `max-w-6xl` -> `max-w-7xl`
- Linha 94: grid `gap-8` -> `gap-5`
- Linha 98: card `p-6` -> `p-8`
- Linha 108: metric items `py-3` -> `py-4`
- Linhas 111, 122, 133: rich label containers `gap-4` -> `gap-6`
- Linhas 113, 117, 124, 128, 135, 139, 145: valores `text-base` -> `text-lg`
