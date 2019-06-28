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

    const categories = this.categoriesService.getCategories();
    // if (!categories.length) {
    //   this.categoriesService.fetchCategories().subscribe();
    //   categories = this.categoriesService.getCategories();
    // }

    if (active_cat_name) {
      active_cat = this.categoriesService.getCategoryByName(active_cat_name, categories);
      active_cat_id = active_cat['id'];
    }

    this.productService.fetchProducts(null, active_cat_id, offset, limit).subscribe(
      data => {
        this.products = data['data'];
        this.pages = data['pages'];
      }
    );

    this.productsSubscription = this.productService.productsListChanged.subscribe((products: Product[]) => {
      this.products = products;
    });
    this.pagesSubscription = this.productService.pagesChanged.subscribe(pages => {
      this.pages = pages;
    });

  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  onPageClick(cur_page: number, offset: number, limit: number) {
    let active_cat_name: string = null;
    let active_cat_id: string = null;

    this.route.params.subscribe((params: Params) => {
      active_cat_name = params['category_name'];
    });

    const categories = this.categoriesService.getCategories();
    const active_cat = this.categoriesService.getCategoryByName(active_cat_name, categories);
    if (active_cat) {
      active_cat_id = active_cat['id'];
    }

    this.productService.fetchProducts(null, active_cat_id, offset, limit).subscribe(
      data => {
        this.products = data['data'];
        this.pages = data['pages'];
      }
    );
  }
}
