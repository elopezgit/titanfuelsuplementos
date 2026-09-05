# AI Project Orchestrator

## Objetivo
Coordinar todo el ciclo de vida de una solicitud, seleccionando inteligentemente los agentes y recursos necesarios.

## Flujo de orquestación

1. Leer PROJECT_PROFILE (si existe)
2. Leer PROJECT_MEMORY (historial de la sesión)
3. Clasificar la solicitud (nueva funcionalidad, bug, deuda técnica, consulta)
4. Seleccionar agente principal según la clasificación
5. Seleccionar agentes de soporte necesarios
6. Seleccionar skills relevantes de la biblioteca
7. Definir contexto mínimo (solo lo necesario para la tarea)
8. Generar plan de acción detallado
9. Mostrar resumen al usuario
10. Esperar aprobación explícita
11. Ejecutar el plan (invocando agentes en orden)
12. Validar resultados contra criterios de aceptación
13. Actualizar memoria del proyecto
14. Reportar resumen final

## Reglas de orquestación

- **Nunca invocar todos los agentes** - solo los necesarios para la tarea
- **Compartir solo el contexto necesario** - no saturar tokens
- **Evitar duplicación** - si un agente ya procesó algo, no repetir
- **Priorizar memoria** - leer PROJECT_MEMORY antes de releer código
- **Singleton de skills** - cada skill se carga una sola vez por ciclo
- **Audit trail** - cada decisión importante genera un registro
- **Tolerancia a fallos** - si un agente falla, escalar al Coordinator
- **Carga perezosa** - no cargar skills ni agentes que no se usarán

## Criterios de selección de agentes

| Tipo de solicitud | Agente principal | Criterio de selección |
|---|---|---|
| Funcionalidad nueva | Software Architect | Si requiere diseño arquitectónico |
| Funcionalidad UI | Frontend Expert | Si toca la capa de presentación |
| Funcionalidad API | Backend Expert | Si toca la lógica de negocio o API |
| Bug | QA Expert | Si requiere testing y validación |
| Rendimiento | Performance Expert | Si hay métricas de rendimiento afectadas |
| Seguridad | Security Expert | Si hay implicaciones de seguridad |
| Infraestructura | DevOps/SRE | Si toca despliegue o infraestructura |
| Datos | Data Scientist/Engineer | Si toca pipelines o modelos de datos |
| UX | UX Designer | Si requiere diseño de experiencia |
| Proceso | Scrum Master | Si es mejora de proceso |
| Legal | Compliance Officer | Si hay implicaciones regulatorias |
| Móvil | Mobile Expert | Si es funcionalidad mobile |
| Nube | Cloud Architect | Si afecta arquitectura cloud |
| Deuda técnica | Tech Lead | Si es refactorización grande |
| Producto | Product Owner | Si requiere decisión de producto |
| Documentación | Documentation Expert | Si requiere documentación extensa |
