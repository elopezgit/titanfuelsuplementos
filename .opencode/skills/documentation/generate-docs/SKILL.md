# generate-docs

## Objetivo
Generar documentación técnica del proyecto: README, documentación de API, guías de setup, diagramas de arquitectura.

## Cuándo usar
- Proyecto nuevo (documentación inicial)
- Después de implementar una nueva funcionalidad
- Para documentar APIs y endpoints
- Para onboarding de nuevos desarrolladores

## Entradas
- Código fuente (estructura, APIs, configuraciones)
- Decisiones arquitectónicas (ADRs)
- Stack y dominio detectados

## Procedimiento
1. Identificar qué documentación falta o está desactualizada
2. Generar README con: descripción, stack, setup, scripts, variables de entorno
3. Documentar APIs: endpoints, request/response, auth, errores
4. Documentar arquitectura: diagrama C4, decisiones clave, estructura de carpetas
5. Generar guías de setup: desarrollo local, testing, deploy
6. Usar templates de templates/ según corresponda

## Salida
- README.md actualizado
- Documentación de API (OpenAPI/Swagger o markdown)
- Guías de setup y desarrollo
- Documentación de arquitectura
