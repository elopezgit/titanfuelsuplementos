# generate-c4

## Objetivo
Generar diagramas C4 (Contexto, Contenedores, Componentes, Código) para visualizar y documentar la arquitectura del proyecto.

## Cuándo usar
- Proyecto nuevo (diagrama de contexto y contenedores)
- Cambios arquitectónicos que afectan los límites del sistema
- Para onboarding de nuevos desarrolladores
- Como documentación de arquitectura

## Entradas
- Descripción del sistema y sus usuarios
- Stack tecnológico detectado
- Módulos y componentes del proyecto

## Procedimiento
1. **Nivel 1 — Contexto**: sistema, usuarios, sistemas externos, integraciones
2. **Nivel 2 — Contenedores**: frontend, backend, BD, colas, servicios cloud
3. **Nivel 3 — Componentes**: módulos internos por contenedor
4. **Nivel 4 — Código** (opcional): clases/componentes clave

## Salida
- Diagramas en formato texto (Markdown/Mermaid) o referencia a herramientas
- Descripción de cada elemento: responsabilidad, tecnología, protocolos
- Relaciones entre elementos: tipo de comunicación, protocolo, frecuencia
