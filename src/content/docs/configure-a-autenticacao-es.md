---
title: "Configura la autenticación"
slug: configure-a-autenticacao
language: es
section: getting-started
section_label: "Empezar"
order: 11
description: "Credenciales, alcances y rotación en cada uno de los tres métodos de integración."
sample: true
---

La autenticación es el primer punto que difiere entre los tres métodos. En todos
ellos, la credencial nunca debe llegar al navegador del usuario final.

:::tab api Vía API

## Credencial y encabezado

La llamada directa usa una clave de proyecto enviada en el encabezado
`Authorization`.

```bash
curl https://api.ejemplo.i6/v1/predict \
  -H "Authorization: Bearer $I6_API_KEY" \
  -H "Content-Type: application/json"
```

@video youtube aqz-KE-bpKQ | Configuración de la credencial paso a paso

## Alcances

Cada clave lleva alcances explícitos. Pide solo `predict:read` para consumo de
predicción — los alcances de escritura quedan reservados a la ingesta.

## Rotación

Genera la nueva clave antes de revocar la anterior: ambas coexisten 24 horas.

:::tab sdk Vía SDK

## Inicialización del cliente

El SDK lee la credencial del entorno y se encarga de la renovación.

```ts
import { I6Client } from '@i6/sdk';

const client = new I6Client({
  apiKey: process.env.I6_API_KEY!,
  project: 'demo',
});
```

## Alcances

El cliente falla en la inicialización cuando la clave no tiene el alcance
necesario, con mensaje explícito — no hay error silencioso en la llamada.

## Rotación

Cambia la variable de entorno y reinicia el proceso. Ningún cambio de código.

:::tab server Servidor a servidor

## Credencial de larga duración

En el modo servidor a servidor la credencial es un par de claves: identificador
público y clave privada, usada para firmar cada solicitud.

```bash
I6_CLIENT_ID=cli_demo
I6_PRIVATE_KEY=/etc/i6/private.pem
```

La clave privada nunca sale del servidor y no debe versionarse.

@download src/assets/docs-exemplo.pdf.asset.json | Lista de rotación de credenciales

## Rotación

La rotación es programada: registra la nueva clave pública, espera la ventana de
solapamiento y solo entonces elimina la anterior.
