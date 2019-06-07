import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../content/product-list/category.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  adminCategoriesForm: FormGroup;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.initCategoriesForm();
    return this.categoryService.getCategories();
  }

  onAddCategory() {

  }

  onDeleteCategory(index: number) {

  }

  onSubmit() {

  }

  initCategoriesForm() {
    this.adminCategoriesForm = new FormGroup({
      'name': new FormControl(),
      'normal_name': new FormControl(),
      'parent': new FormControl()
    });
  }

}
