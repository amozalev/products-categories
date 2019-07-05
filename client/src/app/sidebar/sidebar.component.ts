import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ProductService} from '../services/product.service';
import {AppConfig} from '../app.config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  constructor(private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.categoryService.fetchItems().subscribe();
  }

  getCategories() {
    return this.categoryService.getItems();
  }

  filterBy(cat_id: string) {
    this.productService.fetchItems(null, cat_id, 0, AppConfig.itemsPerPage).subscribe();
  }
}
