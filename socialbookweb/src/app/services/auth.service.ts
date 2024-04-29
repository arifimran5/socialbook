import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser } from '../models/user';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8000/api';
  token = localStorage.getItem('token');
  user = localStorage.getItem('user');

  userData = new BehaviorSubject<any>(this.user ? JSON.parse(this.user) : null);
  userData$ = this.userData.asObservable();

  isAuthenticated = new BehaviorSubject<boolean>(this.token !== null);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient) {}

  register(data: RegisterUser) {
    return this.http.post(`${this.baseUrl}/users/register`, data);
  }

  login(data: LoginUser) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/users/login`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          this.userData.next(res.user);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.isAuthenticated.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
    this.userData.next(null);
  }
}

type AuthResponse = {
  token: string;
  message: string;
  status: boolean;
  user: any;
};
