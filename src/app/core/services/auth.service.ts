import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environments } from 'environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    const body = {
      email,
      password,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.post(`${environments.apiUrl}/register`, body, {
      headers,
    });
  }
  logIn(email: string | null, password: string | null) {
    const body = {
      email,
      password,
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post(`${environments.apiUrl}/login`, body, { headers });
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
