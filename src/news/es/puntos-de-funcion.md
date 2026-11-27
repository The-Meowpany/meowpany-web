---
title: "Cómo estimamos un proyecto: los puntos de función, explicados"
date: 2026-11-26
summary: "El método IFPUG que usamos para pasar de «qué tiene que hacer el sistema» a horas, plazo y precio, con un ejemplo completo."
tag: "Método"
---

Cuando un proveedor le pasa un precio sin explicar de dónde sale, usted no tiene forma de saber si es justo. Nosotros estimamos con **puntos de función**, un método estándar (IFPUG) que mide el tamaño de un sistema por lo que hace, no por cómo está programado.

## 1. Contar las funciones

Cada cosa que el sistema guarda o hace se clasifica en uno de cinco tipos, y cada tipo pesa según su complejidad:

| Tipo | Qué es | Baja | Media | Alta |
| --- | --- | --- | --- | --- |
| Archivo lógico interno (ILF) | Información que el sistema guarda: clientes, turnos, pedidos | 7 | 10 | 15 |
| Archivo de interfaz externa (EIF) | Información de otro sistema que se consulta: un proveedor de pagos | 5 | 7 | 10 |
| Entrada externa (EI) | Crear, editar o borrar algo | 3 | 4 | 6 |
| Salida externa (EO) | Informes, facturas, avisos automáticos | 4 | 5 | 7 |
| Consulta externa (EQ) | Buscar y ver información | 3 | 4 | 6 |

## 2. Ajustar por las características del sistema

Catorce características generales (comunicación, rendimiento, complejidad de las reglas, uso en varias sucursales, entre otras) se califican de 0 a 5. Su suma da el **factor de ajuste**: 0,65 + 0,01 × la suma, entre 0,65 y 1,35.

## 3. Pasar a horas, plazo y precio

Multiplicamos los puntos ajustados por nuestra productividad, hoy calibrada en **3 horas por punto**, y las horas por la tarifa de **USD 35**. El rango de precio que mostramos es de un 20 % hacia abajo y hacia arriba de ese valor.

## Un ejemplo

Un sistema que guarda clientes (con varios datos cada uno), emite facturas complejas, cobra en línea, tiene dos tipos de usuario y envía avisos automáticos:

- **61 puntos de función** sin ajustar.
- Factor de ajuste **1,01** (pocas personas a la vez, reglas moderadas).
- **61,61 puntos ajustados × 3 horas = 185 horas**.
- Precio de referencia **USD 6.475**, con un rango de **USD 5.180 a USD 7.770**.
- Unas **4,7 semanas** con un equipo de 40 horas semanales.

## Pruébelo con su proyecto

El [estimador](/estimar/) hace este cálculo con sus respuestas, en su navegador, y le muestra cada función y su peso. Es una estimación previa: el precio cerrado se fija después de la llamada y de ver la primera versión funcionando.
