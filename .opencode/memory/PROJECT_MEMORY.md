# PROJECT MEMORY

## Resumen Ejecutivo
App multi-tenant para pedidos de suplementos. Originalmente "TopeDeBar" (restaurante), migrado a "Suplementos AR". Cleanup de boilerplate AIBF completado.

## Últimas Acciones (2026-07-10)
- Identidad de marca actualizada a **TITAN FUEL SUPLEMENTOS** (basada en logo oficial):
  - Colores corporativos: Rojo eléctrico (`#FF1E27`), Naranja llama (`#FF5C00`) y negro industrial deportivo.
  - Logo copiado de `infoBase/logo.jfif` a `public/logo.jfif` y configurado como favicon y logo en Header.
  - Datos de Contacto y Cobro configurados:
    - **Teléfono / WhatsApp**: `3814751620` (con enlace directo `wa.me`)
    - **Alias de Cobro (MercadoPago/Transferencia)**: `strong.gramlo`
  - Banners actualizados al rubro de suplementación de alta gama (*Combustible de Titanes*, *Potencia tu Rendimiento*, *100% Pura Creatina & Whey*).
- Eliminado boilerplate AIBF (~300+ archivos)
- Reestructurado proyecto (sql/, assets limpios)
- Procesado catálogo oficial PDF `Suplement Facts.xlsx - Lisa Mayorista (1).pdf` de `infoBase/`:
  - Extraídos los **318 productos** exactos sin omitir ninguno
  - Clasificados en **9 categorías oficiales** con fotos de alta calidad, precios exactos, códigos y descripciones
  - Generado archivo SQL oficial [seed_suplementos.sql](file:///c:/Users/EDC/Desktop/AndresPedidos/sql/seed_suplementos.sql)
- Actualizado [ClientHome.tsx](file:///c:/Users/EDC/Desktop/AndresPedidos/src/pages/ClientHome.tsx) con soporte para las 9 categorías, filtros por marca y palabras clave rápidas.

## Últimas Acciones (2026-07-13)
- Implementación de redondeo de precios hacia arriba con números enteros (`Math.ceil`):
  - Utilidad centralizada `src/utils/formatPrice.ts` (`roundUpPrice` y `formatPrice`).
  - Aplicado en todas las vistas de clientes (`ClientHome`, `ProductModal`, `CartModal`, `OrderTrackerModal`), POS (`POSHome`) y Panel Admin (`CatalogManager`, `AnalyticsDashboard`).
- Integración de logotipos de marca oficiales en imagen (`src/utils/brandLogos.tsx`):
  - Configurado el logo de **NUTRILAB** indicado por el usuario y logotipos oficiales para las demás marcas en un contenedor estilo insignia oficial (`bg-white/95 rounded-lg shadow-md`) con fallback automático a SVG.

## Decisiones Importantes
- ADR-001: Migrar de restaurante a suplementos deportivos
- ADR-002: Mantener multi-tenencia por slug (ya implementada)
- ADR-003: Identidad visual deportiva de alta intensidad "Titan Fuel Suplementos"
- ADR-004: Importación 100% fiel del catálogo mayorista Lisa Mayorista (318 productos en 9 categorías)
- ADR-005: Redondeo de todos los precios del sistema hacia arriba al número entero superior (`Math.ceil`) y visualización de logotipos oficiales en imagen en `BrandLogo`.

## Pendientes
- Configurar RLS policies en Supabase
- Desplegar a producción
