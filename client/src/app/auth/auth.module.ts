import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../shared/shared.module';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {

}
