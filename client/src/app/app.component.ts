import {Component, OnInit} from '@angular/core';
import {CategoryService} from './content/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'products-categories';

  constructor(private categoryService: CategoryService) {
  }


  ngOnInit() {
    this.categoryService.fetchCategories().subscribe();
  }
}
