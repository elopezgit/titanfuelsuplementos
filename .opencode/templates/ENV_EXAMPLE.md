# Template .env — Supabase + Next.js

## Reglas de uso
1. Copiar como `.env.local` en desarrollo
2. **NUNCA** comitear `.env` (debe estar en `.gitignore`)
3. Solo commitear `.env.example` (este archivo)
4. Para producción, configurar variables en Vercel / hosting

## Variables requeridas

### Públicas (prefijo NEXT_PUBLIC_)
# Visibles en frontend. Son seguras porque RLS protege los datos.
# La anon key es PÚBLICA por diseño (está en el HTML de todas formas).
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...

### Privadas (solo server-side)
# NUNCA expuestas al frontend.
# Tienen ACCESO TOTAL a la BD.
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...

### OAuth (opcional, según providers configurados)
# Solo si usas OAuth además de Supabase Auth.
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

### App (opcionales)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MyApp
