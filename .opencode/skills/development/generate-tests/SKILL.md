# generate-tests

## Objetivo
Generar pruebas automatizadas (unitarias, integración, E2E) para código nuevo o existente, siguiendo la pirámide de testing y la estrategia del proyecto.

## Cuándo usar
- Nueva funcionalidad que requiere cobertura de pruebas
- Código legacy sin pruebas que se va a modificar
- Aumentar cobertura en áreas críticas
- Generar pruebas de regresión para bugs corregidos

## Entradas
- Código fuente a testear
- Estrategia de testing del proyecto (desde ENGINEERING/TESTING_STRATEGY)
- Framework de pruebas detectado (Jest, xUnit, pytest, etc.)

## Procedimiento
1. Analizar el código fuente y sus dependencias
2. Identificar el tipo de prueba según la capa:
   - **Unitarias**: Lógica pura, servicios sin IO, utils
   - **Integración**: Repositorios, APIs, conexiones a BD
   - **E2E**: Flujos completos de usuario
3. Generar pruebas siguiendo:
   - Arrange / Act / Assert
   - Nombres descriptivos (Given_When_Then)
   - Una aserción lógica por prueba
   - Mocks solo para dependencias externas en unitarias
4. Incluir casos borde: null, vacío, inválido, límite, error

## Salida
- Archivos de prueba generados
- Cobertura esperada por cada archivo
- Instrucciones de ejecución
- Casos no cubiertos que requieren prueba manual
