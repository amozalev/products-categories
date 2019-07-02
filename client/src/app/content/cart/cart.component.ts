import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../shared/models/product.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {AppConfig} from '../../app.config';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currency: string;
  shippingPrice: number;
  subtotalPrice: number;
  cartForm: FormGroup;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.currency = AppConfig.currency;
    this.shippingPrice = AppConfig.shipping_price;
    this.initForm();
  }

  getCartProducts() {
    this.subtotalPrice = 0;
    const products = this.productService.getCartProducts();
    products.forEach((i) => {
      this.subtotalPrice += (i.amount * i.price);
    });
    return products;
  }

  removeFromCart(index: number) {
    this.productService.removeFromCart(index);

    if (!this.productService.cartCount) {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onAmountChanged(index: number, prod_id: string, event) {
    this.subtotalPrice = 0;

    if (event.target.value > this.productService.cartProducts[index]['amount']) {
      this.productService.addToCart(prod_id);
    } else {
      this.productService.reduceAmount(index);
      if (!this.productService.cartCount) {
        this.router.navigate(['../'], {relativeTo: this.route});
      }

    }
    const products_in_cart = this.productService.getCartProducts();

    // products_in_cart[index].amount = this.cartForm.get('amount').value;
    products_in_cart.forEach((i) => {
      this.subtotalPrice += (i.amount * i.price);
    });
  }

  onSubmit() {
    // console.log('products_in_cart onSubmit', this.productService.products_in_cart);

  }

  initForm() {
    const id = 0;
    const amount = 0;
    const price = 0;
    const subtotal_price = 0;

    this.cartForm = new FormGroup({
      'id': new FormControl(),
      'amount': new FormControl(),
      'price': new FormControl(),
      'subtotal_price': new FormControl()
    });
  }

}
