# Prompt React + Vite + Tailwind CSS

## Stack
- **Framework**: React 18+ / Vite 5+ / TypeScript 5+
- **Estilos**: Tailwind CSS 3.4+ / shadcn/ui (customizado)
- **Estado**: Zustand (global) + TanStack Query (server state)
- **Formularios**: React Hook Form + Zod
- **Animaciones**: Framer Motion
- **Testing**: Vitest + React Testing Library + Playwright
- **Backend**: Supabase (PostgreSQL + Auth + RLS) o Node/NestJS

## Prioridades de implementación

### 1. Server-first por defecto
- Server Components cuando Next.js aplica
- React+Vite: Cargar datos en el mount, no en el render
- TanStack Query para toda data del servidor
- Suspense boundaries para loading states

### 2. Componentes con personalidad
- Cada componente tiene design tokens del proyecto
- NUNCA usar estilos default de shadcn/ui sin customizar
- Empty states con acciones claras (no "No hay datos")
- Error states con retry (no solo "Error")
- Loading states con skeleton (no spinner genérico)

### 3. Responsive mobile-first
- Breakpoints: 375 → 768 → 1024 → 1440
- Touch targets ≥ 44px
- Typography con clamp() para transición suave
- Container queries para componentes complejos

### 4. Performance
- Code splitting por ruta (React.lazy)
- Lazy loading de imágenes
- Fuentes con font-display: swap
- Bundle < 200KB gzipped (landing)
- LCP < 1.5s, CLS < 0.05

### 5. Accesibilidad
- Semantic HTML (section, article, nav, main)
- Focus management visible
- ARIA labels solo cuando HTML semántico no alcanza
- Color contrast ≥ 4.5:1
- Respetar prefers-reduced-motion

## Anti-patrones RECHAZAR
- `any` en TypeScript
- CSS inline (usar Tailwind)
- useState para datos de API (usar TanStack Query)
- useEffect para cálculos (usar useMemo)
- Componentes > 300 líneas
- Props > 8 parámetros
- Sin loading/error/empty states
- Imágenes sin lazy loading
- Búsqueda sin debounce
- Formularios sin validación

## Anti-patrones de diseño visual RECHAZAR
- Gradientes rainbow sin razón
- Cards con sombra default
- Iconos genéricos sin personalizar
- Layouts centrados simétricos
- Textos "Welcome to your app"
- Botones azul genérico
- Espaciado uniforme sin ritmo
- Bordes redondeados iguales en todo

## Quality checklist
- [ ] TypeScript estricto (no any)
- [ ] Loading state implementado
- [ ] Empty state implementado
- [ ] Error state con retry
- [ ] Responsive en todos los breakpoints
- [ ] Accesibilidad WCAG 2.1 AA
- [ ] Design tokens aplicados
- [ ] Tests unitarios > 70% coverage
- [ ] Lighthouse Performance > 95
- [ ] Bundle size dentro de límites
