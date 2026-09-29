export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'bottle-250',
    name: 'Botella 250ml',
    price: 12.99,
    description: 'Tamaño perfecto para probar',
  },
  {
    id: 'bottle-500',
    name: 'Botella 500ml',
    price: 24.99,
    description: 'Para uso diario',
  },
  {
    id: 'pack-2x500',
    name: 'Pack 2x500ml',
    price: 44.99,
    description: 'Mejor valor',
    badge: 'Ahorra 10%',
  },
];

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}
