import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../content/product-list/category.service';
import {Category} from '../shared/category.model';
import {ProductService} from '../content/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // @Input() category_id: number;
  categories: Category[];

  constructor(private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

  getCategories() {
    return this.categories;
  }

  filterBy(id: number) {
    const category = this.categoryService.getCategoryById(id);
    this.productService.getFilteredProducts(category.name);
  }
}
