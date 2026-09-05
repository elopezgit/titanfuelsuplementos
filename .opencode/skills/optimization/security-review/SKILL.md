# security-review

## Objetivo
Revisar la seguridad del proyecto identificando vulnerabilidades, secretos expuestos, configuraciones inseguras y riesgos de datos.

## Cuándo usar
- Antes de cada deploy a producción
- Cuando se manejan datos sensibles (PII, pagos, salud)
- Después de integrar un servicio externo
- Como parte del quality gate
- Para proyectos con Supabase: verificar RLS y service_role key

## Entradas
- Código fuente (auth, APIs, manejo de datos)
- Archivos de configuración (.env, CORS, headers)
- Dependencias (package.json, etc.)
- Políticas RLS (si Supabase)

## Procedimiento
1. Revisar OWASP Top 10 en el código: inyección, auth, access control, XSS
2. Escanear secretos hardcodeados (keys, tokens, passwords en código)
3. Verificar configuración: CORS, headers de seguridad, TLS
4. Revisar manejo de autenticación: JWT expiración, refresh tokens, MFA
5. Revisar manejo de errores: no exponer stack traces, información interna
6. Si Supabase: verificar RLS en todas las tablas, service_role key solo server-side
7. Revisar dependencias en busca de vulnerabilidades conocidas

## Salida
- Vulnerabilidades encontradas por severidad
- Secretos expuestos detectados
- Configuraciones inseguras
- Plan de remediación priorizado
- Checklist de seguridad actualizado
