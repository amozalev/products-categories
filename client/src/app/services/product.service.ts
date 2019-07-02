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
        prod.amount++;
        return true;
      }
    });

    if (!product_exists) {
      product.amount = 1;
      this.cartProducts.push(product);
    }
    this.cartProductsCount++;
    this.cartProductsCountChanged.next(this.cartProductsCount);
  }

  reduceAmount(index: number) {
    this.cartProducts[index].amount--;
    this.cartProductsCount--;
    this.cartProductsCountChanged.next(this.cartProductsCount);

    if (this.cartProducts[index].amount <= 0) {
      this.removeFromCart(index);
    }
  }

  removeFromCart(index: number) {
    const product = this.cartProducts[index];
    this.cartProducts.splice(index, 1);
    this.cartProductsCount -= product.amount;
    if (this.cartProductsCount < 0) {
      this.cartProductsCount = 0;
    }
    this.cartProductsCountChanged.next(this.cartProductsCount);
  }
}
