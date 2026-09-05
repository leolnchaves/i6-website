---
title: "Tour en video"
slug: video-tour
language: es
section: resources
section_label: "Recursos"
order: 40
description: "Recorrido guiado de una ejecución completa, del envío de datos a la lectura de predicciones."
content_type: video
video_provider: youtube
video_id: aqz-KE-bpKQ
sample: true
---

## Qué cubre el video

El tour recorre una ejecución completa en la plataforma, en el mismo orden en
que ocurre una integración real:

1. envío del lote de datos de entrada
2. disparo de la ejecución de modelado
3. lectura de predicciones e indicadores de calidad
4. publicación del resultado en el sistema de destino

## Antes de verlo

Recomendamos leer primero la página de autenticación — el video asume que el
token de acceso ya fue emitido.

```bash
curl -X POST https://api.infinity6.ai/v1/executions \
  -H "Authorization: Bearer $I6_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"dataset_id":"ds_ejemplo"}'
```

## Después del video

La referencia de la API detalla cada parámetro mostrado en el tour, incluidos
los códigos de error que aparecen en la etapa de validación.
