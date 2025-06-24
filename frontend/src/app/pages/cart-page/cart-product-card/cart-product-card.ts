import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../../services/cart';

@Component({
  selector: 'app-cart-product-card',
  standalone: false,
  templateUrl: './cart-product-card.html',
  styleUrl: './cart-product-card.css',
})
export class CartProductCard {
  @Input() item!: CartItem;
  @Output() remove = new EventEmitter<string>();
  @Output() quantityChange = new EventEmitter<{
    productId: string;
    quantity: number;
  }>();

  increase() {
    if (this.item) {
      this.item.quantity++;
      this.quantityChange.emit({
        productId: this.item.productId,
        quantity: this.item.quantity,
      });
    }
  }

  decrease() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
      this.quantityChange.emit({
        productId: this.item.productId,
        quantity: this.item.quantity,
      });
    }
  }

  removeItem() {
    this.remove.emit(this.item.productId);
  }
}
