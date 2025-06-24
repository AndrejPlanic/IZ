import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    if (form.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    const { name, email, password } = form.value;

    this.authService.signup({ name, email, password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => (this.error = err.error?.message || 'Signup failed'),
    });
  }
}
