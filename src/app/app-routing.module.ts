import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ProductListComponent} from './content/product-list/product-list.component';
import {ProductDetailsComponent} from './content/product-details/product-details.component';
import {CartComponent} from './content/cart/cart.component';
import {AdminComponent} from './admin/admin.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'products', component: ProductListComponent, pathMatch: 'full'},
  {path: 'products/:id', component: ProductDetailsComponent, pathMatch: 'full'},
  {path: 'products/category/:category_name', component: ProductListComponent, pathMatch: 'full'},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
