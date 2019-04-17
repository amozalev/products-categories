import {Product} from '../shared/product.model';
import {Subject} from 'rxjs';

export class ProductService {
  private products: Product[] = [
    new Product(1,
      'Apple1',
      11,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'food'),

    new Product(2,
      'Apple2',
      9,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'fruits'),
    new Product(3,
      'Apple3',
      3,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'vegetables'),
    new Product(4,
      'Apple4',
      4,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'fruits'),
    new Product(5,
      'Apple5',
      5,
      'Fresh and tasty apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'food'),
    new Product(6,
      'Apple6',
      13,
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
    const product_exists = this.products_in_cart.find((prod) => {
      if (prod.id === product_id) {
        return true;
      }
    });
    if (!product_exists) {
      product.amount++;
      this.products_in_cart.push(product);
      this.products_count++;
      this.productsCountChanged.next(this.products_count);
    }


    console.log('cart:', this.getCartProducts());
  }

  removeFromCart(index: number) {
    this.products_in_cart.splice(index, 1);
    this.products_count--;
    this.productsCountChanged.next(this.products_count);

    console.log('cart:', this.getCartProducts());

  }
}
