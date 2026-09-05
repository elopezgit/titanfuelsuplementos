# detect-stack

## Objetivo
Detectar el stack tecnológico completo del proyecto: lenguajes, frameworks, BD, infraestructura, herramientas.

## Cuándo usar
- Discovery inicial de un proyecto existente
- Previo a recomendar cambios tecnológicos
- Para seleccionar el playbook de stack adecuado

## Entradas
- Código fuente del proyecto
- Archivos de configuración (package.json, csproj, pom.xml, Dockerfile, etc.)

## Procedimiento
1. Revisar archivos de configuración de dependencias
2. Detectar lenguajes principales por extensión de archivos
3. Identificar frameworks y librerías clave (React, Next.js, NestJS, Spring, etc.)
4. Detectar base de datos (archivos SQL, ORM config, cadenas de conexión)
5. Identificar infraestructura: Docker, cloud provider, CI/CD
6. Detectar herramientas de testing (Jest, Playwright, xUnit, etc.)
7. Buscar configuración de Supabase (supabase/config.toml, @supabase en dependencias)
8. Clasificar stack y seleccionar playbook correspondiente

## Salida
- Stack completo: lenguaje, framework frontend, framework backend, BD, cloud, testing
- Versiones de cada componente
- Playbook de stack recomendado
- Dependencias desactualizadas o vulnerables detectadas