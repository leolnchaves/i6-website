---
title: "Autenticación"
slug: authentication
language: es
section: start
section_label: "Empezar"
order: 20
description: "Cómo se emiten, usan y rotan las credenciales en las llamadas a los engines."
sample: true
---

## Autenticación y Autorización

Las llamadas se autentican con un token en el encabezado `Authorization`. Cada token pertenece a un entorno y lleva el alcance de lectura o escritura concedido a la integración.

```bash
curl -sS "$I6_API_BASE/v1/predictions" \
  -H "Authorization: Bearer $I6_API_TOKEN" \
  -H "Content-Type: application/json"
```

### Alcances

| Alcance | Permite |
| --- | --- |
| `read` | consultar predicciones y ejecuciones |
| `write` | enviar datos y disparar ejecuciones |

## Instalación vía npm

El cliente oficial encapsula autenticación, reintentos y paginación.

```bash
npm install @infinity6/sdk
```

```ts
import { createClient } from '@infinity6/sdk';

const client = createClient({ token: process.env.I6_API_TOKEN });
```

## Rotación de credenciales

Los tokens se rotan sin interrupción: el nuevo token pasa a valer de inmediato y el anterior sigue aceptado durante la ventana de solapamiento configurada en el entorno.
