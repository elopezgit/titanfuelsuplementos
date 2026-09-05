# performance-review

## Objetivo
Revisar el rendimiento del proyecto identificando cuellos de botella, queries lentas, renderizados innecesarios y oportunidades de optimización.

## Cuándo usar
- Usuarios reportan lentitud
- Core Web Vitals no cumplen umbrales
- Queries de BD lentas detectadas
- Previo a un lanzamiento a producción
- Como parte del quality gate

## Entradas
- Código fuente (APIs, componentes, queries)
- Métricas de rendimiento (si están disponibles)
- Logs de queries lentas

## Procedimiento
1. **Frontend**: revisar LCP, FID, CLS, tamaño de bundle, lazy loading, imágenes
2. **Backend**: revisar tiempo de respuesta de APIs, N+1 queries, uso de caché
3. **BD**: revisar índices faltantes, queries sin filtro, tablas sin indexar
4. **Infra**: revisar límites de recursos, escalado, CDN, compresión
5. Identificar los 3 cuellos de botella principales
6. Recomendar optimizaciones con esfuerzo estimado

## Salida
- Métricas de rendimiento actuales
- Los 3 cuellos de botella principales
- Recomendaciones priorizadas por impacto/esfuerzo
- Referencias a guías de optimización en technology/
