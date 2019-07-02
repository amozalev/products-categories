import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product.model';
import {ProductService} from '../../services/product.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  productsSubscription: Subscription;
  pagesSubscription: Subscription;
  pages: {};

  constructor(private productService: ProductService,
              private categoriesService: CategoryService,
              private route: ActivatedRoute) {
    // this.route.data.subscribe(data => console.log(' this.route.data: ', data));
  }

  ngOnInit() {
    let active_cat: Category;
    let active_cat_id: string = null;
    let active_cat_name: string = null;
    let offset: number = null;
    let limit: number = null;

    this.route.params.subscribe((params: Params) => {
      active_cat_name = params['category_name'];
    });

    this.route.queryParams.subscribe((params: Params) => {
      offset = params['offset'];
      limit = params['limit'];
    });

    const categories = this.categoriesService.getItems();
    // if (!categories.length) {
    //   this.categoriesService.fetchCategories().subscribe();
    //   categories = this.categoriesService.getCategories();
    // }

    if (active_cat_name) {
      active_cat = this.categoriesService.getItemByName(active_cat_name, categories);
      if (active_cat !== undefined) {
        active_cat_id = active_cat['id'];
      }
    }

    this.productService.fetchItems(null, active_cat_id, offset, limit).subscribe(
      data => {
        this.products = data['data'];
        this.pages = data['pages'];
      }
    );

    this.productsSubscription = this.productService.itemsListChanged.subscribe((products: Product[]) => {
      this.products = products;
    });
    this.pagesSubscription = this.productService.pagesChanged.subscribe(pages => {
      this.pages = pages;
    });

  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
