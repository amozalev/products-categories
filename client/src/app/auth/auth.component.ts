import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.authService.login(email, password).subscribe(data => {
      console.log('login data: ', data);
    });
  }

  initForm() {
    const email = '';
    const password = '';

    this.form = new FormGroup({
      'email': new FormControl(email, [
          Validators.required,
          Validators.email,
          Validators.minLength(3)
        ],
      ),
      'password': new FormControl(password, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }


}
