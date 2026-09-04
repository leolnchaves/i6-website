---
title: "Referência da API"
slug: api-reference
language: pt
section: api
section_label: "API"
order: 30
description: "Recursos, parâmetros de requisição e códigos de erro das chamadas de predição."
sample: true
---

## Recursos

| Recurso | Método | Descrição |
| --- | --- | --- |
| `/v1/datasets` | `POST` | envia um lote de dados de entrada |
| `/v1/executions` | `POST` | dispara uma execução de modelagem |
| `/v1/predictions` | `GET` | lista predições de uma execução |

## Parâmetros de consulta

- `execution_id` — identificador da execução.
- `page_size` — quantidade de itens por página.
- `cursor` — ponteiro devolvido na resposta anterior.

```bash
curl -sS "$I6_API_BASE/v1/predictions?execution_id=$EXEC&page_size=100" \
  -H "Authorization: Bearer $I6_API_TOKEN"
```

## Códigos de Erro (400/401)

| Código | Significado | O que fazer |
| --- | --- | --- |
| `400` | requisição inválida | conferir o corpo e os campos obrigatórios |
| `401` | credencial ausente ou expirada | reemitir o token do ambiente |
| `429` | limite de chamadas atingido | aplicar recuo exponencial |

### Formato do erro

```json
{
  "error": {
    "code": "invalid_request",
    "message": "campo obrigatório ausente",
    "field": "execution_id"
  }
}
```

## Paginação

As respostas de lista devolvem `next_cursor` enquanto houver mais páginas. Quando o campo vem nulo, a leitura terminou.
