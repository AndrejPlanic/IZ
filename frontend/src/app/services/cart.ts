import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  productId: string;
  name: string;
  category: any;
  price: number;
  quantity: number;
  featuredImage: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private totalItemsSubject = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSubject.asObservable();

  private storageKey = 'cart';
  private cart: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const data = localStorage.getItem(this.storageKey);
    this.cart = data ? JSON.parse(data) : [];
    this.refreshTotalItems();
  }

  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }
  updateCartItems(newItems: CartItem[]) {
    this.cart = newItems;
    this.totalItemsSubject.next(this.getTotalItems());
  }

  getItems(): CartItem[] {
    return this.cart;
  }

  addToCart(item: CartItem) {
    const existing = this.cart.find((p) => p.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
    this.saveCart();
    this.refreshTotalItems();
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter((item) => item.productId !== productId);
    this.saveCart();
    this.refreshTotalItems();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getTotalItems(): number {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cart.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }
  private refreshTotalItems() {
    this.totalItemsSubject.next(this.getTotalItems());
  }
}
