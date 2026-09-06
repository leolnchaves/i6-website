---
title: "Implemente a chamada"
slug: implemente-a-chamada
language: pt
section: getting-started
section_label: "Começar"
order: 12
description: "Estrutura da requisição de predição em cada método de integração."
sample: true
---

Com a credencial pronta, o próximo passo é emitir a requisição de predição.

:::tab api Via API

## Requisição

Envie o lote de entradas em JSON para o endpoint de predição.

## Limites

Respeite o tamanho máximo de lote documentado na referência da API.

:::tab sdk Via SDK

## Requisição

Chame o método de predição do cliente já inicializado.

## Limites

O SDK divide lotes grandes automaticamente.

:::tab server Servidor a servidor

## Requisição

Assine o corpo da requisição e envie a partir do ambiente controlado.

## Limites

Execuções em lote têm janela própria de processamento.
