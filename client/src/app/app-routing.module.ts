import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ProductListComponent} from './content/product-list/product-list.component';
import {ProductDetailsComponent} from './content/product-details/product-details.component';
import {ProductsResolverService} from './services/products-resolver.service';
import {CartComponent} from './content/cart/cart.component';
import {CartGuardService} from './content/cart/cart-guard.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuardService} from './auth/auth-guard.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'products', component: ProductListComponent, pathMatch: 'full'},
  {path: 'products/:id', component: ProductDetailsComponent, pathMatch: 'full'},
  {
    path: 'products/category/:category_name', component: ProductListComponent,
    resolve: {categories: ProductsResolverService}
  },
  {path: 'cart', component: CartComponent, canActivate: [CartGuardService]},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService]
  },
  {path: '**', component: NotFoundComponent}
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
