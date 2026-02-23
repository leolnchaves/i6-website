
# Fix: Nome do produto na pergunta do cenario Pricing

## Problema
Na pergunta do cenario Pricing, o texto diz "produto X" mas a resposta usa "Ibuprofeno 400mg". O nome do produto precisa ser consistente.

## Mudancas

### Arquivo: `src/components/solutions/I6SignalDemo.tsx`

**Linha 80 (PT):**
- De: `'Qual o preço ótimo para o produto X nesta região?'`
- Para: `'Qual o preço ótimo para o Ibuprofeno 400mg nesta região?'`

**Linha 232 (EN):**
- De: `'What is the optimal price for product X in this region?'`
- Para: `'What is the optimal price for Ibuprofen 400mg in this region?'`
