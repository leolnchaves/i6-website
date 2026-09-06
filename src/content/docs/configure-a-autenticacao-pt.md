---
title: "Configure a autenticação"
slug: configure-a-autenticacao
language: pt
section: getting-started
section_label: "Começar"
order: 11
description: "Credenciais, escopos e rotação em cada um dos três métodos de integração."
sample: true
---

A autenticação é o primeiro ponto que difere entre os três métodos. Em todos
eles, a credencial nunca deve chegar ao navegador do usuário final.

:::tab api Via API

## Credencial e cabeçalho

A chamada direta usa uma chave de projeto enviada no cabeçalho `Authorization`.

```bash
curl https://api.exemplo.i6/v1/predict \
  -H "Authorization: Bearer $I6_API_KEY" \
  -H "Content-Type: application/json"
```

@video youtube aqz-KE-bpKQ | Configuração da credencial passo a passo

## Escopos

Cada chave carrega escopos explícitos. Peça apenas `predict:read` para consumo de
predição — escopos de escrita ficam reservados a processos de ingestão.

## Rotação

Gere a nova chave antes de revogar a antiga: as duas coexistem por 24 horas.

:::tab sdk Via SDK

## Inicialização do cliente

O SDK lê a credencial do ambiente e cuida da renovação.

```ts
import { I6Client } from '@i6/sdk';

const client = new I6Client({
  apiKey: process.env.I6_API_KEY!,
  project: 'demo',
});
```

## Escopos

O cliente falha na inicialização quando a chave não tem o escopo necessário, com
mensagem explícita — não há erro silencioso em tempo de chamada.

## Rotação

Troque a variável de ambiente e reinicie o processo. Nenhuma mudança de código.

:::tab server Servidor a servidor

## Credencial de longa duração

No modo servidor a servidor a credencial é um par de chaves: identificador
público e chave privada, usada para assinar cada requisição.

```bash
I6_CLIENT_ID=cli_demo
I6_PRIVATE_KEY=/etc/i6/private.pem
```

A chave privada nunca sai do servidor e não deve ser versionada.

@download src/assets/docs-exemplo.pdf.asset.json | Checklist de rotação de credenciais

## Rotação

A rotação é agendada: registre a nova chave pública, aguarde a janela de
sobreposição e só então remova a anterior.
