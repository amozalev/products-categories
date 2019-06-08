import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../content/product-list/category.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Category} from '../../shared/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {
  adminCategoriesForm: FormGroup;
  categories: Category[];
  categorySubscription: Subscription;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.initCategoriesForm();
    this.categories = this.categoryService.getCategories();
    this.categorySubscription = this.categoryService.categoryListChanged.subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }


  onAddCategory() {
    console.log('adminCategoriesForm: ', this.adminCategoriesForm.value);
    const id = this.categoryService.getCategories().length;
    const newCategory = new Category(
      id,
      this.adminCategoriesForm.value.name,
      this.adminCategoriesForm.value.normal_name,
      this.adminCategoriesForm.value.parent,
    );
    this.categoryService.addCategory(newCategory);
  }

  onDeleteCategory(index: number) {
    this.categoryService.deleteCategory(index);
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
