
# Adicionar 3 novos bullets na seção de capabilities (Sinais)

## O que muda

Inserir 3 novos bullets entre "Base fundacional multi-segmentada." e "APIs de ativacao imediata." nos dois idiomas (PT e EN).

### Novos bullets (PT)
1. "Relevancia imediata ate para comportamentos sem historico."
2. "Balanceamento entre personalizacao e diversidade."
3. "Explicabilidade comportamental argumentativa"

### Novos bullets (EN) - traducao equivalente
1. "Immediate relevance even for behaviors without history."
2. "Balance between personalization and diversity."
3. "Argumentative behavioral explainability"

## Detalhes Tecnicos

Arquivo: `src/components/hometeste/SinaisSection.tsx`

1. **Expandir o array `capabilityIcons`** (linha 7): adicionar 3 icones para os novos items. Sugestao: `Zap`, `Target`, `BarChart3` ou outros icones ja importados que facam sentido semantico (ex: `Sparkles` para relevancia, `Scale` para balanceamento, `MessageSquare` para explicabilidade). Importar novos icones se necessario.

2. **Expandir `capabilities` no copy PT** (linhas 20-24): inserir os 3 novos textos apos "Base fundacional multi-segmentada." e antes de "APIs de ativacao imediata."

3. **Expandir `capabilities` no copy EN** (linhas 53-57): inserir as traducoes correspondentes na mesma posicao.

4. **Array de icones** atualizado de 3 para 6 icones para corresponder aos 6 bullets.
