# ui-review

## Objetivo
Revisar la implementación visual de componentes y páginas para garantizar que cumplen con el estándar de calidad del Design Committee. Rechazar activamente todo lo que parezca genérico, predecible o "hecho por IA". El output debe ser una lista accionable de correcciones específicas.

## Cuándo usar
- Antes de cada merge de componentes UI
- Revisión pre-entrega de páginas
- Cuando algo "se ve raro" pero no se puede definir qué
- Auditoría visual periódica del proyecto
- Después de que el frontend-expert implementa UI

## Entradas
- Componente/página implementado (código JSX/TSX)
- Design tokens del proyecto
- Paleta cromática definida
- Guía de estilos del proyecto

## Procedimiento

### 1. Test de los 5 segundos
Mirar el componente/página durante 5 segundos y responder:
- ¿Qué acción debe tomar el usuario? (Si no es obvio, hay problema de jerarquía)
- ¿Dónde va el ojo primero? (Si no es el punto de acción, hay problema de foco)
- ¿Se ve profesional o como template? (Si parece template, rechazar)

### 2. Checklist de calidad visual

#### A. Paleta y Color
| Check | OK | FAIL |
|---|---|---|
| Colores están en la paleta definida | | |
| No hay colores "fuera de paleta" | | |
| Neutros descansan la vista | | |
| States de color consistentes (error=rojo, success=verde) | | |
| Contraste ≥ 4.5:1 (texto), ≥ 3:1 (texto grande) | | |
| No usa solo color para comunicar estado | | |

#### B. Tipografía
| Check | OK | FAIL |
|---|---|---|
| Escala tipográfica definida y usada | | |
| No hay más de 2-3 tamaños diferentes en una pantalla | | |
| Line-height apropiado (1.4-1.6 body, 1.1-1.3 headings) | | |
| Longitud de línea 45-75 caracteres | | |
| No hay viudas (palabra sola en línea) | | |
| Fuentes cargan con font-display: swap | | |

#### C. Espaciado
| Check | OK | FAIL |
|---|---|---|
| Espaciado sigue escala de 4px | | |
| Elementos no están apretados | | |
| Grupos visualmente separados | | |
| Espaciado consistente entre elementos similares | | |
| Whitespace generoso (no todo lleno) | | |

#### D. Layout
| Check | OK | FAIL |
|---|---|---|
| Grid consistente (12 columnas o sistema definido) | | |
| Elementos alineados a la grid | | |
| Ritmo visual (no todo mismo tamaño) | | |
| Jerarquía clara de secciones | | |

#### E. Componentes
| Check | OK | FAIL |
|---|---|---|
| Botones con todos los estados | | |
| Inputs con borde, focus ring, error state | | |
| Cards con personalidad (no sombra genérica) | | |
| Modales con backdrop y animación | | |
| Loading states con skeleton/shimmer | | |
| Empty states con acción clara | | |
| Error states con retry | | |

#### F. Anti-AI (rechazar si alguno está presente)
| Anti-patrón | Rechazar |
|---|---|
| Gradientes rainbow sin razón visual | |
| Cards con sombra default sin customizar | |
| Iconos genéricos sin personalizar | |
| Layouts centrados simétricos para todo | |
| Textos "Welcome to your app" | |
| Botones azul genérico | |
| Espaciado uniforme sin ritmo | |
| Bordes redondeados iguales en todo | |
| Sombras perfectamente simétricas | |
| Imágenes stock o ilustraciones genéricas | |

### 3. Formato de salida
```markdown
## UI Review: [componente/página]

### RECHAZADO (debe corregirse)
- **[VIS-001]** Card usa sombra default de Tailwind → Customizar sombra según tokens del proyecto
- **[VIS-002]** Gradiente rainbow en hero → Reemplazar con gradiente sutil de primary a accent

### SUGERENCIA (mejora opcional)
- **[VIS-003]** Agregar micro-interacción en hover del botón
- **[VIS-004]** El spacing entre secciones podría ser más generoso

### APROBADO
- Paleta correcta ✓
- Tipografía coherente ✓
- Responsive ✓
```

## Salida
- Lista de hallazgos clasificados: RECHAZADO / SUGERENCIA / APROBADO
- Cada hallazgo con: ubicación, problema específico, fix concreto con código
- Veredicto final: APPROVE / REJECT (con lista de fixes obligatorios)

## Quality gates
- [ ] Test de los 5 segundos superado
- [ ] Sin anti-patrones de diseño AI
- [ ] Paleta del proyecto respetada
- [ ] Tipografía coherente
- [ ] Espaciado consistente
- [ ] Todos los estados de componentes implementados
