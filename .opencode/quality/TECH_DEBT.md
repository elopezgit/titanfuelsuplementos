# Registro de Deuda Técnica

## Propósito
Identificar, priorizar y dar seguimiento a la deuda técnica del proyecto.

## Formato de registro
```
## DT-[ID] - [Título corto]
- **Tipo**: [Código / Arquitectura / Pruebas / Documentación / Infraestructura]
- **Impacto**: [Alto / Medio / Bajo]
- **Esfuerzo estimado**: [días/horas]
- **Ubicación**: [archivos/módulos afectados]
- **Detectado**: [fecha]
- **Descripción**: [detalle del problema]
- **Solución propuesta**: [qué hacer]
- **Estado**: [Pendiente / Planificado / En curso / Pagada]
```

## Priorización (valor vs esfuerzo)
| Esfuerzo ↓ | Bajo impacto | Alto impacto |
|---|---|---|
| Bajo | Hacer cuando se pueda | Hacer ahora |
| Alto | Evaluar / Diferir | Planificar |

## Límites de deuda técnica
- **Deuda crítica** (bloquea funcionalidad): Máximo 1 ítem abierto
- **Deuda alta**: Máximo 3 ítems abiertos
- **Deuda media**: Máximo 5 ítems abiertos
- **Total estimado**: < 5% del esfuerzo total del proyecto

## Política de pago
- Dedicar al menos 10% de cada sprint a pago de deuda técnica
- La deuda crítica se paga inmediatamente
- La deuda alta se planifica en el próximo sprint
- La deuda media/baja se prioriza en refinamiento de backlog
