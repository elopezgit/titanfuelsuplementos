export const getProductBrand = (product: { name: string }): string => {
  const match = product.name.match(/^\[(.*?)\]/);
  if (match) return match[1].trim();
  const knownBrands = [
    'STAR NUTRITION', 'ENA SPORT', 'GENERATION FIT', 'NUTRILAB', 
    'BODY ADVANCED', 'VITAMIN WAY', 'MERVICK', 'XTRENGHT', 
    'GOLD NUTRITION', 'HOCH SPORT', 'NATULIV'
  ];
  for (const b of knownBrands) {
    if (product.name.toUpperCase().includes(b)) return b;
  }
  return 'Otras';
};

export const getAvailableBrands = (products: { name: string }[]): string[] => {
  return Array.from(new Set(products.map(p => getProductBrand(p)))).sort((a, b) => {
    if (a === 'Otras') return 1;
    if (b === 'Otras') return -1;
    return a.localeCompare(b);
  });
};
