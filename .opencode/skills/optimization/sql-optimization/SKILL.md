# sql-optimization

## Objetivo
Optimizar consultas SQL, esquemas de base de datos y políticas RLS para máximo rendimiento y seguridad. Cada query debe ejecutarse en < 100ms para OLTP. Cada política RLS debe ser correcta y completa.

## Cuándo usar
- Queries lentas detectadas (> 100ms)
- Antes de crear nuevos índices
- Después de cambios de esquema grandes
- Auditoría de performance de BD
- Configuración de RLS en Supabase
- Queries con EXPLAIN ANALYZE muestran sequential scan

## Entradas
- Consultas SQL problemáticas
- Esquema de BD actual
- Políticas RLS existentes
- Métricas de uso (tablas más consultadas)
- EXPLAIN ANALYZE de queries lentas

## Procedimiento

### 1. Diagnóstico de queries lentas

#### Analizar EXPLAIN ANALYZE
```sql
-- Siempre usar formato DETAIL para ver tiempos reales
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) 
SELECT ... FROM ... WHERE ...;

-- Señales de alerta:
-- Seq Scan on table  (cost=0.00..1234.00 rows=50000)  ← FALTA ÍNDICE
-- Nested Loop  (loops=1000)  ← N+1
-- Sort  (Sort Method: external merge  Disk)  ← FALTA ÍNDICE para ORDER BY
```

#### Identificar top-N queries lentas
```sql
-- Con pg_stat_statements habilitado
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY mean_exec_time DESC
LIMIT 20;
```

### 2. Estrategias de optimización

#### Índices (primera línea de defensa)
```sql
-- B-tree: para =, <, >, <=, >=, BETWEEN, IN, ORDER BY
CREATE INDEX idx_users_email ON users(email);

-- Índice compuesto: orden importa (columnas de mayor selectivity primero)
CREATE INDEX idx_orders_user_status_date 
  ON orders(user_id, status, created_at DESC);

-- Índice parcial: para queries con WHERE constante
CREATE INDEX idx_orders_pending ON orders(created_at) 
  WHERE status = 'pending' AND deleted_at IS NULL;

-- Covering index: incluir columnas SELECT para evitar access a tabla
CREATE INDEX idx_products_covering ON products(category_id, price) 
  INCLUDE (name, image_url);

-- GIN: para JSONB, arrays, full-text search
CREATE INDEX idx_products_search ON products 
  USING GIN(to_tsvector('spanish', name || ' ' || description));

-- GiST: para rangos, geometría, full-text
CREATE INDEX idx_events_daterange ON events 
  USING GiST(daterange(start_date, end_date));
```

#### Rewriting de queries
```sql
-- ❌ Subquery correlacionada (ejecuta por cada fila)
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.total > 100);

-- ✅ JOIN más eficiente
SELECT DISTINCT u.* FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100;

-- ❌ OFFSET para paginación (escanea todo)
SELECT * FROM products ORDER BY id OFFSET 10000 LIMIT 20;

-- ✅ Keyset pagination (usa índice)
SELECT * FROM products 
WHERE (created_at, id) < ($last_created_at, $last_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;

-- ❌ LIKE con wildcard inicial
SELECT * FROM users WHERE name LIKE '%john%';

-- ✅ Full-text search para búsquedas de texto
SELECT * FROM users 
WHERE to_tsvector('spanish', name) @@ plainto_tsquery('spanish', 'john');

-- ❌ COUNT(*) para paginación (escanea toda la tabla)
SELECT COUNT(*) FROM products WHERE category = 'electronics';

-- ✅ Aproximación o cache para counts grandes
-- O usar count con filtro optimizado por índice
```

#### Optimización de JOINs
```sql
-- Verificar que las FK tienen índices
-- (PostgreSQL no crea índices automáticos en FKs)
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Evitar JOINs innecesarios
-- ❌ SELECT o.*, u.name FROM orders o JOIN users u ON o.user_id = u.id
-- (si solo necesitas order data, no joinees)

-- Usar ONLY cuando sea necesario
SELECT ONLY orders.id, orders.total FROM orders WHERE ...;
```

#### Partitioning para tablas grandes
```sql
-- Particionar por fecha (tablas de logs, orders, events)
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  total DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Crear particiones
CREATE TABLE orders_2024_01 PARTITION OF orders
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE orders_2024_02 PARTITION OF orders
  FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
```

### 3. Auditoría RLS completa (Supabase)
Para CADA tabla, verificar que existen políticas para:
- [ ] SELECT (quién puede ver)
- [ ] INSERT (quién puede crear)
- [ ] UPDATE (quién puede modificar)
- [ ] DELETE (quién puede borrar)

```sql
-- Verificar RLS en todas las tablas
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Ver políticas existentes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public';

-- Tablas SIN RLS (CRÍTICO)
SELECT t.tablename FROM pg_tables t
WHERE t.schemaname = 'public' 
AND NOT EXISTS (
  SELECT 1 FROM pg_policies p 
  WHERE p.schemaname = 'public' 
  AND p.tablename = t.tablename
);
```

### 4. Monitoreo continuo
```sql
-- Queries más lentas (últimas 24h)
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC LIMIT 10;

-- Tablas más accedidas
SELECT relname, seq_scan, idx_scan, n_live_tup
FROM pg_stat_user_tables
ORDER BY seq_scan DESC;

-- Índices no usados (candidatos a eliminar)
SELECT indexrelname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

## Salida
- Queries optimizadas con justificación
- Índices nuevos con EXPLAIN ANALYZE antes/después
- Políticas RLS completas por tabla
- Métricas de mejora (tiempo antes/después)
- Recomendaciones de partitioning si aplica

## Quality gates
- [ ] Todas las queries OLTP < 100ms
- [ ] Sin sequential scans en queries frecuentes
- [ ] RLS habilitado en todas las tablas públicas
- [ ] Políticas RLS para CRUD completo
- [ ] Índices en columnas de JOIN, WHERE, ORDER BY
- [ ] Sin N+1 queries
- [ ] Paginación keyset para datasets grandes
