# Playbook Supabase + Next.js

## Stack
- **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS + Edge Functions)
- **BD**: PostgreSQL (manejada por Supabase, con RLS obligatorio)
- **Auth**: Supabase Auth (JWT, MFA, OAuth: Google, GitHub, etc.)
- **Storage**: Supabase Storage (imágenes, archivos, con RLS)
- **Tiempo real**: Supabase Realtime (WebSockets para chat, notificaciones)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Infra**: Vercel (frontend) + Supabase (backend)
- **SDK**: `@supabase/supabase-js` + `@supabase/ssr` (para Next.js App Router)

## Estructura recomendada
```
/webapp
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Login, register (público)
│   │   ├── (dashboard)/        # App protegida
│   │   └── api/                # API routes (server-side)
│   ├── components/             # Componentes reutilizables
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Cliente browser (anon key)
│   │   │   ├── server.ts       # Cliente server (service_role)
│   │   │   └── admin.ts        # Cliente admin (service_role, solo server)
│   │   ├── middleware.ts       # Protección de rutas
│   │   └── types.ts            # Database types (generados)
│   └── hooks/                  # Custom hooks
├── supabase/
│   ├── migrations/             # Migraciones SQL
│   ├── seed.sql                # Seed data
│   └── policies/               # Políticas RLS por tabla
├── .env.example
├── supabase.config.toml        # Config Supabase CLI
└── .github/workflows/
```

## .env — Qué va dónde

```
# PÚBLICAS (seguras en frontend, anon key es pública por diseño)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# PRIVADAS (SOLO server-side, NUNCA en frontend)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Seguridad RLS — Reglas obligatorias

### Toda tabla debe tener RLS activado
```sql
ALTER TABLE mi_tabla ENABLE ROW LEVEL SECURITY;
```

### Políticas mínimas por tabla
```sql
-- Usuario solo ve sus propios datos
CREATE POLICY "Users can view own data"
  ON mi_tabla FOR SELECT
  USING (auth.uid() = user_id);

-- Usuario solo inserta sus propios datos
CREATE POLICY "Users can insert own data"
  ON mi_tabla FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Usuario solo actualiza sus propios datos
CREATE POLICY "Users can update own data"
  ON mi_tabla FOR UPDATE
  USING (auth.uid() = user_id);

-- Admin puede ver todo (por rol)
CREATE POLICY "Admins can view all"
  ON mi_tabla FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');
```

### NUNCA hacer esto
```sql
-- ❌ Permite acceso total a la tabla (anula RLS)
CREATE POLICY "public access" ON mi_tabla FOR ALL USING (true);

-- ❌ Usar service_role key en el frontend
const supabase = createClient(url, serviceRoleKey); // MUY PELIGROSO
```

## Clientes Supabase — Cuándo usar cada uno

| Cliente | Key | Dónde se usa | Puede bypassear RLS |
|---|---|---|---|
| `createBrowserClient` | anon key | Componentes React, hooks | NO |
| `createServerClient` | anon key | Server Components, Server Actions | NO |
| `createRouteHandlerClient` | anon key | API routes | NO |
| `createServiceRoleClient` | service_role | Migraciones, admin tasks, webhooks | SÍ (cuidado) |

## Checklist de inicialización
- [ ] `create-next-app` con App Router + TypeScript + Tailwind
- [ ] `npx supabase init` (configuración local)
- [ ] Configurar `@supabase/supabase-js` + `@supabase/ssr`
- [ ] Crear clientes: `client.ts`, `server.ts`, `admin.ts`
- [ ] Definir esquema inicial con RLS en todas las tablas
- [ ] Configurar `middleware.ts` para protección de rutas
- [ ] Poblar `.env.example` con placeholders (sin valores reales)
- [ ] Configurar proveedores OAuth (Google, GitHub) en Supabase Dashboard
- [ ] Agregar GitHub Actions (lint + typecheck + test)
- [ ] Si es producción: [ ] Rate limiting, [ ] CORS, [ ] MFA para admins

## Referencias
- `skills/supabase/` → Skills específicas de Supabase
- `knowledge/supabase.md` → Conocimiento técnico detallado
