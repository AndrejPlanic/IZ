import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts(); // Load all initially
  }

  loadProducts(categoryId?: string, subcategoryId?: string) {
    this.productService
      .getFilteredProducts(categoryId, subcategoryId)
      .subscribe({
        next: (res) => (this.products = res),
        error: (err) => console.error('Failed to load products', err),
      });
  }

  onFilterChange(filter: { categoryId: string; subcategoryId: string }) {
    this.loadProducts(filter.categoryId, filter.subcategoryId);
  }

  onFilterChange2(filter: { categoryId: string }) {
    this.loadProducts(filter.categoryId);
  }
}
