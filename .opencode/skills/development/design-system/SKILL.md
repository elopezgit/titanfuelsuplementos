# design-system

## Objetivo
Crear y mantener un sistema de diseño completo para un proyecto: design tokens, paleta cromática, escala tipográfica, componentes documentados y guías de uso. El sistema debe ser la fuente única de verdad para todo lo visual.

## Cuándo usar
- Proyecto nuevo (definición desde cero)
- Cuando no existe coherencia visual en componentes existentes
- Antes de que empiece la implementación de UI
- Cuando se detecta "drift" visual entre componentes
- Rebranding o cambio de identidad visual

## Entradas
- Tipo de proyecto (SaaS, ecommerce, portfolio, etc.)
- Preferencias de marca del usuario (si existen)
- Competencia visual (referencias de diseño)
- Stack tecnológico (React+Vite+Tailwind, etc.)

## Procedimiento

### 1. Definir identidad visual
Preguntar al usuario (o inferir del contexto):
- ¿Qué emoción debe transmitir? (profesional, amigable, premium, energético)
- ¿Tiene colores de marca existentes?
- ¿Tiene tipografías preferidas?
- ¿Referencias de diseño que le gusten? ( URLs de sitios )

### 2. Crear paleta cromática
```typescript
// Estructura obligatoria
export const palette = {
  // 1 color principal (la marca)
  primary: {
    50: '#...',   // versiones más claras
    100: '#...',
    500: '#...',  // color base
    900: '#...',  // versiones más oscuras
  },
  // 1 color acento (complementario)
  accent: { ... },
  // Neutros (grises con temperatura: warm o cool)
  neutral: {
    50: '#fafafa',   // backgrounds
    100: '#f5f5f5',  // borders light
    200: '#e5e5e5',  // borders
    300: '#d4d4d4',  // text disabled
    400: '#a3a3a3',  // text placeholder
    500: '#737373',  // text secondary
    600: '#525252',  // text primary
    700: '#404040',  // headings
    800: '#262626',  // backgrounds dark
    900: '#171717',  // text on light bg
  },
  // Semánticos
  semantic: {
    success: '#...',  // verde
    warning: '#...',  // ámbar
    error: '#...',    // rojo
    info: '#...',     // azul
  },
}
```

### 3. Crear escala tipográfica
```typescript
export const typography = {
  families: {
    heading: '"Font Elegida", sans-serif',  // Con personalidad
    body: '"Inter", system-ui, sans-serif',  // Legible
    mono: '"JetBrains Mono", monospace',     // Código
  },
  scale: {
    '2xs': '0.75rem/1rem',     // 12px
    xs: '0.8125rem/1.125rem',  // 13px
    sm: '0.875rem/1.25rem',    // 14px
    base: '1rem/1.5rem',       // 16px ← BASE
    lg: '1.125rem/1.625rem',   // 18px
    xl: '1.25rem/1.75rem',     // 20px
    '2xl': '1.5rem/2rem',      // 24px
    '3xl': '1.875rem/2.25rem', // 30px
    '4xl': '2.25rem/2.5rem',   // 36px
    '5xl': '3rem/3.25rem',     // 48px
  },
}
```

### 4. Definir spacing scale (4px base)
```typescript
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
}
```

### 5. Definir componentes core
Para cada componente, documentar:
- **Nombre**: Descriptivo, en español o inglés (elegir y mantener)
- **Props**: Cada prop con tipo, default, y descripción
- **Variantes**: primary/secondary/ghost, sm/md/lg
- **Estados**: default/hover/focus/active/disabled/loading
- **Uso correcto**: Cuándo sí, cuándo no
- **Ejemplo**: Código de uso mínimo

Componentes obligatorios:
- Button (primary, secondary, ghost, danger + sizes)
- Input (text, email, password, number + error state)
- Select / Combobox
- Modal / Dialog
- Card (interactive, static)
- Badge / Tag
- Alert / Toast
- Skeleton (loading)
- Avatar
- Tabs
- Dropdown Menu
- Tooltip
- Separator

### 6. Exportar como tokens de Tailwind
```javascript
// tailwind.config.ts
import { palette, typography, spacing } from './design-tokens'

export default {
  theme: {
    extend: {
      colors: palette,
      fontFamily: typography.families,
      fontSize: typography.scale,
      spacing: spacing,
    },
  },
}
```

## Salida
- `design-tokens.ts` — Todos los tokens definidos
- `tailwind.config.ts` — Configuración de Tailwind con tokens
- `components/` — Componentes base implementados
- `DESIGN_SYSTEM.md` — Documentación del sistema
- Paleta cromática con justificación
- Guía de tipografía con ejemplos visuales
- Guía de componentes con variantes y estados

## Quality gates
- [ ] Paleta definida con primary, accent, neutrals, semantics
- [ ] Escala tipográfica con 8+ tamaños
- [ ] Spacing scale de 4px base
- [ ] Todos los componentes core implementados
- [ ] Cada componente tiene todos los estados (hover, focus, disabled, loading)
- [ ] Tokens exportados a Tailwind config
- [ ] Documentación del sistema con ejemplos de uso
- [ ] Contraste verificado (4.5:1 mínimo)
