# generate-glossary

## Objetivo
Generar y mantener un glosario de términos del negocio para asegurar que todo el equipo use el mismo vocabulario y reducir ambigüedad.

## Cuándo usar
- Proyecto nuevo (establecer vocabulario común)
- Cuando se detectan términos ambiguos en la comunicación
- Al incorporar nuevos miembros al equipo
- Como parte de la documentación del dominio

## Entradas
- Código fuente (nombres de clases, tablas, endpoints)
- Conversaciones con el usuario/stakeholders
- Documentación existente

## Procedimiento
1. Extraer términos del dominio del código y conversaciones
2. Para cada término: definir significado, contexto de uso, sinónimos, términos relacionados
3. Clasificar por categoría de dominio (ej: catálogo, carrito, pagos, envíos)
4. Identificar términos conflictivos (un mismo nombre para cosas diferentes)
5. Actualizar GLOSSARY.md en memoria con los nuevos términos

## Salida
- Glosario actualizado en memory/GLOSSARY.md
- Términos conflictivos detectados y resueltos
- Recomendaciones de naming para nuevos componentes
