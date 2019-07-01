import {Category} from '../shared/models/category.model';
import {AppConfig} from '../app.config';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractService} from './abstract.service';

@Injectable()
export class CategoryService extends AbstractService<Category> {
  constructor(httpService: HttpClient) {
    super(httpService, [], `${AppConfig.apiURL}/${AppConfig.apiPrefix}`, 'categories');
  }
}
