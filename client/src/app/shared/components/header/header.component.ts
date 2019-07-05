import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  productCountSubscription: Subscription;
  productCount = 0;
  collapsedNav = true;
  isSignedIn = false;
  signingInSubscription: Subscription;

  constructor(private productService: ProductService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.productCountSubscription = this.productService.cartCountChanged.subscribe(
      (count: number) => {
        this.productCount = count;
      }
    );

    this.signingInSubscription = this.authService.isAuthorized.subscribe((data: boolean) => {
      this.isSignedIn = data;
    });
  }

  ngOnDestroy(): void {
    this.productCountSubscription.unsubscribe();
  }

  collapseNav() {
    this.collapsedNav = !this.collapsedNav;
  }

  getProductsCount() {
    return this.productService.cartCount;
  }

  clickHome() {
    this.productService.fetchItems().subscribe();
  }
}
