---
title: "Implementa la llamada"
slug: implemente-a-chamada
language: es
section: getting-started
section_label: "Empezar"
order: 12
description: "Estructura de la solicitud de predicción en cada método de integración."
sample: true
---

Con la credencial lista, el próximo paso es emitir la solicitud de predicción.

:::tab api Vía API

## Solicitud

Envía el lote de entradas en JSON al endpoint de predicción.

## Límites

Respeta el tamaño máximo de lote documentado en la referencia de la API.

:::tab sdk Vía SDK

## Solicitud

Llama al método de predicción del cliente ya inicializado.

## Límites

El SDK divide lotes grandes automáticamente.

:::tab server Servidor a servidor

## Solicitud

Firma el cuerpo de la solicitud y envíala desde el entorno controlado.

## Límites

Las ejecuciones en lote tienen su propia ventana de procesamiento.
