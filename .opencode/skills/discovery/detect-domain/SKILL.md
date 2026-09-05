# detect-domain

## Objetivo
Detectar el dominio de negocio del proyecto analizando el código, la terminología usada y las integraciones.

## Cuándo usar
- Discovery inicial de un proyecto existente
- Cuando no hay información previa del dominio
- Para clasificar el proyecto y cargar skills de dominio específicas

## Entradas
- Código fuente (entidades, servicios, nombres de tablas)
- Documentación existente (README, wiki)
- Conversación con el usuario

## Procedimiento
1. Analizar nombres de entidades, tablas y clases principales
2. Identificar terminología específica de dominio
3. Buscar palabras clave: producto, carrito, pago → eCommerce; reserva, vuelo, hotel → travel
4. Identificar integraciones con sistemas externos (pasarelas de pago, CRM, etc.)
5. Clasificar el dominio: eCommerce, fintech/collections, SaaS, travel, healthcare, etc.
6. Cargar skills de dominio y conocimiento relevante según la clasificación

## Salida
- Dominio detectado con nivel de confianza
- Términos clave identificados
- Skills de dominio a cargar
- Referencia a knowledge/ relevante
