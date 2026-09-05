# anti-ai-patterns — Skill

## Objetivo
Detectar y documentar patrones de diseño genéricos producidos por IA ("AI slop") en componentes, páginas o diseños completos. Esta skill proporciona el vocabulario y los checklists para que el agente Design Quality Guardian y el Digital Design Committee puedan identificar y rechazar output genérico antes de la entrega.

## Cuándo usar
- **SIEMPRE** antes de considerar un diseño como listo para entrega visual
- Cuando el frontend-expert termina un componente o página nueva
- Durante revisiones de pull request que incluyen cambios UI
- Cuando el Digital Design Committee solicita una auditoría anti-AI-slop
- En cualquier entrega que pueda ser confundida con "output de template IA"

## Entradas
- Componente/página/a diseño a auditar (archivo Figma, HTML, o descripción visual)
- Contexto del proyecto (tipo: SaaS, E-commerce, Fintech, etc.)
- Paleta de colores definida (o indicar si aún no está definida)
- Tipografía definida (o indicar si se usa default)

## Procedimiento

### Paso 1: Scan de Anti-Patterns Críticos
Ejecutar los 6 checks principales:

| Check | Qué buscar | Acción si detectado |
|---|---|---|
| **1. Tipografía default** | ¿Usa Inter/Roboto/Arial/system sin razón visual? | Reemplazar por tipografía con personalidad (Space Grotesk, Satoshi, etc.) |
| **2. Gradientes purple-to-blue** | `linear-gradient(135deg, #667eea, #764ba2)` o variantes | Reemplazar con paleta del proyecto o gradientes contextuales |
| **3. Glassmorphism en contenido** | `backdrop-filter: blur()` en cards o sections principales | Eliminar o reducir a overlays/modales solo |
| **4. Card nesting** | Cards dentro de cards > 1 nivel | Aplanar jerarquía, usar espacio y tipografía |
| **5. Hero metric pattern** | Número grande + label pequeño + dot gradiente izquierda | Revisar métricas con contexto comparativo |
| **6. Gradient text** | `-webkit-background-clip: text` en métricas/headings | Cambiar a color sólido con jerarquía de tamaño/peso |

### Paso 2: Scan de Identidad Visual
- ¿La tipografía tiene personalidad propia? (no es Inter/Roboto/system)
- ¿Se usa más de una familia tipográfica con roles claros?
- ¿Los colores están definidos en la paleta del proyecto?
- ¿Hay suficiente contraste (4.5:1 texto normal, 3:1 texto grande)?
- ¿Los neutros descansan la vista (no todo saturado)?
- ¿El copy evita buzzwords genéricos? ("AI-powered", "Seamless", "Next-gen")

### Paso 3: Scan de Layout & Espaciado
- ¿El whitespace es generoso (no apretado)?
- ¿Hay ritmo visual (no todo mismo tamaño)?
- ¿Los elementos están alineados a un grid consistente?
- ¿El espaciado sigue una escala de 4px base?
- ¿Hay asymmetry intencional o todo es simétrico por defecto?

### Paso 4: Scan de Micro-interacciones
- ¿Los botones tienen hover/focus/active states?
- ¿Las transiciones son < 300ms y suaves?
- ¿Hay feedback visual inmediato en cada interacción?
- ¿Los empty states tienen acciones claras?

### Paso 5: Scan Responsivo
- ¿Se ve bien en 375px, 768px, 1440px?
- ¿Touch targets >= 44px en móvil?
- ¿Typography fluid con clamp()?
- ¿Sin errores de consola en los breakpoints?

## Salida
Reporte de auditoría anti-AI-slop con:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPORTE ANTI-AI-SLOP — [Nombre del Componente]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCORE: [0-100] — [Porcentaje de patrones NO detectados]

ANTI-PATTERNS DETECTADOS:
✗ [Lista de anti-patterns encontrados, o "Ninguno — PASS"]

IDENTIDAD VISUAL:
• Tipografía: [Nombre familia, personalidad]
• Paleta: [Colores principales, contraste]
• Copy: [Libre de buzzwords o necesidad de reescritura]

CORRECCIONES NECESARIAS:
1. [Anti-pattern 1] → [Solución específica]
2. [Anti-pattern 2] → [Solución específica]
3. [Anti-pattern 3] → [Solución específica]

RECOMENDACIONES:
• Considerar tipografía: [alternativa con personalidad]
• Considerar paleta: [ajuste según dominio]
• Verificar: [contraste, responsive, accessibility]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCORE: [85/100] — Cumple calidad anti-AI-slop
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Quality Gates
- [ ] Score anti-AI-slop >= 85/100
- [ ] Cero anti-patterns críticos (purple gradient, Inter default, card nesting)
- [ ] Tipografía con personalidad propia (no Inter/Roboto)
- [ ] Paleta coherente con el dominio del proyecto
- [ ] Copy sin buzzwords genéricos
- [ ] Empty states accionables
- [ ] Micro-interacciones implementadas

## Integración con Otros Agentes
- **Design Quality Guardian**: Agente principal que ejecuta este skill y valida results
- **Digital Design Committee**: Usa reporte como base para auditoría visual final
- **Frontend Expert Vite**: Ejecuta scan antes de commit de componentes UI
- **UX Designer**: Verifica que anti-patterns no afecten usabilidad o flujos de usuario

## Ejemplo de Uso
```
COORDINATOR: "Auditar componente ButtonPrimary contra anti-ai-patterns"
SKILL: anti-ai-patterns
INPUT: 
  - archivo: src/components/button-primary.tsx
  - contexto: SaaS B2B enterprise dashboard
  - paleta existente: primary #1E3A5F, accent #F59E0B, neutros #F3F4F6
  - tipografía: Space Grotesk heading, DM Sans body
OUTPUT: Reporte con score 92/100, 0 anti-patterns críticos, recomendaciones menores de spacing
```