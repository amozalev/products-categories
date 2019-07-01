import {Category} from '../shared/models/category.model';
import {Subject} from 'rxjs';
import {AppConfig} from '../app.config';
import {map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CategoryService {
  categoryListChanged = new Subject<Category[]>();
  editedCategoryId = new Subject<string>();
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

  fetchCategories(id: string = '') {
    return this.httpService.get(AppConfig.apiURL + '/' + AppConfig.apiPrefix + '/categories/' + id).pipe(
      map(res => {
        return res['data'];
      }),
      tap(res => {
          this.setCategories(res);
        },
        error => {
          console.log('fetchCategories tap error: ', error);
        }),
    );
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
    console.log('set categories: ', this.categories);

    this.categoryListChanged.next(this.categories);
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
            },
            error => {
              console.log('updateCategory tap error: ', error);
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
            },
            error => {
              console.log('saveCategory tap error: ', error);
            })
        );

    }
  }

  deleteCategory(cat_id: string) {
    return this.httpService.delete(`${AppConfig.apiURL}/${AppConfig.apiPrefix}/categories/${cat_id}`)
      .pipe(
        map(res => {
          return res;
        }),
        tap(res => {
            if (res['status'] === 'accepted') {
              const categories = this.categories;
              const index = this.categories.findIndex((c) => {
                return c.id === cat_id;
              });
              if (index !== -1) {
                categories.splice(index, 1);
              }
              this.setCategories(categories);
            }
          },
          error => {
            console.log('deleteCategory tap error: ', error);
          })
      );
  }
}
