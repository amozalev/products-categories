import {Product} from '../shared/product.model';
import {Subject} from 'rxjs';

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

  products_in_cart: Product[] = [];
  productsCountChanged = new Subject<number>();
  products_count = 0;

  getProducts() {
    return this.products.slice();
  }

  getCartProducts() {
    return this.products_in_cart.slice();
  }

  getProductById(id: number) {
    const product = this.products.find((prod) => {
      return prod.id === id;
    });
    return product;
  }

  addToCart(product_id: number) {
    const product = this.getProductById(product_id);
    this.products_in_cart.push(product);
    this.products_count++;
    this.productsCountChanged.next(this.products_count);

    console.log('cart:', this.getCartProducts());
  }
}
