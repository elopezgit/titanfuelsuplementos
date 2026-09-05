# Context Routing

## Propósito
Distribuir el contexto mínimo necesario a cada agente, evitando saturación de tokens y compartiendo solo información relevante para la tarea.

## Reglas
- Compartir solo el contexto necesario para la tarea del agente
- Preferir resúmenes sobre contenido completo
- No reenviar información ya procesada por otro agente
- Cada agente recibe únicamente los archivos relevantes a su dominio
- El Coordinator es el router: decide qué contexto va a cada agente

## Flujo de ruteo
```
Solicitud del usuario
  → Coordinator analiza y clasifica
    → Contexto general: PROJECT_PROFILE + PROJECT_MEMORY (resumido)
      → Por agente:
        → Backend: solo archivos backend + esquema BD
        → Frontend: solo archivos frontend + tipos compartidos
        → Database: solo migraciones + esquema + queries
        → DevOps: solo configs + Docker + CI/CD
        → QA: solo tests + código modificado
        → Security: solo auth + datos sensibles + configs
```

## Qué NO compartir
- Código de capas que no afectan al agente
- Contexto histórico no relevante para la tarea actual
- Archivos fuera del alcance de la solicitud
- Información de fases ya completadas (a menos que sea necesaria)
