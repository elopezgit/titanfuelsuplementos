# detect-architecture

## Objetivo
Detectar el estilo arquitectónico del proyecto analizando su estructura de carpetas, patrones de código y configuraciones.

## Cuándo usar
- Discovery inicial de un proyecto existente
- Previo a una refactorización arquitectónica
- Para validar que la arquitectura real coincide con la documentada

## Entradas
- Código fuente (estructura de carpetas, namespaces, módulos)
- Archivos de configuración del framework

## Procedimiento
1. Analizar estructura de carpetas raíz
2. Detectar patrones: MVC, Clean Architecture, Hexagonal, CQRS, Microservicios
3. Identificar capas: presentación, aplicación, dominio, infraestructura
4. Verificar dirección de dependencias entre capas
5. Detectar anti-patrones arquitectónicos (dependencias circulares, capas saltadas)
6. Identificar el patrón de organización de módulos (por capa vs por feature)
7. Documentar hallazgos con ejemplos concretos del código

## Salida
- Estilo arquitectónico detectado (con nivel de confianza)
- Diagrama de capas y dependencias
- Anti-patrones detectados
- Recomendaciones de mejora
