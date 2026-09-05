# Catálogo de Atributos de Calidad (ISO 25010)

## Atributos funcionales
| Atributo | Definición | Métrica |
|---|---|---|
| **Completitud funcional** | Grado en que las funciones cubren las necesidades | % de requisitos implementados |
| **Corrección funcional** | Resultados correctos con precisión | % de tests pasando |
| **Idoneidad funcional** | Funciones apropiadas para el contexto | Satisfacción del usuario |

## Atributos no funcionales

### Confiabilidad
| Atributo | Definición | Métrica objetivo |
|---|---|---|
| Disponibilidad | Tiempo operativo del sistema | 99.9%+ (8h/día), 99.99%+ (24/7) |
| Tolerancia a fallos | Capacidad de operar ante fallos | Sin caída total ante fallo de un componente |
| Recuperabilidad | Tiempo en recuperarse de fallos | RTO < 4h, RPO < 1h |

### Rendimiento
| Atributo | Definición | Métrica objetivo |
|---|---|---|
| Latencia | Tiempo de respuesta | API < 200ms, UI < 1s |
| Throughput | Solicitudes por segundo | Según carga esperada + 20% margen |
| Capacidad | Usuarios concurrentes soportados | Según estimación de negocio |
| Eficiencia | Uso de recursos (CPU, RAM, storage) | < 70% en pico |

### Seguridad
| Atributo | Definición |
|---|---|
| Confidencialidad | Datos accesibles solo por autorizados |
| Integridad | Datos no modificables sin autorización |
| Disponibilidad | Sistema accesible cuando se necesita |
| Autenticidad | Identidad verificada de usuarios/sistemas |
| No repudio | Acciones trazables a su autor |

### Mantenibilidad
| Atributo | Definición | Métrica |
|---|---|---|
| Modularidad | Componentes independientes y reemplazables | Bajo acoplamiento |
| Capacidad de análisis | Facilidad para diagnosticar problemas | Tiempo medio de diagnóstico |
| Capacidad de cambio | Facilidad para modificar | Esfuerzo por cambio |
| Testabilidad | Facilidad para probar componentes | Cobertura de pruebas |
