# Discovery Protocol — Análisis Experto de Proyecto Existente

## Objetivo
Ejecutar un análisis completo y profundo de un proyecto existente antes de proponer cualquier mejora. Este protocolo se ejecuta **siempre** en la Ruta B antes de tocar código.

## Reglas
- **No modificar nada durante el discovery** — solo leer y analizar
- **No saltar pasos** — cada dimensión debe analizarse
- **Documentar todo** — los hallazgos se registran en PROJECT_MEMORY
- **Solo después del análisis completo** se presentan mejoras al usuario

---

## Fase 1: Stack Detection

### Agente: DevOps Expert + Backend Expert
### Skill: `skills/discovery/detect-stack`
### Entregable: Stack tecnológico completo

Analizar:
1. Lenguajes principales por extensión de archivos
2. Frameworks frontend (React, Next.js, Angular, Vue, etc.)
3. Frameworks backend (NestJS, Express, .NET, Spring, FastAPI, etc.)
4. Base de datos (PostgreSQL, SQL Server, MongoDB, Supabase, etc.)
5. ORM (Prisma, EF Core, JPA, Sequelize, etc.)
6. Cloud provider (Azure, AWS, GCP, Supabase, Vercel)
7. CI/CD (GitHub Actions, GitLab CI, Azure DevOps)
8. Docker (Dockerfile, docker-compose)
9. Testing (Jest, Vitest, Playwright, xUnit, pytest, etc.)
10. Auth (JWT, Supabase Auth, NextAuth.js, Identity, etc.)
11. Si tiene Supabase: detectar versiones de SDK, configuración RLS, Edge Functions

### Output
```
Stack detectado:
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind
- Backend: Supabase + Edge Functions
- BD: PostgreSQL (Supabase)
- Auth: Supabase Auth (JWT + OAuth)
- Testing: Vitest + Playwright
- Infra: Vercel + Supabase
- CI/CD: GitHub Actions
```

---

## Fase 2: Architecture Detection

### Agente: Software Architect
### Skill: `skills/discovery/detect-architecture` + `skills/architecture/architecture-review`
### Entregable: Mapa arquitectónico completo

Analizar:
1. Estilo arquitectónico: MVC, Clean Architecture, Hexagonal, Microservicios, Monolito
2. Estructura de carpetas: por capa vs por feature
3. Separación de capas: presentación, aplicación, dominio, infraestructura
4. Dirección de dependencias (¿las capas internas conocen a las externas?)
5. Patrones usados: Repository, CQRS, Mediator, Service Layer
6. Manejo de estado frontend: Context, Redux, Zustand, React Query
7. Enrutamiento: App Router, Pages Router, React Router
8. Manejo de errores global (middleware, interceptors, filters)
9. Anti-patrones detectados: dependencias circulares, dios objetos, god classes
10. Decisiones arquitectónicas documentadas (ADRs existentes)

### Output
```
Arquitectura: Clean Architecture + Server Components
Capas: app/ → components/ → lib/ → supabase/
Patrones: Server Components, Server Actions, RLS
Anti-patrones: [ninguno / lista]
ADRs existentes: [0]
```

---

## Fase 3: Code Quality Analysis

### Agente: QA Expert + Tech Lead
### Skill: `skills/discovery/analyze-project` + `skills/development/review-code`
### Entregable: Reporte de calidad de código

Analizar:
1. Cobertura de tests (si existe configuración)
2. Frameworks de testing y tipos de prueba (unit, integration, e2e)
3. Configuración de linter y formatter (ESLint, Prettier, .editorconfig)
4. Complejidad ciclomática estimada
5. Duplicación de código
6. Convenciones de código (naming, estructura, patrones)
7. Documentación inline (comentarios, JSDoc, XML docs)
8. Manejo de errores (try/catch, error boundaries, resultados vs excepciones)
9. Código muerto o comentado
10. Tamaño de archivos (funciones muy grandes, componentes muy grandes)

### Output
```
Calidad de código:
- Tests: Unit (Vitest) + E2E (Playwright)
- Cobertura: ~45% 
- Linter: ESLint + Prettier configurados
- Complejidad: Media (algunos componentes grandes)
- Duplicación: Baja
- Código muerto: 2 archivos no usados
```

---

## Fase 4: Security Audit

### Agente: Security Expert
### Skill: `skills/optimization/security-review`
### Entregable: Auditoría de seguridad

Analizar:
1. Secretos hardcodeados (API keys, tokens, passwords en código)
2. .env comiteado o expuesto
3. Configuración CORS
3. Headers de seguridad (CSP, HSTS, X-Frame-Options)
5. Manejo de autenticación (JWT expiración, refresh tokens, MFA)
6. Manejo de autorización (RBAC, permisos a nivel de API)
7. Validación de entrada (DTOs, schemas, sanitización)
8. Dependencias vulnerables (npm audit, Dependabot)
9. Si Supabase:
   - RLS activado en TODAS las tablas
   - service_role key solo en server-side
   - Políticas RLS correctas (sin USING(true) en datos sensibles)
   - Storage buckets con RLS

### Output
```
Seguridad:
- Secretos: 0 expuestos
- RLS: OK en 12/12 tablas
- CORS: Configurado solo para dominio producción
- Dependencias: 1 vulnerabilidad baja
- .env: En .gitignore correctamente
- service_role: Solo en server-side
```

---

## Fase 5: Database & Performance Analysis

### Agente: Database Expert + Performance Expert
### Skill: `skills/optimization/performance-review` + `skills/optimization/sql-review`
### Entregable: Reporte de BD y rendimiento

Analizar:
1. Esquema de BD: tablas, relaciones, tipos de datos
2. Índices existentes vs necesarios (columnas de búsqueda, JOIN, ORDER BY)
3. Consultas N+1 (especialmente en ORMs)
4. Migraciones: versionadas, reversibles, pérdida de datos
5. Políticas RLS (Supabase): rendimiento con RLS en tablas grandes
6. Frontend: tamaño de bundle, lazy loading, imágenes optimizadas
7. APIs: tiempos de respuesta, caché, rate limiting
8. Core Web Vitals (si se puede medir)

### Output
```
BD y Rendimiento:
- BD: PostgreSQL (12 tablas, 3 índices faltantes)
- N+1: 2 consultas detectadas (pedidos + items)
- Migraciones: 5 migraciones, todas versionadas
- Bundle: 245KB JS inicial (aceptable)
- LCP: ~2.1s (umbral: 2.5s)
```

---

## Fase 6: Domain & Business Discovery

### Agente: Business Analyst
### Skill: `skills/business/discover-business` + `skills/business/generate-glossary`
### Entregable: Mapa de dominio y glosario

Analizar:
1. Dominio de negocio (eCommerce, SaaS, fintech, travel, etc.)
2. Actores del sistema (roles de usuario, sistemas externos)
3. Casos de uso principales
4. Entidades de dominio y relaciones
5. Reglas de negocio (explícitas e implícitas en el código)
6. Procesos de negocio completos
7. Integraciones externas (pagos, email, CRM, etc.)
8. Términos del dominio (glosario)

### Output
```
Dominio: eCommerce B2B
Actores: Cliente, Admin, Proveedor
Entidades: Producto, Carrito, Pedido, Pago, Factura
Reglas: [5 reglas de negocio detectadas]
Integraciones: Stripe (pagos), SendGrid (emails)
Glosario: 8 términos documentados
```

---

## Fase 7: Project Health Report

### Agente: Coordinator (consolida)
### Entregable: Reporte completo de salud del proyecto

Consolidar los hallazgos de todas las fases en un reporte único:

```
# REPORTE DE SALUD DEL PROYECTO

## Resumen Ejecutivo
[Visión general del estado del proyecto]

## Stack Detectado
[Resumen de Fase 1]

## Arquitectura
[Resumen de Fase 2]

## Calidad de Código
[Resumen de Fase 3]

## Seguridad
[Resumen de Fase 4]

## BD y Rendimiento
[Resumen de Fase 5]

## Dominio
[Resumen de Fase 6]

## Riesgos (ordenados por severidad)
| Riesgo | Severidad | Impacto | Recomendación |
|---|---|---|---|

## Mejoras propuestas (ordenadas por prioridad)
| Prioridad | Mejora | Esfuerzo | Impacto | Agente requerido |
|---|---|---|---|---|

## Siguiente paso
[Solicitar aprobación del usuario para proceder con las mejoras]
```

---

## Cuándo ejecutar este protocolo completo

| Situación | Protocolo |
|---|---|
| Primera vez en el proyecto | **Completo** (Fases 1-7) |
| Solicitud de mejora general | **Completo** (Fases 1-7) |
| Bug fix puntual | Solo Fases 3 (código) + 4 (seguridad) |
| Nueva feature aislada | Solo Fases 2 (arquitectura) + 3 (código) |
| Refactor de módulo específico | Solo Fases 2 + 3 + 5 (si afecta BD) |
| Revisión de seguridad | Solo Fase 4 |
| Optimización de rendimiento | Solo Fase 5 |
