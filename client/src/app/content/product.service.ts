import {Product} from '../shared/product.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppConfig} from '../app.config';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  cartProducts: Product[] = [];
  cartProductsCountChanged = new Subject<number>();
  cartProductsCount = 0;
  productsListChanged = new Subject<Product[]>();
  editedProduct = new Subject<number>();

  constructor(private httpService: HttpClient) {
  }

  getProducts() {
    return this.products.slice();
  }

  fetchProducts(prod_id: string = null, cat_id?: string, offset: number = null, limit: number = null) {
    if (!prod_id) {
      prod_id = '';
    }
    let url = `${AppConfig.apiURL}/${AppConfig.apiPrefix}/products/${prod_id}`;

    if (offset && limit) {
      url = `${AppConfig.apiURL}/${AppConfig.apiPrefix}/products/${prod_id}?offset=${offset}&limit=${limit}`;
    }
    if (cat_id && cat_id.length === 24) {
      url = `${AppConfig.apiURL}/${AppConfig.apiPrefix}/categories/${cat_id}/products/?offset=${offset}&limit=${limit}`;
    }

    return this.httpService.get(url).pipe(
      map(res => {
        console.log('res:', res);
        return res;
      }),
      tap(res => {
        this.productsListChanged.next(res['data']);
      })
    );
  }

  addProduct(product: Product, editMode = false) {
    if (!editMode) {
      this.products.push(product);
      this.productsListChanged.next(this.products.slice());
    } else {
      const index = this.products.findIndex((c) => {
        return c.id === product.id;
      });
      if (index !== -1) {
        this.products[index] = product;
        this.productsListChanged.next(this.products.slice());
      }
    }

  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((c) => {
      return c.id === id;
    });
    if (index !== -1) {
      this.products.splice(index, 1);
      this.productsListChanged.next(this.products.slice());
    }
  }

  getCartProducts() {
    return this.cartProducts.slice();
  }

  getProductById(id: number) {
    const product = this.products.find((prod) => {
      return prod.id === id;
    });
    return product;
  }

  addToCart(product_id: number) {
    const product = this.getProductById(product_id);
    const product_exists = this.cartProducts.find((prod) => {
      if (prod.id === product_id) {
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
