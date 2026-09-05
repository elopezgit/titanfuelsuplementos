# RISKS — Registro de Riesgos

## Formato
| ID | Riesgo | Probabilidad | Impacto | Mitigación | Dueño | Estado |

## Registro
| ID | Riesgo | Probabilidad | Impacto | Mitigación | Dueño | Estado |
|---|---|---|---|---|---|---|
| | | | | | | |

## Escala
- **Probabilidad**: Baja / Media / Alta
- **Impacto**: Bajo / Medio / Alto / Crítico
- **Estado**: Abierto / Mitigado / Cerrado / Aceptado

## Riesgos comunes en webapps
| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Exposición de service_role key | Baja | Crítico | .env en .gitignore, secret scanning, nunca en frontend |
| RLS mal configurado | Media | Alto | Checklist de verificación, auditoría periódica |
| Dependencias vulnerables | Alta | Medio | Dependabot, npm audit, actualización periódica |
| Deuda técnica creciente | Alta | Medio | Refactor planificado, code reviews, métricas |
| Fuga de datos por logs | Media | Alto | No loguear PII, revisar logging, scrubbing automático |
