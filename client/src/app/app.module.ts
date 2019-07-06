import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ProductService} from './services/product.service';
import {CategoryService} from './services/category.service';
import {AppConfig} from './app.config';
import {CartGuardService} from './content/cart/cart-guard.service';
import {ProductsResolverService} from './services/products-resolver.service';
import {ProductsModule} from './content/products.module';
import {SharedModule} from './shared/shared.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthService} from './services/auth.service';
import {InterceptorService} from './services/interceptor.service';
import {AuthGuardService} from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
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
    AuthService,
    AuthGuardService,
    ProductsResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
