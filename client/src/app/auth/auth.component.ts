import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  response_msg = '';

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(data => {
          if (data['status'] === 'success') {
            this.authService.setSession(data);
            this.authService.isAuthorized.next(true);
            this.response_msg = data['message'];
            this.router.navigate(['/'], {relativeTo: this.route});

          }
        },
        err => {
          this.response_msg = err['error']['message'];
        });
    }
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
