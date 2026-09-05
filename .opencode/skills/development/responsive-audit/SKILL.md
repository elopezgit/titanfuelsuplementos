# responsive-audit

## Objetivo
Auditar que la aplicación funciona y se ve correctamente en todos los breakpoints y dispositivos目标. Identificar problemas de responsive design antes de que lleguen a producción.

## Cuándo usar
- Después de implementar una página o componente nuevo
- Antes de cada release
- Cuando se reporta que algo "se ve mal en móvil"
- Auditoría periódica del proyecto

## Breakpoints objetivo
| Breakpoint | Ancho | Dispositivo | Prioridad |
|---|---|---|---|
| xs | < 640px | iPhone SE, Galaxy Mini | Crítico |
| sm | 640px | iPhone 14, Pixel 7 | Crítico |
| md | 768px | iPad Mini, Tablet | Alto |
| lg | 1024px | iPad Pro, Laptop | Alto |
| xl | 1280px | Desktop | Medio |
| 2xl | 1536px | Large Desktop | Bajo |

## Procedimiento

### 1. Auditoría por breakpoint

Para CADA breakpoint, verificar:

#### Mobile (< 640px) — CRÍTICO
- [ ] Layout es de una columna
- [ ] Navegación es hamburger menu o bottom tabs
- [ ] Touch targets ≥ 44x44px
- [ ] Texto ≥ 16px (sin zoom para leer)
- [ ] Imágenes escalan correctamente
- [ ] No hay horizontal scroll (overflow-x: hidden)
- [ ] Botones anchos (100% o casi)
- [ ] Forms son usables (inputs grandes, teclado no tapa contenido)
- [ ] Modales son full-screen o bottom sheet
- [ ] Tabla tiene alternativa (scroll horizontal, card layout, o collapse)

#### Tablet (640-1024px)
- [ ] Layout usa 2 columnas donde aporta
- [ ] Navegación adaptada (sidebar colapsada o tabs)
- [ ] Touch targets ≥ 44px
- [ ] Contenido no queda con mucho whitespace vacío
- [ ] Sidebars colapsables

#### Desktop (> 1024px)
- [ ] Layout usa espacio disponible (no todo centrado en 800px)
- [ ] Hover states funcionan
- [ ] Navegación completa visible
- [ ] densidad de información apropiada

### 2. Auditoría de componentes específicos

#### Tabla/Data Grid
- [ ] Mobile: Card layout o scroll horizontal con indicador
- [ ] Columnas prioritarias visibles en mobile
- [ ] Acciones accesibles (no ocultas en mobile)

#### Formulario
- [ ] Inputs apilados en mobile (no lado a lado)
- [ ] Labels visibles (no placeholder-only)
- [ ] Validación inline
- [ ] Botón submit sticky o siempre visible
- [ ] Teclado no tapa el campo activo

#### Navegación
- [ ] Mobile: Hamburger con menú full-screen O bottom tabs
- [ ] Desktop: Sidebar o top nav completa
- [ ] Active state visible
- [ ] Back button funcional

#### Modal/Dialog
- [ ] Mobile: Full-screen o bottom sheet
- [ ] Desktop: Centrado con max-width
- [ ] Close button accesible
- [ ] Backdrop tap cierra el modal

#### Cards
- [ ] Mobile: Stack vertical
- [ ] Desktop: Grid horizontal
- [ ] Contenido truncado con límite apropiado
- [ ] Imágenes con aspect-ratio correcto

### 3. Auditoría de imágenes y media
- [ ] Imágenes con responsive srcset
- [ ] picture element para art direction
- [ ] Imágenes no se estiran (object-fit: cover/contain)
- [ ] Videos responsive (16:9 o custom)
- [ ] SVGs inline y escalables

### 4. Auditoría de tipografía responsiva
- [ ] Font sizes con clamp() para transición suave
- [ ] Headings no se desbordan en mobile
- [ ] Párrafos no tienen líneas demasiado largas en desktop
- [ ] Longitud de línea 45-75 chars en todos los breakpoints

### 5. Formato de salida
```markdown
## Responsive Audit: [página/componente]

### iPhone SE (375px) — CRÍTICO
| Componente | Estado | Problema |
|---|---|---|
| Header | ✅ PASS | — |
| Form | ❌ FAIL | Inputs lado a lado, se aprietan |
| Table | ⚠️ WARN | Sin alternativa mobile |

### iPad (768px)
...

### Desktop (1440px)
...
```

## Salida
- Auditoría por breakpoint con estado (PASS/FAIL/WARN)
- Cada problema con: dispositivo, componente, problema específico, fix sugerido
- Priorización: CRÍTICO (móvil) > ALTO (tablet) > MEDIO (desktop)

## Quality gates
- [ ] Todos los breakpoints críticos pasan (mobile)
- [ ] Sin horizontal scroll no intencionado
- [ ] Touch targets ≥ 44px en mobile
- [ ] Texto legible sin zoom
- [ ] Imágenes no se estiran
- [ ] Navegación funcional en todos los breakpoints
