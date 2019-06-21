import {Injectable} from '@angular/core';
import {ProductService} from '../content/product.service';
import {CategoryService} from '../content/category.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {Category} from './category.model';


@Injectable()
export class DataStorageService {
  // headers = new HttpHeaders();

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private httpService: HttpClient) {
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');


  }

  getCategories(id: string = '') {
    this.httpService.get(AppConfig.apiURL + '/' + AppConfig.apiPrefix + '/categories/' + id)
      .subscribe(res => {
          this.categoryService.setCategories(res['data']);
        },
        error => console.log('error: ', error)
      );
  }

  createCategory() {

  }

  updateCategory() {

  }

  deleteCategory() {

  }

  getProducts(objectNamePlural: string, id: string = '') {
    this.httpService.get(AppConfig.apiURL + '/' + AppConfig.apiPrefix + '/' + objectNamePlural + '/' + id)
      .subscribe(res => {
          this.categoryService.setCategories(res['data']);
        },
        error => console.log('error: ', error)
      );
  }


}
