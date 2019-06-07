import {Category} from '../../shared/category.model';
import index from '@angular/cli/lib/cli';

export class CategoryService {
  // final_categories: { [id: number]: { category: Category }[] }[];
  final_categories: any[] = [];
  private categories: Category[] = [
    new Category(
      0,
      'fruit',
      'Fruits',
      null,
      []),
    new Category(
      1,
      'vegetable',
      'Vegetables',
      null,
      []
    ),
    new Category(
      2,
      'tropical_fruit',
      'Tropical fruits',
      0,
      []
    )
  ];

  getCategories() {
    this.final_categories = this.categories.slice();
    // this.categories.slice().forEach((val) => {
    //
    //   if (val.parent != null) {
    //     const parent_category = this.categories[val.parent];
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
    console.log('final_categories: ', this.final_categories);

    return this.final_categories;
  }

  getCategoryNameById(cat_id: number) {
    const category = this.categories.find((r) => {
      return r.id === cat_id;
    });
    return category.name;
  }
}
