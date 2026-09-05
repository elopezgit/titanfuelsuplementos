# architecture-review

## Objetivo
Revisar la arquitectura del proyecto para identificar problemas de acoplamiento, escalabilidad, mantenibilidad y alineación con requisitos no funcionales.

## Cuándo usar
- Antes de cambios arquitectónicos mayores
- Para validar una arquitectura propuesta
- Como parte del quality gate de proyectos nuevos
- Cuando se detecta deuda técnica arquitectónica

## Entradas
- Diagramas C4 o descripción de arquitectura actual
- Código fuente (estructura de carpetas, módulos)
- Requisitos no funcionales (rendimiento, escalabilidad, seguridad)

## Procedimiento
1. Identificar el estilo arquitectónico (MVC, Clean, Hexagonal, Microservicios)
2. Evaluar: separación de capas, dirección de dependencias, acoplamiento
3. Verificar contra principios SOLID y patrones del dominio
4. Detectar anti-patrones (dependencias circulares, dios objetos, etc.)
5. Evaluar escalabilidad: cuellos de botella, estado compartido, caché
6. Revisar decisiones documentadas en ADRs existentes

## Salida
- Hallazgos por severidad (crítico/mayor/menor/sugerencia)
- Diagrama de dependencias entre módulos
- Recomendaciones priorizadas
- Referencias a ADRs a crear o actualizar
