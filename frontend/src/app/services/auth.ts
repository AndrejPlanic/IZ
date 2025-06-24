import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../envoirment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';

  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getStoredUser(): User | null {
    try {
      const user = localStorage.getItem('user');
      if (!user || user === 'undefined') return null;
      return JSON.parse(user);
    } catch (e) {
      console.error('Failed to parse stored user:', e);
      return null;
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; user: User }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);
          this.userSubject.next(res.user);
        })
      );
  }

  signup(user: User) {
    return this.http
      .post<{ token: string; user: User }>(`${this.apiUrl}/register`, user)
      .pipe(
        tap((res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);
          this.userSubject.next(res.user);
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }
}
