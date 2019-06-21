import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../content/category.service';
import {Category} from '../shared/category.model';
import {ProductService} from '../content/product.service';
import {DataStorageService} from '../shared/dataStorage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // @Input() categoryId: number;
  categories: Category[];

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    // this.categories = this.categoryService.getCategories();
    this.dataStorageService.getCategories();
  }

  getCategories() {
    // return this.categories;
    return this.categoryService.getCategories();
  }

  filterBy(id: number) {
    const category = this.categoryService.getCategoryById(id);
    this.productService.getFilteredProducts(category.name);
  }
}
