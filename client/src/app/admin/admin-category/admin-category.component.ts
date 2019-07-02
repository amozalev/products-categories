import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {
  editMode: boolean;
  editedId: string;
  form: FormGroup;
  categories: Category[];
  categorySubscription: Subscription;
  editedCategorySubscription: Subscription;
  editedCategory: Category;
  pages: {};

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.editMode = false;
    this.initForm();
    this.categoryService.fetchItems().subscribe(data => {
      this.categories = data['data'];
      this.pages = data['pages'];
    });
    this.categorySubscription = this.categoryService.itemsListChanged.subscribe((categories) => {
      this.categories = categories;
    });

    this.editedCategorySubscription = this.categoryService.editedItemId.subscribe((id) => {
      this.editedId = id;
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.editedCategorySubscription.unsubscribe();
  }

  onEdit(id: string) {
    this.editMode = true;
    this.editedId = id;
    this.categoryService.editedItemId.next(id);
    this.editedCategory = this.categoryService.getItemById(id);

    this.form.get('name').setValue(this.editedCategory.name);
    this.form.get('displayName').setValue(this.editedCategory.displayName);
    this.form.get('parentId').setValue(this.editedCategory.parentId);
  }

  onDelete() {
    if (this.editedId !== undefined) {
      this.categoryService.deleteItem(this.editedId).subscribe();
      this.form.reset();
    }
    this.editedId = undefined;
    this.editMode = false;
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
    }

    const newCategory = new Category(
      id,
      this.form.value.name,
      this.form.value.displayName,
      this.form.value.parentId,
    );
    if (this.editMode) {
      this.categoryService.updateItem(newCategory).subscribe();
    } else {
      this.categoryService.saveItem(newCategory).subscribe();
    }
    this.form.reset();
  }

  initForm() {
    let name = '';
    let displayName = '';
    let parentId = '';

    if (this.editMode) {
      name = this.form.value.name;
      displayName = this.form.value.displayName;
      parentId = this.form.value.parentId;
    }

    this.form = new FormGroup({
      'name': new FormControl(name, [Validators.required, Validators.minLength(3)]),
      'displayName': new FormControl(displayName, [Validators.required, Validators.minLength(4)]),
      'parentId': new FormControl(parentId)
    });
  }

}
