import {Category} from '../shared/category.model';
import {Subject} from 'rxjs';
import {AppConfig} from '../app.config';
import {map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CategoryService {
  categoryListChanged = new Subject<Category[]>();
  editedCategory = new Subject<string>();
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   })
  // };

  private categories: Category[] = [];

  constructor(private httpService: HttpClient) {
  }


  getCategories() {
    return this.categories.slice();
  }

  fetchCategories(id: string = '') {
    return this.httpService.get(AppConfig.apiURL + '/' + AppConfig.apiPrefix + '/categories/' + id).pipe(
      map(res => {
        return res['data'];
      }),
      tap(res => {
        this.setCategories(res);
      })
    );
  }


  setCategories(categories: Category[]) {
    this.categories = categories;
    console.log('set categories: ', this.categories);

    this.categoryListChanged.next(this.categories);
  }

  getCategoryById(cat_id: string) {
    console.log('cat_id: ', cat_id);
    console.log('categories: ', this.categories);

    return this.categories.find((r) => {
      return r.id === cat_id;
    });
  }

  getCategoryByName(cat_name: string = null, categories: Category[]) {
    if (cat_name && categories.length) {
      return categories.find(cat => {
        return cat.name === cat_name;
      });
    }
    return null;
  }

  saveCategory(category: Category, editMode = false) {
    if (!editMode) {
      return this.httpService.post(`${AppConfig.apiURL}/${AppConfig.apiPrefix}/categories/`,
        category)
        .pipe(
          map(res => {
            return res['data'];
          }),
          tap(res => {
            const categories = this.categories;
            categories.push(res);
            this.setCategories(categories);
          })
        );
    } else {
      return this.httpService.put(`${AppConfig.apiURL}/${AppConfig.apiPrefix}/categories/${category['id']}`,
        category)
        .pipe(
          map(res => {
            return res['data'];
          }),
          tap(res => {
            const categories = this.categories;
            const index = this.categories.findIndex((c) => {
              return c.id === res.id;
            });
            if (index !== -1) {
              categories[index] = res;
            }
            this.setCategories(categories);
          })
        );

    }
  }


  deleteCategory(name: string) {
    const index = this.categories.findIndex((c) => {
      return c.name === name;
    });
    if (index !== -1) {
      this.categories.splice(index, 1);
      this.categoryListChanged.next(this.categories.slice());
    }
  }
}
