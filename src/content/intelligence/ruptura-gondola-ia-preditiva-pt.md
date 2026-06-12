---
id: ruptura-gondola-ia-preditiva
title: "Como reduzir ruptura de gôndola com IA preditiva no varejo farmacêutico"
slug: ruptura-gondola-ia-preditiva
language: pt
date: 2026-06-12
sector: farma
theme: estoque
excerpt: "Ruptura de gôndola no varejo farma custa de 4% a 12% do faturamento. IA preditiva combina previsão de demanda, política de estoque e alocação por PDV para reduzir falta sem inflar capital de giro."
read_time: 8
featured: true
---

## Resposta direta

A ruptura de gôndola no varejo farmacêutico é reduzida com **IA preditiva que conecta três decisões em um único ciclo**: previsão de demanda por SKU-PDV-dia, política de estoque dinâmica (ponto de pedido + estoque de segurança recalculados por volatilidade) e alocação inteligente entre CD e lojas. Em projetos da infinity6, essa combinação reduziu ruptura em até **38%** sem aumentar capital empatado.

## O tamanho do problema

Segundo levantamentos mapeados pela infinity6 em redes farmacêuticas no Brasil, **ruptura de gôndola consome entre 4% e 12% do faturamento líquido** — dependendo do mix, do giro e da disciplina de reposição. Em SKUs de alta margem (dermocosméticos, OTC premium, marcas próprias), a perda chega a representar mais de **20% do potencial de receita** da categoria.

Os três vetores que mais pesam:

1. **Demanda volátil** — sazonalidade, campanhas, clima, eventos locais.
2. **Política de estoque estática** — pontos de pedido fixos que não acompanham a volatilidade real.
3. **Alocação cega entre lojas** — CD empurra lote igual para PDVs com perfis de demanda muito diferentes.

## Por que abordagens tradicionais falham

ERPs convencionais tratam reposição com médias móveis e estoque de segurança fixo. Isso funciona em SKUs estáveis, mas **subestima a cauda longa de variabilidade** — exatamente onde a ruptura mais machuca margem. Planilhas de comprador, mesmo bem feitas, não escalam para 15.000 SKUs × 800 PDVs × 365 dias.

## O motor proprietário da infinity6

O engine **Previsio** entrega previsão probabilística (não apenas valor esperado, mas distribuição completa) no nível SKU-PDV-dia. Sobre essa base, o módulo de **política de estoque** recalcula ponto de pedido, estoque de segurança e lote ótimo a cada ciclo, respeitando restrições de validade, lead time real do fornecedor e nível de serviço alvo por categoria. O módulo de **alocação** decide quanto do CD vai para cada PDV com base na demanda esperada e no risco de ruptura ponderado por margem.

A tríade roda em produção com atualização diária, integrada ao ERP via API.

## Resultado anonimizado

Em uma rede farmacêutica de grande porte (200+ lojas, 12.000 SKUs ativos), 90 dias após a virada:

- **−38% em eventos de ruptura** em SKUs A/B
- **−14% em capital empatado** (overstock cedeu junto)
- **+6,2 p.p. em margem bruta da categoria de OTC**
- Nível de serviço subiu de 91,8% para 96,4%

## Perguntas frequentes

**Em quanto tempo o resultado aparece?**
O ciclo de aprendizado da Previsio precisa de 6 a 10 semanas de histórico recente. Resultados materiais costumam aparecer entre o 60º e o 90º dia.

**Funciona para SKUs novos sem histórico?**
Sim. O engine usa transferência de aprendizado a partir de SKUs análogos (atributos, categoria, faixa de preço) e ajusta conforme o histórico real entra.

**Preciso trocar meu ERP?**
Não. A camada de IA fica acima do ERP e devolve recomendações via API ou arquivo. A operação de compra e transferência continua no sistema atual.

**Como fica a validade dos produtos?**
A política de estoque já considera shelf life e penaliza lotes próximos do vencimento na recomendação de alocação.

## Próximo passo

Se sua rede convive com ruptura recorrente em SKUs de alta margem, vale mapear o ganho potencial. Em 2 semanas conseguimos rodar um diagnóstico sobre 90 dias de histórico e mostrar o tamanho da oportunidade antes de qualquer implementação.
