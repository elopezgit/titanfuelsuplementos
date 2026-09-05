# Design System Template

## Estructura del template

### 1. design-tokens.ts
```typescript
export const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    accent: {
      50: '#fdf4ff',
      500: '#a855f7',
      900: '#6b21a8',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  typography: {
    families: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Inter", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    scale: {
      '2xs': '0.75rem/1rem',
      xs: '0.8125rem/1.125rem',
      sm: '0.875rem/1.25rem',
      base: '1rem/1.5rem',
      lg: '1.125rem/1.625rem',
      xl: '1.25rem/1.75rem',
      '2xl': '1.5rem/2rem',
      '3xl': '1.875rem/2.25rem',
      '4xl': '2.25rem/2.5rem',
      '5xl': '3rem/3.25rem',
    },
  },
  spacing: {
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
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
}
```

### 2. tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'
import { tokens } from './design-tokens'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          ...tokens.colors.primary,
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          ...tokens.colors.accent,
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        ...tokens.colors.neutral,
        ...tokens.colors.semantic,
      },
      fontFamily: tokens.typography.families,
      fontSize: tokens.typography.scale,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### 3. globals.css
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --radius: 0.5rem;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 221 83% 53%;
    --primary-foreground: 210 40% 98%;
    --accent: 270 76% 58%;
    --accent-foreground: 210 40% 98%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 221 83% 53%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
  }
}
```

### 4. Componentes base (shadcn/ui customizados)
Cada componente debe:
- Usar los design tokens del proyecto
- Tener todas las variantes (primary, secondary, ghost, destructive)
- Tener todos los estados (default, hover, focus, active, disabled, loading)
- Ser responsive
- Tener accesibilidad (aria-labels, focus management)

### 5. DOCUMENTATION.md
```markdown
# Design System - [Nombre del Proyecto]

## Paleta de colores
[Documentar cada color con nombre, hex, y cuándo usarlo]

## Tipografía
[Documentar cada tamaño con ejemplo visual]

## Espaciado
[Documentar la escala con ejemplos]

## Componentes
[Documentar cada componente con props, variantes, y ejemplos de uso]

## Guías de uso
[Cuándo usar cada variante, cada componente, cada color]
```
