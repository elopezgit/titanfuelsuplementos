# dependency-map

## Objetivo
Analizar y documentar el mapa de dependencias entre módulos del proyecto para identificar acoplamiento excesivo, dependencias circulares y oportunidades de desacoplamiento.

## Cuándo usar
- Refactorización de arquitectura
- Identificación de deuda técnica
- Previo a cambios en módulos compartidos
- Para entender el impacto de modificar un módulo

## Entradas
- Código fuente (estructura de imports/requires)
- Configuración del proyecto (package.json, csproj, pom.xml)
- Diagrama de módulos existente (si hay)

## Procedimiento
1. Listar todos los módulos/paquetes del proyecto
2. Analizar dependencias directas entre módulos
3. Identificar dependencias circulares
4. Medir acoplamiento: cuántos módulos dependen de cada módulo
5. Identificar módulos con alta cohesión interna vs acoplamiento externo
6. Recomendar refactors para reducir dependencias

## Salida
- Mapa de dependencias (texto o diagrama)
- Lista de dependencias circulares detectadas
- Módulos con alto acoplamiento (candidatos a refactor)
- Recomendaciones priorizadas
