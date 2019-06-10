import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../content/product-list/category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Category} from '../../shared/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {
  editMode: boolean;
  editedId: number;
  form: FormGroup;
  categories: Category[];
  categorySubscription: Subscription;
  editedCategorySubscription: Subscription;
  editedCategory: Category;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.editMode = false;
    this.initCategoriesForm();
    this.categories = this.categoryService.getCategories();
    this.categorySubscription = this.categoryService.categoryListChanged.subscribe((categories) => {
      this.categories = categories;
    });

    this.editedCategorySubscription = this.categoryService.editedCategory.subscribe((id) => {
      this.editedId = id;
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.editedCategorySubscription.unsubscribe();
  }

  onDelete() {
    if (this.editedId !== undefined) {
      this.categoryService.deleteCategory(this.editedId);
      this.form.reset();
    }
    this.editedId = undefined;
    this.editMode = false;
  }

  onEdit(id: number) {
    this.editMode = true;
    this.editedId = id;
    this.categoryService.editedCategory.next(id);
    this.editedCategory = this.categoryService.getCategoryById(this.editedId);

    this.form.get('name').setValue(this.editedCategory.name);
    this.form.get('normal_name').setValue(this.editedCategory.normal_name);
    this.form.get('parent').setValue(this.editedCategory.parent);
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onSubmit() {
    let id = null;
    if (this.editMode) {
      this.editMode = true;
      id = this.editedId;
    } else {
      // console.log('adminCategoriesForm: ', this.form.value);
      id = this.categoryService.getCategories().length + 1;
    }
    const newCategory = new Category(
      id,
      this.form.value.name,
      this.form.value.normal_name,
      this.form.value.parent,
    );
    this.categoryService.addCategory(newCategory, this.editMode);
    this.form.reset();
  }

  initCategoriesForm() {
    let name = '';
    let normal_name = '';
    let parent = '';

    if (this.editMode) {
      name = this.form.value.name;
      normal_name = this.form.value.normal_name;
      parent = this.form.value.parent;
    }

    this.form = new FormGroup({
      'name': new FormControl(name, [Validators.required, Validators.minLength(3)]),
      'normal_name': new FormControl(normal_name, [Validators.required, Validators.minLength(4)]),
      'parent': new FormControl(parent)
    });
  }

}
