# Prompt Viajes / Travel

## Dominio
Viajes y turismo: búsqueda de destinos, reservas, disponibilidad, pagos, vouchers, usuarios.

## Reglas de negocio a preservar
- La disponibilidad debe consultarse en tiempo real (o con caché de corta duración)
- Las reservas tienen tiempo de expiración si no se confirman (timeout)
- Los precios varían por temporada, anticipación y disponibilidad
- Los vouchers/itinerarios deben generarse después del pago
- Las cancelaciones tienen políticas según antigüedad de la reserva
- Los datos de viajeros deben cumplir con regulaciones locales

## Stack recomendado
- Supabase + Next.js (Realtime para disponibilidad)
- Node + React + Redis (caché de disponibilidad)

## Referencias
- knowledge/travel.md para reglas de negocio detalladas
- playbooks/domains/travel.md para el playbook de dominio

## Anti-patrones
- Disponibilidad calculada sin considerar reservas concurrentes
- Precios hardcodeados en frontend
- No manejar timeouts de reserva
- Políticas de cancelación inconsistentes
