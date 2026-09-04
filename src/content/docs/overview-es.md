---
title: "Visión general"
slug: overview
language: es
section: start
section_label: "Empezar"
order: 10
description: "Cómo está organizada la documentación y por dónde empezar a integrar con los engines de i6."
sample: true
---

## Qué encontrarás aquí

Esta área reúne la referencia técnica de integración con los engines de i6: cómo autenticar, cómo enviar datos, cómo consumir predicciones y cómo seguir las ejecuciones.

La navegación de la izquierda sigue el orden de lectura sugerido. El índice de la derecha ayuda a moverse dentro de una página larga.

## Estructura de la documentación

- **Empezar** — visión general, primeros pasos y autenticación.
- **API** — referencia de recursos, parámetros y códigos de error.

## ¿Cómo empezar?

El punto de partida es obtener las credenciales del entorno y confirmar el acceso al endpoint de salud del servicio.

```bash
curl -sS "$I6_API_BASE/health" \
  -H "Authorization: Bearer $I6_API_TOKEN"
```

## Convenciones

Todos los ejemplos usan variables de entorno para credenciales, JSON como formato de intercambio y fechas en UTC en formato ISO 8601.
