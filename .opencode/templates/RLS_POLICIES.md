# Template de Políticas RLS

## Uso
Reemplazar `mi_tabla` y ajustar según necesidad. Aplicar en orden:
1. Activar RLS en la tabla
2. Crear políticas para SELECT / INSERT / UPDATE / DELETE
3. Probar con `auth.uid()` y diferentes roles

---

## 1. Tabla con propietario (owner)

### Activar RLS
```sql
ALTER TABLE mi_tabla ENABLE ROW LEVEL SECURITY;
```

### Políticas
```sql
-- SELECT: solo el propietario ve sus filas
CREATE POLICY "owner_select" ON mi_tabla
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: el usuario crea filas donde él es el propietario
CREATE POLICY "owner_insert" ON mi_tabla
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: el propietario actualiza sus filas
CREATE POLICY "owner_update" ON mi_tabla
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: el propietario borra sus filas
CREATE POLICY "owner_delete" ON mi_tabla
  FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 2. Tabla con roles (admin / user / mod)

### Requisito previo
El JWT debe contener un claim de rol. Configurar en Supabase Dashboard:
Authentication → Settings → JWT custom claims

```sql
-- Admin: acceso total
CREATE POLICY "admin_all" ON mi_tabla
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- User: solo sus datos
CREATE POLICY "user_own" ON mi_tabla
  FOR ALL
  USING (auth.uid() = user_id);

-- Mod: lectura de todo, escritura de lo propio
CREATE POLICY "mod_select" ON mi_tabla
  FOR SELECT
  USING (auth.jwt() ->> 'role' IN ('admin', 'mod'));

CREATE POLICY "mod_insert" ON mi_tabla
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'mod'));
```

---

## 3. Tabla pública (solo lectura)

```sql
ALTER TABLE mi_tabla ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_select" ON mi_tabla
  FOR SELECT
  USING (true);

CREATE POLICY "auth_insert" ON mi_tabla
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

---

## 4. Storage — Buckets privados

```sql
-- Leer archivos: solo el dueño
CREATE POLICY "storage_select_own" ON storage.objects
  FOR SELECT
  USING (auth.uid() = owner);

-- Subir archivos: el usuario autenticado
   CALL crear 
```sql
CREATE POLICY "storage_insert_own" ON storage.objects
  FOR INSERT
  WITH CHECK (auth.uid() = owner);

-- Actualizar: solo el dueño
CREATE POLICY "storage_update_own" ON storage.objects
  FOR UPDATE
  USING (auth.uid() = owner)
  WITH CHECK (auth.uid() = owner);

-- Borrar: solo el dueño
CREATE POLICY "storage_delete_own" ON storage.objects
  FOR DELETE
  USING (auth.uid() = owner);
```

---

## 5. Tabla multi-tenant (por organización)

```sql
ALTER TABLE mi_tabla ENABLE ROW LEVEL SECURITY;

-- El usuario solo ve datos de su organización
CREATE POLICY "tenant_select" ON mi_tabla
  FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM org_members
      WHERE user_id = auth.uid()
    )
  );

-- Insertar en su organización
CREATE POLICY "tenant_insert" ON mi_tabla
  FOR INSERT
  WITH CHECK (
    org_id IN (
      SELECT org_id FROM org_members
      WHERE user_id = auth.uid()
    )
  );
```

---

## Debugging

```sql
-- Listar tablas sin RLS
SELECT tablename FROM pg_tables
WHERE schemaname = 'public' AND rowsecurity = false;

-- Ver políticas de una tabla
SELECT * FROM pg_policies WHERE tablename = 'mi_tabla';

-- Probar RLS como un usuario específico
-- (usar SQL Editor en Supabase Dashboard con auth.uid())
```
