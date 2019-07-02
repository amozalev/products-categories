import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../services/category.service';
import {ProductService} from '../services/product.service';
import {Category} from '../shared/models/category.model';
import {Product} from '../shared/models/product.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  private products: Product[];
  private categories: Category[];
  @Input() pages: {};

  constructor(private categoriesService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.products = this.productService.getItems();
    // this.categories
    // this.pages =
  }


  onPageClick(cur_page: number, offset: number, limit: number) {
    let active_cat_name: string = null;
    let active_cat_id: string = null;

    this.route.params.subscribe((params: Params) => {
      active_cat_name = params['category_name'];
    });

    const categories = this.categoriesService.getItems();
    const active_cat = this.categoriesService.getItemByName(active_cat_name, categories);
    if (active_cat !== undefined) {
      active_cat_id = active_cat['id'];
    }

    this.productService.fetchItems(null, active_cat_id, offset, limit).subscribe(
      data => {
        this.products = data['data'];
        this.pages = data['pages'];
      }
    );
  }

}
