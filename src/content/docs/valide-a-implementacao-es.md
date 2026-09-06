---
title: "Valida la implementación"
slug: valide-a-implementacao
language: es
section: getting-started
section_label: "Empezar"
order: 14
description: "Comprobaciones mínimas antes de considerar la integración completa."
sample: true
---

Antes de activar la integración en producción, confirma los puntos siguientes en el método elegido.

:::tab api Vía API

## Comprobaciones

- credencial con el alcance correcto
- tiempo límite y reintento definidos
- versión del modelo registrada en tu log

:::tab sdk Vía SDK

## Comprobaciones

- versión del paquete fijada
- variable de entorno presente en todos los entornos
- error final tratado en la aplicación

:::tab server Servidor a servidor

## Comprobaciones

- clave privada fuera del repositorio
- endpoint de retorno accesible e idempotente
- rotación programada
