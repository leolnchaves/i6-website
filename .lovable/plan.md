# Reescrever FAQ de Solutions em linguagem de negócio

Mantenho o FAQ na página `/solutions` (sem mover nada para `/our-ai`), mas troco as referências diretas aos motores por nomes de solução de negócio. As 2 perguntas do i6Signal ficam como estão (i6Signal é a marca conversacional voltada ao usuário final, faz sentido nomeá-la).

## Mapeamento de linguagem

| Motor (atual) | Nova denominação de negócio (PT) | EN |
|---|---|---|
| i6Previsio | nossa solução de Forecasting e Predição de Demanda | our Demand Forecasting solution |
| i6RecSys | nossa solução de Recomendação e Otimização de Mix | our Recommendation & Mix Optimization solution |
| i6ElasticPrice | nossa solução de Pricing Dinâmico | our Dynamic Pricing solution |
| i6Signal | i6Signal (mantém) | i6Signal (mantém) |

## Mudanças em `src/data/staticData/solutionsFaqData.ts`

### Labels de produto (chips)
Manter os 4 `product` ids (i6Signal/i6Previsio/i6RecSys/i6ElasticPrice) para preservar tipagem e filtros existentes, mas trocar o **productLabel** exibido nos chips:

- `i6Signal` → "i6Signal"
- `i6Previsio` → "Forecasting"  /  EN: "Forecasting"
- `i6RecSys` → "Recomendação & Mix"  /  EN: "Recommendation & Mix"
- `i6ElasticPrice` → "Pricing Dinâmico"  /  EN: "Dynamic Pricing"

### Perguntas (PT)

1. **i6Signal** — mantida: "O que é o i6Signal e como ele se relaciona com nossas soluções de Forecasting, Recomendação e Pricing?" (pequeno ajuste para remover nomes técnicos dos motores na pergunta; resposta também reescrita em linguagem de negócio).
2. **i6Signal** — mantida sem alteração.
3. **Forecasting**: "Como reduzir ruptura de gôndola (stockout) em varejo e farma com previsão de demanda preditiva?"
4. **Forecasting**: "Como reduzir overstock e capital de giro parado com nossa solução de Forecasting e Predição de Demanda?"
5. **Forecasting**: "Como aplicar sensoriamento de demanda em tempo real para antecipar desvios de venda?"
6. **Recomendação & Mix**: "Como otimizar mix de produtos por loja ou região com nossa solução de Recomendação e Mix?"
7. **Recomendação & Mix**: "Como aumentar conversão em e-commerce com recomendação personalizada em tempo real?"
8. **Recomendação & Mix**: "Como calcular propensão de compra de clientes anônimos sem login ou histórico?"
9. **Pricing Dinâmico**: "Como proteger margem em varejo e indústria com nossa solução de Pricing Dinâmico?"
10. **Pricing Dinâmico**: "Como modelar elasticidade dinâmica de preço por SKU e canal?"

### Respostas
Reescritas para remover citações diretas aos nomes dos motores e usar as denominações de negócio. Onde o i6Signal aparece (perguntas 1 e 2), ele continua nomeado. Nos demais, substituições do tipo "O i6Previsio aplica..." → "Nossa solução de Forecasting aplica...".

### Versão EN
Mesmas mudanças aplicadas em `solutionsFaqContent.en`.

## Arquivos afetados

- `src/data/staticData/solutionsFaqData.ts` (PT + EN: productLabel, perguntas, respostas)

## Fora de escopo

- Não toco em `/our-ai`.
- Não altero `SolutionsFAQ.tsx` (componente de renderização permanece igual; só consome os novos textos).
- Tipo `SolutionsFAQ['product']` mantém os 4 ids atuais para não quebrar filtros/JSON-LD.
