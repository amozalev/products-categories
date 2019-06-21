import {Category} from '../shared/category.model';
import {Subject} from 'rxjs';

export class CategoryService {
  // final_categories: { [id: number]: { category: Category }[] }[];
  // final_categories: any[] = [];
  categoryListChanged = new Subject<Category[]>();
  editedCategory = new Subject<number>();

  private categories: Category[] = [
    // new Category(
    //   1,
    //   'fruit',
    //   'Fruits',
    //   null,
    //   []),
    // new Category(
    //   2,
    //   'vegetable',
    //   'Vegetables',
    //   null,
    //   []
    // ),
    // new Category(
    //   3,
    //   'tropical_fruit',
    //   'Tropical fruits',
    //   0,
    //   []
    // )
  ];

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

  setCategories(categories: Category[]) {
    this.categories = categories;
    this.categoryListChanged.next(this.categories);
  }

  getCategoryById(cat_id: number) {
    console.log('cat_id: ', cat_id);
    console.log('categories: ', this.categories);

    const category = this.categories.find((r) => {
      return r.id === cat_id;
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


  deleteCategory(id: number) {
    const index = this.categories.findIndex((c) => {
      return c.id === id;
    });
    if (index !== -1) {
      this.categories.splice(index, 1);
      this.categoryListChanged.next(this.categories.slice());
    }
  }
}
