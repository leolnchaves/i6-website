---
title: "Valide a implementação"
slug: valide-a-implementacao
language: pt
section: getting-started
section_label: "Começar"
order: 14
description: "Checagens mínimas antes de considerar a integração concluída."
sample: true
---

Antes de ligar a integração em produção, confirme os pontos abaixo no método escolhido.

:::tab api Via API

## Checagens

- credencial com escopo correto
- tempo limite e retentativa definidos
- versão do modelo registrada no seu log

:::tab sdk Via SDK

## Checagens

- versão do pacote fixada
- variável de ambiente presente em todos os ambientes
- erro final tratado na aplicação

:::tab server Servidor a servidor

## Checagens

- chave privada fora do repositório
- endpoint de retorno acessível e idempotente
- rotação agendada
