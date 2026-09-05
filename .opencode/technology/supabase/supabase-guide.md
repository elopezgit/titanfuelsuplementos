# Supabase — Guía Tecnológica

## Versiones y compatibilidad
- Supabase CLI: `npm install -g supabase`
- `@supabase/supabase-js`: última estable
- `@supabase/ssr`: requerido para Next.js App Router
- Node: 18+ (20+ recomendado)
- Deno: 1.x (para Edge Functions)

## Comandos útiles

```bash
# Inicializar proyecto Supabase local
supabase init

# Iniciar servicios locales (PostgreSQL + Studio)
supabase start

# Detener servicios
supabase stop

# Generar tipos TypeScript desde esquema
supabase gen types typescript --local > src/lib/supabase/database.types.ts

# Crear migración
supabase migration new nombre_migracion

# Aplicar migraciones a base remota
supabase db push

# Deploy Edge Function
supabase functions deploy mi-funcion

# Ver logs de Edge Functions
supabase functions logs mi-funcion
```

## Servicios locales (supabase start)
- Studio: http://localhost:54323
- API: http://localhost:54321
- DB: postgresql://postgres:postgres@localhost:54322/postgres
- SMTP: http://localhost:54324 (email testing)
