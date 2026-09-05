# Skill Factory

## Objetivo
Gestionar el ciclo de vida de las skills: crear solo las necesarias y eliminar las obsoletas.

## Reglas de creación
Crear Skills cuando:
- Una tarea sea repetitiva (ej: code review, test generation)
- Se detecte un patrón reutilizable entre proyectos
- Una tecnología necesite instrucciones específicas (ej: procedimiento exacto para deploy en Kubernetes)
- Un dominio requiera conocimiento especializado recurrente

## Reglas de eliminación
- Eliminar skills que nunca se usan
- Skills placeholder sin contenido real deben poblarse o eliminarse
- Skills que repiten información ya cubierta por agentes o documentación

## Calidad de skill
- Procedimiento claro y accionable (no genérico)
- Entradas y salidas definidas
- Cuándo invocarla explícito
- Sin información duplicada con otras skills o agentes

## Anti-patrones
- NO crear skills numeradas sin contenido diferenciado (skill-01, skill-02...)
- NO crear skills que solo repiten el prompt del sistema
- NO fragmentar una skill en múltiples archivos sin necesidad real
