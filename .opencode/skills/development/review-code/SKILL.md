# review-code

## Objetivo
Revisar código fuente para identificar problemas de calidad, seguridad, rendimiento y mantenibilidad. Cada revisión debe ser accionable — no reportar "podría mejorar" sin decir exactamente QUÉ cambiar y POR QUÉ.

## Cuándo usar
- Antes de mergear un PR
- Para validar una refactorización
- Como parte del quality gate del workflow
- Cuando se necesita una segunda opinión técnica
- Después de implementar una feature compleja

## Entradas
- Código fuente a revisar (archivos o diff)
- Contexto del proyecto (PROJECT_PROFILE)
- Guías de estilo del stack detectado
- Design tokens definidos (si existe Design Committee)

## Procedimiento

### 1. Clasificar el código
Antes de revisar, entender qué hace:
- ¿Es un componente UI? → Aplicar criterios de frontend
- ¿Es una API/endpoint? → Aplicar criterios de backend
- ¿Es una query/migración? → Aplicar criterios de SQL
- ¿Es configuración? → Aplicar criterios de DevOps

### 2. Revisar en orden de prioridad

#### SEGURIDAD (crítico —阻塞 el merge)
- [ ] ¿Hay inyecciones SQL? (consultas con concatenación de strings)
- [ ] ¿Se exponen datos sensibles? (logs con PII, respuestas con campos innecesarios)
- [ ] ¿Auth correcta? (JWT verificado, permisos validados)
- [ ] ¿Rate limiting en endpoints públicos?
- [ ] ¿Secretos en código? (hardcoded keys, tokens)
- [ ] ¿XSS? (innerHTML, dangerouslySetInnerHTML sin sanitizar)
- [ ] ¿CORS configurado correctamente?

#### FUNCIONALIDAD (mayor — requiere fix antes de merge)
- [ ] ¿Resuelve el problema planteado?
- [ ] ¿Maneja casos borde? (null, undefined, vacío, límites)
- [ ] ¿El error handling es adecuado? (no swallower errors)
- [ ] ¿Los tipos son correctos? (sin `any`, sin casting unsafe)
- [ ] ¿Las validaciones de entrada existen?

#### RENDIMIENTO (mayor/menor según impacto)
- [ ] ¿N+1 queries? (ciclos con queries dentro)
- [ ] ¿Bucles innecesarios? (filter + map → find + filter)
- [ ] ¿Re-renders innecesarios? (React: dependencias de useEffect, memo innecesario)
- [ ] ¿Imágenes sin optimizar? (sin lazy loading, sin formato moderno)
- [ ] ¿Bundle grande? (importaciones de librerías completas)
- [ ] ¿Caché aprovechado? (React Query, SWR, HTTP cache headers)

#### MANTENIBILIDAD (menor/sugerencia)
- [ ] ¿Nombres claros y descriptivos? (no abreviaturas crípticas)
- [ ] ¿Complejidad ciclomática baja? (funciones < 30 líneas, < 3 niveles de nesting)
- [ ] ¿DRY? (no duplicación de lógica)
- [ ] ¿Seguye patrones del proyecto? (consistencia con código existente)
- [ ] ¿Funciones puras cuando sea posible?
- [ ] ¿Comments explican POR QUÉ, no QUÉ?

#### DISEÑO VISUAL (si aplica — consultar Digital Design Committee)
- [ ] ¿Usa design tokens del proyecto?
- [ ] ¿Los colores están en la paleta definida?
- [ ] ¿Los espaciados siguen la escala?
- [ ] ¿Responsive en todos los breakpoints?
- [ ] ¿Estados de UI implementados (loading, empty, error)?

### 3. Formato de salida
```markdown
## Review: [nombre del archivo/PR]

### CRÍTICO (bloquea merge)
- [ ] **[SEC-001]** Línea 45: SQL injection — `query(\`SELECT * FROM users WHERE id = ${userId}\`)`
  → **Fix**: Usar query parametrizada: `query('SELECT * FROM users WHERE id = $1', [userId])`

### MAYOR (requiere fix)
- [ ] **[PERF-001]** Línea 78: N+1 query en loop — `for (const order of orders) { await getUser(order.userId) }`
  → **Fix**: Usar JOIN o batch: `SELECT o.*, u.name FROM orders o JOIN users u ON o.user_id = u.id`

### MENOR
- [ ] **[STYLE-001]** Línea 12: Nombre `d` no descriptivo → `discountedPrice`

### SUGERENCIA
- [ ] **[PATTERN-001]** Extraer validación a middleware reutilizable
```

## Salida
- Resumen de hallazgos clasificados por severidad y categoría
- Cada hallazgo con: ubicación exacta, problema, fix concreto
- Riesgos detectados
- Recomendaciones priorizadas
- Veredicto: APPROVE / REQUEST_CHANGES / BLOCK
