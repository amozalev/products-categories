import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminCategoryComponent} from './admin-category/admin-category.component';
import {AdminProductComponent} from './admin-product/admin-product.component';
import {AdminComponent} from './admin.component';

const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'category', component: AdminCategoryComponent},
      {path: 'product', component: AdminProductComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
