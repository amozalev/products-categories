import {Component} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ProductService} from '../services/product.service';

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
    return this.categoryService.getItems();
  }

  filterBy(cat_id: string) {
    this.productService.fetchItems(null, cat_id, 0, 16).subscribe();
  }
}
