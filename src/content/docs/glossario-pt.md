---
title: "Glossário"
slug: glossario
language: pt
section: glossary
section_label: "Glossário"
order: 50
description: "Vocabulário técnico completo da inteligência i6: algoritmos, métricas de decisão e termos de operação usados na documentação e nas páginas de produto."
site_managed: true
---

Este glossário reúne, em definição completa, os termos que aparecem de forma condensada nas páginas de produto. A ordem é alfabética, para consulta direta.

## Active Learning

Estratégia de treinamento em que o próprio modelo escolhe quais amostras devem ser rotuladas ou incorporadas ao ciclo de aprendizado, em vez de consumir todo o dado disponível de forma indiscriminada. O critério de escolha costuma ser a incerteza: o modelo prioriza os exemplos sobre os quais tem menos convicção, porque são eles que mais reduzem o erro quando aprendidos.

Na prática isso encurta o tempo de adaptação a um novo cliente ou a um novo domínio e reduz o custo de anotação, porque um volume pequeno de dados bem escolhido substitui um volume grande de dados redundantes.

## Aderência contextual

Grau em que uma decisão produzida pelo modelo faz sentido no contexto em que será aplicada — momento, canal, restrição operacional e histórico imediato do cliente ou do produto. Uma recomendação estatisticamente correta pode ter aderência contextual baixa se ignora que o item está sem estoque, que o cliente acabou de comprar o mesmo produto ou que o canal não suporta aquele formato de oferta.

É por isso que os motores i6 tratam contexto e restrição como parte da função de decisão, não como filtro aplicado depois do resultado.

## Elasticidade dinâmica

Sensibilidade da demanda ao preço, calculada de forma contínua por SKU, canal e estágio do ciclo de vida, em vez de fixada em uma curva estática revisada de tempo em tempo. Cada novo ciclo de dado recalcula a elasticidade, o que permite reagir a mudança de concorrência, sazonalidade e comportamento de compra sem esperar uma nova rodada manual de precificação.

Restrições de margem e de posicionamento entram como limites do modelo, então o preço sugerido nunca sai da faixa aceitável do negócio.

## i6-RecSys-Base.g1

Modelo fundacional proprietário da infinity6, que serve de base para os motores de previsão, recomendação e precificação. Combina três elementos de arquitetura: MAML, para adaptação rápida com poucas amostras; Active Learning, para escolher o dado que mais informa; e Topological Loss, para preservar a estrutura das relações aprendidas.

Foi pré-treinado em 1,45 bilhão de registros de múltiplos setores, o que permite que a adaptação a um cliente específico exija um volume de dado próprio muito menor do que treinar um modelo do zero.

## MAML

Sigla de Model-Agnostic Meta-Learning, algoritmo publicado por Finn, Abbeel e Levine em 2017. Em vez de treinar um modelo para resolver bem uma tarefa, o MAML treina um ponto de partida de parâmetros que se adapta a uma tarefa nova com muito poucas atualizações e muito pouco dado.

É a base do i6-RecSys-Base.g1 e a razão pela qual um novo cliente entra em operação com poucas amostras próprias, herdando o que o modelo fundacional já aprendeu.

## Predição comportamental

Modelagem que aprende o comportamento efetivamente observado de um cliente, canal ou produto a partir de dados transacionais — o que foi comprado, quando, em qual contexto — e não de preferências declaradas em cadastro ou pesquisa. O objetivo é antecipar a próxima ação relevante, não descrever o passado.

Vale tanto para usuários identificados quanto anônimos, porque o comportamento é representado no mesmo espaço latente independentemente de haver ou não um cadastro associado.

## Propensão de conversão

Probabilidade estimada de que uma pessoa, em um contexto específico, execute a ação de interesse — comprar, contratar, renovar, responder a uma oferta. É uma saída calibrada: quando o modelo indica 30%, aproximadamente 30% dos casos daquela faixa devem converter, o que permite usar o número em decisão de corte e priorização.

Usada para ordenar esforço comercial e escolher quem recebe qual oferta, em vez de aplicar a mesma abordagem a toda a base.

## Ruptura de gôndola

Situação em que o produto está indisponível no ponto de venda no momento em que o cliente quer comprá-lo, mesmo havendo estoque em outro lugar da cadeia. Diferente de falta de estoque geral, é um problema de alocação e reposição — o item existe, mas não onde a demanda aconteceu.

Custa venda imediata e, com recorrência, migração de preferência para a marca concorrente. É um dos alvos diretos da previsão granular por SKU e ponto de venda.

## Topological Loss

Função de perda que, além do erro de predição, penaliza a distorção das relações topológicas entre exemplos no espaço latente — ou seja, exige que itens próximos no mundo real permaneçam próximos na representação aprendida.

O efeito prático é um embedding mais estável e uma generalização melhor em cenários de poucas amostras, porque a estrutura aprendida no pré-treino não se desfaz quando o modelo é adaptado a um domínio novo.
