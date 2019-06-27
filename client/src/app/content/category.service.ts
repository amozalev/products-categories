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

  constructor(private httpService: HttpClient) {}


  getCategories() {
    // this.final_categories = this.categories.slice();
    // this.categories.slice().forEach((val) => {
    //
    //   if (val.parentId != null) {
    //     const parent_category = this.categories[val.parentId];
    //
    //     const _index = this.final_categories.findIndex((category) => {
    //       if (parent_category.id === category.id) {
    //         return category;
    //       }
    //     });
    //     if (_index === -1) {
    //       this.final_categories.push(parent_category);
    //     }
    //     this.final_categories[_index].children.push(val);
    //
    //   } else {
    //     const _index = this.final_categories.findIndex((category) => {
    //       if (val.id === category.id) {
    //         return category;
    //       }
    //     });
    //     if (_index === -1) {
    //       this.final_categories.push(val);
    //     }
    //   }
    //
    // });
    // console.log('final_categories: ', this.final_categories);
    // this.categoryListChanged.next(this.final_categories);
    // return this.final_categories;
    return this.categories.slice();
  }

  getCategories2(id: string = '') {
    return this.httpService.get(AppConfig.apiURL + '/' + AppConfig.apiPrefix + '/categories/' + id).pipe(
      map(res => {
        console.log('--------', res['data']);
        return res['data'];
      }),
      tap(res => {
        this.setCategories(res);
      })
    );
  }


  setCategories(categories: Category[]) {
    this.categories = categories;
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
