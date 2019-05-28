import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContentComponent} from './content/content.component';
import {ProductItemComponent} from './content/product-item/product-item.component';
import {ProductListComponent} from './content/product-list/product-list.component';
import {ProductDetailsComponent} from './content/product-details/product-details.component';
import {ProductService} from './content/product.service';
import {AppRoutingModule} from './app-routing.module';
import {CartComponent} from './content/cart/cart.component';
import {CategoryService} from './content/product-list/category.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  providers: [ProductService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
