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
          this.isAuthenticated.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
  }
}

type AuthResponse = {
  token: string;
  message: string;
  status: boolean;
};
