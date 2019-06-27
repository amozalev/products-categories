import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../shared/product.model';
import {ProductService} from '../product.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  productsSubscription: Subscription;
  category_name: string;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.category_name = params['category_name'];
    });

    this.productService.getProducts(this.category_name).subscribe(
      data => this.products = data
    );

    this.productsSubscription = this.productService.productsListChanged.subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
