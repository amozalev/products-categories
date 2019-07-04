import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product.model';
import {ProductService} from '../../services/product.service';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  currency: string;
  @Input() product: Product;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.currency = AppConfig.currency;
  }

  addToCart() {
    this.productService.addToCart(this.product.id);
  }

}
