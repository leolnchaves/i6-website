---
title: "Trate a resposta"
slug: trate-a-resposta
language: pt
section: getting-started
section_label: "Começar"
order: 13
description: "Leitura do resultado, erros previsíveis e retentativa em cada método."
sample: true
---

A resposta de predição tem a mesma forma nos três métodos; o tratamento de erro é o que muda.

:::tab api Via API

## Resultado

Leia o corpo JSON e valide o campo de versão do modelo.

## Erros

Trate explicitamente 401, 429 e 5xx com retentativa própria.

:::tab sdk Via SDK

## Resultado

O retorno já vem tipado.

## Erros

Retentativa e backoff são aplicados pelo cliente; capture apenas o erro final.

:::tab server Servidor a servidor

## Resultado

Em execução assíncrona, o resultado chega ao seu endpoint de retorno.

## Erros

Confirme o recebimento para evitar reenvio da mesma execução.
