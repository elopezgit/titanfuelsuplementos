# create-adr

## Objetivo
Crear Architecture Decision Records (ADRs) para documentar decisiones arquitectónicas importantes, su contexto, alternativas consideradas y consecuencias.

## Cuándo usar
- Se cambia la arquitectura del proyecto
- Se adopta una nueva tecnología o framework
- Se modifica un contrato de API
- Se cambia la estructura de BD
- Cualquier decisión con impacto en mantenibilidad, rendimiento o seguridad

## Entradas
- Contexto de la decisión (problema a resolver)
- Alternativas consideradas
- Criterios de evaluación
- Decisión tomada

## Procedimiento
1. Identificar el contexto: ¿qué problema resuelve esta decisión?
2. Listar alternativas consideradas (mínimo 2-3)
3. Evaluar cada alternativa contra: costo, complejidad, mantenibilidad, rendimiento, seguridad
4. Documentar la decisión final y justificación
5. Registrar consecuencias positivas y negativas
6. Usar el template ADR_TEMPLATE.md de templates/

## Salida
- Archivo ADR formateado (ej: `ADR-004-arquitectura-hexagonal.md`)
- Actualización de DECISIONS.md en memoria
