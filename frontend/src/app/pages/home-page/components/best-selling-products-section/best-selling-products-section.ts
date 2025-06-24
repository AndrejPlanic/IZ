import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-best-selling-products-section',
  standalone: false,
  templateUrl: './best-selling-products-section.html',
  styleUrl: './best-selling-products-section.css',
})
export class BestSellingProductsSection {
  topProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getTopProductsByQuantity().subscribe((products) => {
      this.topProducts = products;
    });
  }
}
