import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {SidebarComponent} from '../sidebar/sidebar.component';
import {ProductItemComponent} from './product-item/product-item.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CartComponent} from './cart/cart.component';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    SidebarComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    SidebarComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
  ]
})
export class ProductsModule {

}
