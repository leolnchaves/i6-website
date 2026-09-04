---
title: "Autenticação"
slug: authentication
language: pt
section: start
section_label: "Começar"
order: 20
description: "Como as credenciais são emitidas, usadas e rotacionadas nas chamadas às engines."
sample: true
---

## Autenticação e Autorização

As chamadas são autenticadas por token no cabeçalho `Authorization`. Cada token pertence a um ambiente e carrega o escopo de leitura ou escrita concedido à integração.

```bash
curl -sS "$I6_API_BASE/v1/predictions" \
  -H "Authorization: Bearer $I6_API_TOKEN" \
  -H "Content-Type: application/json"
```

### Escopos

| Escopo | Permite |
| --- | --- |
| `read` | consultar predições e execuções |
| `write` | enviar dados e disparar execuções |

## Instalação vía npm

O cliente oficial encapsula autenticação, tentativas e paginação.

```bash
npm install @infinity6/sdk
```

```ts
import { createClient } from '@infinity6/sdk';

const client = createClient({ token: process.env.I6_API_TOKEN });
```

## Rotação de credenciais

Tokens são rotacionáveis sem interrupção: o token novo passa a valer imediatamente e o antigo continua aceito durante a janela de sobreposição configurada no ambiente.
