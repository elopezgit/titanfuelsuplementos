# Plantilla de Revisión de Rendimiento

## Objetivo
Evaluar el rendimiento de un componente o funcionalidad antes de su pase a producción.

## Checklist de revisión

### Backend
- [ ] Latencia de endpoints dentro del SLA (< 200ms p95)
- [ ] Consultas a base de datos optimizadas (sin N+1, índices correctos)
- [ ] Cache implementado para datos de baja volatilidad
- [ ] Conexiones a recursos externas con timeout y retry
- [ ] Uso de async/await para operaciones I/O
- [ ] Sin bloqueos de hilos en endpoints síncronos

### Frontend
- [ ] Bundle size dentro del límite (< 500KB gzip)
- [ ] Lazy loading implementado en rutas y componentes pesados
- [ ] Core Web Vitals dentro de rangos aceptables (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Sin renderizados innecesarios (React.memo, useMemo, useCallback)
- [ ] Imágenes optimizadas (WebP, lazy loading, tamaños responsivos)

### Base de Datos
- [ ] Consultas indexadas
- [ ] Sin scans completos en tablas grandes
- [ ] Planes de ejecución revisados
- [ ] Conexiones con pooling

## Herramientas sugeridas
- **Backend**: JMeter, k6, BenchmarkDotNet
- **Frontend**: Lighthouse, WebPageTest, Chrome DevTools
- **BD**: Query Store, EXPLAIN ANALYZE, pg_stat_statements
- **APM**: Application Insights, Datadog APM, New Relic

## Reporte
- **Endpoint/componente evaluado**:
- **Métricas obtenidas vs objetivo**:
- **Cuellos de botella encontrados**:
- **Recomendaciones**:
