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

  // private setSession(authResult) {
  //   const expiresAt = moment().add(authResult.expiresIn, 'second');
  //
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  // }

  set_token(token: string) {
    this.auth_token = token;
    localStorage.setItem('id_token', token);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get_token() {
    return this.auth_token;
  }

  isAuthenticated() {
    const token = localStorage.getItem('id_token');
    console.log('token:', token);
    return token != null;
  }

}
