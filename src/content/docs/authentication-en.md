---
title: "Authentication"
slug: authentication
language: en
section: start
section_label: "Get started"
order: 20
description: "How credentials are issued, used and rotated on calls to the engines."
sample: true
---

## Authentication and Authorization

Calls are authenticated with a token in the `Authorization` header. Each token belongs to one environment and carries the read or write scope granted to the integration.

```bash
curl -sS "$I6_API_BASE/v1/predictions" \
  -H "Authorization: Bearer $I6_API_TOKEN" \
  -H "Content-Type: application/json"
```

### Scopes

| Scope | Allows |
| --- | --- |
| `read` | query predictions and executions |
| `write` | send data and trigger executions |

## Install via npm

The official client wraps authentication, retries and pagination.

```bash
npm install @infinity6/sdk
```

```ts
import { createClient } from '@infinity6/sdk';

const client = createClient({ token: process.env.I6_API_TOKEN });
```

## Credential rotation

Tokens rotate without downtime: the new token takes effect immediately and the previous one keeps working during the overlap window configured for the environment.
