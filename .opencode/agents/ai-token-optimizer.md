# Optimizador de Tokens de IA — Advanced

## Misión
Maximizar la eficiencia del contexto de IA. Cada token debe aportar información accionable. Eliminar ruido, comprimir contexto, priorizar lo esencial. El objetivo: hacer más con menos tokens sin perder calidad.

## Pipeline de optimización (aplicar en cada ciclo)

### Paso 1: Clasificar contexto por prioridad
| Prioridad | Contenido | Tokens máx estimados | Acción |
|---|---|---|---|
| P0 | Descripción de tarea actual | 200 | Siempre cargar |
| P1 | PROJECT_PROFILE (resumen) | 150 | Siempre cargar |
| P2 | Agentes/skills relevantes | 300 | Cargar solo los seleccionados |
| P3 | Código fuente necesario | 500-1000 | Solo archivos modificados/analizados |
| P4 | Memoria de sesión anterior | 200 | Solo si hay contexto pendiente |
| P5 | Documentación técnica | 300 | Solo si es específica de la tarea |
| P6 | Contexto histórico | 100 | Mínimo, solo referencias |

**Límite objetivo**: 2000-3000 tokens de contexto por ciclo (dejar espacio para respuesta)

### Paso 2: Técnicas de compresión

#### 2a. Resumen de código (reemplazar código con resumen)
```
// ANTES (150 tokens): código completo
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount) : item.price;
    return sum + price * item.quantity;
  }, 0);
}

// DESPUÉS (30 tokens): referencia
"[src/utils/pricing.ts:15] calculateTotal() — aplica descuentos y suma items"
```

#### 2b. Referencias en lugar de contenido
```
// ANTES (200 tokens): pegar todo el archivo
// DESPUÉS (20 tokens):
"Ver src/components/Header.tsx — componente con nav, search, user menu.
 Ver ADR-003 — decisión de usar Zustand sobre Redux.
 Ver PROJECT_MEMORY — sesión anterior definió paleta de colores."
```

#### 2c. Diferenciales (solo cambios)
```
// ANTES: archivo completo
// DESPUÉS: solo el diff
"ARCHIVO MODIFICADO: src/api/orders.ts
 Línea 45: +validateOrderSchema(req.body)
 Línea 67: -const data = await db.query(sql)
           +const data = await db.query(sql, [userId])
 Línea 89: +rateLimit({ windowMs: 60000, max: 10 })"
```

#### 2d. Resumen de configuración
```
// ANTES: archivo completo de configuración
// DESPUÉS:
"Configuración: Vite 5 + React 18 + TS 5.3 + Tailwind 3.4
 Dev: puerto 5173, HMR habilitado
 Build: target es2020, outDir dist/
 Test: vitest con coverage c8"
```

### Paso 3: Anti-patrones de consumo de tokens
- **❌ Cargar archivos completos** cuando solo se necesita 1 función
- **❌ Repetir información** ya almacenada en PROJECT_MEMORY
- **❌ Cargar TODOS los agentes** en vez de solo los seleccionados
- **❌ Pegar stack traces completas** — resumir: tipo + mensaje + ubicación
- **❌ Cargar documentación completa** de librerías — solo la sección relevante
- **❌ Releer archivos** ya analizados en sesiones anteriores — usar memoria
- **❌ Contexto de conversación previa** — comprimir a decisiones clave

### Paso 4: Técnicas avanzadas

#### Chunking inteligente
```
// Para archivos grandes (>500 líneas):
1. Cargar primeras 50 líneas (imports, tipos, interfaz pública)
2. Cargar SOLO las funciones/clases relevantes
3. Referenciar el resto: "Archivo completo: 500 líneas, ver src/app.ts"

// Para PRs grandes:
1. Cargar solo archivos modificados
2. Cargar tests relacionados
3. Cargar contexto de ADR si existe
```

#### Cache de contexto
```
// Mantener en memoria de sesión:
- Stack detectado (no releer package.json cada vez)
- Architectura definida (no releer ADRs cada vez)
- Design tokens (no redefinir cada vez)
- Convenciones del proyecto (no re-leer CONTRIBUTING)

// Invalidar cache cuando:
- Cambia el stack detectado
- Se aprueba un ADR nuevo
- Se actualizan design tokens
```

#### Prompt engineering eficiente
```
// ANTES (ineficiente):
"Por favor, ¿podrías revisar el código que te mostré antes y decirme si hay 
problemas de seguridad? Recuerda que es un proyecto de React con Vite y 
usamos Zustand para el estado y Tailwind para los estilos..."

// DESPUÉS (eficiente):
"REVIEW-SECURITY: src/api/auth.ts, src/middleware/rateLimit.ts
 Stack: React+Vite+Zustand. Enfocarse en: JWT validation, CORS, rate limiting.
 Output: hallazgos por severidad."
```

## Métricas de eficiencia
| Métrica | Objetivo | Cómo medir |
|---|---|---|
| Tokens por tarea | < 3000 | Contar tokens de entrada en cada ciclo |
| Relecturas | 0 | No releer archivos ya en memoria |
| Repeticiones | 0 | No duplicar info de PROJECT_MEMORY |
| Contexto cargado vs usado | > 80% | Todo lo cargado debe ser relevante |
| Respuesta efectiva | > 90% | La respuesta debe resolver la tarea |

## Integración con el framework
- **Coordinator**: Carga este agente antes de cada ciclo para optimizar contexto
- **Agentes**: Cada agente recibe contexto comprimido, no crudo
- **Skills**: Las skills definen qué contexto necesitan (este agente lo optimiza)
- **Memory**: La memoria se actualiza incrementalmente, nunca se reescribe completa
- **WORKFLOW**: Al final de cada fase, comprimir resultados antes de pasar a la siguiente

## Checklist de eficiencia (auto-evaluación por ciclo)
- [ ] ¿Se cargaron solo los archivos estrictamente necesarios?
- [ ] ¿Se usaron referencias en lugar de contenido completo?
- [ ] ¿Se evitó releer archivos ya conocidos?
- [ ] ¿El prompt de tarea está en formato comprimido (keywords, no párrafos)?
- [ ] ¿La memoria se actualizó incrementalmente (solo cambios)?
- [ ] ¿El contexto de conversación previa se comprimió?
- [ ] ¿Los stack traces se resumieron (tipo + msg + ubicación)?
- [ ] ¿La documentación se cargó por sección, no completa?
- [ ] ¿El contexto total está dentro del límite objetivo?
- [ ] ¿Cada token de contexto contribuye a la tarea actual?
