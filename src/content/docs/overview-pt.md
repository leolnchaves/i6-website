---
title: "Visão geral"
slug: overview
language: pt
section: start
section_label: "Começar"
order: 10
description: "Como a documentação está organizada e por onde começar a integrar com as engines da i6."
sample: true
---

## O que você encontra aqui

Esta área reúne a referência técnica de integração com as engines da i6: como autenticar, como enviar dados, como consumir predições e como acompanhar execuções.

A navegação à esquerda segue a ordem sugerida de leitura. O índice à direita ajuda a circular dentro de uma página longa.

## Estrutura da documentação

- **Começar** — visão geral, primeiros passos e autenticação.
- **API** — referência dos recursos, parâmetros e códigos de erro.

## Configuração Inicial

O ponto de partida é obter as credenciais de ambiente e confirmar o acesso ao endpoint de saúde do serviço.

```bash
curl -sS "$I6_API_BASE/health" \
  -H "Authorization: Bearer $I6_API_TOKEN"
```

## Convenções

Todos os exemplos usam variáveis de ambiente para credenciais, JSON como formato de troca e datas em UTC no formato ISO 8601.
