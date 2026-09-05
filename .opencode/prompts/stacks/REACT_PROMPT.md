# Prompt React / Next.js

## Stack
- Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- Estado: Server Components + Server Actions (evitar useState/Context innecesarios)
- Datos: React Query / SWR para fetching + caché en cliente
- Estilos: Tailwind CSS + shadcn/ui o componentes propios
- Testing: Vitest (unit) + Playwright (E2E)

## Prioridades
1. Server Components por defecto, Client Components solo cuando haya interactividad
2. Layouts anidados en App Router para estructuras persistentes
3. Loading states con suspense boundaries
4. Error boundaries por ruta
5. SEO: metadata dinámica, sitemap, robots.txt
6. Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

## Anti-patrones
- Todo el estado en Context/Redux sin necesidad
- "use client" en componentes que no necesitan interactividad
- Imágenes sin next/image ni lazy loading
- Fetching sin revalidación ni caché
- No manejar estados loading/error/empty
