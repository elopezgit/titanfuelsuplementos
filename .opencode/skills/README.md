# Skills

## Categorías de skills (29 total)

### Architecture (4)
- **architecture-review** — Revisar arquitectura del proyecto
- **create-adr** — Crear Architecture Decision Records
- **generate-c4** — Generar diagramas C4
- **review-adr** — Revisar ADRs existentes

### Business (4)
- **dependency-map** — Mapeo de dependencias entre módulos
- **discover-business** — Descubrir contexto de negocio
- **generate-glossary** — Generar glosario de términos
- **module-map** — Mapeo de módulos del sistema

### Development (8)
- **design-system** ★ — Crear sistemas de diseño desde cero
- **generate-tests** — Generar pruebas automatizadas
- **refactor-module** — Refactorizar módulos
- **responsive-audit** ★ — Auditoría responsive multi-device
- **review-api** — Revisar contratos de API
- **review-code** — Revisar código fuente (MEJORADO)
- **ui-review** ★ — Review estético anti-AI
- **vite-scaffolding** ★ — Scaffolding profesional con Vite+React

### Discovery (4)
- **analyze-project** — Analizar proyecto existente
- **detect-architecture** — Detectar estilo arquitectónico
- **detect-domain** — Detectar dominio de negocio
- **detect-stack** — Detectar stack tecnológico

### Documentation (4)
- **create-roadmap** — Crear roadmap técnico
- **generate-docs** — Generar documentación
- **summarize-context** — Resumir contexto
- **update-memory** — Actualizar memoria del proyecto

### Optimization (7)
- **optimize-tokens** — Optimizar consumo de tokens de IA
- **performance-review** — Revisión de rendimiento
- **security-review** — Revisión de seguridad
- **sql-optimization** ★ — Optimización SQL avanzada
- **sql-review** — Revisión de queries SQL
- **anti-ai-patterns** ★★ — Detectar y prevenir patrones de diseño genéricos de AI
- **design-audit** ★★★ — Auditoría completa de diseño integradora

★ = Skills nuevos en v2.0

## Estructura de cada skill
```
skills/[category]/[skill-name]/
└── SKILL.md
    ├── Objetivo
    ├── Cuándo usar
    ├── Entradas
    ├── Procedimiento
    └── Salida
```

## Cuándo usar cada skill
El Coordinator selecciona skills según la matriz 4D:
- **Tipo de solicitud** → skills de la categoría correspondiente
- **Stack detectado** → skills específicas del stack
- **Dominio** → skills de dominio si aplica
- **Complejidad** → cantidad de skills a invocar
