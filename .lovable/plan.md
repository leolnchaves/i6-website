## Objetivo

Reescrever as justificativas do card **"POR QUE RECOMENDAMOS ESTA AUDIÊNCIA"** (Campanhas por Propensão, `/kiosk`) em linguagem **de negócio, 100% comportamental** — nada de SHAP, embeddings, deciles, Brier, p̂. Quem lê é gestor de marketing/comercial, não cientista de dados.

## Padrão de escrita (regra)

Cada justificativa deve descrever um **sinal comportamental observado** em pelo menos uma destas dimensões:

- **Cliente**: frequência, recência, ticket, resposta a canal, devoluções, look-alike de conversores.
- **PDV / loja**: giro, ruptura, cluster de loja, performance da vitrine.
- **Região**: densidade da base, tráfego local, adesão histórica.
- **Similares**: comportamento de clientes parecidos que já converteram em campanha anterior.
- **Clima / calendário / eventos**: chuva, feriado, data comemorativa, sazonalidade, evento local.

Formato: **1 frase curta, com um número concreto e um mecanismo comportamental**. Sem "SHAP", "score", "propensão calibrada", "lift" técnico, "decile". "Lift" pode virar "responde X× mais". Pode falar em "clientes parecidos com quem já comprou" em vez de "look-alike".

## Exemplo do padrão (já aprovado pelo usuário)

> "Clientes com aumento de 42% na frequência de compra da categoria nos últimos 30 dias e 3× mais engajamento com push segmentado."

## Escopo

Editar apenas os 5 `arguments[]` de cada um dos 6 produtos em `src/data/kiosk/demos/propensityCampaign.ts`:

1. Kit Cuidados Premium (WhatsApp)
2. Linha de Bebidas Sazonais (Push) — usar sinais de clima/sazonalidade e PDV
3. Eletroportátil de Cozinha (E-mail)
4. Coleção Moda Nova Temporada (Push) — usar sinais de similares e evento (nova coleção)
5. Cartão Fidelidade Premium (WhatsApp)
6. Seguro Extensão de Garantia (Telefone) — usar janela pós-compra

Cada produto ganha 5 justificativas no novo padrão, coerentes com categoria, canal e sazonalidade. Nada além disso muda — nenhum componente, layout, label ou pipeline.

## Direção por produto (amostra de 1 frase cada, para calibrar o tom)

- **Kit Cuidados Premium** — "Base com aumento de 38% em recompra de dermocosméticos nos últimos 45 dias e resposta 2,4× maior a WhatsApp que a média da loja."
- **Bebidas Sazonais** — "Regiões com previsão de calor acima da média nos próximos 7 dias concentram 61% do consumo histórico da categoria — janela de ativação alinhada ao clima."
- **Eletroportátil** — "Compradores de utensílios de cozinha nos últimos 60 dias com abertura de e-mail 3,1× acima da média — comportamento típico de quem completa a cozinha."
- **Coleção Moda** — "Clientes parecidos com quem comprou na última coleção (mesmo estilo, mesma frequência) — 71% deles converteram na campanha anterior."
- **Cartão Fidelidade** — "Base que já usa o programa de pontos 2× por mês e concentra compras nas lojas com maior tíquete — perfil natural de upgrade."
- **Seguro Garantia** — "Clientes que compraram eletroportátil ou eletrônico nos últimos 30 dias — janela em que a decisão de proteger o produto é 4× mais aceita."

## Validação

- Typecheck após a edição.
- Conferir visualmente no `/kiosk` → Campanhas por Propensão que o card "POR QUE RECOMENDAMOS ESTA AUDIÊNCIA" agora exibe texto de negócio, sempre ancorado em comportamento (cliente / PDV / região / similares / clima / evento).