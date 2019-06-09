import {Product} from '../shared/product.model';
import {Subject} from 'rxjs';

export class ProductService {
  private products: Product[] = [
    new Product(1,
      'Red apple',
      11,
      'Red and tasty',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
      'fruit'),

    new Product(2,
      'Green apple',
      9,
      'Green and bitter',
      'https://ru0.anyfad.com/items/t2@91855199-6b17-4538-8599-55583e517052/Frukty-yabloko-zelenyy-8-sm.jpg',
      'fruit'),
    new Product(3,
      'Yellow apple',
      3,
      'Sweet',
      'https://apolytosdiallaktikos.files.wordpress.com/2018/04/images.jpeg',
      'fruit'),
    new Product(4,
      'Tomato',
      4,
      'Fresh',
      'https://static.ruvita.ru/store/product/243x243_e670ea3a9e423780f3c7787efc204dd1.jpg',
      'vegetable'),
    new Product(5,
      'Cucumber',
      5,
      'Long',
      'https://sklep.swiatkwiatow.pl/images/thumbnails/320/290/detailed/45/010473.jpg',
      'vegetable'),
    new Product(6,
      'Pumpkin',
      13,
      'Big and yellow',
      'https://purepng.com/public/uploads/thumbnail/purepng.com-pumpkinpumpkinvegetablefoodroundedfruitpumpkins-1701527312953yikz1.png',
      'vegetable')
  ];
  private filteredProducts: Product[];

  products_in_cart: Product[] = [];
  productsCountChanged = new Subject<number>();
  productsListChanged = new Subject<Product[]>();
  products_count = 0;

  getProducts() {
    return this.products.slice();
  }

  getFilteredProducts(filterBy: string = null) {
    this.filteredProducts = filterBy ? this.performFilter(filterBy) : this.getProducts();

    this.productsListChanged.next(this.filteredProducts);
    return this.filteredProducts;
  }

  performFilter(filterBy: string): Product[] {
    return this.products.filter((product: Product) =>
      product.category.indexOf(filterBy) !== -1);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsListChanged.next(this.products.slice());
  }

  deleteProduct(_index: number) {
    this.products.splice(_index, 1);
    this.productsListChanged.next(this.products.slice());
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
    this.products_count++;
    this.productsCountChanged.next(this.products_count);
    if (!product_exists) {
      this.products_in_cart.push(product);
    }
  }

  removeFromCart(product_id: number) {
    const product = this.getProductById(product_id);
    product.amount--;
    this.products_count--;
    this.productsCountChanged.next(this.products_count);
  }
}
