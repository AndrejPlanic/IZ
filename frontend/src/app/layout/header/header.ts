import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  totalItems = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}
  userMenuOpen = false;
  user: any;
  isLoggedIn: boolean = false;

  logout() {
    this.authService.logout();
    this.user = null;
    this.userMenuOpen = false;
    this.router.navigate(['/login']);
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user;
    });

    this.cartService.totalItems$.subscribe((count) => {
      this.totalItems = count;
    });
  }
}
