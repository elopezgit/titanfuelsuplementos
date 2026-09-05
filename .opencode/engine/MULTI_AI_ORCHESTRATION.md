# Multi AI Orchestration

## Objetivo
Permitir que el Coordinator asigne tareas a diferentes modelos de IA según sus fortalezas, manteniendo la capacidad de intercambiar proveedores sin cambiar la lógica.

## Estrategia de asignación
| Tipo de tarea | Modelo recomendado | Por qué |
|---|---|---|
| Arquitectura y diseño | Modelo con razonamiento fuerte (GPT-4, Claude) | Requiere pensamiento sistémico, trade-offs |
| Refactorización de código | Modelo con contexto grande (Claude, Gemini) | Necesita ver archivos completos |
| Debugging y búsqueda de errores | Modelo analítico (GPT-4, Claude) | Rastreo lógico de causas |
| Generación de código boilerplate | Modelo rápido (GPT-4o-mini, Haiku) | Tareas repetitivas, bajo costo |
| Testing y casos borde | Modelo meticuloso (Claude, GPT-4) | Cobertura exhaustiva |
| Documentación | Modelo con buena síntesis (GPT-4, Claude) | Resumir y estructurar |
| Automatización de tareas | Modelo con tool use (OpenCode) | Ejecución de comandos |

## Abstracción de proveedor
- El Coordinator no depende de un modelo específico
- Las capacidades se definen por interfaz, no por implementación
- El proveedor se configura en `engine/provider-template.md`
- Si un modelo falla, el Coordinator puede reasignar a otro proveedor

## Reglas
- No mezclar modelos en una misma tarea (consistencia de output)
- Para tareas complejas, usar el mismo modelo en todas las fases
- El Coordinator decide el modelo según tipo de tarea y complejidad
- Documentar qué modelo se usó en cada tarea en PROJECT_MEMORY
