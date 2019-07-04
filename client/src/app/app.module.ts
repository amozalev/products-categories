import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ProductService} from './services/product.service';
import {CategoryService} from './services/category.service';
import {AppConfig} from './app.config';
import {CartGuardService} from './content/cart/cart-guard.service';
import {ProductsResolverService} from './services/products-resolver.service';
import {ProductsModule} from './content/products.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductsModule,
    SharedModule
  ],
  providers: [
    AppConfig,
    ProductService,
    CategoryService,
    CartGuardService,
    ProductsResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
