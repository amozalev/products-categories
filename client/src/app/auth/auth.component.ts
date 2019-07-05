import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const email = this.form.value.name;
    const password = this.form.value.displayName;
  }

  initForm() {
    const email = '';
    const password = '';

    this.form = new FormGroup({
      'name': new FormControl(email, [Validators.required, Validators.email, Validators.minLength(3)]),
      'displayName': new FormControl(password, [Validators.required, Validators.minLength(4)]),
    });
  }


}
