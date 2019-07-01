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
    const categories = this.categoriesService.getItems();
    if (!categories.length) {
      return this.categoriesService.fetchItems();
    } else {
      return categories;
    }
  }
}
