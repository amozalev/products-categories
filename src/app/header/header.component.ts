import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../content/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  productCountSubscription: Subscription;
  product_count = 0;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productCountSubscription = this.productService.productsCountChanged.subscribe(
      (count: number) => {
        this.product_count = count;
      }
    );
  }

  ngOnDestroy(): void {
    this.productCountSubscription.unsubscribe();
  }
}
