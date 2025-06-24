import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: {
    _id: string;
    name: string;
    description: string;
    specifications: string;
    category: any;
    subcategory: any;
    price: number;
    featuredImage: string;
    images: string[];
  };
}
