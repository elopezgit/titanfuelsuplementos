# Workflow Obligatorio del Framework (Mejorado)

## Ciclo completo (14 fases)

Cada solicitud debe pasar por todas las fases en orden:

```
1.  Token Optimize   → Comprimir contexto, eliminar ruido, priorizar info
2.  Bootstrap        → Preparar estructura base del proyecto
3.  Discovery        → Explorar código, stack, dominio y contexto
4.  Deep Analysis    → Analizar requisitos, restricciones y riesgos
5.  Business         → Comprender valor de negocio y objetivos
6.  Design Review    → Revisión visual y de experiencia (Digital Design + UX Master)
7.  Clarification    → Preguntar si hay incertidumbre (nunca asumir)
8.  Summary          → Resumir plan de acción para el usuario
9.  Approval         → Obtener aprobación del usuario antes de ejecutar
10. Planning         → Seleccionar agentes, skills y descomponer tareas
11. Execution        → Implementar cambios (puede iterar)
12. Validation       → Verificar calidad, tests y criterios de aceptación
13. Documentation    → Documentar cambios, ADRs y lecciones aprendidas
14. Memory Update    → Actualizar PROJECT_MEMORY con nuevo contexto
```

## Reglas del workflow

- **Saltos prohibidos**: No se puede omitir ninguna fase
- **Aprobación obligatoria**: Fase 9 (Approval) es requisito antes de ejecutar
- **Token Optimize siempre**: Cada fase pasa por compresión de contexto antes de la siguiente
- **Design Review para UI**: Cada cambio visual pasa por Digital Design Committee + UX Master
- **Validación por agente**: Cada agente valida su propio output
- **Actualización de memoria**: La última fase siempre es Memory Update
- **Contexto mínimo**: Compartir solo la información necesaria para cada fase
- **Clarification**: Si hay duda, preguntar antes de continuar

## Nuevas fases detalladas

### Fase 0: Token Optimize (NUEVA)
El Coordinator ejecuta el Token Optimizer antes de cada ciclo:
- Comprimir contexto de archivos
- Eliminar información redundante
- Clasificar contexto por prioridad
- Referenciar memoria en lugar de repetir

### Fase 6: Design Review (NUEVA)
Para cada cambio que involucre UI/UX:
1. Digital Design Committee revisa estética (checklist anti-AI)
2. UX Design Master revisa experiencia (flujos, estados, accesibilidad)
3. Frontend Expert recibe feedback y corrige
4. Re-revision hasta APROBADO

### Flujo de Design Review
```
Cambio de UI → 
  Digital Design Committee: Review visual → APROBADO / RECHAZADO
  UX Design Master: Review UX → APROBADO / RECHAZADO
  → Si RECHAZADO: feedback específico → corrección → re-review
  → Si APROBADO: continúa a Validation
```

## Summary (antes de Approval)
Antes de implementar, presentar al usuario:
- Qué se entendió de la solicitud
- Qué tecnologías/arquitectura se detectaron
- Qué riesgos se encontraron
- Qué agentes y skills se proponen
- Qué fases de Design Review aplican
- Plan de trabajo detallado
Esperar aprobación explícita antes de ejecutar.

## Excepciones

| Situación | Fases omitibles |
|---|---|
| Corrección menor (typo, un CSS) | Approval (solo notificar) |
| Pregunta informativa | Solo Discovery + Summary |
| Lectura de memoria existente | Solo Memory Update |
| Cambio de solo backend (sin UI) | Design Review |

## Agents en cada fase

| Fase | Agente principal | Skills |
|---|---|---|
| Token Optimize | Token Optimizer | optimize-tokens |
| Bootstrap | Coordinator + FE Expert | vite-scaffolding |
| Discovery | Coordinator | detect-stack, detect-architecture |
| Deep Analysis | Software Architect | architecture-review |
| Business | Business Analyst | discover-business |
| Design Review | Digital Design + UX Master | design-system, ui-review, responsive-audit |
| Clarification | Coordinator | — |
| Summary | Coordinator | summarize-context |
| Planning | Coordinator | — |
| Execution | Agentes según tipo | review-code, generate-tests, sql-optimization |
| Validation | QA Expert | review-code, ui-review |
| Documentation | Documentation Expert | generate-docs, update-memory |
| Memory Update | Coordinator | update-memory |
