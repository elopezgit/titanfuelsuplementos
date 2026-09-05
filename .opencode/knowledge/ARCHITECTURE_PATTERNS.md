# Catálogo de Patrones Arquitectónicos

## Patrones de Arquitectura
| Patrón | Descripción | Cuándo usarlo |
|---|---|---|
| **Layered Architecture** | Capas separadas (Presentation, Business, Data) | Aplicaciones empresariales estándar |
| **Clean Architecture** | Dependencias hacia adentro, núcleo independiente | Sistemas con alta testabilidad y mantenibilidad |
| **Hexagonal (Ports & Adapters)** | Núcleo aislado de infraestructura | Sistemas que cambian de tecnología frecuentemente |
| **Microservices** | Servicios independientes y desplegables individualmente | Sistemas grandes con equipos múltiples |
| **CQRS** | Separación de comandos y consultas | Sistemas con alta carga de lecturas vs escrituras |
| **Event Sourcing** | Estado como secuencia de eventos | Sistemas que requieren auditoría completa |
| **Event-Driven Architecture** | Comunicación asíncrona via eventos | Sistemas distribuidos con acoplamiento débil |
| **Modular Monolith** | Módulos separados en un solo deploy | Balance entre microservicios y monolito |
| **Vertical Slices** | Funcionalidades completas en slices verticales | Equipos dueños de funcionalidad completa |
| **Serverless** | Funciones efímeras manejadas por cloud | Cargas variables, event-driven, bajo mantenimiento |

## Patrones de Diseño (GoF)
| Categoría | Patrón | Propósito |
|---|---|---|
| Creacional | Factory, Abstract Factory | Creación de objetos |
| Creacional | Singleton | Una sola instancia |
| Creacional | Builder | Construcción paso a paso |
| Estructural | Adapter | Compatibilidad entre interfaces |
| Estructural | Decorator | Agregar comportamiento dinámico |
| Estructural | Facade | Simplificar subsistemas |
| Comportamiento | Strategy | Algoritmos intercambiables |
| Comportamiento | Observer | Notificación de cambios |
| Comportamiento | Command | Encapsular solicitudes |
