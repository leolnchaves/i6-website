---
title: "Referencia de la API"
slug: api-reference
language: es
section: api
section_label: "API"
order: 30
description: "Recursos, parámetros de consulta y códigos de error de las llamadas de predicción."
sample: true
---

## Recursos

| Recurso | Método | Descripción |
| --- | --- | --- |
| `/v1/datasets` | `POST` | envía un lote de datos de entrada |
| `/v1/executions` | `POST` | dispara una ejecución de modelado |
| `/v1/predictions` | `GET` | lista predicciones de una ejecución |

## Parámetros de consulta

- `execution_id` — identificador de la ejecución.
- `page_size` — cantidad de elementos por página.
- `cursor` — puntero devuelto en la respuesta anterior.

```bash
curl -sS "$I6_API_BASE/v1/predictions?execution_id=$EXEC&page_size=100" \
  -H "Authorization: Bearer $I6_API_TOKEN"
```

## Códigos de Error (400/401)

| Código | Significado | Qué hacer |
| --- | --- | --- |
| `400` | solicitud inválida | revisar el cuerpo y los campos obligatorios |
| `401` | credencial ausente o expirada | reemitir el token del entorno |
| `429` | límite de llamadas alcanzado | aplicar retroceso exponencial |

### Formato del error

```json
{
  "error": {
    "code": "invalid_request",
    "message": "campo obligatorio ausente",
    "field": "execution_id"
  }
}
```

## Paginación

Las respuestas de lista devuelven `next_cursor` mientras haya más páginas. Cuando el campo llega nulo, la lectura terminó.
