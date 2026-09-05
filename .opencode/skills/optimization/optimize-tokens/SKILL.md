# optimize-tokens

## Objetivo
Optimizar el consumo de tokens del modelo de lenguaje en cada ciclo del workflow, cargando solo el contexto mínimo necesario.

## Cuándo usar
- Al inicio de cada ciclo de trabajo
- Cuando el contexto se está acercando al límite
- Para revisar si se está cargando información innecesaria
- Como skill de apoyo del Coordinator y Token Optimizer

## Entradas
- Contexto actual cargado (archivos, prompts, memoria)
- Límites de tokens del modelo

## Procedimiento
1. Priorizar contexto por orden de importancia: PROJECT_PROFILE > memoria > tarea > skills > código
2. Reemplazar código completo con resúmenes cuando sea posible
3. Usar referencias en lugar de repetir información ya almacenada
4. Eliminar información de fases completadas del ciclo actual
5. Trabajar por módulos pequeños, no archivos completos
6. Si el contexto excede el límite, reducir en orden inverso de prioridad

## Salida
- Contexto optimizado para la fase actual
- Referencias a memoria en lugar de contenido duplicado
- Estimación de tokens usados vs disponibles
