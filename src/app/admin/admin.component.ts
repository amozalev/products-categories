import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../content/product-list/category.service';
import {ProductService} from '../content/product.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  type: string;
  adminCategoriesForm: FormGroup;
  adminProductsForm: FormGroup;

  constructor(private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.type = 'dashboard';
  }

  showDashboard() {

  }

  getCategories() {
    this.type = 'categories';
    this.initCategoriesForm();
    return this.categoryService.getCategories();
  }

  getProducts() {
    this.type = 'products';
    this.initProductsForm();
    return this.productService.getProducts();
  }

  onAddCategory() {

  }

  onDeleteCategory(index: number) {

  }

  categoryOnSubmit() {

  }

  productOnSubmit() {

  }

  onAddProduct() {

  }

  onDeleteProduct(index: number) {

  }

  initCategoriesForm() {
    this.adminCategoriesForm = new FormGroup({
      'name': new FormControl(),
      'normal_name': new FormControl(),
      'parent': new FormControl()
    });
  }

  initProductsForm() {
    this.adminProductsForm = new FormGroup({
      'title': new FormControl(),
      'price': new FormControl(),
      'description': new FormControl(),
      'picture': new FormControl(),
      'category': new FormControl()
    });
  }

}
