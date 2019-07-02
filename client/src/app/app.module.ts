import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ProductItemComponent} from './content/product-item/product-item.component';
import {ProductListComponent} from './content/product-list/product-list.component';
import {ProductDetailsComponent} from './content/product-details/product-details.component';
import {ProductService} from './services/product.service';
import {AppRoutingModule} from './app-routing.module';
import {CartComponent} from './content/cart/cart.component';
import {CategoryService} from './services/category.service';
import {AdminComponent} from './admin/admin.component';
import {AppConfig} from './app.config';
import {AdminCategoryComponent} from './admin/admin-category/admin-category.component';
import {AdminProductComponent} from './admin/admin-product/admin-product.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminMenuComponent} from './admin/admin-menu/admin-menu.component';
import {CartGuardService} from './content/cart/cart-guard.service';
import {ProductsResolverService} from './services/products-resolver.service';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDashboardComponent,
    AdminMenuComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
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
