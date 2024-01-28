import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signup(Username: string | null, Password: string | null) {
    const body = {
      userName: Username,
      password: Password,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    this.http
      .post('http://localhost:5072/api/signup/', JSON.stringify(body), {
        headers,
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
  }
  login(Username: string | null, Password: string | null) {
    const body = `client_id=photo-forge&client_name=PhotoForge&grant_type=password&scopes=projects%20offline_access&userName=${Username}&password=${Password}`;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    this.http
      .post('http://localhost:5072/connect/token', body, { headers })
      .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('access_token', (res as any).access_token);
          localStorage.setItem('refresh_token', (res as any).refresh_token);
          this.router.navigateByUrl('/');
        },
        error: (err) => console.log(err),
      });
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
