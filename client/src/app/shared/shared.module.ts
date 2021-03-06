import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './components/header/header.component';
import {PagesComponent} from './components/pages/pages.component';
import {RouterModule} from '@angular/router';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    PagesComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HeaderComponent,
    PagesComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {

}
