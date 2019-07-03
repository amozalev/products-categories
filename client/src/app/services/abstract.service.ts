import {HttpClient} from '@angular/common/http';
import {BaseModel} from '../shared/models/base.model';
import {Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConfig} from '../app.config';

export class AbstractService<T extends BaseModel> {
  itemsListChanged = new Subject<T[]>();
  pagesChanged = new Subject<{}>();
  editedItemId = new Subject<string>();

  constructor(
    protected httpService: HttpClient,
    private items: T[],
    private base_url: string,
    private endpoint: string,
  ) {
  }

  getItems() {
    return this.items.slice();
  }

  getItemById(id: string) {
    return this.items.find((item) => {
      return item.id === id;
    });
  }

  getItemByName(name: string = null, items: T[]) {
    if (name && items.length) {
      return items.find(i => {
        return i.name === name;
      });
    }
    return null;
  }


  setItems(items: T[], pages: {} = null) {
    this.items = items;
    console.log('set items: ', this.items);

    this.itemsListChanged.next(this.items);
    if (pages) {
      this.pagesChanged.next(pages);
    }
  }

  fetchItems(id: string = null, cat_id?: string, offset: number = 0, limit: number = AppConfig.itemsPerPage) {
    if (!id) {
      id = '';
    }

    let url = `${this.base_url}/${this.endpoint}/${id}`;

    if (cat_id && cat_id.length === 24) {
      url = `${this.base_url}/categories/${cat_id}/products/`;
    }

    return this.httpService.get(`${url}?offset=${offset}&limit=${limit}`).pipe(
      map(res => {
        console.log('res:', res);
        return res;
      }),
      tap(res => {
        this.setItems(res['data'], res['pages']);
      })
    );
  }

  saveItem(item: T) {
    return this.httpService.post(`${this.base_url}/${this.endpoint}/`, item)
      .pipe(
        map(res => {
          return res;
        }),
        tap(res => {
            const new_items = this.items;
            new_items.push(res['data']);
            this.setItems(new_items);
          },
          error => {
            console.log('save tap error: ', error);
          })
      );
  }

  updateItem(item: T) {
    return this.httpService.put(`${this.base_url}/${this.endpoint}/${item['id']}`, item)
      .pipe(
        map(res => {
          return res['data'];
        }),
        tap(res => {
            const new_items = this.items;
            const i = this.items.findIndex((c) => {
              return c.id === res.id;
            });
            if (i !== -1) {
              new_items[i] = res;
            }
            this.setItems(new_items);
          },
          error => {
            console.log('update tap error: ', error);
          })
      );
  }

  deleteItem(id: string) {
    return this.httpService.delete(`${this.base_url}/${this.endpoint}/${id}`)
      .pipe(
        map(res => {
          return res;
        }),
        tap(res => {
            if (res['status'] === 'accepted') {
              const new_items = this.items;
              const i = this.items.findIndex((item) => {
                return item.id === id;
              });
              if (i !== -1) {
                new_items.splice(i, 1);
              }
              this.setItems(new_items);
            }
          },
          error => {
            console.log('delete tap error: ', error);
          })
      );
  }
}
