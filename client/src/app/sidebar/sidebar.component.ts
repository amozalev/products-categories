import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../content/category.service';
import {Category} from '../shared/category.model';
import {ProductService} from '../content/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // @Input() categoryId: number;

  constructor(private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit() {
  }

  getCategories() {
    return this.categories;
  }

  filterBy(cat_id: string) {
    this.productService.getProducts(null, cat_id).subscribe();
  }
}
