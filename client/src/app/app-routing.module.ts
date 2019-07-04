import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ProductListComponent} from './content/product-list/product-list.component';
import {ProductDetailsComponent} from './content/product-details/product-details.component';
import {ProductsResolverService} from './services/products-resolver.service';
import {CartComponent} from './content/cart/cart.component';
import {CartGuardService} from './content/cart/cart-guard.service';
import {AdminComponent} from './admin/admin.component';
import {AdminCategoryComponent} from './admin/admin-category/admin-category.component';
import {AdminProductComponent} from './admin/admin-product/admin-product.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'products', component: ProductListComponent, pathMatch: 'full'},
  {path: 'products/:id', component: ProductDetailsComponent, pathMatch: 'full'},
  {
    path: 'products/category/:category_name', component: ProductListComponent,
    resolve: {categories: ProductsResolverService}
  },
  {path: 'cart', component: CartComponent, canActivate: [CartGuardService]},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
