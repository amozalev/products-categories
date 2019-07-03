import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './components/header/header.component';
import {PagesComponent} from './components/pages/pages.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularFontAwesomeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    AngularFontAwesomeModule,
    HeaderComponent,
    PagesComponent
  ]
})
export class SharedModule {

}
