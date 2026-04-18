import { Product } from '../types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Elegant Dress',
    description: 'A premium dress for special occasions.',
    price: 299,
    images: ['/images/dress1.jpg', '/images/dress2.jpg'],
    category: 'Dresses',
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Red'],
    inStock: true,
  },
  // Add more products here
]