import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../../../services/category.service';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  currentPage = 1;
  @Input() pages: {};
  @Input() endpoint: string;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }


  onPageClick(cur_page: number, offset: number, limit: number) {
    this.currentPage = cur_page;
    if (this.endpoint === 'products') {
      let active_cat_name: string = null;
      let active_cat_id: string = null;

      this.route.params.subscribe((params: Params) => {
        active_cat_name = params['category_name'];
      });

      const categories = this.categoryService.getItems();
      const active_cat = this.categoryService.getItemByName(active_cat_name, categories);
      if (active_cat !== undefined && active_cat !== null) {
        active_cat_id = active_cat['id'];
      }

      this.productService.fetchItems(null, active_cat_id, offset, limit).subscribe();
    } else if (this.endpoint === 'categories') {
      this.categoryService.fetchItems(null, null, offset, limit).subscribe();
    }
  }

}
