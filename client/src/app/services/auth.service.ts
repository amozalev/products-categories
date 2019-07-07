import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {shareReplay} from 'rxjs/operators';
import {Subject} from 'rxjs';
import * as moment from 'moment';

import {AppConfig} from '../app.config';


@Injectable()
export class AuthService {
  isAuthorized = new Subject<boolean>();

  constructor(private httpService: HttpClient) {
  }

  login(email: string, password: string) {
    return this.httpService.post(`${AppConfig.apiURL}/${AppConfig.apiPrefix}/auth/login`, {email, password}).pipe(
      shareReplay()
    );
  }

  setSession(data: {}) {
    // const expiresAt = moment().add(data['expires'], 'second').unix();
    localStorage.setItem('token_id', data['auth_token']);
    localStorage.setItem('expires_at', JSON.stringify(data['expires']));
  }

  logout() {
    localStorage.removeItem('token_id');
    localStorage.removeItem('expires_at');
    this.isAuthorized.next(false);
  }

  public isLoggedIn() {
    // console.log('momentt: ', moment().unix());
    // console.log('expires: ', this.getExpiration());
    return moment().unix() < this.getExpiration();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    // return moment(expiresAt);
    return expiresAt;
  }

}
