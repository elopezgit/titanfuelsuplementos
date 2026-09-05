# design-audit — Skill

## Objetivo
Proporcionar una auditoría integral y unificada de diseño que combine todos los aspectos críticos: anti-AI-slop, accesibilidad, motion, responsive, y consistencia visual. Esta skill está diseñada para ser ejecutada por el Coordinator al final de cada ciclo significativo, produciendo un reporte consolidado que sirve como Quality Gate antes de considerar un proyecto/listo.

## Cuándo usar
- **Final de cada ciclo significativo** en el workflow del Coordinator
- **Before cada entrega visual** al usuario (sprint review, launch prep)
- **Pre-launch audit** antes de ir a producción
- **Quarterly design health check** para proyectos en mantenimiento
- **PR review** cuando hay cambios UI/UX significativos
- **Onboarding a nuevos proyectos** para establecer baseline de calidad

## Entradas
- Estado actual del proyecto (archivos, componentes, designs)
- Tipo de proyecto (SaaS, E-commerce, Fintech, etc.)
- Pila tecnológica (React+Vite, Next.js, etc.)
- Accesos a repositorio, Figma, y documentación existente
- Último reporte de calidad (si hay, para comparar)

## Procedimiento

### Paso 1: Ejecutar Sub-auditorías Paralelas
Lanzar 5 auditorías concurrentes:

1. **Anti-AI-Slop Audit** (Design Quality Guardian skill)
   - Score: 0-100
   - Anti-patterns detectados: catalogados
   - Tipografía: personalidad vs default
   - Paleta: coherencia vs generic

2. **Accessibility Audit** (WCAG 2.2 AA)
   - Contraste: 4.5:1 texto normal, 3:1 texto grande
   - Touch targets: 44x44px móvil mínimo
   - Focus visible: todos los elementos interactivos
   - Reduced motion: respetado
   - Reflow: 400% zoom sin scroll horizontal

3. **Motion Audit** (Motion Design Expert skill)
   - Propósito: cada animación documentada
   - Timing: micro-interacciones < 200ms
   - Reduced motion: implementado
   - Performance: 60fps en mobile

4. **Responsive Audit** (Frontend Expert Vite skill)
   - Breakpoints: 375, 768, 1024, 1440px
   - Fluid typography: clamp() implementado
   - Images: WebP/AVIF, srcset, lazy loading
   - Navigation: adaptativa mobile/desktop

5. **Visual Consistency Audit** (Digital Design Committee skill)
   - Paleta: 1-2 colores + acento + 3-5 neutros
   - Tipografía: escalas consistentes, rhythm vertical
   - Espaciado: escala 4px base, consistente
   - Componentes: estados (hover, focus, active, disabled, loading)

### Paso 2: Consolidar Results
Unir resultados en un reporte estructurado:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUDITORÍA DISEÑO COMPLETA — [Nombre Proyecto]
Fecha: [dd/mm/yyyy] │ Coordinator Cycle: [N]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VISUAL IDENTITY SCORE: [85/100]
  • Anti-AI-Slop: 92/100 ✓
  • Tipografía distintiva: PASS ✓
  • Paleta coherente: PASS ✓

ACCESSIBILITY SCORE: [90/100]
  • Contraste WCAG 2.2 AA: PASS ✓
  • Touch targets 44px: PASS ✓
  • Focus visible: PASS ✓
  • Reduced motion: PASS ✓

MOTION QUALITY SCORE: [88/100]
  • Micro-interacciones funcionales: PASS ✓
  • Timing apropiado: PASS ✓
  • Reduced motion: PASS ✓

RESPONSIVE QUALITY SCORE: [92/100]
  • Breakpoints 375/768/1024/1440: PASS ✓
  • Fluid typography clamp(): PASS ✓
  • Images optimizadas: PASS ✓

VISUAL CONSISTENCY SCORE: [87/100]
  • Paleta coherente: PASS ✓
  • Espaciado escala 4px: PASS ✓
  • Componentes con estados: PASS ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PUNTAJE COMPOSITO: [88/100] — ALTO
ESTADO: LISTO PARA ENTREGA ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Paso 3: Identificar Priority Fixes
Clasificar los findings por prioridad:

| Priority | Definición | Plazo |
|---|---|---|
| **P0 - Crítico** | Anti-patterns críticos, fallos de acceso, broken components | Inmediato (esta sprint) |
| **P1 - Alto** | Mejoras de identidad, inconsistencias visuales, micro-interacciones ausentes | 1-2 sprints |
| **P2 - Medio** | Pequeños ajustes de espaciado, tipografía, optimizaciones | Next sprint |
| **P3 - Bajo** | Mejora estética opcional, "nice-to-have" | Backlog continuo |

### Paso 4: Generar Recommendations Específicas
Para cada P0 y P1, generar recomendación accionable:

```
Ejemplo de reporte de fixes:

P0 FIXES (This Sprint):
1. [ButtonPrimary] Anti-pattern: purple gradient background → Reemplazar con primary #1E3A5F sólido
   - Archivo: src/components/button-primary.tsx
   - Estimado: 15 min
   
2. [FormLogin] Contraste: texto help link 3.2:1 → Aumentar weight a 600 o aclarar color
   - Archivo: src/components/form-login.css  
   - Estimado: 10 min

P1 FIXES (Next Sprint):
1. [Dashboard] Agregar micro-interacción de toggle con spring orgánico
   - Componente: src/components/settings-toggle.tsx
   - Estimado: 1 hora
   
2. [EmptyStates] Implementar ilustraciones accionables en 3 vistas críticas
   - Vistas: password-reset, no-projects, search-no-results
   - Estimado: 3 horas cada una
```

### Paso 5: Quality Gate Decision
Basado en el composite score y los P0 fixes:

```
Decision Matrix:
  Composite >= 90 + 0 P0 fixes → APPROVED ✓
  Composite >= 85 + P0 fixes < 3 → APPROVED with fixes this sprint
  Composite < 85 → REVIEW REQUIRED - identificar P0 y plan de acción
  Any P0 critical → BLOCKED hasta fix
```

## Artefactos de salida
- Reporte consolidado de auditoría de diseño (PDF o Markdown)
- Lista de P0 fixes con estimación de tiempo
- Lista de P1 fixes con plano de sprint
- Score composite con evolución vs previo reporte
- Recomendaciones para próximo ciclo de mejora
- Quality gate decision (Approved/Review/Blocked)

## Quality Gates
- [ ] Composite score >= 85/100
- [ ] Cero P0 fixes críticos (anti-patterns, accessibility failures)
- [ ] Score anti-AI-slop >= 85/100
- [ ] Accessibility WCAG 2.2 AA passing
- [ ] Motion audit passing (reduced motion, timing)
- [ ] Responsive audit passing (breakpoints, fluid typography)
- [ ] Visual consistency score >= 80/100
- [ ] Decision: APPROVED / REVIEW / BLOCKED

## Integración con Workflow del Coordinator
```
Fase 8 (Documentation) → Fase 9 (Approval) → Fase 10 (Execution)
                              ↓
                      Ejecutar design-audit skill
                              ↓
                      Consolidar results → Quality gate decision
                              ↓
                      Si APPROVED → Continuar workflow
                      Si REVIEW → Solicitar fixes P0 y re-auditar
                      Si BLOCKED → Detener y corregir críticos
```

## Ejemplo de Ejecución Completa
```
COORDINATOR: "Ejecutar diseño-audit para sprint 43 release candidate"
SKILL: design-audit
INPUTS:
  - proyecto: dashboardsaas-v2
  - tipo: SaaS B2B dashboard
  - stack: React + Vite + Tailwind + shadcn/ui
  - repo: git@github.com:team/dashboardsaas-v2.git
  - figma: https://www.figma.com/file/abcd1234/Dashboard-SaaS
  - ultimo-reporte: .opencode/memory/design-audit-sprint42.json

OUTPUT:
  - .opencode/memory/design-audit-sprint43.json (reporte consolidado)
  - Score composite: 88/100
  - 2 P0 fixes identificados
  - 4 P1 fixes identificados
  - Decision: APPROVED with fixes this sprint
  - Quality gate updated en PROJECT_MEMORY.md
```