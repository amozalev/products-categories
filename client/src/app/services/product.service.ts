import {Product} from '../shared/models/product.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {AbstractService} from './abstract.service';

@Injectable()
export class ProductService extends AbstractService<Product> {
  cartProducts: Product[] = [];
  cartProductsCountChanged = new Subject<number>();
  cartProductsCount = 0;

  constructor(protected httpService: HttpClient) {
    super(httpService, [], `${AppConfig.apiURL}/${AppConfig.apiPrefix}`, 'products');
  }

  getCartProducts() {
    return this.cartProducts.slice();
  }

  addToCart(prod_id: string) {
    const product = this.getItemById(prod_id);
    const product_exists = this.cartProducts.find((prod) => {
      if (prod.id === prod_id) {
        return true;
      }
    });
    product.amount++;
    this.cartProductsCount++;
    this.cartProductsCountChanged.next(this.cartProductsCount);
    if (!product_exists) {
      this.cartProducts.push(product);
    }
  }

  removeFromCart(index: string) {
    const product = this.cartProducts[index];
    // this.cartProducts.splice(index, 1); # TODO Fix this: index is changed by ObjectId string
    this.cartProductsCount -= product.amount;
    if (this.cartProductsCount < 0) {
      this.cartProductsCount = 0;
    }
    this.cartProductsCountChanged.next(this.cartProductsCount);
  }
}
