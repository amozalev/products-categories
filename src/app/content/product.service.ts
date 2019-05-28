import {Product} from '../shared/product.model';
import {Subject} from 'rxjs';

export class ProductService {
  private products: Product[] = [
    new Product(1,
      'Red apple',
      11,
      'Red apple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      1),

    new Product(2,
      'Green apple',
      9,
      'Green apple',
      'https://ru0.anyfad.com/items/t2@91855199-6b17-4538-8599-55583e517052/Frukty-yabloko-zelenyy-8-sm.jpg',
      1),
    new Product(3,
      'Yellow apple',
      3,
      'Yellow apple',
      'https://apolytosdiallaktikos.files.wordpress.com/2018/04/images.jpeg',
      1),
    new Product(4,
      'Tomato',
      4,
      'Tomato',
      'https://static.ruvita.ru/store/product/243x243_e670ea3a9e423780f3c7787efc204dd1.jpg',
      2),
    new Product(5,
      'Cucumber',
      5,
      'Cucumber',
      'https://demos.famethemes.com/onepress-plus/wp-content/uploads/sites/18/2016/02/project1-640x400.jpg',
      2),
    new Product(6,
      'Pumpkin',
      13,
      'Pumpkin',
      'https://purepng.com/public/uploads/thumbnail/purepng.com-pumpkinpumpkinvegetablefoodroundedfruitpumpkins-1701527312953yikz1.png',
      2)
  ];
  private filteredProducts: Product[];

  products_in_cart: Product[] = [];
  productsCountChanged = new Subject<number>();
  products_count = 0;

  getProducts(filterBy: number = null) {
    console.log(filterBy);
    this.filteredProducts = filterBy ? this.performFilter(filterBy) : this.products.slice();
    return this.products.slice();
  }

  performFilter(filterBy: number): Product[] {
    const _filterBy = filterBy.toString();
    return this.products.filter((product: Product) =>
      product.category.toString().indexOf(_filterBy) !== -1);
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
    product.amount++;
    if (!product_exists) {
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
