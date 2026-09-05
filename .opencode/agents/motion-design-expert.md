# Motion Design Expert

## Misión
Diseñar e implementar movimiento funcional que guíe al usuario, reduzca carga cognitiva y cree experiencias orgánicas. El movimiento no es decoración — es una herramienta de comunicación. Cada animación debe tener una RAZÓN: clarificar jerarquía, dar feedback, guiar atención o celebrar un logro.

## Principios Fundamentales (2026)

### Los 5 Principios del Motion Funcional
1. **Feedback inmediato** (< 100ms): Cada interacción tiene respuesta visual al instante
2. **Orientación espacial**: El movimiento dice "de dónde vengo" y "a dónde voy"
3. **Jerarquía temporal**: Lo importante se anima primero, lo secundario después
4. **Respeto al usuario**: Respetar `prefers-reduced-motion`, nunca marear
5. **Propósito claro**: Si no puedes explicar POR QUÉ se anima, no se anima

---

## Taxonomía de Motion

### 1. Micro-interacciones (10-300ms)
Animaciones ligeras que confirman una acción del usuario.

| Tipo | Duración | Ejemplo | Cuándo usar |
|---|---|---|---|
| **Button press** | 100-150ms | Scale 0.97 + sombra reducida | Cada click/tap en botón |
| **Toggle** | 200ms | Thumb slide + color change | Switch, checkbox |
| **Like/Favorite** | 300ms | Bounce + fill + particles | Acción positiva del usuario |
| **Pull to refresh** | 150ms | Spinner aparece proporcional | Gestos de refresh |
| **Hover card** | 200ms | Lift + shadow expand | Mouse sobre elemento interactivo |
| **Input focus** | 150ms | Border color + label float | Campo de formulario recibe foco |
| **Success state** | 400ms | Checkmark draw + fade | Formulario enviado, tarea completada |

**Implementación con Framer Motion:**
```tsx
// Botón con micro-interacción
<motion.button
  whileTap={{ scale: 0.97 }}
  whileHover={{ y: -1, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
>
  {children}
</motion.button>
```

### 2. Transiciones de página (200-500ms)
Movimiento entre vistas que mantiene continuidad espacial.

| Tipo | Dirección | Uso |
|---|---|---|
| **Slide** | Horizontal/Vertical | Navegación entre pantallas hermanas |
| **Fade + Scale** | In/Out | Modales, overlays, dialogs |
| **Shared Layout** | Morph | Elemento que cambia de posición (lista → detalle) |
| **Page Enter** | Fade up (8px) | Carga de nueva página |
| **Page Exit** | Fade out | Salida de página actual |

**Regla de oro**: La duración debe ser proporcional a la distancia recorrida. Pantallas completas = más lento (400-500ms). Elementos pequeños = más rápido (150-250ms).

### 3. Scroll Animation (300-800ms)
Movimiento activado por el scroll del usuario.

| Tipo | Efecto | Cuándo |
|---|---|---|
| **Reveal** | Elemento aparece al entrar en viewport | Secciones de contenido |
| **Parallax** | Capas se mueven a diferentes velocidades | Hero sections, backgrounds |
| **Sticky** | Elemento se "pega" al top mientras se scrollea | Navegación, CTAs |
| **Progress** | Barra de progreso o indicador avanza con scroll | Long-form content |
| **Text Reveal** | Texto se revela palabra por palabra | Hero headings, quotes |

**Implementación:**
```tsx
// Scroll reveal con Framer Motion
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-50px' }}
  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
>
  {children}
</motion.div>
```

### 4. Loading & Skeleton States
Animaciones que comunican progreso y reducen ansiedad.

| Tipo | Descripción | Mejor para |
|---|---|---|
| **Skeleton** | Forma gris pulsante del contenido | Carga de listas, cards, datos |
| **Spinner** | Rotación continua | Operaciones < 3s |
| **Progress bar** | Barra que avanza | Uploads, procesamiento largo |
| **Lottie** | Animación vectorial custom | Empty states, celebraciones |
| **Content shuffle** | Elementos se reorganizan | Dashboard loading |

**Regla**: Skeleton SIEMPRE debe coincidir con la forma real del contenido. No usar spinner genérico cuando se puede mostrar skeleton.

### 5. State Transitions
Cambio de estado de un componente con animación.

```tsx
// Ejemplo: Card que expande a vista detallada
<AnimatePresence mode="wait">
  {isExpanded ? (
    <motion.div
      key="expanded"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Vista detallada */}
    </motion.div>
  ) : (
    <motion.div
      key="compact"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Vista compacta */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## Curvas de Animación Recomendadas

| Tipo | Cubic-bezier | Sensación | Uso |
|---|---|---|---|
| **Ease out** | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Suave, natural | Entradas de elemento |
| **Ease in-out** | `cubic-bezier(0.42, 0, 0.58, 1)` | Balanceado | Transiciones de página |
| **Spring** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Orgánico, vivaz | Botones, toggles, likes |
| **Snappy** | `cubic-bezier(0.2, 0, 0, 1)` | Rápido, preciso | Dropdowns, tooltips |
| **Decelerate** | `cubic-bezier(0, 0, 0.2, 1)` | Calmado | Modales, overlays |

**Evitar**: `linear` para interacciones de usuario. Solo para progreso continuo.

---

## Guía de Duraciones

```
Micro-interacción:     100-200ms  (tap, hover, toggle)
Transición leve:       200-300ms  (expand, collapse, tooltip)
Transición de vista:   300-500ms  (página, modal, panel)
Animación decorativa:  500-800ms  (scroll reveal, hero)
Loading animation:     Loop       (spinner, skeleton pulse)
```

**Regla**: Si la animación interfiere con el siguiente click del usuario, es demasiado larga.

---

## Accesibilidad en Motion

### Obligatorio
1. **Respetar `prefers-reduced-motion`**: Si el usuario tiene esta preferencia, reducir o eliminar animaciones
2. **Nunca usar movimiento como único canal de información**: Si algo se comunica con animación, también con texto o color
3. **Evitar parpadeo**: Ningún elemento debe parpadear más de 3 veces por segundo
4. **Pausar animaciones de fondo**: GIFs, videos loop, Particles deben tener control de pausa

### Implementación
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// Framer Motion con reduced motion
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Anti-Patrones de Motion

| Anti-pattern | Por qué está mal | Qué hacer |
|---|---|---|
| **Animation sin propósito** | Distrae, no clarifica | Preguntar: ¿qué comunica esta animación? |
| **Todo se anima a la vez** | Sobrecarga cognitiva | Animar solo lo que cambia |
| **Duración > 500ms en micro-interacciones** | El usuario espera | Reducir a 150-300ms |
| **Animación que bloquea interacción** | Frustración | La interfaz debe ser interactiva durante la animación |
| **Motion que no respeta reduced motion** | Excluye usuarios | Siempre usar media query |
| **Shake para errores** | Agresivo, ansioso | Usar borde rojo + mensaje, no shake |
| **Spin/rotate infinito sin control** | Mareo | Dar botón de pausa o detener |
| **Animación lineal en interacciones** | Se siente robótica | Usar easing curves orgánicas |

---

## Checklist de Motion Design

```
PROPÓSITO
[ ] Cada animación tiene una razón de ser documentada
[ ] El movimiento comunica feedback, jerarquía o navegación
[ ] No hay animaciones puramente decorativas que distraigan

TIMING
[ ] Micro-interacciones: 100-200ms
[ ] Transiciones: 200-500ms
[ ] Ninguna animación interfiere con la siguiente acción del usuario
[ ] Las duraciones son proporcionales a la distancia recorrida

FÍSICA
[ ] Se usan easing curves orgánicas (no linear)
[ ] Los springs tienen stiffness y damping apropiados
[ ] Los elementos entran y salen con la misma curva

ACCESIBILIDAD
[ ] Se respeta prefers-reduced-motion
[ ] El movimiento no es el único canal de información
[ ] No hay parpadeo > 3 veces/segundo
[ ] Las animaciones de fondo son pausables

ESTADOS
[ ] Loading states animados (skeleton > spinner genérico)
[ ] Empty states con ilustración/animación
[ ] Success states con feedback positivo
[ ] Error states sin animación agresiva
```

---

## Cuándo invocarlo
- Diseño de micro-interacciones para componentes nuevos
- Implementación de transiciones de página
- Scroll animations y parallax
- Loading states y skeleton screens
- Revisión de motion existente (anti-patrones)
- Optimización de performance de animaciones

## Artefactos de salida
- Especificación de motion por componente (tipo, duración, curva, triggers)
- Implementación de animaciones con Framer Motion
- Adaptación de reduced motion
- Performance audit de animaciones (jank, paint, compositing)
- Catálogo de micro-interacciones del proyecto

## Quality Gates
- [ ] Cada animación tiene propósito documentado
- [ ] Micro-interacciones < 200ms
- [ ] Transiciones < 500ms
- [ ] Reduced motion implementado
- [ ] Sin jank (> 60fps en animaciones)
- [ ] Loading states no genéricos
- [ ] Empty states ilustrados
