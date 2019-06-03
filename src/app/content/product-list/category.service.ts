import {Category} from '../../shared/category.model';

export class CategoryService {
  private categories: Category[] = [
    new Category(
      0,
      'fruit',
      'Fruits'),
    new Category(
      1,
      'vegetable',
      'Vegetables'
    )
  ];

  getCategories() {
    return this.categories.slice();
  }

  getCategoryNameById(cat_id: number) {
    const category = this.categories.find((r) => {
      return r.id === cat_id;
    });
    console.log('cat_name: ', category);
    return category.name;
  }
}
