import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService, CartItem } from '../../services/cart';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  @Output() totalChange = new EventEmitter<number>();

  cartItems: CartItem[] = [];
  totalItems = 0;
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getItems();
    this.totalItems = this.cartService.getTotalItems();
    this.totalPrice = this.cartService.getTotalPrice();

    this.cartService.updateCartItems(this.cartItems);
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  removeFromCart(id: string) {
    this.cartService.removeFromCart(id);
    this.loadCart();
  }

  onQuantityChange(event: { productId: string; quantity: number }) {
    this.cartService.updateQuantity(event.productId, event.quantity);
    this.loadCart();
  }

  showCheckout = false;

  checkoutDone() {
    this.clearCart();
    this.showCheckout = false;
  }
}
