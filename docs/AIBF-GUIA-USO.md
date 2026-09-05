# Guía de Uso - aibf-central

## Inicio rápido

1. Copia `aibf-central/` como base de tu proyecto
2. El asistente IA leerá `AIBF-COMPLETE.md` como contexto inicial
3. El asistente actuará como Coordinator del framework automáticamente

## Workflow diario

### Primera vez
```
Usuario: "Inicia este proyecto con AIBF"
→ El asistente ejecuta:
  1. Bootstrap (crea estructura base)
  2. Discovery (explora código, stack, dominio)
  3. Genera PROJECT_PROFILE y PROJECT_MEMORY
  4. Muestra resumen y pide aprobación
```

### Tareas nuevas
```
Usuario: "Necesito [funcionalidad]"
→ El asistente ejecuta el ciclo completo:
  1. Discovery → Análisis → Comprensión de negocio
  2. Preguntas de clarificación (si aplica)
  3. Resumen → Aprobación del usuario
  4. Planning → Selección de agentes y skills
  5. Implementación → Validación → Documentación
  6. Actualización de memoria
```

### Sesiones siguientes
```
Usuario: "Continúa. Lee PROJECT_MEMORY."
→ El asistente recupera el contexto y continúa
```

## Invocación de agentes

Los agentes se invocan automáticamente según la tarea:

| Tarea | Agente principal | Agentes de soporte |
|---|---|---|
| Nueva funcionalidad | Coordinator | Software Architect, Backend, Frontend, QA |
| Problema de rendimiento | Performance Expert | Backend, Frontend, Database |
| Bug crítico | QA Expert | Backend, Frontend, Database |
| Deuda técnica | Tech Lead | Software Architect, Backend |
| Diseño de UI | UX Designer | Frontend, Product Owner |
| Seguridad | Security Expert | DevOps, Backend |
| Datos/Analítica | Data Scientist | Data Engineer, Backend |
| Infraestructura | DevOps/SRE | Cloud Architect, Backend |
| Proceso ágil | Scrum Master | Product Owner, Tech Lead |
| Cumplimiento legal | Compliance Officer | Product Owner, Security |
| App móvil | Mobile Expert | Backend, UX Designer, QA |
| Nube/Migración | Cloud Architect | DevOps, SRE, Security |

## Archivos clave

| Archivo | Rol |
|---|---|
| `AIBF-COMPLETE.md` | Contexto principal del framework |
| `AGENTS.md` | Configuración del asistente |
| `.opencode/workflow/WORKFLOW.md` | Workflow oficial (12 fases) |
| `.opencode/workflow/ORCHESTRATOR.md` | Reglas del orquestador |
| `.opencode/agents/coordinator.md` | Reglas del Coordinator |
| `.opencode/agents/*.md` | 22 agentes especializados |
| `.opencode/skills/expert/` | 110 skills expertas (11 áreas x 10) |
| `.opencode/memory/` | Memoria del proyecto |
| `.opencode/templates/` | Templates listos |
| `.opencode/prompts/` | Biblioteca de prompts |

## Comandos rápidos sugeridos

| Frase | Acción |
|---|---|
| "Inicia este proyecto" | Bootstrap completo + Discovery |
| "Analiza el código actual" | Discovery del proyecto existente |
| "Agrega [funcionalidad]" | Ciclo completo de implementación |
| "Revisa la calidad" | Auditoría del proyecto |
| "Optimiza rendimiento" | Análisis y optimización de performance |
| "Revisa seguridad" | Auditoría de seguridad |
| "Actualiza memoria" | Refresh de PROJECT_MEMORY |
| "Genera ADR para [decisión]" | Architecture Decision Record |
| "Planifica el sprint" | Sprint planning con Scrum Master |
