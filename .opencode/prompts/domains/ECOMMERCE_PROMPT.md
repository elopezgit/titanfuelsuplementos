# Prompt eCommerce

## Dominio
Comercio electrónico: catálogo, carrito de compras, pagos, pedidos, inventario, usuarios.

## Reglas de negocio a preservar
- El catálogo debe soportar variantes de producto (talle, color, etc.)
- El carrito debe persistirse aunque el usuario no esté autenticado
- Los pagos deben procesarse por una pasarela externa (nunca guardar datos de tarjeta)
- Los pedidos deben tener trazabilidad de estado (pendiente → confirmado → enviado → entregado)
- El inventario debe actualizarse al confirmar el pedido (no al agregar al carrito)
- Los usuarios deben poder ver su historial de pedidos
- Políticas de envío, impuestos y descuentos son configurables

## Stack recomendado
- Supabase + Next.js o Node + React + PostgreSQL

## Referencias
- knowledge/ecommerce.md para reglas de negocio detalladas
- playbooks/domains/ecommerce.md para el playbook de dominio

## Anti-patrones
- Guardar tarjetas de crédito en la BD (usar pasarela de pagos)
- Manejar inventario en el frontend
- Carrito sin persistencia (se pierde al recargar)
- Precios calculados en frontend (siempre desde backend/RLS)
