# update-memory

## Objetivo
Actualizar la memoria del proyecto (PROJECT_MEMORY) al final de cada ciclo de trabajo, registrando cambios, decisiones y próximos pasos.

## Cuándo usar
- Al finalizar cada ciclo de trabajo (fase Memory Update del workflow)
- Después de implementar cambios relevantes
- Al documentar decisiones importantes

## Entradas
- Resumen del ciclo completado
- Archivos modificados
- Decisiones tomadas (con referencias a ADRs)
- Lecciones aprendidas

## Procedimiento
1. Agregar entrada con timestamp a PROJECT_MEMORY: fecha, tarea, agentes, archivos modificados
2. Registrar decisiones con referencias a ADRs
3. Actualizar lista de próximos pasos (marcar completados, agregar pendientes)
4. Si hay lecciones aprendidas, agregarlas
5. Archivar entradas antiguas si la memoria crece demasiado (mantener últimas 10)

## Salida
- PROJECT_MEMORY actualizada
- Próximos pasos actualizados
- Referencias a ADRs si se generaron nuevos
