import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    productCountSubscription: Subscription;
    productCount = 0;
    collapsedNav = true;

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.productCountSubscription = this.productService.cartCountChanged.subscribe(
            (count: number) => {
                this.productCount = count;
            }
        );
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
}
