import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AppConfig} from '../app.config';
import {shareReplay} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Injectable()
export class AuthService {
  private auth_token: string;
  isSignedIn = false;
  isAuthorized = new Subject<boolean>();

  constructor(private httpService: HttpClient) {
  }

  login(email: string, password: string) {
    return this.httpService.post(`${AppConfig.apiURL}/${AppConfig.apiPrefix}/auth/login`, {email, password}).pipe(
      shareReplay()
    );
  }

  set_token(token: string) {
    this.auth_token = token;
  }

  get_token() {
    return this.auth_token;
  }
}
