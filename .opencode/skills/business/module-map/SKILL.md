# module-map

## Objetivo
Crear y mantener un mapa de módulos funcionales del proyecto, documentando su propósito, responsabilidades, dependencias y estado.

## Cuándo usar
- Proyecto nuevo (definir estructura de módulos)
- Refactorización que reorganiza módulos
- Onboarding de nuevos desarrolladores
- Documentación de arquitectura

## Entradas
- Código fuente (estructura de carpetas)
- Entidades y casos de uso del dominio
- Mapa de dependencias existente

## Procedimiento
1. Listar todos los módulos funcionales del proyecto
2. Por cada módulo documentar: nombre, propósito, responsabilidades
3. Identificar dependencias entre módulos (qué módulo usa a qué otro)
4. Evaluar: ¿cada módulo tiene una responsabilidad única y clara?
5. Detectar módulos con responsabilidades mezcladas
6. Identificar módulos candidatos a dividir o fusionar
7. Asignar estado: estable, en desarrollo, legacy, deprecated

## Salida
- Mapa de módulos con responsabilidades
- Dependencias entre módulos
- Recomendaciones de reorganización
- Estado de cada módulo
