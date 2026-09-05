# vite-scaffolding

## Objetivo
Crear la estructura inicial de un proyecto React con Vite de forma profesional y completa. No usar create-vite genérico — generar una estructura production-ready con todas las configuraciones, convenciones y herramientas pre-configuradas.

## Cuándo usar
- Proyecto nuevo React+Vite
- Cuando el usuario pide "iniciar un proyecto React"
- Después de que el Coordinator aprueba el stack

## Entradas
- Nombre del proyecto
- Tipo de app (landing, dashboard, ecommerce, SaaS, portfolio)
- Preferencias del usuario (si las hay)

## Procedimiento

### 1. Scaffold con create-vite
```bash
npm create vite@latest [nombre] -- --template react-ts
cd [nombre]
npm install
```

### 2. Instalar dependencias core
```bash
# Estilos
npm install -D tailwindcss @tailwindcss/vite

# Componentes UI
npx shadcn@latest init
# Seleccionar: New York style, Zinc palette, CSS variables: yes

# Rutas
npm install react-router-dom

# Estado
npm install zustand

# Server state
npm install @tanstack/react-query

# Formularios
npm install react-hook-form @hookform/resolvers zod

# Animaciones
npm install framer-motion

# Iconos
npm install lucide-react

# Utilidades
npm install date-fns clsx tailwind-merge

# HTTP client (si necesita API calls)
npm install axios

# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D @vitest/coverage-v8

# Linting
npm install -D eslint @eslint/js typescript-eslint
npm install -D eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D prettier eslint-config-prettier
```

### 3. Estructura de carpetas
```
/src
├── app/                    # Configuración de la app
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── routes.tsx          # Definición de rutas
├── components/             # Componentes compartidos
│   ├── ui/                 # shadcn/ui components (auto-generados)
│   ├── layout/             # Layout components (Header, Sidebar, Footer)
│   └── shared/             # Componentes custom del proyecto
├── features/               # Feature-based modules
│   └── [feature-name]/
│       ├── components/     # Componentes de la feature
│       ├── hooks/          # Hooks custom
│       ├── services/       # API calls, lógica de negocio
│       ├── types/          # TypeScript types
│       └── index.ts        # Barrel export
├── hooks/                  # Hooks globales
├── lib/                    # Utilidades, helpers
│   ├── utils.ts            # cn() helper, formatters
│   └── api.ts              # API client config
├── stores/                 # Zustand stores
├── styles/                 # Estilos globales
│   └── globals.css         # Tailwind imports + custom styles
├── types/                  # TypeScript types globales
└── vite-env.d.ts           # Vite types
```

### 4. Configurar Tailwind
```css
/* src/styles/globals.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  /* ... design tokens */
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    /* ... CSS variables */
  }
}
```

### 5. Configurar paths de importación
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```ts
// vite.config.ts
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 6. Configurar tests
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
})
```

### 7. Configurar ESLint + Prettier
```js
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  }
)
```

### 8. Scripts en package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write src/",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "typecheck": "tsc --noEmit"
  }
}
```

## Salida
- Proyecto scaffold listo para `npm run dev`
- Estructura de carpetas profesional
- Tailwind configurado con design tokens
- shadcn/ui inicializado
- ESLint + Prettier configurados
- Vitest configurado con coverage
- Path aliases configurados
- Scripts de desarrollo definidos

## Quality gates
- [ ] `npm run dev` funciona sin errores
- [ ] `npm run build` genera dist/
- [ ] `npm run lint` pasa sin errores
- [ ] `npm run test` ejecuta sin errores
- [ ] `npm run typecheck` pasa sin errores
- [ ] Estructura de carpetas profesional
- [ ] Importaciones con @/ alias funcionan
- [ ] Tailwind aplica estilos
