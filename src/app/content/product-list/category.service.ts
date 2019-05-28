import {Category} from '../../shared/category.model';

export class CategoryService {
  private categories: Category[] = [
    new Category(
      1,
      'fruit',
      'Fruits'),
    new Category(
      2,
      'vegetable',
      'Vegetables'
    )
  ];

  getCategories() {
    return this.categories.slice();
  }
}
