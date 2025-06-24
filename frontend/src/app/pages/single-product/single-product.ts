import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { CartService, CartItem } from '../../services/cart';

@Component({
  selector: 'app-single-product',
  standalone: false,
  templateUrl: './single-product.html',
  styleUrl: './single-product.css',
})
export class SingleProduct implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => (this.product = data),
        error: (err) => console.error('Error fetching product', err),
      });
    }
  }

  quantity: number = 1;

  increase() {
    if (this.product && this.quantity < this.product.quantity) {
      this.quantity++;
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    const item: CartItem = {
      productId: this.product?._id ?? '',
      name: this.product?.name ?? '',
      category: this.product?.category,
      price: this.product?.price ?? 0,
      quantity: this.quantity,
      featuredImage: this.product?.featuredImage ?? '',
    };
    this.cartService.addToCart(item);
    alert('Added to cart!');
  }
}
