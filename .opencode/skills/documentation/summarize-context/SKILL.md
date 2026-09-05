# summarize-context

## Objetivo
Resumir el contexto de una fase o ciclo de trabajo para reducir el consumo de tokens, preservando la información esencial para fases siguientes.

## Cuándo usar
- Al finalizar cada fase del workflow
- Cuando el contexto se acerca al límite de tokens
- Al pasar de una fase a otra (Discovery → Planning, Planning → Execution, etc.)

## Entradas
- Contexto completo de la fase actual (archivos, decisiones, hallazgos)
- Tipo de fase completada

## Procedimiento
1. Identificar la información crítica que necesita la siguiente fase
2. Resumir hallazgos: solo conclusiones, no el proceso completo
3. Conservar: decisiones tomadas, archivos modificados, bloqueos activos
4. Eliminar: debates, alternativas descartadas, código ya procesado
5. Formatear como: FASE, TAREA, DECISIONES ACTIVAS, ARCHIVOS, BLOQUEOS, PRÓXIMO PASO
6. Actualizar contexto del ciclo con el resumen

## Salida
- Contexto resumido (formato compacto)
- Referencias a memoria para detalle completo
- Estimación de tokens ahorrados
