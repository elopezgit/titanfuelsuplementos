# Compresor de Contexto

## Propósito
Reducir el tamaño del contexto compartido entre ciclos del workflow para optimizar tokens.

## Reglas
1. Resumir el historial de la sesión actual después de cada fase
2. Mantener solo las decisiones activas, no el debate completo
3. Conservar referencias a archivos modificados, no su contenido
4. Eliminar contexto de fases completadas del ciclo actual
5. Los ADRs contienen el detalle completo; la memoria solo referencias

## Formato de contexto comprimido
```
FASE: [actual]
TAREA: [descripción]
DECISIONES ACTIVAS: [lista]
ARCHIVOS MODIFICADOS: [lista]
BLOQUEOS: [lista]
PRÓXIMO PASO: [descripción]
```
