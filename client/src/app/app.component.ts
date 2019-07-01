import {Component, OnInit} from '@angular/core';
import {CategoryService} from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'products-categories';

  constructor(private categoriesService: CategoryService) {
  }


  ngOnInit() {
    this.categoriesService.fetchCategories().subscribe();
  }
}
