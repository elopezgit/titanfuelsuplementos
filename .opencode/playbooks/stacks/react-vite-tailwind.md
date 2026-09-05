# Playbook React + Vite + Tailwind CSS

## Stack completo
- **Frontend**: React 18+ / Vite 5+ / TypeScript 5+ / Tailwind CSS 3.4+
- **Componentes**: shadcn/ui (customizado por Digital Design Committee)
- **Estado**: Zustand (global) + TanStack Query (server state)
- **Formularios**: React Hook Form + Zod
- **Animaciones**: Framer Motion
- **Testing**: Vitest + React Testing Library + Playwright
- **Backend**: Supabase (PostgreSQL + Auth + RLS + Edge Functions) o Node/NestJS
- **Infra**: Docker Compose + GitHub Actions

## Estructura del proyecto
```
/webapp
├── src/
│   ├── app/                    # Configuración de la app
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── routes.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui (customizados)
│   │   ├── layout/             # Header, Sidebar, Footer
│   │   └── shared/             # Componentes compartidos
│   ├── features/
│   │   └── [feature]/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types/
│   ├── hooks/
│   ├── lib/
│   │   ├── utils.ts            # cn() helper
│   │   └── api.ts
│   ├── stores/                 # Zustand stores
│   ├── styles/
│   │   └── globals.css
│   └── types/
├── public/
├── design-tokens.ts            # Design tokens del Digital Design Committee
├── tailwind.config.ts
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── docker-compose.yml
└── .env.example
```

## Flujo de trabajo para nuevo proyecto

### Fase 1: Scaffolding (Frontend Expert Vite)
```bash
# 1. Crear proyecto
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install

# 2. Instalar dependencias core
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init
npm install react-router-dom zustand @tanstack/react-query
npm install react-hook-form @hookform/resolvers zod
npm install framer-motion lucide-react date-fns clsx tailwind-merge

# 3. Instalar dev dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D @vitest/coverage-v8 @playwright/test
npm install -D prettier eslint-config-prettier
```

### Fase 2: Design Tokens (Digital Design Committee)
1. Definir paleta cromática (primary, accent, neutrals, semantics)
2. Definir escala tipográfica (families, sizes, line-heights)
3. Definir spacing scale (4px base)
4. Definir border radius, shadows, transitions
5. Exportar a design-tokens.ts y tailwind.config.ts
6. Customizar componentes shadcn/ui con los tokens

### Fase 3: Diseño de UX (UX Design Master)
1. Definir personas de usuario
2. Crear user journeys para tareas principales
3. Diseñar wireframes (low-fi → hi-fi)
4. Prototipar flujos clave
5. Definir estados de UI (loading, empty, error, success)
6. Especificar responsive por breakpoint

### Fase 4: Implementación
1. Layouts base (RootLayout, DashboardLayout, AuthLayout)
2. Navegación (rutas, breadcrumbs, sidebar)
3. Páginas principales
4. Componentes de features
5. Integración con backend (Supabase o API)

### Fase 5: Quality Gates
- [ ] Digital Design Committee: review visual aprobado
- [ ] UX Design Master: flujos validados
- [ ] Responsive audit: todos los breakpoints pasan
- [ ] Accessibility audit: WCAG 2.1 AA
- [ ] Performance: Lighthouse > 95
- [ ] Tests: coverage > 70%

## Convenciones de código
- Componentes en kebab-case: `user-profile.tsx`
- Hooks en camelCase: `useAuth.ts`
- Types en PascalCase: `UserProfile`
- Archivos de utilidad en kebab-case: `format-date.ts`
- Imports con @/ alias: `import { Button } from '@/components/ui/button'`

## Scripts del proyecto
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
    "test:e2e": "playwright test",
    "typecheck": "tsc --noEmit"
  }
}
```
