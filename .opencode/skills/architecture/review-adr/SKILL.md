# review-adr

## Objetivo
Revisar Architecture Decision Records existentes para validar que siguen vigentes, no hay decisiones contradictorias, y están correctamente documentadas.

## Cuándo usar
- Antes de tomar una nueva decisión arquitectónica
- Como parte de la revisión de calidad de un ciclo
- Cuando se detecta una posible contradicción entre ADRs

## Entradas
- ADRs existentes (de memoria/DECISIONS.md o archivos ADR)
- Estado actual del proyecto
- Nueva decisión propuesta (si aplica)

## Procedimiento
1. Listar todos los ADRs activos
2. Verificar que cada ADR tenga: contexto, alternativas, decisión, consecuencias
3. Identificar ADRs que puedan estar obsoletos (stack cambió, requisitos cambiaron)
4. Detectar contradicciones entre ADRs
5. Verificar que la implementación actual refleje lo documentado en ADRs
6. Recomendar: mantener, actualizar, deprecated o eliminar

## Salida
- Estado de cada ADR: vigente, obsoleto, contradictorio
- Recomendaciones de actualización
- Lista de ADRs a deprecar
