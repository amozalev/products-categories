import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../content/product.service';
import {Product} from '../../shared/product.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit, OnDestroy {
  editMode: boolean;
  editedId: number;
  form: FormGroup;
  products: Product[];
  productSubscription: Subscription;
  editedProductSubscription: Subscription;
  editedProduct: Product;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.editMode = false;
    this.initProductsForm();
    this.productService.fetchProducts().subscribe(
      data => this.products = data
    );
    this.productSubscription = this.productService.productsListChanged.subscribe((products) => {
      this.products = products;
    });
    this.editedProductSubscription = this.productService.editedProduct.subscribe((id) => {
      this.editedId = id;
    });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.editedProductSubscription.unsubscribe();
  }

  onDelete() {
    if (this.editedId !== undefined) {
      this.productService.deleteProduct(this.editedId);
      this.form.reset();
    }
    this.editedId = undefined;
    this.editMode = false;
  }

  onEdit(id: number) {
    this.editMode = true;
    this.editedId = id;
    this.productService.editedProduct.next(id);
    this.editedProduct = this.productService.getProductById(this.editedId);

    this.form.get('title').setValue(this.editedProduct.title);
    this.form.get('price').setValue(this.editedProduct.price);
    this.form.get('description').setValue(this.editedProduct.description);
    this.form.get('picture').setValue(this.editedProduct.picture);
    this.form.get('category').setValue(this.editedProduct.categoryId);
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
      id = this.productService.fetchProducts();
    }
    const newProduct = new Product(
      id,
      this.form.value.title,
      this.form.value.price,
      this.form.value.description,
      this.form.value.picture,
      this.form.value.categoryId
    );
    this.productService.addProduct(newProduct, this.editMode);
    this.form.reset();
  }

  initProductsForm() {
    let title = '';
    let price = '';
    let description = '';
    let picture = '';
    let category = '';

    if (this.editMode) {
      title = this.form.value.title;
      price = this.form.value.price;
      description = this.form.value.description;
      picture = this.form.value.picture;
      category = this.form.value.categoryId;
    }

    this.form = new FormGroup({
      'title': new FormControl(title, [Validators.required, Validators.minLength(3)]),
      'price': new FormControl(price, [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
        Validators.minLength(1)]),
      'description': new FormControl(description, Validators.required),
      'picture': new FormControl(picture, Validators.required),
      'category': new FormControl(category, Validators.required)
    });
  }
}
