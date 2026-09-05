# Supabase — Conocimiento Técnico

## Arquitectura
Supabase es un backend como servicio (BaaS) que reemplaza la necesidad de un backend propio. Componentes:
- **PostgreSQL**: Base de datos relacional administrada
- **Auth**: Autenticación con JWT, OAuth, MFA
- **Storage**: Almacenamiento de archivos con RLS
- **Realtime**: WebSockets para datos en tiempo real
- **Edge Functions**: Funciones serverless en Deno
- **Vector**: Extension pgvector para embeddings y búsqueda semántica

## Keys y seguridad

### Tipos de keys
| Key | Visibilidad | Uso | Riesgo si se expone |
|---|---|---|---|
| `anon` | Pública | Cliente browser/server | Bajo (RLS protege) |
| `service_role` | Secreta | Admin server-side | CRÍTICO: acceso total a BD |

### Regla fundamental
```
anon key      → NEXT_PUBLIC_* en .env (frontend)
service_role  → variable privada (solo server/edge, NUNCA en frontend)
```

### Clientes por contexto
```typescript
// Browser (cliente) - anon key pública
import { createBrowserClient } from '@supabase/ssr'
// Solo accede a datos que RLS permite

// Server Component - anon key pública (seguro)
import { createServerClient } from '@supabase/ssr'
// RLS aplica igual, sesión del usuario autenticado

// API Route - service_role (solo server)
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY)
// BYPASSEA RLS - usar solo cuando sea necesario
```

## RLS — Row Level Security

### Activación
```sql
ALTER TABLE mi_tabla ENABLE ROW LEVEL SECURITY;
```

### Políticas base por rol

**Usuario autenticado (propietario):**
```sql
CREATE POLICY "user_select_own" ON mi_tabla
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_insert_own" ON mi_tabla
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_update_own" ON mi_tabla
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "user_delete_own" ON mi_tabla
  FOR DELETE USING (auth.uid() = user_id);
```

**Por rol:**
```sql
-- Admin puede ver todo
CREATE POLICY "admin_all" ON mi_tabla
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Moderador puede ver pero no borrar
CREATE POLICY "mod_select" ON mi_tabla
  FOR SELECT USING (auth.jwt() ->> 'role' IN ('admin', 'mod'));
```

**Público (solo SELECT):**
```sql
CREATE POLICY "public_select" ON mi_tabla
  FOR SELECT USING (true);
-- Solo para datos públicos, NUNCA para datos sensibles
```

### Anti-patrones RLS
```sql
-- ❌ PELIGRO: acceso público total
CREATE POLICY "all_access" ON mi_tabla USING (true);

-- ❌ INSEGURO: cualquiera puede insertar
CREATE POLICY "public_insert" ON mi_tabla
  FOR INSERT WITH CHECK (true);

-- ❌ RLS desactivado (por defecto en tablas nuevas hasta activarlo)
```

### Debugging RLS
```sql
-- Listar tablas sin RLS
SELECT tablename FROM pg_tables
WHERE schemaname = 'public' AND rowsecurity = false;

-- Ver políticas de una tabla
SELECT * FROM pg_policies
WHERE tablename = 'mi_tabla';
```

## Auth — Flujo típico

### Providers soportados
- Email/Password
- Google, GitHub, Discord, Apple, etc. (OAuth)
- Magic Link (sin password)
- Phone (SMS)
- SSO (SAML para Enterprise)

### JWT
- Access token: 15 minutos (configurable)
- Refresh token: 7 días (configurable)
- Claims en JWT: sub (user id), aud, role, email, user_metadata

### Middleware Next.js (refrescar sesión)
```typescript
// src/middleware.ts
export async function middleware(request) {
  const { supabase, response } = createServerClient(
    request,
    { supabaseUrl, supabaseKey }
  )
  const { data: { session } } = await supabase.auth.getSession()
  // Si no hay sesión en ruta protegida, redirect a /login
  if (!session && protectedRoutes.includes(pathname)) {
    return Response.redirect(new URL('/login', request.url))
  }
  return response
}
```

## Storage

### Buckets privados (requieren auth + RLS)
```sql
CREATE POLICY "users_view_own_files"
  ON storage.objects FOR SELECT
  USING (auth.uid() = owner);

CREATE POLICY "users_upload_own_files"
  ON storage.objects FOR INSERT
  WITH CHECK (auth.uid() = owner);
```

### Buckets públicos
```sql
CREATE POLICY "public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'public-assets');

CREATE POLICY "authenticated_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
```

## Edge Functions (Deno)
- Lógica serverless con acceso a service_role key
- Casos: webhooks, procesamiento, admin tasks, conexión con APIs externas
- Deploy: `supabase functions deploy mi-funcion`
- Secrets: `supabase secrets set MI_SECRET=valor`

## Realtime
- Broadcast: eventos públicos (todos los clientes suscritos)
- Presence: estado de conexión de usuarios
- Postgres Changes: cambios en BD replicados a clientes (respeta RLS)

## Performance

### Indices recomendados
```sql
CREATE INDEX idx_mi_tabla_user_id ON mi_tabla(user_id);
CREATE INDEX idx_mi_tabla_created_at ON mi_tabla(created_at DESC);
CREATE INDEX idx_mi_tabla_search ON mi_tabla USING GIN(to_tsvector('spanish', columna));
```

### Queries optimizadas
- Siempre filtrar por columnas indexadas
- Usar `.maybeSingle()` cuando esperas 0 o 1 resultado
- Usar `.range()` para paginación
- Evitar N+1 con `.select('*, relacion(*)')` pero limitar depth

### Caché
- Server Components de Next.js cachean por defecto
- `revalidatePath()` y `revalidateTag()` para invalidar caché tras mutations
- Para datos en tiempo real: Realtime subscriptions
