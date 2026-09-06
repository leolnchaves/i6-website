---
title: "Trata la respuesta"
slug: trate-a-resposta
language: es
section: getting-started
section_label: "Empezar"
order: 13
description: "Lectura del resultado, errores previsibles y reintentos en cada método."
sample: true
---

La respuesta de predicción tiene la misma forma en los tres métodos; el manejo de errores es lo que cambia.

:::tab api Vía API

## Resultado

Lee el cuerpo JSON y valida el campo de versión del modelo.

## Errores

Trata explícitamente 401, 429 y 5xx con reintento propio.

:::tab sdk Vía SDK

## Resultado

El retorno ya viene tipado.

## Errores

El cliente aplica reintento y retroceso; captura solo el error final.

:::tab server Servidor a servidor

## Resultado

En ejecución asíncrona, el resultado llega a tu endpoint de retorno.

## Errores

Confirma la recepción para evitar el reenvío de la misma ejecución.
