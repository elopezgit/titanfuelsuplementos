# adaptive-layouts — Skill

## Objetivo
Proporcionar directrices y patrones para crear layouts responsivos y adaptativos modernos en 2026. Esta skill cubre fluid grids, container queries, fluid typography con clamp(), y adaptaciones para dispositivos plegables y múltiples contextos. El objetivo es que los layouts se adapten de manera inteligente, no solo rompan en puntos fijos.

## Cuándo usar
- Scaffolding de nuevos proyectos React+Vite
- Creación de componentes que deben verse en múltiples dispositivos
- Rediseño de layouts existentes que solo usan media queries fijas
- Cuando componentes necesitan adaptarse a su contenedor padre (no solo viewport)
- Diseño para foldables, tablets en distintas orientaciones

## Entradas
- Descripción del componente o página a diseñar
- Contexto (dashboard, e-commerce, SaaS, landing, etc.)
- Dispositivos objetivo (móvil, tablet, desktop, foldable)
- Restricciones (max-width, preferencias de tipografía, etc.)

## Procedimiento

### Paso 1: Definir Mobile-First Base
Siempre comenzar con estilos para la pantalla más pequeña (375px - iPhone SE):
- Estructura HTML semántica
- Layout básico con columnas únicas
- Tipografía base con `clamp()` para escalado fluido
- Espaciado base con escala 4px

### Paso 2: Implementar Fluid Grids (No Fijos Breakpoints)
Usar unidades relativas en lugar de pixels fijos:

```css
/* Grid fluido con CSS Grid intrinsic */
.grid {
  display: grid;
  gap: 16px; /* Espaciado consistente */
  grid-template-columns: 
    1fr /* 1 columna en móvil */
    /* 2 columnas cuando haya espacio */
    /* 3 columnas cuando haya más espacio */
}
```

**Pattern recomendado:**
```css
/* Evitar: grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
/* Usar en su lugar: grid-template-columns: repeat(auto-fit, minmax(min(20vw, 180px), 1fr)); */
```

### Paso 3: Container Queries para Componentes
Cuando un componente necesita adaptarse a su contenedor padre, no al viewport:

```css
/* Container query */
@container (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}

@container (max-width: 400px) {
  .card {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
```

**Regla**: Usar container queries para componentes reutilizables que vivirán en diferentescontextos. Usar media queries para cambios de layout global.

### Paso 4: Fluid Typography con clamp()
Nunca usar tamaños fijos de fuente en px para body text. Siempre `clamp()`:

```css
/* Fluid typography: 16px mínimo, 24px máximo, escalado entre 600px y 1800px */
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 1.5rem);
}

body {
  font-size: clamp(0.875rem, 1.5vw + 1rem, 1.125rem); /* 14px - 18px */
}
```

**Fórmula clamp()**: `clamp(minimo, dynamic, maximo)`
- `minimo`: Tamaño en pantallas muy pequeñas
- `dynamic`: Expresión que escala (vw, calc, etc.)
- `maximo`: Tamaño en pantallas muy grandes

**Regla práctica**: `clamp(1rem, 0.5vw + 1rem, 1.5rem)` para la mayoría de los headings.

### Paso 5: Breakpoints Responsivos (Evolucionados)
En 2026, los breakpoints ya no son "dispositivos específicos" sino "puntos de quiebre de contenido":

```css
/* MALO: Media queries fijas por dispositivo */
@media (min-width: 375px) { ... } /* iPhone SE */
@media (min-width: 768px) { ... } /* iPad */
@media (min-width: 1440px) { ... } /* Desktop */

/* MEJOR: Breakpoints basados en contenido */
@media (min-width: 640px) { sm: small screen context }
@media (min-width: 768px) { md: medium screen context } 
@media (min-width: 1024px) { lg: large screen context }
@media (min-width: 1280px) { xl: extra large context }
```

**Key insight**: Los breakpoints deben responder a cuándo el layout necesita cambiar, no a qué dispositivo se usa.

### Paso 6: Adaptación para Dispositivos Plegables
Considerar estados intermedios:

```css
/* Estado medio plegado */
@media (fold-level: 1) { ... }
/* Estado totalmente plegado */
@media (fold-level: 0) { ... }

/* Para soportar con detección de ancho */
@media (width: 300px) and (orientation: portrait) { ... }
/* Panel externo cuando está medio abierto */
@media (width: 600px) { ... }
```

**Testing**: Usar Chrome DevTools > Device Toolbar > Device: Pixel Fold o Galaxy Z Fold.

### Paso 7: Imágenes y Media Responsivas
```css
/* Imágenes que escalan pero nunca exceden ancho máximo */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Usar srcset para diferentes resoluciones */
<img 
  src="hero-320.jpg"
  srcset="hero-640.jpg 640w, hero-1280.jpg 1280w"
  sizes="(max-width: 640px) 90vw, (max-width: 1280px) 70vw, 800px"
  alt="Descripción comprehensible"
/>
```

**Formatos optimizados**: WebP y AVIF siempre que sea posible. `loading="lazy"` para imágenes fuera de viewport.

### Paso 8: Navegación Adaptativa
```css
/* Navegación mobile: hamburger que se transforma */
.nav {
  display: flex;
  flex-direction: column;
}

.nav_link {
  display: none; /* Oculto por defecto en mobile */
}

/* Cuando hay espacio en desktop */
@media (min-width: 1024px) {
  .nav_link {
    display: block;
  }
  
  .nav_toggle {
    display: none;
  }
}
```

**Patrones 2026**:
- **Priority+ navigation**: Items principales visibles, secundarios en menú dropdown
- **Scrollable tabs**: Cuando hay muchos links, se scrollan horizontalmente
- **Hamburger overlay**: Menú completo que aparece sobre el contenido con fondo blur

### Paso 9: Performance en RWD
- Lazy loading de imágenes fuera de viewport
- `content-visibility: auto` para contenido largo que no es inmediatamente visible
- Evitar reflows innecesarios: animar transform/opacity, no width/margin/padding
- `will-change` solo cuándo se va a animar (y quitar después)
- Bundle size < 200KB gzipped para el CSS crítico

## Anti-Patrones de Layout (Evitar)
| Anti-pattern | Por qué está mal | Solución |
|---|---|---|
| **Fixed-width layouts** | Rompen en cualquier dispositivo distinto | Fluid grids con fr/minmax/auto-fit |
| **Too many breakpoints** | 10+ breakpoints para "iPhone 5, 6, 7, 8, X, 11, 12, 13, 14, 15" | 3-4 breakpoints basados en contenido |
| **Only media queries** | No componentes adaptables a su contenedor | Agregar container queries |
| **Fixed font sizes en px** | No escalan con zoom o dispositivos | Usar clamp() para typography |
| **Fixed images** | Se salen del layout o se ven pixeladas | max-width: 100% + srcset |
| **Overflow hidden en padre** | Corta contenido en mobile | Usar word-break, overflow-x: auto solo cuando necesario |
| **Hardcoded spacing** | No consistente en diferentes contexts | Escala 4px base + CSS variables |

## Checklist de Layout Adaptativo
```
GRID & STRUCTURE
[ ] Mobile-first: layout de una columna en 375px
[ ] Fluid grid: usa fr, minmax, auto-fit en lugar de widths fijos
[ ] Container queries: componentes se adaptan a su padre
[ ] 3-4 breakpoints máximos, basados en contenido no dispositivos

TYPOGRAPHY
[ ] clamp() para todo body text y headings
[ ] Tamaño mínimo y máximo definido
[ ] Line-height consistente en todos los tamaños

IMAGES & MEDIA
[ ] max-width: 100% en todas las imágenes
[ ] srcset y sizes implementados
[ ] loading="lazy" en imágenes fuera de viewport
[ ] Format WebP/AVIF optimizados

NAVIGATION
[ ] Mobile nav hamburger o priority+ 
[ ] Desktop nav visible, no superpuesto
[ ] Transiciones suaves entre states mobile/desktop

BREAKPOINTS
[ ] Breakpoints basados en contenido ¿cuando layout necesita cambiar?
[ ] No más de 4-5 breakpoints totales
[ ] Probado en: 375px, 768px, 1024px, 1440px, foldable states

PERFORMANCE
[ ] Lazy loading implementado
[ ] content-visibility: auto en contenido largo
[ ] No layout thrash en animaciones responsive
[ ] Lighthouse RWD audit > 90
```

## Cuándo invocarlo
- Scaffolding de nuevos proyectos React+Vite
- Creación de componentes multi-device
- Rediseño de layouts que solo usan media queries fijas
- Componentes que viven en diferentescontextos (dashboard sidebar vs main content)
- Soporte para foldables y tablets

## Artefactos de salida
- Layout fluido con CSS Grid intrinsic
- Configuración de container queries por componente
- Especificación de fluid typography con clamp()
- Breakpoints documentados con razones de existencia
- Imágenes optimizadas con srcset/sizes
- Navigation adaptativa por breakpoint
- Pruebas en 375, 768, 1024, 1440, y estado plegable

## Quality Gates
- [ ] Layout fluido en 375px, 768px, 1024px, 1440px
- [ ] Container queries implementadas en componentes reutilizables
- [ ] Fluid typography con clamp() y rango sensible
- [ ] Max 4-5 breakpoints con razones de contenido
- [ ] Imágenes optimizadas (WebP/AVIF, srcset, lazy loading)
- [ ] Nav adaptativa mobile ↔ desktop
- [ ] Performance RWD > 90 (Lighthouse)