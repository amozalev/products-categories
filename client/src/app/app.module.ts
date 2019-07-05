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
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
