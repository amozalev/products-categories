import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../content/category.service';
import {Category} from '../shared/category.model';
import {ProductService} from '../content/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private categoryService: CategoryService,
              private productService: ProductService) {
  }

  getCategories() {
    return this.categoryService.getCategories();
  }

  filterBy(cat_id: string) {
    this.productService.fetchProducts(null, cat_id, 0, 6).subscribe();
  }
}
