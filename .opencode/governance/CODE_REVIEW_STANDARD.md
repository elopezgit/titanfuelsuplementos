# Estándar de Code Review

## Objetivo
Establecer criterios consistentes para las revisiones de código que aseguren calidad, mantenibilidad y seguridad.

## Checklist de revisión

### Arquitectura y Diseño
- [ ] ¿La solución sigue los patrones arquitectónicos definidos?
- [ ] ¿Respeta la separación de capas?
- [ ] ¿No introduce dependencias circulares?
- [ ] ¿Las interfaces están correctamente definidas?

### Calidad de Código
- [ ] ¿El código es legible y auto-documentado?
- [ ] ¿Sigue las convenciones de nomenclatura del proyecto?
- [ ] ¿No hay código duplicado?
- [ ] ¿Los métodos tienen una sola responsabilidad?
- [ ] ¿Hay manejo adecuado de errores?

### Pruebas
- [ ] ¿Incluye pruebas unitarias para la nueva funcionalidad?
- [ ] ¿Las pruebas existentes siguen pasando?
- [ ] ¿Se cubren casos borde y errores?
- [ ] ¿Las pruebas son deterministas?

### Seguridad
- [ ] ¿No se exponen datos sensibles?
- [ ] ¿Se validan todos los inputs?
- [ ] ¿No hay inyección de dependencias insegura?
- [ ] ¿El manejo de autenticación/autorización es correcto?

### Rendimiento
- [ ] ¿Las consultas a base de datos están optimizadas?
- [ ] ¿No hay llamadas redundantes a APIs externas?
- [ ] ¿El manejo de memoria es adecuado?
- [ ] ¿Los recursos se liberan correctamente?

## Proceso
1. Autor crea PR con descripción clara
2. Asignar al menos 1 revisor
3. Revisor completa checklist en máximo 24h
4. Discutir comentarios y resolver
5. Aprobar solo cuando todos los criterios se cumplan
6. Merge con squash para mantener historial limpio

## Tiempos sugeridos
- PR < 200 líneas: revisión en < 4h
- PR 200-500 líneas: revisión en < 12h
- PR > 500 líneas: revisión en < 24h (considerar dividir)
