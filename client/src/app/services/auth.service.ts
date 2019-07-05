import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AppConfig} from '../app.config';
import {shareReplay} from 'rxjs/operators';


@Injectable()
export class AuthService {

  constructor(private httpService: HttpClient) {
  }

  login(email: string, password: string) {
    return this.httpService.post(`${AppConfig.apiURL}/${AppConfig.apiURL}/auth/login`, {email, password}).pipe(
      shareReplay()
    );
  }
}
