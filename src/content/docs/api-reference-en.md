---
title: "API reference"
slug: api-reference
language: en
section: api
section_label: "API"
order: 30
description: "Resources, request parameters and error codes for prediction calls."
sample: true
---

## Resources

| Resource | Method | Description |
| --- | --- | --- |
| `/v1/datasets` | `POST` | send a batch of input data |
| `/v1/executions` | `POST` | trigger a modeling execution |
| `/v1/predictions` | `GET` | list predictions of an execution |

## Query parameters

- `execution_id` — execution identifier.
- `page_size` — number of items per page.
- `cursor` — pointer returned by the previous response.

```bash
curl -sS "$I6_API_BASE/v1/predictions?execution_id=$EXEC&page_size=100" \
  -H "Authorization: Bearer $I6_API_TOKEN"
```

## Error Codes (400/401)

| Code | Meaning | What to do |
| --- | --- | --- |
| `400` | invalid request | check the body and required fields |
| `401` | missing or expired credential | reissue the environment token |
| `429` | rate limit reached | apply exponential backoff |

### Error shape

```json
{
  "error": {
    "code": "invalid_request",
    "message": "required field missing",
    "field": "execution_id"
  }
}
```

## Pagination

List responses return `next_cursor` while more pages exist. A null value means the read is complete.
