# Catálogo de Anti-Patrones

## Arquitectura
| Anti-Patrón | Descripción | Consecuencias | Solución |
|---|---|---|---|
| God Class | Clase que lo hace todo | Baja cohesión, difícil de mantener | Dividir en clases con una sola responsabilidad |
| Spaghetti Code | Código sin estructura clara | Difícil de leer, modificar y testear | Refactorizar aplicando principios SOLID |
| Lava Flow | Código legacy que nadie se atreve a tocar | Deuda técnica acumulada, riesgos en cambios | Refactorización incremental con tests |
| Golden Hammer | Usar la misma solución para todo | Soluciones subóptimas para problemas específicos | Evaluar alternativas por contexto |
| Big Ball of Mud | Sistema sin arquitectura definida | Caos total, imposible de mantener | Re-arquitectura gradual |

## Base de Datos
| Anti-Patrón | Descripción | Solución |
|---|---|---|
| SELECT N+1 | Múltiples consultas en loop | Usar eager loading o JOINs |
| God Table | Tabla con demasiadas columnas | Normalizar o dividir en tablas relacionadas |
| Magic Numbers | Valores hardcodeados en consultas | Usar constantes o tablas de referencia |

## Desarrollo
| Anti-Patrón | Descripción | Solución |
|---|---|---|
| Copy-Paste Programming | Duplicación de código | Extraer a métodos reutilizables |
| Premature Optimization | Optimizar antes de medir | Perfilar primero, optimizar después |
| Cargo Cult Programming | Copiar patrones sin entenderlos | Entender el problema antes de aplicar soluciones |
| Boat Anchor | Código/lib que no se usa pero se mantiene | Eliminar código muerto |
