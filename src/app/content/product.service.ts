import {Product} from '../shared/product.model';

export class ProductService {
  private products: Product[] = [
    new Product(1,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg'),
    new Product(1,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg'),
    new Product(1,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg'),
    new Product(1,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg'),
    new Product(1,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg'),
    new Product(1,
      'Apple',
      10.2,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg')
  ];

  getProducts() {
    return this.products.slice();
  }
}
