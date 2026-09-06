---
title: "Elige el método"
slug: escolha-o-metodo
language: es
section: getting-started
section_label: "Empezar"
order: 10
description: "Tres caminos de integración con la misma predicción al final: API directa, SDK o servidor a servidor."
sample: true
---

Toda integración con i6 entrega la misma predicción. Lo que cambia es el camino
hacia ella — y esa elección depende del control que tu equipo quiera mantener
sobre la llamada.

Elige una pestaña para ver el camino correspondiente. La elección hecha aquí
vale para los próximos pasos de esta sección.

:::tab api Vía API

## Cuándo usar la API directa

Usa la llamada directa cuando el equipo ya tiene su propia capa de integración y
quiere control total sobre autenticación, reintentos y observabilidad.

- ninguna dependencia adicional en tu proyecto
- contrato HTTP estable, versionado por encabezado
- controlas el tiempo límite y la política de reintentos

## Costo de mantenimiento

Asumes la serialización del payload y el manejo de errores. Es el camino más
transparente y el que exige más código de tu lado.

:::tab sdk Vía SDK

## Cuándo usar el SDK

Usa el SDK cuando la prioridad es llegar rápido a la primera predicción, con
tipado y reintentos ya resueltos.

- tipos listos para las entradas y salidas de predicción
- reintento con retroceso exponencial incorporado
- renovación de credencial transparente

## Costo de mantenimiento

Sigues la versión del paquete. A cambio, casi ningún código de infraestructura
queda en tu repositorio.

:::tab server Servidor a servidor

## Cuándo usar servidor a servidor

Usa el modo servidor a servidor cuando las llamadas salen de un entorno
controlado, sin navegador en el camino, y el volumen es previsible en lotes.

- credencial de larga duración guardada solo en el servidor
- ideal para ejecuciones en lote y ventanas programadas
- ninguna exposición de clave en el cliente

## Costo de mantenimiento

Exige un proceso de rotación de credencial de tu lado y un endpoint propio para
recibir el resultado cuando la ejecución es asíncrona.
