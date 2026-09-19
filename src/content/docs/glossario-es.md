---
title: "Glosario"
slug: glossario
language: es
section: glossary
section_label: "Glosario"
order: 50
description: "Vocabulario técnico completo de la inteligencia i6: algoritmos, métricas de decisión y términos de operación usados en la documentación y en las páginas de producto."
site_managed: true
---

Este glosario reúne, con definición completa, los términos que aparecen de forma condensada en las páginas de producto. Orden alfabético, para consulta directa.

## Active Learning

Estrategia de entrenamiento en la que el propio modelo elige qué muestras deben etiquetarse o incorporarse al ciclo de aprendizaje, en lugar de consumir todo el dato disponible de forma indiscriminada. El criterio suele ser la incertidumbre: el modelo prioriza los ejemplos sobre los que tiene menos convicción, porque son los que más reducen el error al ser aprendidos.

En la práctica esto acorta el tiempo de adaptación a un nuevo cliente o dominio y reduce el costo de anotación, porque un volumen pequeño de datos bien elegido sustituye a un volumen grande de datos redundantes.

## Adherencia contextual

Grado en que una decisión producida por el modelo tiene sentido en el contexto donde se aplicará — momento, canal, restricción operativa e historial inmediato del cliente o del producto. Una recomendación estadísticamente correcta puede tener baja adherencia contextual si ignora que el artículo está sin stock, que el cliente acaba de comprar el mismo producto o que el canal no admite ese formato de oferta.

Por eso los engines i6 tratan contexto y restricción como parte de la función de decisión, no como filtro aplicado después del resultado.

## Elasticidad dinámica

Sensibilidad de la demanda al precio, calculada de forma continua por SKU, canal y etapa del ciclo de vida, en lugar de fijarse en una curva estática revisada de vez en cuando. Cada nuevo ciclo de datos recalcula la elasticidad, lo que permite reaccionar a movimientos de la competencia, estacionalidad y comportamiento de compra sin esperar una ronda manual de precios.

Las restricciones de margen y posicionamiento entran como límites del modelo, así que el precio sugerido nunca sale del rango aceptable para el negocio.

## i6-RecSys-Base.g1

Modelo fundacional propio de infinity6, base compartida por los tres motores. Combina MAML, Active Learning, Topological Loss y External Memory y se adapta con pocas muestras por cliente.

## MAML

Sigla de Model-Agnostic Meta-Learning, algoritmo publicado por Finn, Abbeel y Levine en 2017. En lugar de entrenar un modelo para resolver bien una tarea, MAML entrena un punto de partida de parámetros que se adapta a una tarea nueva con muy pocas actualizaciones y muy pocos datos.

Es la base del i6-RecSys-Base.g1 y la razón por la que un nuevo cliente entra en operación con pocas muestras propias, heredando lo que el modelo fundacional ya aprendió.

## Predicción conductual

Modelado que aprende el comportamiento efectivamente observado de un cliente, canal o producto a partir de datos transaccionales — qué se compró, cuándo, en qué contexto — y no de preferencias declaradas en un formulario o encuesta. El objetivo es anticipar la próxima acción relevante, no describir el pasado.

Vale tanto para usuarios identificados como anónimos, porque el comportamiento se representa en el mismo espacio latente exista o no una cuenta asociada.

## Propensión de conversión

Probabilidad estimada de que una persona, en un contexto específico, ejecute la acción de interés — comprar, contratar, renovar, responder a una oferta. Es una salida calibrada: por ejemplo, una propensión del 30% indica que, de cada 100 casos de esa franja, alrededor de 30 deberían convertir, lo que permite usar el número en decisiones de corte y priorización.

Se usa para ordenar el esfuerzo comercial y decidir quién recibe cada oferta, en lugar de aplicar el mismo enfoque a toda la base.

## Ruptura de góndola

Situación en la que el producto no está disponible en el punto de venta justo cuando el cliente quiere comprarlo, aunque haya stock en otro punto de la cadena. A diferencia de un quiebre general de stock, es un problema de asignación y reposición — el artículo existe, pero no donde ocurrió la demanda.

Cuesta la venta inmediata y, cuando es recurrente, desplaza la preferencia hacia la marca competidora. Es uno de los objetivos directos de la previsión granular por SKU y punto de venta.

## Topological Loss

Función de pérdida que, además del error de predicción, penaliza la distorsión de las relaciones topológicas entre ejemplos en el espacio latente — es decir, exige que los elementos cercanos en el mundo real permanezcan cercanos en la representación aprendida.

El efecto práctico es un embedding más estable y una mejor generalización con pocas muestras, porque la estructura aprendida en el preentrenamiento no se deshace al adaptar el modelo a un dominio nuevo.
