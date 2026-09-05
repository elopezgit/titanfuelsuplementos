# Project Generator

## Objetivo
Generar automáticamente la estructura IA para cualquier proyecto webapp, optimizado para Supabase + Next.js.

## Flujo
1. Detectar proyecto NUEVO o EXISTENTE
2. Si NUEVO:
   a. Preguntar tipo de webapp + stack preferido
   b. Si no hay preferencia → recomendar Supabase + Next.js
   c. Ejecutar Discovery para confirmar stack y dominio
   d. Generar PROJECT_PROFILE con perfil completo
   e. Generar PROJECT_MEMORY inicial
   f. Seleccionar agentes según stack detectado:
      - Supabase → supabase-expert (primario), frontend-expert, devops-expert
      - Node + React → backend-expert, frontend-expert, database-expert
      - .NET + React → backend-expert, frontend-expert, database-expert
   g. Generar skills necesarias según stack y dominio
   h. Crear plan de bootstrap (qué archivos generar, en qué orden)
   i. Esperar aprobación
   j. Ejecutar scaffolding

3. Si EXISTENTE:
   a. Ejecutar Discovery del proyecto actual
   b. Detectar stack real vs esperado
   c. Identificar gaps y mejoras
   d. Generar plan de mejora
   e. Esperar aprobación
   f. Ejecutar plan

## Output por stack

### Supabase + Next.js
- `next.config.js` con config de imágenes y headers
- `src/lib/supabase/client.ts`, `server.ts`, `admin.ts`
- `src/middleware.ts` con auth check
- `supabase/migrations/` inicial
- `supabase/seed.sql`
- `.env.example` con placeholders
- `docker-compose.yml` (opcional, para Supabase local con `supabase start`)

### Node + React
- Estructura backend con Express/NestJS
- Estructura frontend con Next.js/Vite
- Prisma schema + migraciones
- Docker Compose + CI/CD

### .NET + React
- Clean Architecture .NET
- Estructura frontend React
- Entity Framework migrations
- Docker Compose + CI/CD
