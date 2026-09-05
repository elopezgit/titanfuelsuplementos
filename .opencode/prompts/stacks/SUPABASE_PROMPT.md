# Prompt Supabase

## Stack
- Frontend: Next.js 14+ (App Router) + TypeScript + Tailwind
- Backend: Supabase (PostgreSQL + Auth + RLS + Edge Functions)
- BD: PostgreSQL con RLS obligatorio en TODAS las tablas
- SDK: `@supabase/supabase-js` + `@supabase/ssr`

## Prioridades
1. **RLS primero**: Toda tabla debe tener Row Level Security. Sin excepción
2. **Cliente correcto**: browser (anon) ≠ server (anon) ≠ service_role (solo admin)
3. **.env seguro**: service_role key NUNCA en frontend, NUNCA en build pública
4. **Auth primero**: Configurar providers OAuth antes de empezar features
5. **Tipado**: Generar types de BD con `supabase gen types`

## Anti-patrones comunes
- Usar service_role key en el cliente ❌
- RLS desactivado en tablas con datos de usuario ❌
- Políticas `USING (true)` en tablas sensibles ❌
- Hacer fetch de datos sin caché ni revalidación ❌
- No usar `@supabase/ssr` en Server Components ❌

## Patrones recomendados
- Server Components para datos initiales, Client Components para interactividad
- React Server Actions para mutations con revalidación
- Middleware para refrescar sesión en cada request
- Políticas RLS por owner (auth.uid()) y por rol
- Edge Functions para lógica que requiere service_role
