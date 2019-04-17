import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
  }

  getCartProducts() {
    return this.productService.products_in_cart;
  }

  removeProduct(index: number) {
    this.productService.removeFromCart(index);
  }

}
