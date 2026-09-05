# motion-design — Skill

## Objetivo
Proporcionar directrices y patrones para crear movimiento funcional en interfaces web y móviles. Esta skill cubre micro-interacciones, transiciones, animaciones de loading, y efectos de scroll — siempre con propósito comunicativo, no decorativo. Basado en principios de motion design 2026 y mejores prácticas de Framer Motion y CSS animations.

## Cuándo usar
- Diseño de micro-interacciones para componentes nuevos
- Implementación de transiciones de página o vista
- Creación de loading states y skeleton screens
- Diseño de scroll animations y parallax effects
- Revisión de motion existente para anti-patrones
- Optimización de performance de animaciones en PRs

## Entradas
- Componente o pantalla a animar (descripción o archivo Figma/HTML)
- Contexto del proyecto (web app, dashboard, e-commerce, mobile app)
- Target de performance (fps deseado, reduced motion requirements)
- Tipo de movimiento necesario (micro-interacción, transición, loading, scroll)

## Procedimiento

### Paso 1: Definir Propósito del Movimiento
Para cada animación, responder:
- ¿Qué comunica esta animación? (feedback, jerarquía, navegación, celebración)
- ¿Quién es el usuario objetivo? (¿necesitan reduced motion?)
- ¿Cuál es el estado inicial y el estado final?
- ¿Cuánto tiempo debe durar naturalmente esta transición?

### Paso 2: Seleccionar Tipo de Movimiento
| Tipo | Duración | Easing | Caso de uso |
|---|---|---|---|
| **Micro-interacción** | 100-200ms | ease-out | Button press, hover, toggle, like |
| **Transición leve** | 200-300ms | ease-in-out | Expand/collapse, tooltip, dropdown |
| **Transición de vista** | 300-500ms | ease-in-out | Página nueva, modal, panel |
| **Scroll reveal** | 500-800ms | ease-out | Secciones de contenido, hero |
| **Loading animation** | Loop | linear | Skeletons, spinners < 3s |
| **Exit animation** | 200-400ms | ease-out | Cierre de dialog, overlay |

### Paso 3: Aplicar Curvas de Easing Recomendadas
```
Ease out:        cubic-bezier(0.25, 0.1, 0.25, 1) — suave, natural
Ease in-out:     cubic-bezier(0.42, 0, 0.58, 1) — balanceado
Spring:          cubic-bezier(0.34, 1.56, 0.64, 1) — orgánico, vivaz
Snappy:          cubic-bezier(0.2, 0, 0, 1) — rápido, preciso
Decelerate:      cubic-bezier(0, 0, 0.2, 1) — calmado
EVITAR: linear — se siente robótico, usar solo para progreso continuo
```

### Paso 4: Implementar con Framer Motion (React)
```tsx
// Ejemplo: Botón con micro-interacción completa
<motion.button
  // Estado al hacer tap/click
  whileTap={{ 
    scale: 0.97,
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  }}
  // Estado al hacer hover
  whileHover={{ 
    y: -2,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  }}
  // Estado al presionar (press)
  whilePress={{ 
    scale: 0.95,
    opacity: 0.8
  }}
  // Transición con spring orgánico
  transition={{
    type: 'spring',
    stiffness: 400,
    damping: 30,
    // Diferir entrada 50ms después de que el padre renderice
    delayChildren: 50,
    // Configurar children con staggers si hay múltiples
    // when: 'hover' para que inicie solo en hover
  }}
>
  {children}
</motion.button>
```

### Paso 5: Implementar Reduced Motion
Siempre envolver animaciones en verificación de preferencia:

```tsx
import { useReducedMotion } from 'framer-motion';

function WithMotion({ children, animate, exit }) {
  const reduced = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      animate={{ opacity: 1, y: reduced ? 0 : 20 }}
      exit={{ opacity: 0, y: reduced ? 0 : 20 }}
      transition={{
        duration: reduced ? 0 : 0.4,
        type: reduced ? 'null' : 'spring'
      }}
    >
      {children}
    </motion.div>
  );
}
```

### Paso 6: Verificar Accessibility
1. `prefers-reduced-motion` siempre respetado
2. No usar movimiento como único canal de información
3. No parpadeo > 3 veces/segundo
4. Animaciones de fondo son pausables

### Paso 7: Performance Check
- Animaciones mantienen 60fps en dispositivos móviles
- No causan layout thrash (animan transform/opacity, no width/height)
- Frame budget < 16ms por frame a 60fps
- Usar `will-change: transform, opacity` con moderación
- Lighthouse Performance > 90 para animaciones

## Anti-Patrones de Motion (Evitar)
| Anti-pattern | Por qué está mal | Solución |
|---|---|---|
| **Animation sin propósito** | Distrae, no comunica | Documentar qué comunica cada animación |
| **Todo se anima a la vez** | Sobrecarga cognitiva | Animar solo lo que cambia de estado |
| **Duración > 500ms en micro-interacciones** | El usuario espera/impacienta | Reducir a 150-300ms |
| **Motion que bloquea interacción** | El usuario no puede clickear durante animación | La UI debe ser interactiva durante la animación |
| **No respeta reduced motion** | Excluye usuarios con vestibular issues | Siempre usar media query |
| **Animación lineal** | Se siente robótica, anti-natural | Usar easing curves orgánicas |
| **Shake para errores** | Agresivo, genera ansiedad | Border rojo + mensaje claro |
| **Spin/rotate infinito sin control** | Mareo, accessibility issue | Dar control de pausa al usuario |

## Checklist de Motion Design
```
PROPÓSITO
[ ] Cada animación comunica: feedback, jerarquía o navegación
[ ] No hay animaciones decorativas sin razón
[ ] Reduced motion implementado y testado

TIMING
[ ] Micro-interacciones: 100-200ms ✓
[ ] Transiciones: 200-500ms ✓
[ ] Ninguna interfiere con siguiente acción del usuario
[ ] Duraciones proporcionales a distancia recorrida

FÍSICA
[ ] Easing curves orgánicas (no linear)
[ ] Springs con stiffness/damping apropiados
[ ] Enter y exit con misma curva de easing

ACCESIBILIDAD
[ ] Se respeta prefers-reduced-motion
[ ] Movimiento no es único canal de información
[ ] No hay parpadeo > 3 veces/segundo
[ ] Animaciones de fondo pausables

PERFORMANCE
[ ] 60fps en dispositivos móviles principales
[ ] Animan transform/opacity, no layout properties
[ ] Frame budget dentro de límites
[ ] Lighthouse animaciones > 90

EMPTY/LOADING
[ ] Loading states: skeleton > spinner genérico
[ ] Empty states: ilustración con propósito o acción clara
[ ] States de error: sin animación agresiva, solo mensaje claro
```

## Cuándo invocarlo
- Diseño de micro-interacciones para componentes nuevos
- Implementación de transiciones de página o vista
- Creación de loading states y skeleton screens
- Revisión de motion existente (anti-patrones)
- Optimización de performance de animaciones
- Cuando se detecta "demasiado movimiento" en una pantalla

## Artefactos de salida
- Especificación de motion por componente (tipo, duración, easing, triggers)
- Implementación de animaciones con Framer Motion o CSS
- Adaptación de reduced motion media queries
- Performance report de animaciones (fps, frame budget)
- Catálogo de micro-interacciones estandarizadas para el proyecto

## Quality Gates
- [ ] Cada animación tiene propósito documentado
- [ ] Micro-interacciones < 200ms
- [ ] Transiciones < 500ms
- [ ] Reduced motion implementado
- [ ] Sin jank (> 60fps en animaciones)
- [ ] Loading states no genéricos (skeleton preferred)
- [ ] Empty states ilustrados con acción clara