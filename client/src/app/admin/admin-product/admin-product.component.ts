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
  editedId: string;
  form: FormGroup;
  products: Product[];
  productSubscription: Subscription;
  editedProductSubscription: Subscription;
  editedProduct: Product;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.editMode = false;
    this.initForm();
    this.productService.fetchProducts().subscribe(
      data => this.products = data['data']
    );
    this.productSubscription = this.productService.productsListChanged.subscribe((products) => {
      this.products = products;
    });
    this.editedProductSubscription = this.productService.editedProductId.subscribe((id) => {
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

  onEdit(id: string) {
    this.editMode = true;
    this.editedId = id;
    this.productService.editedProductId.next(id);
    this.editedProduct = this.productService.getProductById(id);

    this.form.get('title').setValue(this.editedProduct.title);
    this.form.get('price').setValue(this.editedProduct.price);
    this.form.get('description').setValue(this.editedProduct.description);
    this.form.get('picture').setValue(this.editedProduct.picture);
    this.form.get('categoryId').setValue(this.editedProduct.categoryId);
    this.form.get('volume').setValue(this.editedProduct.volume);
    this.form.get('units').setValue(this.editedProduct.units);
    this.form.get('producer').setValue(this.editedProduct.producer);
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

    const newProduct = new Product(
      id,
      this.form.value.title,
      this.form.value.price,
      this.form.value.description,
      this.form.value.picture,
      this.form.value.categoryId,
      this.form.value.volume,
      this.form.value.units,
      this.form.value.producer
    );
    this.productService.saveProduct(newProduct, this.editMode).subscribe();
    this.form.reset();
  }

  initForm() {
    let title = '';
    let price = '';
    let description = '';
    let picture = '';
    let categoryId = '';
    let volume = '';
    let units = '';
    let producer = '';


    if (this.editMode) {
      title = this.form.value.title;
      price = this.form.value.price;
      description = this.form.value.description;
      picture = this.form.value.picture;
      categoryId = this.form.value.categoryId;
      volume = this.form.value.volume;
      units = this.form.value.units;
      producer = this.form.value.producer;

    }

    this.form = new FormGroup({
      'title': new FormControl(title, [Validators.required, Validators.minLength(3)]),
      'price': new FormControl(price, [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
        Validators.minLength(1)]),
      'description': new FormControl(description, Validators.required),
      'picture': new FormControl(picture, Validators.required),
      'categoryId': new FormControl(categoryId, Validators.required),
      'volume': new FormControl(volume, Validators.required),
      'units': new FormControl(units, Validators.required),
      'producer': new FormControl(producer, Validators.required)
    });
  }
}
