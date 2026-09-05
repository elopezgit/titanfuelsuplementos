# Evolución de Memoria

## Propósito
Gestionar cómo la memoria del proyecto evoluciona con cada ciclo de trabajo.

## Reglas
1. PROJECT_MEMORY se actualiza al final de cada ciclo
2. Solo almacenar información que será relevante en ciclos futuros
3. Las decisiones obsoletas se archivan, no se eliminan
4. La memoria crece incrementalmente, no se reescribe completamente
5. Cada actualización agrega una entrada con timestamp

## Estructura de entrada de memoria
```
## [YYYY-MM-DD HH:mm] - [Fase completada]
- Tarea: [descripción]
- Agentes: [lista]
- Archivos modificados: [lista]
- Decisiones: [lista con referencias a ADRs]
- Lecciones: [lista]
- Próximos pasos: [lista]
```

## Política de retención
| Tipo | Retención | Acción al vencer |
|---|---|---|
| Decisiones activas | Indefinido | Mantener |
| Historial de sesiones | Últimas 10 sesiones | Archivar a .opencode/memory/history/ |
| Lecciones aprendidas | Indefinido | Mantener y consolidar |
| Contexto temporal | 1 semana | Eliminar |
