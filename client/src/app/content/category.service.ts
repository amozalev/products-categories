import {Category} from '../shared/category.model';
import {Subject} from 'rxjs';
import {AppConfig} from '../app.config';
import {map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CategoryService {
  // final_categories: { [id: number]: { category: Category }[] }[];
  // final_categories: any[] = [];
  categoryListChanged = new Subject<Category[]>();
  editedCategory = new Subject<string>();

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

    const category = this.categories.find((r) => {
      return r.name === cat_id;
    });
    return category;
  }

  addCategory(category: Category, editMode = false) {
    if (!editMode) {
      this.categories.push(category);
      this.categoryListChanged.next(this.categories.slice());
    } else {
      const index = this.categories.findIndex((c) => {
        return c.id === category.id;
      });
      if (index !== -1) {
        this.categories[index] = category;
        this.categoryListChanged.next(this.categories.slice());
      }
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
