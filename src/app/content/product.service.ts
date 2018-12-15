import {Product} from '../shared/product.model';

export class ProductService {
  private products: Product[] = [
    new Product(1,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'food'),

    new Product(2,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'fruits'),
    new Product(3,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'vegetables'),
    new Product(4,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'fruits'),
    new Product(5,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'food'),
    new Product(6,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'vegetables')
  ];

  getProducts() {
    return this.products.slice();
  }
}
