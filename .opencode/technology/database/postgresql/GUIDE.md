# database - postgresql

## Objetivo
Guía completa de mejores prácticas para PostgreSQL 15+: esquemas, índices, consultas, RLS, partitioning, y optimización de rendimiento.

## Naming conventions
```sql
-- Tablas: plural, snake_case
CREATE TABLE users (...);
CREATE TABLE order_items (...);

-- Columnas: snake_case
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Índices: idx_tabla_columna
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Constraints: tabla_tipo_descripción
ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE(email);
ALTER TABLE orders ADD CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users(id);
```

## Esquema de tablas base
```sql
-- Tabla base estándar para cada entidad
CREATE TABLE [entidad] (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Campos de negocio
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  
  -- Auditoría
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_[entidad]_timestamp
  BEFORE UPDATE ON [entidad]
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
```

## Índices

### Tipos de índices
```sql
-- B-tree: búsqueda por rango, =, <, >, <=, >=, ORDER BY
CREATE INDEX idx_users_email ON users(email);

-- Índice compuesto (columnas más selectivas primero)
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- Índice parcial (para queries con WHERE constante)
CREATE INDEX idx_orders_pending ON orders(created_at)
  WHERE status = 'pending' AND deleted_at IS NULL;

-- Covering index (incluye columnas SELECT para evitar access a tabla)
CREATE INDEX idx_products_covering ON products(category_id, price)
  INCLUDE (name, image_url, stock);

-- GIN: JSONB, arrays, full-text search
CREATE INDEX idx_products_metadata ON products USING GIN(metadata);
CREATE INDEX idx_posts_search ON posts USING GIN(
  to_tsvector('spanish', title || ' ' || body)
);

-- GiST: rangos, geometría
CREATE INDEX idx_events_daterange ON events USING GiST(
  daterange(start_date, end_date)
);
```

### Verificar uso de índices
```sql
-- Queries que NO usan índices (sequential scans)
SELECT relname, seq_scan, idx_scan
FROM pg_stat_user_tables
WHERE seq_scan > idx_scan AND seq_scan > 100;

-- Índices no usados (candidatos a eliminar)
SELECT indexrelname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

## Consultas avanzadas

### Window Functions
```sql
-- Ranking
SELECT id, name, revenue,
  ROW_NUMBER() OVER (ORDER BY revenue DESC) as rank,
  DENSE_RANK() OVER (ORDER BY revenue DESC) as dense_rank,
  PERCENT_RANK() OVER (ORDER BY revenue DESC) as percentile
FROM sales;

-- Acumulados
SELECT id, amount, created_at,
  SUM(amount) OVER (ORDER BY created_at) as cumulative,
  AVG(amount) OVER (ORDER BY created_at ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg
FROM transactions;

-- Paginación keyset (más eficiente que OFFSET)
SELECT * FROM products
WHERE (created_at, id) < ($last_created_at, $last_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

### CTEs
```sql
WITH active_users AS (
  SELECT user_id, COUNT(*) as order_count, SUM(total) as ltv
  FROM orders
  WHERE created_at > NOW() - INTERVAL '1 year'
  GROUP BY user_id
  HAVING COUNT(*) >= 3
),
segments AS (
  SELECT *,
    CASE
      WHEN ltv > 1000 THEN 'vip'
      WHEN ltv > 300 THEN 'regular'
      ELSE 'occasional'
    END as segment
  FROM active_users
)
SELECT u.*, s.segment
FROM users u
INNER JOIN segments s ON u.id = s.user_id
ORDER BY s.ltv DESC;
```

### Upsert (INSERT or UPDATE)
```sql
INSERT INTO user_profiles (user_id, display_name, avatar_url)
VALUES ($1, $2, $3)
ON CONFLICT (user_id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  avatar_url = EXCLUDED.avatar_url,
  updated_at = NOW();
```

### Batch operations
```sql
-- ❌ Individual inserts (lento)
INSERT INTO orders (user_id, total) VALUES ($1, $2);
INSERT INTO orders (user_id, total) VALUES ($3, $4);

-- ✅ Batch insert (rápido)
INSERT INTO orders (user_id, total) VALUES
  ($1, $2),
  ($3, $4),
  ($5, $6);

-- ✅ Batch update
UPDATE products SET price = CASE
  WHEN id = 'uuid1' THEN 29.99
  WHEN id = 'uuid2' THEN 39.99
  WHEN id = 'uuid3' THEN 49.99
END
WHERE id IN ('uuid1', 'uuid2', 'uuid3');
```

## Supabase RLS

### Políticas completas por tabla
```sql
-- Habilitar RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- SELECT: Usuarios ven sus órdenes
CREATE POLICY "orders_select_own" ON orders
  FOR SELECT USING (user_id = auth.uid());

-- INSERT: Usuarios crean sus órdenes
CREATE POLICY "orders_insert_own" ON orders
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- UPDATE: Usuarios actualizan sus órdenes (o admin)
CREATE POLICY "orders_update_own" ON orders
  FOR UPDATE USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- DELETE: Solo admin
CREATE POLICY "orders_delete_admin" ON orders
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### Verificar RLS
```sql
-- Tablas sin RLS
SELECT t.tablename FROM pg_tables t
WHERE t.schemaname = 'public'
AND NOT EXISTS (
  SELECT 1 FROM pg_policies p
  WHERE p.schemaname = 'public' AND p.tablename = t.tablename
);

-- Políticas existentes
SELECT tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public';
```

## Partitioning
```sql
-- Particionar por fecha
CREATE TABLE logs (
  id UUID DEFAULT gen_random_uuid(),
  level VARCHAR(10),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Crear particiones mensuales
CREATE TABLE logs_2024_01 PARTITION OF logs
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE logs_2024_02 PARTITION OF logs
  FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- Automatizar creación de particiones
CREATE OR REPLACE FUNCTION create_monthly_partition()
RETURNS void AS $$
DECLARE
  next_month DATE := DATE_TRUNC('month', NOW() + INTERVAL '1 month');
  partition_name TEXT := 'logs_' || TO_CHAR(next_month, 'YYYY_MM');
BEGIN
  EXECUTE format(
    'CREATE TABLE IF NOT EXISTS %I PARTITION OF logs FOR VALUES FROM (%L) TO (%L)',
    partition_name,
    next_month,
    next_month + INTERVAL '1 month'
  );
END;
$$ LANGUAGE plpgsql;
```

## Performance

### EXPLAIN ANALYZE
```sql
-- Siempre usar para queries lentas
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT ... FROM ... WHERE ...;

-- Señales de alerta:
-- Seq Scan → Falta índice
-- Nested Loop con muchos loops → N+1
-- Sort con Disk → Falta índice para ORDER BY
```

### pg_stat_statements
```sql
-- Habilitar: shared_preload_libraries = 'pg_stat_statements'
-- Top queries lentas
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 20;
```

### Connection pooling
```bash
# PgBouncer o Supabase pooler
# No abrir conexión por query
# Máximo 100 conexiones por aplicación
```

## Quality gates
- [ ] Todas las tablas tienen PRIMARY KEY
- [ ] Todas las FK tienen CONSTRAINT declarada
- [ ] RLS habilitado en TODAS las tablas (Supabase)
- [ ] Índices en columnas de WHERE, JOIN, ORDER BY
- [ ] Migraciones reversibles
- [ ] Sin SELECT * en queries de producción
- [ ] EXPLAIN ANALYZE revisado para queries críticas
- [ ] Soft deletes en tablas con datos sensibles
- [ ] Timestamps (created_at, updated_at) en todas las tablas
- [ ] Connection pooling configurado
