import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CategoryService, Category } from '../../../../services/category';

@Component({
  selector: 'app-category-section',
  standalone: false,
  templateUrl: './category-section.html',
  styleUrl: './category-section.css',
})
export class CategorySection {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getMainCategories().subscribe((cat) => {
      this.categories = cat;
    });
  }
}

register();
