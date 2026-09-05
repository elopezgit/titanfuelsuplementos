# sql-review

## Objetivo
Revisar consultas SQL, esquemas de base de datos y configuraciones de ORM para identificar problemas de rendimiento, seguridad y mantenibilidad.

## Cuándo usar
- Queries lentas detectadas
- Nueva migración de esquema
- Cambios en modelos/entidades que afectan consultas
- Revisión de políticas RLS en Supabase

## Entradas
- Consultas SQL o código ORM (Prisma, EF Core, JPA, etc.)
- Migraciones de BD
- Políticas RLS (si Supabase)
- Esquema actual de la BD

## Procedimiento
1. Revisar queries en busca de: N+1, falta de índices, FULL TABLE SCAN
2. Verificar uso de índices: columnas de búsqueda, JOIN, ORDER BY, filtros
3. Revisar migraciones: que sean reversibles, sin pérdida de datos
4. Evaluar Políticas RLS (Supabase): que cubran SELECT/INSERT/UPDATE/DELETE
5. Identificar consultas que pueden beneficiarse de caché
6. Revisar planes de ejecución de queries lentas

## Salida
- Queries problemáticas con recomendaciones
- Índices faltantes sugeridos
- Migraciones riesgosas detectadas
- Políticas RLS faltantes o incorrectas
- Optimizaciones priorizadas por impacto
