---
title: "Escolha o método"
slug: escolha-o-metodo
language: pt
section: getting-started
section_label: "Começar"
order: 10
description: "Três caminhos de integração com a mesma predição no fim: API direta, SDK ou servidor a servidor."
sample: true
---

Toda integração com a i6 entrega a mesma predição. O que muda é o caminho
até ela — e essa escolha depende do controle que o seu time quer manter sobre a
chamada.

Escolha uma aba abaixo para ver o caminho correspondente. A escolha feita aqui
vale para os próximos passos desta seção.

:::tab api Via API

## Quando usar a API direta

Use a chamada direta quando o time já tem uma camada de integração própria e
quer controle total sobre autenticação, retentativa e observabilidade.

- nenhuma dependência adicional no seu projeto
- contrato HTTP estável, versionado por cabeçalho
- você controla o tempo limite e a política de retentativa

## Custo de manutenção

Você assume a serialização do payload e o tratamento de erro. É o caminho mais
transparente e o que exige mais código do seu lado.

:::tab sdk Via SDK

## Quando usar o SDK

Use o SDK quando a prioridade é chegar à primeira predição rápido, com tipagem e
retentativa já resolvidas.

- tipos prontos para as entradas e saídas de predição
- retentativa com backoff exponencial embutida
- renovação de credencial transparente

## Custo de manutenção

Você acompanha a versão do pacote. Em troca, quase nenhum código de
infraestrutura fica no seu repositório.

:::tab server Servidor a servidor

## Quando usar servidor a servidor

Use o modo servidor a servidor quando as chamadas partem de um ambiente
controlado, sem navegador no caminho, e o volume é previsível em lote.

- credencial de longa duração guardada apenas no servidor
- ideal para execuções em lote e janelas agendadas
- nenhuma exposição de chave no cliente

## Custo de manutenção

Exige um processo de rotação de credencial no seu lado e um endpoint próprio
para receber o resultado quando a execução é assíncrona.
