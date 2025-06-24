import { Component, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CategoryService } from '../../../services/category';
import { FilterItem } from '../../../services/category';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product';

@Component({
  selector: 'app-filter-component',
  standalone: false,
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css',
  animations: [
    trigger('toggle', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      transition('open <=> closed', [animate('0.3s ease-out')]),
    ]),
  ],
})
export class FilterComponent {
  filterItems: FilterItem[] = [];
  updatedList: (FilterItem & { open: boolean })[] = [];
  products: Product[] = [];
  selectedSubcategoryId: string | null = null;
  selectedCategoryId: string | null = null;

  @Output() filterChange = new EventEmitter<{
    categoryId: string;
    subcategoryId: string;
  }>();

  @Output() filterChange2 = new EventEmitter<{
    categoryId: string;
  }>();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.categoryService.getFilterItems().subscribe({
      next: (data) => {
        // Assign the fetched data to filterItems
        this.filterItems = data;

        // Create updatedList with 'open: false' added
        this.updatedList = this.filterItems.map((item) => ({
          ...item,
          open: false,
        }));
      },
      error: (err) => console.error('Error loading products', err),
    });
  }

  toggleDropdown(category: any) {
    category.open = !category.open;
  }

  filterBySubcategory(subcategoryId: string) {
    this.productService
      .getFilteredProducts(undefined, subcategoryId)
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (err) => console.error('Error loading products', err),
      });
  }

  selectSubcategory(categoryId: string, subcategoryId: string) {
    this.selectedCategoryId = '';
    this.selectedSubcategoryId = subcategoryId;
    this.filterChange.emit({
      categoryId: categoryId,
      subcategoryId: subcategoryId,
    });
  }
  selectCategory(categoryId: string) {
    this.selectedCategoryId = categoryId;
    this.selectedSubcategoryId = '';
    this.filterChange2.emit({
      categoryId: categoryId,
    });
  }
}
