# Agent Factory

## Objetivo
Gestionar el ciclo de vida de los agentes: crear solo los necesarios y eliminar los que nunca se usan.

## Reglas de creación
Crear agentes únicamente cuando:
- El stack lo requiera (ej: React Expert si hay frontend React)
- El dominio lo requiera (ej: Collections Expert si es dominio fintech/cobranzas)
- Exista una responsabilidad clara y no cubierta por agentes existentes
- Una tarea sea repetitiva y amerite un agente especializado

## Reglas de eliminación
- Eliminar agentes que nunca sean utilizados después de N ciclos
- Un agente sin uso consume contexto innecesariamente
- Preferir agentes genéricos sobre específicos a menos que haya clara necesidad

## Generación dinámica
Cuando el proyecto requiera un experto muy específico no cubierto por los agentes base:
1. Identificar la tecnología/dominio exacto
2. Definir responsabilidades no cubiertas
3. Crear el agente con mínimo contenido necesario
4. Referenciar agentes base para lo genérico

Ejemplos de agentes dinámicos:
- React Expert (si stack es React)
- .NET Expert (si stack es .NET)
- Travel Expert (si dominio es viajes)
- Ecommerce Expert (si dominio es eCommerce)

## Anti-patrones
- NO crear agentes por cada tecnología del stack (un backend expert cubre múltiples lenguajes)
- NO mantener agentes que nunca se invocan
- NO duplicar responsabilidades entre agentes
