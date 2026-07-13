/**
 * Redondea un precio hacia arriba a número entero utilizando Math.ceil
 * según requerimiento de Suplementos AR.
 */
export const roundUpPrice = (price: number | string | undefined | null): number => {
  if (price === undefined || price === null) return 0;
  const num = typeof price === 'string' ? parseFloat(price) : Number(price);
  if (isNaN(num)) return 0;
  return Math.ceil(num);
};

/**
 * Formatea un precio como string local (es-AR) con número entero
 * redondeado hacia arriba con Math.ceil.
 */
export const formatPrice = (price: number | string | undefined | null): string => {
  return roundUpPrice(price).toLocaleString('es-AR');
};
