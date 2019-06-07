import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../content/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  adminProductsForm: FormGroup;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.initProductsForm();
    return this.productService.getProducts();
  }

  onSubmit() {

  }

  onAddProduct() {

  }

  onDeleteProduct(index: number) {

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
