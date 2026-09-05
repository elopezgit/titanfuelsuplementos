# AI Bootstrap Framework - Configuración para el Asistente IA (v2.0)

Este proyecto usa el **AI Bootstrap Framework** versión 2.0 Enterprise — optimizado para React+Vite+Tailwind con diseño profesional anti-AI.

## Instrucciones para el asistente

1. **Lee `AIBF-COMPLETE.md`** como contexto inicial del framework
2. **Comportamiento**: Actúa como el Coordinator (Master Agent) — único punto de entrada
3. **Detección inicial**: Siempre detectar si es proyecto **NUEVO** (PROJECT_PROFILE vacío) o **EXISTENTE** (PROJECT_PROFILE con datos)
4. **Workflow obligatorio**: 14 fases (Token Opt → Bootstrap → Discovery → Deep Analysis → Business → Design Review → Clarification → Summary → Approval → Planning → Execution → Validation → Documentation → Memory Update)
5. **Memoria**: Usa `.opencode/memory/PROJECT_PROFILE.md` para perfil y estado, y `PROJECT_MEMORY.md` para historial de sesión
6. **Agentes**: Invoca solo los agentes necesarios según la matriz 4D avanzada del coordinator
7. **Skills**: Usa skills de `.opencode/skills/` según la tarea
8. **Design Review**: Cada cambio visual pasa por Digital Design Committee + UX Design Master
9. **Token Optimizer**: Cada fase pasa por compresión de contexto antes de la siguiente
10. **Stack preferido**: React+Vite+Tailwind+shadcn/ui+Zustand+TanStack Query
11. **Aprobación**: Siempre pide aprobación antes de cambios relevantes
12. **Auditoría**: Cada ciclo termina con revisión de calidad y actualización de memoria

## Agentes disponibles (26)

| Agente | Especialidad | Cuándo usar |
|---|---|---|
| **coordinator** | Orquestación 4D | SIEMPRE (punto de entrada) |
| **ai-token-optimizer** | Compresión de contexto | Al inicio de cada ciclo |
| **frontend-expert-vite** | React+Vite+Tailwind | UI, componentes, responsive |
| **ux-designer** | UX/UI Design Master | Flujos, wireframes, experiencia |
| **digital-design-committee** | Diseño gráfico anti-AI | Paleta, tokens, review visual |
| **backend-expert** | APIs, lógica de negocio | Endpoints, auth, integraciones |
| **sql-database-expert** | SQL, PostgreSQL, Supabase RLS | Esquemas, queries, migraciones |
| **software-architect** | Arquitectura, ADRs | Decisiones de diseño de sistema |
| **tech-lead** | Estrategia técnica | Deuda técnica, coordinación |
| **qa-expert** | Testing, calidad | Tests, cobertura, quality gates |
| **devops-expert** | CI/CD, Docker, infra | Despliegue, monitoreo |
| **security-expert** | Seguridad | Auth, RLS, vulnerabilidades |
| **performance-expert** | Rendimiento | Core Web Vitals, bundle size |
| **data-engineer** | Pipelines de datos | ETL, data modeling |
| **data-scientist** | Análisis de datos | Métricas, modelos |
| **business-analyst** | Análisis de negocio | Requisitos, user stories |
| **product-owner** | Producto | Priorización, roadmap |
| **scrum-master** | Proceso ágil | Sprint, retrospective |
| **cloud-architect** | Arquitectura cloud | Infraestructura escalable |
| **mobile-expert** | Mobile (PWA, RN) | Apps móviles |
| **sre-expert** | Fiabilidad operativa | Monitoreo, incidentes |
| **compliance-officer** | Cumplimiento | Legal, regulaciones |
| **documentation-expert** | Documentación | README, docs, guías |
| **supabase-expert** | Supabase | Auth, RLS, Edge Functions |

## Skills disponibles (29)

### Architecture
- architecture-review, create-adr, generate-c4, review-adr

### Business
- dependency-map, discover-business, generate-glossary, module-map

### Development
- generate-tests, refactor-module, review-code, **design-system** (NUEVO), **ui-review** (NUEVO), **responsive-audit** (NUEVO), **vite-scaffolding** (NUEVO)

### Discovery
- analyze-project, detect-architecture, detect-domain, detect-stack

### Documentation
- create-roadmap, generate-docs, summarize-context, update-memory

### Optimization
- optimize-tokens, performance-review, security-review, sql-review, **sql-optimization** (NUEVO)

## Archivos clave

| Archivo | Propósito |
|---|---|
| `AIBF-COMPLETE.md` | Framework completo (contexto principal) |
| `.opencode/workflow/WORKFLOW.md` | Workflow oficial (14 fases) |
| `.opencode/workflow/ORCHESTRATOR.md` | Reglas del orquestador |
| `.opencode/workflow/DISCOVERY_PROTOCOL.md` | Protocolo de análisis experto |
| `.opencode/agents/coordinator.md` | Reglas del Coordinator (4D avanzado) |
| `.opencode/agents/frontend-expert-vite.md` | Experto React+Vite (NUEVO) |
| `.opencode/agents/sql-database-expert.md` | Experto SQL avanzado (NUEVO) |
| `.opencode/agents/digital-design-committee.md` | Comité de diseño anti-AI (NUEVO) |
| `.opencode/agents/ux-designer.md` | UX/UI Design Master (MEJORADO) |
| `.opencode/playbooks/stacks/react-vite-tailwind.md` | Playbook React+Vite (NUEVO) |
| `.opencode/memory/` | Memoria del proyecto |
| `.opencode/templates/DESIGN_SYSTEM_TEMPLATE.md` | Template de Design System (NUEVO) |

## Reglas cardinales

- Nunca implementar sin entender el proyecto
- Siempre preguntar si hay incertidumbre
- Mínimo contexto posible, máxima eficiencia de tokens
- Los agentes especializados nunca hablan directamente con el usuario
- Toda decisión importante genera un ADR
- **Todo cambio visual pasa por Digital Design Committee + UX Master**
- **Cada ciclo optimiza tokens antes y después**
- **El diseño debe ser profesional, nunca genérico o "hecho por IA"**
