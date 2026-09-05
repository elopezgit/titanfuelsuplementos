# Plan de Acoplamiento - aibf-central

## Arquitectura de Integración de los 24 Módulos

### Capa 0 - Fundación
```
01 Core ─────────────┐
04 Memory & Orch. ───┤
18 Installer ────────┤──> BASE
23 Framework Final ──┘
```

### Capa 1 - Inteligencia Base
```
02 Agents ────> usa: Core + Memory
03 Skills ────> usa: Core + Memory
07 Discovery ──> usa: Core
08 Planning ───> usa: Core + Agents + Skills
09 AutoBoot ───> usa: Core + Discovery + Planning
15 Prompts ────> usa: Core
```

### Capa 2 - Conocimiento
```
05 Domains ────> usa: Core + Discovery
06 TechPacks ──> usa: Core + Discovery
16 Knowledge ──> usa: Core + Memory + Domains
17 EntTemplates > usa: Core + Domains
```

### Capa 3 - Especialización
```
10 Governance ──> usa: Core + Agents
11 AdvEngineer ─> usa: Core + Skills
12 Specialists ─> usa: Core + Agents + TechPacks
13 AICollab ────> usa: Core + Orchestrator
19 Audit ───────> usa: Core + Planning
```

### Capa 4 - Generación
```
14 DynGenerator ──> usa: Core + Discovery + Agents + Skills
20 Examples ──────> usa: Core + Templates + TechPacks
21 Playbooks ─────> usa: Core + Governance + Engineering
22 UltimatePack ──> usa: TODOS (capa final)
```

### Principios de Acoplamiento
1. Carga perezosa: solo cargar módulos necesarios
2. Contexto mínimo: no cargar todo simultáneamente
3. Memoria compartida: todos escriben/leen de PROJECT_MEMORY
4. Orquestación central: Coordinator es el único punto de entrada
5. Singleton de skills: no duplicadas
6. Contract first: interfaces definidas en Core
7. Dominio separado de tecnología
8. Audit trail sobre el ciclo completo
