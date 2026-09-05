# AI Bootstrap Framework Central — Template v2.0

Framework completo para desarrollo de aplicaciones web con asistencia de IA. Incluye 26 agentes especializados, 29 skills, technology guides para React+Vite+Tailwind, y un workflow de 14 fases con design review profesional anti-AI.

---

## Qué es esto

Este es un **template de proyecto** que contiene toda la inteligencia necesaria para que un asistente IA actúe como un equipo de desarrollo completo. No es solo un chatbot — es un sistema con:

- **26 agentes** que cubren desde arquitectura hasta diseño gráfico
- **29 skills** especializadas para tareas específicas
- **34 technology guides** con conocimiento real de los stacks
- **Workflow de 14 fases** con aprobación del usuario
- **Design Review obligatorio** para que nada se vea "hecho por IA"

---

## Arquitectura del sistema

```
┌─────────────────────────────────────────────────────┐
│                    USUARIO                           │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              COORDINATOR (Agente Maestro)            │
│  Detecta: ¿Proyecto NUEVO o EXISTENTE?              │
│  Routing: Selecciona agentes según matriz 4D        │
│  Orquesta: Ejecuta fases en orden correcto          │
└───┬──────┬──────┬──────┬──────┬──────┬──────────────┘
    │      │      │      │      │      │
    ▼      ▼      ▼      ▼      ▼      ▼
┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐
│Front ││ SQL  ││Digital││ UX   ││Back  ││  QA  │
│end   ││ Data ││Design ││Design││end   ││      │
│Expert││Base  ││Comm-  ││Master││Expert││Expert│
│ Vite ││Expert││ittee  ││      ││      ││      │
└──────┘└──────┘└──────┘└──────┘└──────┘└──────┘
    │      │      │      │      │      │
    ▼      ▼      ▼      ▼      ▼      ▼
┌─────────────────────────────────────────────────────┐
│                   SKILLS (29)                        │
│ design-system │ ui-review │ responsive-audit │       │
│ sql-optimization │ vite-scaffolding │ review-code... │
└─────────────────────────────────────────────────────┘
```

---

## Agentes disponibles

### Core
| Agente | Qué hace |
|---|---|
| **coordinator** | Punto de entrada único. Detecta proyecto nuevo/existente, selecciona agentes, orquesta el workflow |
| **ai-token-optimizer** | Comprime contexto, elimina ruido, optimiza consumo de tokens antes de cada fase |

### Frontend
| Agente | Qué hace |
|---|---|
| **frontend-expert-vite** | React+Vite+Tailwind+shadcn. Componentes, responsive, performance, estética anti-AI |
| **mobile-expert** | PWA, React Native, aplicaciones móviles |
| **performance-expert** | Core Web Vitals, bundle optimization, lazy loading |

### Backend & Datos
| Agente | Qué hace |
|---|---|
| **backend-expert** | APIs, lógica de negocio, auth, integraciones |
| **sql-database-expert** | PostgreSQL avanzado, índices, RLS Supabase, migraciones, optimización SQL |
| **database-expert** | ORMs, esquemas, pooling, replicación |
| **supabase-expert** | Supabase Auth, RLS, Edge Functions, Realtime |
| **data-engineer** | Pipelines ETL, data modeling |
| **data-scientist** | Análisis de datos, métricas |

### Diseño & UX
| Agente | Qué hace |
|---|---|
| **digital-design-committee** | Comité de diseño gráfico. Rechaza lo que parezca genérico o "hecho por IA". Define paletas, tokens, revisa cada pixel |
| **ux-designer** | UX/UI Design Master. Personas, journeys, wireframes, accesibilidad, responsive |

### Arquitectura & Calidad
| Agente | Qué hace |
|---|---|
| **software-architect** | Arquitectura, ADRs, diagramas C4, patrones de diseño |
| **tech-lead** | Estrategia técnica, deuda técnica, coordinación |
| **qa-expert** | Testing, cobertura, quality gates, pipelines CI |
| **security-expert** | Auth, RLS, vulnerabilidades, OWASP |
| **devops-expert** | CI/CD, Docker, infra, monitoreo |
| **sre-expert** | Fiabilidad operativa, incidentes, SLOs |

### Negocio & Producto
| Agente | Qué hace |
|---|---|
| **business-analyst** | Requisitos, user stories, análisis de negocio |
| **product-owner** | Priorización, roadmap, decisiones de producto |
| **scrum-master** | Proceso ágil, sprint, retrospective |
| **compliance-officer** | Legal, regulaciones, GDPR |
| **cloud-architect** | Infraestructura cloud, escalabilidad |
| **documentation-expert** | README, docs, guías de onboarding |

---

## Skills disponibles

### Development (8)
| Skill | Cuándo usar |
|---|---|
| **design-system** | Crear sistema de diseño desde cero (tokens, paleta, componentes) |
| **ui-review** | Revisar que la UI no se vea genérica ni "hecha por IA" |
| **responsive-audit** | Auditar que funciona en 375px, 768px, 1024px, 1440px |
| **vite-scaffolding** | Crear proyecto React+Vite profesional desde cero |
| **generate-tests** | Generar pruebas unitarias, integración y E2E |
| **review-code** | Revisar código por seguridad, performance, mantenibilidad |
| **refactor-module** | Refactorizar módulos existentes |
| **review-api** | Revisar contratos de API |

### Optimization (5)
| Skill | Cuándo usar |
|---|---|
| **optimize-tokens** | Comprimir contexto antes de cada fase |
| **sql-optimization** | Optimizar queries lentas, índices, RLS |
| **sql-review** | Revisar queries y esquemas SQL |
| **performance-review** | Auditoría de rendimiento general |
| **security-review** | Auditoría de seguridad |

### Architecture (4)
| Skill | Cuándo usar |
|---|---|
| **architecture-review** | Revisar arquitectura del proyecto |
| **create-adr** | Documentar decisiones de arquitectura |
| **generate-c4** | Generar diagramas de arquitectura |
| **review-adr** | Revisar ADRs existentes |

### Discovery (4)
| Skill | Cuándo usar |
|---|---|
| **analyze-project** | Analizar proyecto existente |
| **detect-stack** | Detectar stack tecnológico |
| **detect-architecture** | Detectar estilo arquitectónico |
| **detect-domain** | Detectar dominio de negocio |

### Business (4)
| Skill | Cuándo usar |
|---|---|
| **discover-business** | Descubrir contexto de negocio |
| **generate-glossary** | Generar glosario de términos |
| **dependency-map** | Mapear dependencias entre módulos |
| **module-map** | Mapear módulos del sistema |

### Documentation (4)
| Skill | Cuándo usar |
|---|---|
| **generate-docs** | Generar README, docs de API, guías |
| **create-roadmap** | Crear roadmap técnico |
| **summarize-context** | Resumir contexto largo |
| **update-memory** | Actualizar memoria del proyecto |

---

## Workflow de 14 fases

Cada solicitud pasa por **todas** las fases en orden. No se salta ninguna.

```
 1. Token Optimize    → Comprimir contexto, eliminar ruido
 2. Bootstrap         → Preparar estructura base
 3. Discovery         → Explorar código, stack, dominio
 4. Deep Analysis     → Analizar requisitos y riesgos
 5. Business          → Comprender valor de negocio
 6. Design Review     → Digital Design Committee + UX Master revisan
 7. Clarification     → Preguntar dudas (nunca asumir)
 8. Summary           → Resumir plan para el usuario
 9. Approval          → Esperar aprobación explícita
10. Planning          → Seleccionar agentes y skills
11. Execution         → Implementar cambios
12. Validation        → Verificar calidad y tests
13. Documentation     → Documentar cambios y ADRs
14. Memory Update     → Actualizar memoria del proyecto
```

### Excepciones
| Situación | Fases que se omiten |
|---|---|
| Fix menor (typo, CSS) | Approval (solo notificar) |
| Pregunta informativa | Solo Discovery + Summary |
| Solo backend (sin UI) | Design Review |

---

## Flujo para proyecto NUEVO

```
1. Usuario describe qué quiere
2. Coordinator pregunta: tipo de app, stack, BD, auth
3. Coordinator recomienda stack (React+Vite+Tailwind+Supabase por defecto)
4. Frontend Expert hace scaffolding con vite-scaffolding skill
5. Digital Design Committee define design tokens y paleta
6. UX Design Master define personas, journeys, wireframes
7. SQL Database Expert diseña esquema + migraciones + RLS
8. Backend Expert implementa API + auth
9. DevOps Expert configura Docker + CI/CD
10. QA Expert genera tests iniciales
11. Quality gates verifican todo antes de entregar
```

## Flujo para proyecto EXISTENTE

```
1. Discovery Sprint (7 fases de análisis):
   F1: Stack detectado
   F2: Arquitectura y patrones
   F3: Calidad de código
   F4: Seguridad
   F5: BD y performance
   F6: Diseño y UX
   F7: Health Report consolidado
2. Presentar reporte al usuario
3. Esperar aprobación
4. Ejecutar mejoras aprobadas
5. Post-análisis de verificación
```

---

## Matriz de routing 4D del Coordinator

El Coordinator selecciona agentes evaluando 4 dimensiones:

### Dimensión 1: Tipo de solicitud
| Solicitud | Agente primario | Soporte |
|---|---|---|
| Nueva página/UI | Frontend Expert Vite | Digital Design + UX Master |
| Nueva API | Backend Expert | Security + SQL DB |
| Bug frontend | Frontend Expert Vite | QA |
| Bug backend | Backend Expert | SQL DB |
| Performance | Performance Expert | SQL DB |
| Seguridad | Security Expert | Backend |
| Modelo datos | SQL Database Expert | Backend |
| Diseño visual | Digital Design Committee | UX + FE |
| UI/UX | UX Design Master | Digital Design |
| Documentación | Documentation Expert | Todos |

### Dimensión 2: Stack
| Stack | Skills clave |
|---|---|
| Supabase | sql-optimization, security-review |
| React+Vite+Node | sql-optimization, performance-review |
| React+Vite+.NET | sql-optimization, security-review |

### Dimensión 3: Dominio
| Dominio | Skills de dominio |
|---|---|
| eCommerce | knowledge/ecommerce.md |
| SaaS | knowledge/saas.md |
| Fintech | knowledge/collections.md |
| Travel | knowledge/travel.md |

### Dimensión 4: Complejidad
| Nivel | Agentes | Skills |
|---|---|---|
| Baja | 1 primario | 1 |
| Media | 1 + 1 soporte | 2-3 |
| Alta | 1 + 2-3 soporte | 3-5 |
| Crítica | Todos relevantes | Todas |

---

## Design Review — Anti-AI

Todo cambio visual pasa por el **Digital Design Committee** que rechaza activamente:

- Gradientes rainbow sin razón
- Cards con sombra default
- Iconos genéricos sin personalizar
- Layouts centrados simétricos
- Textos "Welcome to your app"
- Botones azul genérico
- Espaciado uniforme sin ritmo
- Bordes redondeados iguales en todo

**Resultado**: Diseños con personalidad, paleta coherente, tipografía con carácter, whitespace generoso.

---

## Estructura de carpetas

```
aibf-central/
├── AGENTS.md                    # Instrucciones para el asistente IA
├── README.md                    # Este archivo
├── AIBF-COMPLETE.md             # Framework completo (contexto principal)
│
├── .opencode/
│   ├── agents/                  # 26 agentes especializados
│   ├── skills/                  # 29 skills organizadas por categoría
│   │   ├── architecture/        # architecture-review, create-adr, generate-c4
│   │   ├── business/            # discover-business, dependency-map, module-map
│   │   ├── development/         # design-system, ui-review, vite-scaffolding...
│   │   ├── discovery/           # analyze-project, detect-stack, detect-architecture
│   │   ├── documentation/       # generate-docs, create-roadmap, update-memory
│   │   └── optimization/        # optimize-tokens, sql-optimization, security-review
│   ├── technology/              # Technology guides por stack
│   │   ├── react/               # components, state, routing, testing, performance
│   │   ├── vite/                # config, plugins, build
│   │   ├── database/            # postgresql, mysql, mongodb, sqlserver
│   │   ├── node/                # express, nest, security, testing
│   │   └── ...
│   ├── playbooks/               # Playbooks por stack
│   │   └── stacks/              # react-vite-tailwind.md, node-react.md...
│   ├── prompts/                 # Prompts reutilizables
│   │   ├── stacks/              # REACT_VITE_PROMPT.md, SUPABASE_PROMPT.md...
│   │   └── agents/              # COORDINATOR_PROMPT.md, ARCHITECT_PROMPT.md
│   ├── templates/               # Templates (ADR, API, Design System...)
│   ├── workflow/                # WORKFLOW.md, ORCHESTRATOR.md, DISCOVERY_PROTOCOL.md
│   ├── memory/                  # PROJECT_PROFILE.md, PROJECT_MEMORY.md
│   ├── knowledge/               # Conocimiento por dominio
│   ├── quality/                 # Quality gates, métricas, auditoría
│   ├── engine/                  # Token engine, context compression
│   ├── governance/              # Políticas de ingeniería
│   └── core/                    # Bootstrap, agent factory, skill factory
│
├── docs/                        # Documentación del framework
├── examples/                    # Ejemplos de proyectos
├── installer/                   # Scripts de instalación
└── modules/                     # Especificaciones de los 24 módulos
```

---

## Cómo usar como template

### Opción 1: Copiar la carpeta
```bash
# Copiar el template a tu nuevo proyecto
cp -r aibf-central/ mi-nuevo-proyecto/
cd mi-nuevo-proyecto
```

### Opción 2: Usar como referencia
1. Copiar solo la carpeta `.opencode/` a tu proyecto
2. Copiar `AGENTS.md` a la raíz
3. El asistente IA leerá automáticamente la configuración

### Configurar el asistente
El archivo `AGENTS.md` le dice al asistente:
1. Leer `AIBF-COMPLETE.md` como contexto
2. Actuar como Coordinator (punto de entrada único)
3. Seguir el workflow de 14 fases
4. Usar agentes según la matriz 4D
5. Siempre pasar por Design Review para UI

---

## Stack preferido del template

| Capa | Tecnología |
|---|---|
| Frontend | React 18+ / Vite 5+ / TypeScript 5+ |
| Estilos | Tailwind CSS 3.4+ / shadcn/ui |
| Estado | Zustand (global) + TanStack Query (server) |
| Formularios | React Hook Form + Zod |
| Animaciones | Framer Motion |
| Testing | Vitest + React Testing Library + Playwright |
| Backend | Supabase (PostgreSQL + Auth + RLS) o Node/NestJS |
| Infra | Docker Compose + GitHub Actions |

---

## Quality Gates

### Frontend
- [ ] Responsive en 375px, 768px, 1024px, 1440px
- [ ] Loading/empty/error states implementados
- [ ] Lighthouse Performance > 95
- [ ] Bundle < 200KB (landing), < 500KB (app)
- [ ] Accesibilidad WCAG 2.1 AA
- [ ] Design tokens aplicados
- [ ] Sin anti-patrones de diseño AI

### Backend
- [ ] Endpoints con validación
- [ ] Auth en endpoints protegidos
- [ ] Rate limiting en endpoints públicos
- [ ] Error handling sin stack traces

### Base de Datos
- [ ] RLS en TODAS las tablas (Supabase)
- [ ] Migraciones reversibles
- [ ] Índices en columnas de búsqueda
- [ ] Sin N+1 queries

### Diseño
- [ ] Paleta consistente (sin colores fuera de tokens)
- [ ] Tipografía coherente (2-3 families máximo)
- [ ] Espaciado en escala de 4px
- [ ] Empty states con acciones claras
- [ ] Error states con retry

---

## Archivos clave

| Archivo | Propósito |
|---|---|
| `AGENTS.md` | Instrucciones principales para el asistente IA |
| `AIBF-COMPLETE.md` | Framework completo (contexto para el asistente) |
| `.opencode/agents/coordinator.md` | Reglas del Coordinator y matriz 4D |
| `.opencode/workflow/WORKFLOW.md` | Workflow oficial de 14 fases |
| `.opencode/workflow/ORCHESTRATOR.md` | Reglas de orquestación |
| `.opencode/memory/PROJECT_PROFILE.md` | Perfil del proyecto actual |
| `.opencode/memory/PROJECT_MEMORY.md` | Historial de la sesión |
| `.opencode/playbooks/stacks/react-vite-tailwind.md` | Playbook del stack principal |
| `.opencode/templates/DESIGN_SYSTEM_TEMPLATE.md` | Template de design tokens |

---

## Comandos útiles

```bash
# Iniciar desarrollo
npm run dev

# Build de producción
npm run build

# Tests
npm run test
npm run test:coverage
npm run test:e2e

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run typecheck
```

---

## Licencia

AI Bootstrap Framework Central — Template v2.0
