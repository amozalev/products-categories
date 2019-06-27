import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../shared/product.model';
import {ProductService} from '../product.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../category.service';
import {Category} from '../../shared/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  productsSubscription: Subscription;

  constructor(private productService: ProductService,
              private categoriesService: CategoryService,
              private route: ActivatedRoute) {
    // this.route.data.subscribe(data => console.log(' this.route.data: ', data));
  }

  ngOnInit() {
    let cat_name: string;
    let active_cat: Category;

    this.route.params.subscribe((params: Params) => {
      cat_name = params['category_name'];
    });

    const categories = this.categoriesService.getCategories();
    // if (!categories.length) {
    //   this.categoriesService.fetchCategories().subscribe();
    //   categories = this.categoriesService.getCategories();
    // }

    let active_cat_id = null;
    if (cat_name !== undefined && categories.length) {
      active_cat = categories.find(cat => {
        return cat.name === cat_name;
      });
      active_cat_id = active_cat.id;
    }

    this.productService.fetchProducts(null, active_cat_id).subscribe(
      data => this.products = data
    );

    this.productsSubscription = this.productService.productsListChanged.subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
