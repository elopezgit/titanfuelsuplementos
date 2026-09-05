# Motor de Gestión de Tokens

## Propósito
Optimizar y controlar el uso de tokens del modelo de lenguaje en cada ciclo del workflow.

## Reglas
1. Trabajar por módulos pequeños en lugar de archivos completos
2. Priorizar la carga de skills específicas sobre conocimiento general
3. Usar resúmenes de código en lugar de código completo cuando sea posible
4. Cachear contexto cargado dentro del mismo ciclo
5. Monitorear tokens usados vs disponibles en cada fase

## Límites sugeridos
| Fase | Tokens máximos | Estrategia |
|---|---|---|
| Discovery | 8K | Resumir hallazgos |
| Planning | 4K | Plan conciso |
| Execution | 16K | Código relevante solamente |
| Validation | 4K | Resultados de tests |
| Memory Update | 2K | Solo cambios relevantes |

## Cálculo de tokens estimado
- 1 palabra ≈ 1.3 tokens (español)
- 1 línea de código ≈ 3-5 tokens
- 1 archivo típico ≈ 200-500 tokens
- 1 skill ≈ 50-100 tokens
- 1 agente completo ≈ 200-400 tokens
