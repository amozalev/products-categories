import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../../shared/product.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  total_price: number;
  cartForm: FormGroup;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.initForm();
  }

  getCartProducts() {
    this.total_price = 0;
    const products_in_cart = this.productService.getCartProducts();
    products_in_cart.forEach((i) => {
      this.total_price += (i.amount * i.price);
    });
    return products_in_cart;
  }

  removeProduct(index: number) {
    this.productService.removeFromCart(index);
  }

  onAmountChanged(index: number) {
    this.total_price = 0;
    const products_in_cart = this.productService.getCartProducts();

    products_in_cart[index].amount = this.cartForm.get('amount').value;
    products_in_cart.forEach((i) => {
      this.total_price += (i.amount * i.price);
    });
  }

  onSubmit() {
    // console.log('products_in_cart onSubmit', this.productService.products_in_cart);

  }

  initForm() {
    const id = 0;
    const amount = 0;
    const price = 0;
    const total_price = 0;

    this.cartForm = new FormGroup({
      'id': new FormControl(),
      'amount': new FormControl(),
      'price': new FormControl(),
      'total_price': new FormControl()
    });
  }

}
