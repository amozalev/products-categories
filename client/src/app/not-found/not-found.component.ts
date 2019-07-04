import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<h1>Page is not found :(</h1>
  <h2>404</h2>
  <br/>
  <h3>You can visit <a [routerLink]="['/']">
    <fa name="home" size="lg"></fa>
  </a> page
  </h3>`,
  styles: ['h1, h2, h3 {text-align: center;}']
})
export class NotFoundComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
