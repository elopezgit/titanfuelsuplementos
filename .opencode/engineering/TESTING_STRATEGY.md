# Estrategia de Pruebas

## Objetivo
Definir el enfoque de pruebas para asegurar la calidad del software en cada nivel de la pirámide de pruebas.

## Niveles de prueba

### 1. Pruebas Unitarias
- **Cobertura objetivo**: 80%+ en lógica de negocio
- **Framework sugerido**: xUnit, NUnit, Jest, pytest
- **Enfoque**: Probar unidades aisladas con mocks de dependencias externas
- **Regla**: Una prueba por comportamiento, no por método

### 2. Pruebas de Integración
- **Cobertura objetivo**: APIs críticas y flujos entre capas
- **Enfoque**: Probar interacción entre componentes reales
- **Incluir**: Base de datos real en contenedor, APIs externas mockeadas

### 3. Pruebas End-to-End
- **Cobertura objetivo**: Flujos críticos de usuario (happy path + errores)
- **Framework sugerido**: Playwright, Cypress, Selenium
- **Enfoque**: Probar desde la UI hasta la base de datos

### 4. Pruebas de Contrato
- **Enfoque**: Validar contratos entre servicios (Consumer-Driven Contracts)
- **Herramientas**: Pact, Spring Cloud Contract

## Pirámide de pruebas
```
    /\
   /E2E\        (10% - flujos críticos)
  /  Int \      (20% - integración)
 /  Unit   \    (70% - unitarias)
```

## Criterios de calidad
- Las pruebas deben ser deterministas (mismo resultado siempre)
- Las pruebas deben ejecutarse en CI/CD
- El tiempo de ejecución total debe ser < 10 minutos
- Las pruebas lentas (>1s) deben marcarse como integration tests