import {Product} from '../shared/models/product.model';
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
  pagesChanged = new Subject<{}>();
  editedProductId = new Subject<string>();

  constructor(private httpService: HttpClient) {
  }

  getProducts() {
    return this.products.slice();
  }

  getProductById(id: string) {
    return this.products.find((prod) => {
      return prod.id === id;
    });
  }

  setProducts(products: Product[], pages: {} = null) {
    this.products = products;
    console.log('set products: ', this.products);

    this.productsListChanged.next(this.products);
    if (pages) {
      this.pagesChanged.next(pages);
    }
  }


  fetchProducts(prod_id: string = null, cat_id?: string, offset: number = 0, limit: number = 16) {
    if (!prod_id) {
      prod_id = '';
    }
    let url = `${AppConfig.apiURL}/${AppConfig.apiPrefix}/products/${prod_id}?offset=${offset}&limit=${limit}`;

    if (cat_id && cat_id.length === 24) {
      url = `${AppConfig.apiURL}/${AppConfig.apiPrefix}/categories/${cat_id}/products/?offset=${offset}&limit=${limit}`;
    }

    return this.httpService.get(url).pipe(
      map(res => {
        console.log('res:', res);
        return res;
      }),
      tap(res => {
        this.setProducts(res['data'], res['pages']);
      })
    );
  }

  saveProduct(product: Product, editMode = false) {
    if (!editMode) {
      return this.httpService.post(`${AppConfig.apiURL}/${AppConfig.apiPrefix}/products/`,
        product)
        .pipe(
          map(res => {
            return res;
          }),
          tap(res => {
              const products = this.products;
              products.push(res['data']);
              this.setProducts(products);
            },
            error => {
              console.log('updateProduct tap error: ', error);
            })
        );
    } else {
      return this.httpService.put(`${AppConfig.apiURL}/${AppConfig.apiPrefix}/products/${product['id']}`,
        product)
        .pipe(
          map(res => {
            return res['data'];
          }),
          tap(res => {
              const products = this.products;
              const index = this.products.findIndex((c) => {
                return c.id === res.id;
              });
              if (index !== -1) {
                products[index] = res;
              }
              this.setProducts(products);
            },
            error => {
              console.log('saveProduct tap error: ', error);
            })
        );

    }
  }

  deleteProduct(prod_id: string) {
    return this.httpService.delete(`${AppConfig.apiURL}/${AppConfig.apiPrefix}/products/${prod_id}`)
      .pipe(
        map(res => {
          return res;
        }),
        tap(res => {
            if (res['status'] === 'accepted') {
              const products = this.products;
              const index = this.products.findIndex((p) => {
                return p.id === prod_id;
              });
              if (index !== -1) {
                products.splice(index, 1);
              }
              this.setProducts(products);
            }
          },
          error => {
            console.log('deleteProduct tap error: ', error);
          })
      );
  }

  getCartProducts() {
    return this.cartProducts.slice();
  }

  addToCart(product_id: string) {
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
