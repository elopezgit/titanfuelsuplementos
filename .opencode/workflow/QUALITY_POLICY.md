# Política de Calidad

## Objetivo
Establecer los estándares de calidad que todo código y funcionalidad debe cumplir antes de ser considerado "Listo".

## Criterios mínimos de calidad

### Código
- Debe pasar linter sin errores
- Debe seguir las convenciones del proyecto
- No debe tener código muerto o comentado
- Las funciones deben tener una sola responsabilidad
- Los nombres deben ser descriptivos

### Pruebas
- Cobertura mínima: 70% en lógica nueva
- Las pruebas deben ser deterministas (mismo resultado siempre)
- Deben ejecutarse en CI/CD automáticamente
- Las pruebas lentas deben identificarse como integration tests

### Seguridad
- No hardcodear secrets ni conexiones
- Validar todos los inputs de usuario
- Usar parámetros preparados en consultas SQL
- Seguir el principio de mínimo privilegio

### Documentación
- El código debe ser auto-documentado (nombres claros)
- Las APIs deben tener documentación mínima (Swagger/JSDoc)
- Los cambios importantes deben tener ADR
- README debe actualizarse si cambia la configuración

## Gatillos de revisión de calidad
- Cambios en base de datos
- Cambios en APIs públicas
- Cambios en pipeline de CI/CD
- Dependencias nuevas o actualizadas
- Refactorización de módulos completos

## Métricas de calidad
- Cobertura de pruebas: > 70%
- Deuda técnica: < 5% del esfuerzo total
- Vulnerabilidades críticas: 0
- Tiempo de build: < 10 minutos
- PRs abiertos > 48h: < 3
