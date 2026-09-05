# Estrategia de Tokens

## Objetivo
Optimizar el uso de tokens del modelo de IA para maximizar la eficiencia y minimizar costos operativos.

## Principios
1. **Contexto mínimo**: Solo cargar la información necesaria para la tarea actual
2. **Carga perezosa**: No cargar skills ni agentes que no se usarán
3. **Referencias vs contenido**: Preferir referencias a archivos completos
4. **Compresión**: Usar resúmenes de contexto en lugar de contenido completo
5. **Memoria selectiva**: PROJECT_MEMORY contiene solo el contexto relevante

## Técnicas de optimización

| Técnica | Ahorro estimado | Cuándo aplicar |
|---|---|---|
| Carga perezosa de skills | 30-50% | Tareas específicas de un dominio |
| Referencias a archivos | 20-40% | Documentación extensa |
| Resumen de contexto | 40-60% | Memoria de sesiones largas |
| No cargar agentes no usados | 10-20% | Tareas simples |
| Compresión de logs | 50-70% | Depuración de errores |

## Reglas de gestión de tokens
1. **Límite por ciclo**: No exceder el límite de contexto del modelo
2. **Prioridad**: Contexto del proyecto > Memoria de sesión > Skills > Documentación
3. **Cache**: Reutilizar contexto cargado dentro del mismo ciclo
4. **Limpieza**: Remover contexto irrelevante después de cada fase del workflow
5. **Monitoreo**: Reportar uso estimado de tokens por ciclo

## Estructura de contexto mínimo
```
1. PROYECTO: [nombre, stack, dominio]
2. TAREA: [descripción breve]
3. AGENTES REQUERIDOS: [lista]
4. SKILLS REQUERIDAS: [lista]
5. MEMORIA RELEVANTE: [referencias]
6. CÓDIGO AFECTADO: [archivos específicos]
```
