import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {AdminComponent} from './admin.component';
import {AdminCategoryComponent} from './admin-category/admin-category.component';
import {AdminProductComponent} from './admin-product/admin-product.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDashboardComponent,
    AdminMenuComponent
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: []
})
export class AdminModule {

}
