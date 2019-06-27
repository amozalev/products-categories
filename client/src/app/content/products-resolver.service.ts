import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProductService} from './product.service';
import {Injectable} from '@angular/core';
import {CategoryService} from './category.service';

@Injectable()
export class ProductsResolverService implements Resolve<any> {
  constructor(private productsService: ProductService,
              private categoriesService: CategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('route', route);
    console.log('state', state);
    const catName = route.params['category_name'];

    const categories = this.categoriesService.getCategories();
    console.log('--------resolver categories', categories);

    const products = this.productsService.getProducts();
    console.log('--------resolver pr list', products);

    // if (!products.length) {
    //   return this.dataStorageService.getProducts();
    // } else {
    //   return products;
    // }
  }
}
