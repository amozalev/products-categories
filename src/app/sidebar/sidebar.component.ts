import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../content/product-list/Category.service';
import {Category} from '../shared/category.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: Category[];

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
  }

  getCategories() {
    return this.categories;
  }

  filterBy(id) {

  }
}
